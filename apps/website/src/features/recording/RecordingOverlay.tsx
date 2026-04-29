import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Icon } from "../../components/Icon.tsx";
import { fmtRecordingTime } from "../../lib/format.ts";
import type { MeetingMode, SpeakerId } from "../../types/meeting.ts";

interface RecordingOverlayProps {
  initialTitle: string;
  mode: MeetingMode;
  onStop: () => void;
}

interface RecLine {
  time: string;
  speaker: SpeakerId;
  name: string;
  text: string;
}

type SideTab = "summary" | "speakers" | "actions";

const INTERIM_PHRASES = [
  "並行作業の範囲としては、ドキュメント整備とリリースノートの",
  "並行作業の範囲としては、ドキュメント整備とリリースノートの作成、",
  "並行作業の範囲としては、ドキュメント整備とリリースノートの作成、それから内部勉強会の準備",
  "並行作業の範囲としては、ドキュメント整備とリリースノートの作成、それから内部勉強会の準備が考えられます",
] as const;

const INITIAL_LINES: RecLine[] = [
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

const SPEAKER_STATS = [
  { id: 1 as const, name: "田中", time: "08:12", color: "var(--speaker-1)" },
  { id: 2 as const, name: "佐藤", time: "06:45", color: "var(--speaker-2)" },
  { id: 3 as const, name: "鈴木", time: "04:22", color: "var(--speaker-3)" },
];

const initialWaveform = (): number[] => Array.from({ length: 60 }, () => Math.random() * 0.3);

export function RecordingOverlay({ initialTitle, mode, onStop }: RecordingOverlayProps): ReactNode {
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [tab, setTab] = useState<SideTab>("summary");
  const [waveform, setWaveform] = useState<number[]>(initialWaveform);
  const [lines] = useState<RecLine[]>(INITIAL_LINES);
  const [interim, setInterim] = useState<string>(INTERIM_PHRASES[0]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [paused]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setWaveform((w) => {
        const next = w.slice(1);
        const intensity = 0.3 + Math.random() * 0.7;
        next.push(intensity);
        return next;
      });
    }, 80);
    return () => clearInterval(id);
  }, [paused]);

  useEffect(() => {
    if (paused) return;
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % INTERIM_PHRASES.length;
      const phrase = INTERIM_PHRASES[i];
      if (phrase) setInterim(phrase);
    }, 1400);
    return () => clearInterval(id);
  }, [paused]);

  const confirmStop = useCallback((): void => {
    if (window.confirm("録音を終了しますか?")) onStop();
  }, [onStop]);

  return (
    <div className="rec-overlay" role="dialog" aria-modal="true" aria-label="録音中">
      <div className="rec-topbar">
        <div className="rec-topbar-left">
          <span className={`rec-pill ${paused ? "paused" : ""}`} aria-live="polite">
            <span className="rec-dot" aria-hidden="true" />
            {paused ? "一時停止中" : "録音中"}
          </span>
          <input
            className="rec-meeting-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="会議タイトル"
            aria-label="会議タイトル"
          />
          <span className="tag">
            <Icon name={mode === "online" ? "monitor" : "users"} size={11} />
            {mode === "online" ? "オンライン" : "面着"}
          </span>
        </div>
        <div className="rec-topbar-right">
          <span className="rec-timer" aria-label="経過時間">
            {fmtRecordingTime(seconds)}
          </span>
          <span className="local-llm-badge" style={{ marginLeft: 12 }}>
            <span className="local-llm-badge-dot" aria-hidden="true" />
            ローカル処理
          </span>
        </div>
      </div>
      <div className="rec-body">
        <div className="rec-main">
          <div className="rec-waveform-wrap">
            <div className="waveform" aria-hidden="true">
              {waveform.map((h, i) => (
                <div
                  key={i}
                  className="waveform-bar"
                  style={{
                    height: `${Math.max(2, h * 100)}%`,
                    opacity: paused ? 0.3 : 0.4 + h * 0.6,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="rec-transcript-wrap">
            <div className="rec-transcript-inner">
              {lines.map((l, i) => (
                <div key={i} className="rec-transcript-line">
                  <div className="transcript-speaker">
                    <span
                      className="speaker-dot"
                      style={{ background: `var(--speaker-${l.speaker})` }}
                      aria-hidden="true"
                    />
                    <span style={{ color: `var(--speaker-${l.speaker})` }}>{l.name}</span>
                    <span
                      style={{
                        color: "var(--fg-subtle)",
                        fontWeight: 400,
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        marginLeft: 4,
                      }}
                    >
                      {l.time}
                    </span>
                  </div>
                  <div className="transcript-text">{l.text}</div>
                </div>
              ))}
              {!paused && (
                <div className="rec-transcript-line interim">
                  <div className="transcript-speaker">
                    <span
                      className="speaker-dot"
                      style={{ background: "var(--speaker-1)" }}
                      aria-hidden="true"
                    />
                    <span style={{ color: "var(--speaker-1)" }}>田中</span>
                    <span
                      style={{
                        color: "var(--fg-subtle)",
                        fontWeight: 400,
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        marginLeft: 4,
                      }}
                    >
                      {fmtRecordingTime(seconds)}
                    </span>
                  </div>
                  <div className="transcript-text">
                    {interim}
                    <span className="interim-cursor" aria-hidden="true" />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="rec-controls">
            <button
              type="button"
              className="rec-ctrl-btn"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "録音を再開" : "録音を一時停止"}
            >
              <Icon name={paused ? "play" : "pause"} size={14} />
              {paused ? "再開" : "一時停止"}
            </button>
            <button
              type="button"
              className="rec-ctrl-btn stop"
              onClick={confirmStop}
              aria-label="録音を終了"
            >
              <Icon name="stop" size={14} />
              録音を終了
            </button>
          </div>
        </div>
        <div className="rec-side">
          <div className="rec-side-tabs" role="tablist" aria-label="サイドパネル">
            {(
              [
                { id: "summary", label: "ライブ要約" },
                { id: "speakers", label: "話者" },
                { id: "actions", label: "アクション" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                className={`rec-side-tab ${tab === t.id ? "active" : ""}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="rec-side-content" role="tabpanel">
            {tab === "summary" && (
              <>
                <div className="live-summary-meta">
                  <span className="live-summary-dot" aria-hidden="true" />
                  <span>30秒前に更新 · Llama 3.1</span>
                </div>
                <div className="live-summary">
                  新機能のリリース計画について議論。QAの遅延（自動テストカバレッジ不足）により、リリース日を1週間後ろ倒しにする必要が浮上。
                  <br />
                  <br />
                  並行作業の整理として、ドキュメント整備、リリースノート作成、内部勉強会の準備などを並行可能な作業として検討中。マーケティング側の準備への影響を最小化する方針で議論が進んでいる。
                </div>
              </>
            )}
            {tab === "speakers" && (
              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--fg-subtle)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: "var(--s-3)",
                    fontWeight: 500,
                  }}
                >
                  発言時間
                </div>
                {SPEAKER_STATS.map((s) => (
                  <div key={s.id} className="speaker-row">
                    <span
                      className="speaker-dot"
                      style={{ background: s.color }}
                      aria-hidden="true"
                    />
                    <span className="speaker-name">{s.name}</span>
                    <span className="speaker-time">{s.time}</span>
                  </div>
                ))}
              </div>
            )}
            {tab === "actions" && (
              <div className="todo-list">
                <div className="todo-item">
                  <div className="action-checkbox" />
                  <div className="todo-text" style={{ fontSize: 13 }}>
                    QAスケジュールの再調整案を作成
                    <span className="md-speaker">（鈴木）</span>
                  </div>
                </div>
                <div className="todo-item">
                  <div className="action-checkbox" />
                  <div className="todo-text" style={{ fontSize: 13 }}>
                    マーケ側の影響範囲を整理
                    <span className="md-speaker">（佐藤）</span>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--fg-subtle)",
                    marginTop: "var(--s-3)",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Icon name="sparkles" size={11} />
                  会話から自動抽出
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
