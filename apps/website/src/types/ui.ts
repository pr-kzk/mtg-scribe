export type View = "all" | "today" | "starred" | "archive" | "settings";

export type ListView = Exclude<View, "settings">;

export type DetailMode = "preview" | "edit" | "split";

export type Theme = "light" | "dark";

export type AccentName = "indigo" | "violet" | "emerald" | "amber" | "rose" | "slate";

export interface Tweaks {
  theme: Theme;
  accent: AccentName;
}
