import type { SourceOption } from "@/types/sources.ts";

export const IN_PERSON_MICS: SourceOption[] = [
  {
    id: "default",
    title: "MacBook Pro 内蔵マイク",
    sub: "デフォルト・指向性: 全方向",
    icon: "mic",
  },
  { id: "airpods", title: "AirPods Pro", sub: "Bluetooth · 接続中", icon: "headphones" },
  { id: "yeti", title: "Blue Yeti USB Microphone", sub: "USB · 高品質", icon: "mic" },
  { id: "room", title: "会議室マイク (Jabra)", sub: "USB · 360度集音", icon: "volume-2" },
];

export const TABS: SourceOption[] = [
  {
    id: "meet",
    title: "Google Meet — Q2 ロードマップ",
    sub: "meet.google.com/abc-defg-hij",
    icon: "monitor",
  },
  { id: "zoom", title: "Zoom — 田中さんと1on1", sub: "zoom.us · 共有可能", icon: "monitor" },
  { id: "teams", title: "Microsoft Teams 会議", sub: "teams.microsoft.com", icon: "monitor" },
  { id: "system", title: "システム音声全体", sub: "全アプリの出力をキャプチャ", icon: "volume-2" },
];
