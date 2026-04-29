import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ACCENTS } from "./accents.ts";
import type { AccentName, Theme, Tweaks } from "../types/ui.ts";

const STORAGE_KEY = "mtg-scribe.tweaks.v1";

const ACCENT_NAMES: readonly AccentName[] = [
  "indigo",
  "violet",
  "emerald",
  "amber",
  "rose",
  "slate",
];

interface ThemeContextValue extends Tweaks {
  setTheme: (theme: Theme) => void;
  setAccent: (accent: AccentName) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const isTheme = (v: unknown): v is Theme => v === "light" || v === "dark";
const isAccent = (v: unknown): v is AccentName =>
  typeof v === "string" && (ACCENT_NAMES as readonly string[]).includes(v);

const detectInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "dark";
  if (window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
  return "dark";
};

const loadStored = (): Partial<Tweaks> => {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    const obj = parsed as Record<string, unknown>;
    const result: Partial<Tweaks> = {};
    if (isTheme(obj["theme"])) result.theme = obj["theme"];
    if (isAccent(obj["accent"])) result.accent = obj["accent"];
    return result;
  } catch {
    return {};
  }
};

interface ThemeProviderProps {
  children: ReactNode;
  defaultAccent?: AccentName;
}

export function ThemeProvider({
  children,
  defaultAccent = "indigo",
}: ThemeProviderProps): ReactNode {
  const [tweaks, setTweaks] = useState<Tweaks>(() => {
    const stored = loadStored();
    return {
      theme: stored.theme ?? detectInitialTheme(),
      accent: stored.accent ?? defaultAccent,
    };
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", tweaks.theme);
    const a = ACCENTS[tweaks.accent];
    root.style.setProperty("--accent", a.color);
    root.style.setProperty("--accent-strong", a.strong);
    root.style.setProperty("--accent-soft", a.soft);
  }, [tweaks]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tweaks));
    } catch {
      // ignore quota / privacy mode
    }
  }, [tweaks]);

  const setTheme = useCallback((theme: Theme): void => {
    setTweaks((prev) => ({ ...prev, theme }));
  }, []);
  const setAccent = useCallback((accent: AccentName): void => {
    setTweaks((prev) => ({ ...prev, accent }));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ ...tweaks, setTheme, setAccent }),
    [tweaks, setTheme, setAccent],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
