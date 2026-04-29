import type { AccentName } from "../types/ui.ts";

export interface AccentColors {
  color: string;
  strong: string;
  soft: string;
}

export const ACCENTS: Record<AccentName, AccentColors> = {
  indigo: { color: "#5b6cf9", strong: "#4451e0", soft: "rgba(91, 108, 249, 0.12)" },
  violet: { color: "#7c5cff", strong: "#5d3fe0", soft: "rgba(124, 92, 255, 0.12)" },
  emerald: { color: "#10a371", strong: "#0a8055", soft: "rgba(16, 163, 113, 0.12)" },
  amber: { color: "#d97706", strong: "#b45309", soft: "rgba(217, 119, 6, 0.14)" },
  rose: { color: "#e5484d", strong: "#c93a3f", soft: "rgba(229, 72, 77, 0.12)" },
  slate: { color: "#475569", strong: "#334155", soft: "rgba(71, 85, 105, 0.14)" },
};

export const ACCENT_LABELS: Record<AccentName, string> = {
  indigo: "インディゴ",
  violet: "バイオレット",
  emerald: "エメラルド",
  amber: "アンバー",
  rose: "ローズ",
  slate: "スレート",
};
