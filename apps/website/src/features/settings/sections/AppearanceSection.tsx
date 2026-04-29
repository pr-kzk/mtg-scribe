import type { ReactNode } from "react";
import { Icon } from "@/components/Icon.tsx";
import { ACCENTS, ACCENT_LABELS } from "@/theme/accents.ts";
import type { AccentName, Theme } from "@/types/ui.ts";

interface AppearanceSectionProps {
  theme: Theme;
  accent: AccentName;
  onThemeChange: (theme: Theme) => void;
  onAccentChange: (accent: AccentName) => void;
}

const THEME_OPTIONS: { value: Theme; label: string }[] = [
  { value: "light", label: "ライト" },
  { value: "dark", label: "ダーク" },
];

export function AppearanceSection({
  theme,
  accent,
  onThemeChange,
  onAccentChange,
}: AppearanceSectionProps): ReactNode {
  return (
    <section className="settings-section" aria-labelledby="settings-appearance-title">
      <h2 className="settings-section-title" id="settings-appearance-title">
        外観
      </h2>
      <div className="settings-row">
        <div className="settings-row-label">
          <div className="settings-row-name">テーマ</div>
          <div className="settings-row-desc">ライトとダークを切り替え</div>
        </div>
        <div className="segment" role="radiogroup" aria-label="テーマ">
          {THEME_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={theme === opt.value}
              className={`segment-btn ${theme === opt.value ? "active" : ""}`}
              onClick={() => onThemeChange(opt.value)}
            >
              <Icon name={opt.value === "light" ? "sun" : "moon"} size={13} />
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div className="settings-row">
        <div className="settings-row-label">
          <div className="settings-row-name">アクセントカラー</div>
          <div className="settings-row-desc">UIに使われる強調色</div>
        </div>
        <div
          role="radiogroup"
          aria-label="アクセントカラー"
          style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
        >
          {(Object.keys(ACCENTS) as AccentName[]).map((name) => (
            <button
              key={name}
              type="button"
              role="radio"
              aria-checked={accent === name}
              aria-label={ACCENT_LABELS[name]}
              onClick={() => onAccentChange(name)}
              style={{
                width: 28,
                height: 28,
                borderRadius: "var(--r-full)",
                background: ACCENTS[name].color,
                boxShadow:
                  accent === name
                    ? `0 0 0 3px var(--bg), 0 0 0 5px ${ACCENTS[name].color}`
                    : "var(--shadow-sm)",
                border: "none",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
