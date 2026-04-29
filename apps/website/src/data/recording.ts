import type { RecLine, SpeakerStat } from "@/types/recording.ts";

export const INTERIM_PHRASES = [
  "並行作業の範囲としては、ドキュメント整備とリリースノートの",
  "並行作業の範囲としては、ドキュメント整備とリリースノートの作成、",
  "並行作業の範囲としては、ドキュメント整備とリリースノートの作成、それから内部勉強会の準備",
  "並行作業の範囲としては、ドキュメント整備とリリースノートの作成、それから内部勉強会の準備が考えられます",
] as const;

export const INITIAL_LINES: RecLine[] = [
  {
    time: "00:03",
    speaker: 1,
    name: "田中",
    text: "じゃあ始めましょうか。今日は新機能のリリース計画についてですね。",
  },
  {
    time: "00:18",
    speaker: 2,
    name: "佐藤",
    text: "はい、お願いします。先週の状況だと、QAが少し遅れているので、リリース日を調整できないか相談したいです。",
  },
  {
    time: "00:42",
    speaker: 3,
    name: "鈴木",
    text: "QAの遅れは、自動テストのカバレッジ不足が原因です。追加で1週間欲しいですね。",
  },
  {
    time: "01:05",
    speaker: 1,
    name: "田中",
    text: "1週間ずらすと、マーケティング側の準備にも影響しますね。並行で進められる範囲を整理しましょうか。",
  },
];

export const SPEAKER_STATS: SpeakerStat[] = [
  { id: 1, name: "田中", time: "08:12", color: "var(--speaker-1)" },
  { id: 2, name: "佐藤", time: "06:45", color: "var(--speaker-2)" },
  { id: 3, name: "鈴木", time: "04:22", color: "var(--speaker-3)" },
];
