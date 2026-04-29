import type { Meeting } from "../types/meeting.ts";

export const MOCK_MEETINGS: Meeting[] = [
  {
    id: "m1",
    title: "Q2 プロダクトロードマップ レビュー",
    date: "2026-04-30T14:00:00",
    endDate: "2026-04-30T14:47:00",
    duration: "47:23",
    mode: "online",
    source: "Google Meet タブ",
    attendees: [
      { name: "田中 健太", initials: "田", color: "#5b6cf9" },
      { name: "佐藤 美咲", initials: "佐", color: "#16a394" },
      { name: "鈴木 大輔", initials: "鈴", color: "#e07a3c" },
      { name: "高橋 ゆり", initials: "高", color: "#c552c2" },
    ],
    snippet:
      "Q2 のプロダクトロードマップについて、優先順位の再調整を実施。AI機能の前倒しと、既存機能のリファクタリングを並行して進める方針で合意。",
    topics: [
      {
        title: "AI機能のリリース時期",
        ronten:
          "競合状況を踏まえ、6月末予定だったAI機能のリリースを5月末に前倒しできるか検討。技術的には可能だが、リファクタとのリソース競合が懸念点として浮上した。",
        statements: [
          { name: "佐藤 美咲", text: "競合の動向を考えると、リリース時期を再検討したい" },
          { name: "鈴木 大輔", text: "技術的には5月末でも詰められるが、リソース的にはタイト" },
          {
            name: "高橋 ゆり",
            text: "ベータユーザーからのフィードバックではAI機能のニーズが圧倒的に高い",
          },
        ],
        decision: "AI機能の正式リリースを6月末から5月末に前倒しする",
      },
      {
        title: "既存機能のリファクタリング",
        ronten:
          "レポート機能のリファクタは3-4週間規模。AI前倒しと並行する余裕がないため、Q3以降に持ち越す方針で議論。",
        statements: [
          {
            name: "鈴木 大輔",
            text: "レポート機能まわりはフルスクラッチに近く、3-4週間は確保したい",
          },
          { name: "高橋 ゆり", text: "リファクタは内部品質の話で外からは見えづらい" },
        ],
        decision: "既存のレポート機能のリファクタは Q3 に持ち越し",
      },
      {
        title: "週次レビューの運営",
        ronten: "進捗トラッキングの粒度を上げるため、週次レビューの定例化について議論。",
        statements: [{ name: "田中 健太", text: "毎週の進捗共有を固定枠で押さえたい" }],
        decision: "週次レビューを毎週金曜 15:00 に固定",
      },
    ],
    todos: [
      { text: "AI機能のスコープ定義ドキュメントを作成", owner: "田中", due: "5/3", done: false },
      { text: "リファクタチームのアサイン案を共有", owner: "鈴木", due: "5/2", done: true },
      { text: "Q2 OKRの最終版をDocsに反映", owner: "佐藤", due: "5/5", done: false },
      { text: "ベータユーザーへのヒアリング日程調整", owner: "高橋", due: "5/7", done: false },
    ],
    transcript: [
      {
        time: "00:00",
        speaker: 1,
        name: "田中",
        text: "じゃあ始めましょうか。今日はQ2のロードマップレビューということで、まず現状のスケジュール感を共有したいと思います。",
      },
      {
        time: "00:24",
        speaker: 2,
        name: "佐藤",
        text: "はい、お願いします。先週の段階で、AI機能のリリースが6月末予定ということで動いていましたが、競合の状況を踏まえて再検討したいと思っていまして。",
      },
      {
        time: "01:02",
        speaker: 3,
        name: "鈴木",
        text: "技術的には5月末でも詰められると思います。ただ、リファクタとの兼ね合いがあって、リソース的にはちょっとタイトかなと。",
      },
      { time: "01:38", speaker: 1, name: "田中", text: "リファクタはどのくらいの規模感ですか?" },
      {
        time: "01:45",
        speaker: 3,
        name: "鈴木",
        text: "レポート機能まわりで、フルスクラッチに近いです。3-4週間は見ておきたい。",
      },
      {
        time: "02:30",
        speaker: 4,
        name: "高橋",
        text: "ベータユーザーからのフィードバックだと、AI機能の方が圧倒的にニーズ高いです。リファクタは内部品質の話なので、見えづらい部分というか。",
      },
      {
        time: "03:15",
        speaker: 2,
        name: "佐藤",
        text: "じゃあ AI を優先で、リファクタは Q3 持ち越しということで進めますか?",
      },
      {
        time: "03:28",
        speaker: 1,
        name: "田中",
        text: "そうですね。それで行きましょう。リソース配分の方は来週月曜までに確定させます。",
      },
    ],
    tags: ["プロダクト", "ロードマップ"],
  },
  {
    id: "m2",
    title: "デザインレビュー: 新ダッシュボード",
    date: "2026-04-30T11:30:00",
    endDate: "2026-04-30T12:02:00",
    duration: "32:10",
    mode: "in-person",
    source: "MacBook 内蔵マイク",
    attendees: [
      { name: "中村 さやか", initials: "中", color: "#5b6cf9" },
      { name: "伊藤 翔", initials: "伊", color: "#16a394" },
      { name: "渡辺 由香", initials: "渡", color: "#e07a3c" },
    ],
    snippet: "新ダッシュボードのv3デザインレビュー。情報密度とビジュアル階層について議論。",
    topics: [
      {
        title: "情報密度とコンパクトモード",
        ronten:
          "v3は情報量が増えたぶん視認性が落ちる懸念があり、コンパクトモードを切り替えで提供する案が浮上。",
        statements: [
          { name: "中村 さやか", text: "デフォルトで密度を上げると、初心者には情報過多になりそう" },
          { name: "伊藤 翔", text: "Pro ユーザーは密度高めを好む傾向がある" },
        ],
        decision: "コンパクトモードをv3に追加する",
      },
      {
        title: "KPIカードの優先度ロジック",
        ronten:
          "KPIカードのデフォルト並び順について、固定順か動的順かを議論。ユーザー操作頻度ベースに動的並び替えする方針で合意。",
        statements: [
          { name: "渡辺 由香", text: "よく見るカードを上に出したい" },
          { name: "伊藤 翔", text: "操作ログから自動推定すれば手間なく並び替えできる" },
        ],
        decision: "デフォルトのカード並びはユーザー操作頻度ベース",
      },
    ],
    todos: [
      { text: "コンパクトモードのワイヤーフレーム作成", owner: "中村", due: "5/2", done: false },
      { text: "KPIカード優先度ロジックのドキュメント化", owner: "伊藤", due: "5/3", done: false },
    ],
    transcript: [],
    tags: ["デザイン"],
  },
  {
    id: "m3",
    title: "週次1on1 — 田中さん",
    date: "2026-04-29T16:00:00",
    endDate: "2026-04-29T16:28:00",
    duration: "28:45",
    mode: "online",
    source: "Zoom",
    attendees: [
      { name: "田中 健太", initials: "田", color: "#5b6cf9" },
      { name: "山田 直樹", initials: "山", color: "#c552c2" },
    ],
    snippet: "今期のキャリア目標と直近のプロジェクトについて。テックリードへの移行プロセス。",
    topics: [
      {
        title: "キャリア目標の確認",
        ronten:
          "今期はテックリードへの移行を目指す。現状のスキルセットでカバーできていない領域の整理が必要。",
        statements: [
          { name: "田中 健太", text: "アーキテクチャ設計の経験をもう少し積みたい" },
          { name: "山田 直樹", text: "今期の大型プロジェクトでリード役を担ってもらう想定" },
        ],
      },
      {
        title: "直近プロジェクトの状況",
        ronten: "現在のプロジェクトは概ねスケジュール通り。レビュー負荷が課題として共有された。",
        statements: [{ name: "田中 健太", text: "コードレビューの量が増えてきた" }],
      },
    ],
    todos: [{ text: "テックリード ロードマップを共有", owner: "山田", due: "5/6", done: false }],
    transcript: [],
    tags: ["1on1"],
  },
  {
    id: "m4",
    title: "営業 月次レビュー (April)",
    date: "2026-04-28T10:00:00",
    endDate: "2026-04-28T11:12:00",
    duration: "1:12:08",
    mode: "online",
    source: "Microsoft Teams",
    attendees: [
      { name: "小林 拓海", initials: "小", color: "#5b6cf9" },
      { name: "松本 結衣", initials: "松", color: "#16a394" },
      { name: "森田 健", initials: "森", color: "#e07a3c" },
      { name: "井上 真由", initials: "井", color: "#c552c2" },
      { name: "斎藤 浩", initials: "斎", color: "#4592d8" },
    ],
    snippet: "4月の営業実績は目標比 108%。エンタープライズ案件のクロージング率が改善。",
    topics: [
      {
        title: "4月実績サマリ",
        ronten: "目標比108%で着地。エンタープライズ案件のクロージング率改善が主要因。",
        statements: [{ name: "小林 拓海", text: "上期計画に対して堅調なペース" }],
      },
      {
        title: "5月の重点アクション",
        ronten:
          "新規パイプラインの拡大が必要。インサイドセールスの増員と、ABMターゲットの再選定で攻める。",
        statements: [
          { name: "松本 結衣", text: "リード数自体が頭打ちの兆候" },
          { name: "森田 健", text: "ABMリストを更新して、ターゲット精度を上げたい" },
        ],
        decision: "インサイドセールスを2名増員",
      },
    ],
    todos: [
      { text: "エンタープライズ向けケーススタディ作成", owner: "松本", due: "5/10", done: false },
      { text: "ABM ターゲットリスト更新", owner: "森田", due: "5/4", done: true },
    ],
    transcript: [],
    tags: ["営業"],
  },
  {
    id: "m5",
    title: "全社オールハンズ",
    date: "2026-04-25T15:00:00",
    endDate: "2026-04-25T15:58:00",
    duration: "58:30",
    mode: "in-person",
    source: "会議室マイク",
    attendees: [
      { name: "大西 慎一", initials: "大", color: "#5b6cf9" },
      { name: "他 24名", initials: "+", color: "#767672" },
    ],
    snippet: "Q1の振り返りと、Q2の重点項目について。全社目標と各チームのOKRアラインメント。",
    topics: [
      {
        title: "Q1振り返り",
        ronten: "売上・ユーザー数ともにQ1目標を達成。重点プロダクト機能のリリースも計画通り完了。",
        statements: [{ name: "大西 慎一", text: "全チームの貢献に感謝" }],
      },
      {
        title: "オフィス移転",
        ronten: "現オフィスのキャパシティ限界に伴い、6月の新オフィス移転を最終確定。",
        statements: [],
        decision: "新オフィス移転を6月に確定",
      },
    ],
    todos: [],
    transcript: [],
    tags: ["全社"],
  },
  {
    id: "m6",
    title: "エンジニア定例",
    date: "2026-04-24T17:00:00",
    endDate: "2026-04-24T17:45:00",
    duration: "45:00",
    mode: "online",
    source: "Slack Huddle",
    attendees: [
      { name: "鈴木 大輔", initials: "鈴", color: "#5b6cf9" },
      { name: "中村 さやか", initials: "中", color: "#16a394" },
      { name: "伊藤 翔", initials: "伊", color: "#e07a3c" },
    ],
    snippet: "本番障害ポストモーテムと、CI/CDパイプラインの改善について。",
    topics: [
      {
        title: "本番障害ポストモーテム",
        ronten: "アラート検知の遅れが障害拡大の主因。閾値とエスカレーションフローを見直す。",
        statements: [{ name: "鈴木 大輔", text: "閾値が現状の負荷に合っていない" }],
      },
    ],
    todos: [{ text: "アラート閾値の再設定", owner: "鈴木", due: "4/30", done: true }],
    transcript: [],
    tags: ["エンジニアリング"],
  },
  {
    id: "m7",
    title: "マーケティング戦略MTG",
    date: "2026-04-22T13:00:00",
    endDate: "2026-04-22T13:52:00",
    duration: "52:15",
    mode: "online",
    source: "Google Meet",
    attendees: [
      { name: "高橋 ゆり", initials: "高", color: "#5b6cf9" },
      { name: "井上 真由", initials: "井", color: "#16a394" },
    ],
    snippet: "Q2のキャンペーン企画レビュー。ターゲットセグメントとチャネル配分を確定。",
    topics: [
      {
        title: "ターゲットセグメント",
        ronten: "ミッドマーケットへのフォーカス強化方針で合意。",
        statements: [{ name: "高橋 ゆり", text: "中堅企業のCV率が伸びている" }],
      },
    ],
    todos: [],
    transcript: [],
    tags: ["マーケティング"],
  },
  {
    id: "m8",
    title: "採用キックオフ",
    date: "2026-04-21T10:30:00",
    endDate: "2026-04-21T11:08:00",
    duration: "38:42",
    mode: "in-person",
    source: "iPhone マイク",
    attendees: [
      { name: "山田 直樹", initials: "山", color: "#5b6cf9" },
      { name: "斎藤 浩", initials: "斎", color: "#16a394" },
    ],
    snippet: "Q2採用計画。エンジニア4名、デザイナー1名、PM1名のオープンポジション確定。",
    topics: [
      {
        title: "Q2採用ポジション",
        ronten: "エンジニア4名、デザイナー1名、PM1名で確定。リファラル経由を最優先で進める。",
        statements: [],
        decision: "リファラル経由を最優先のチャネルに設定",
      },
    ],
    todos: [],
    transcript: [],
    tags: ["採用"],
  },
];

export const MEETING_COUNTS = {
  starred: 3,
  archive: 12,
} as const;
