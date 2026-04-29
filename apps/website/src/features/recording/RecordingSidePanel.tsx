import type { CSSProperties, ReactNode } from "react";
import { Icon } from "@/components/Icon.tsx";
import { SPEAKER_STATS } from "@/data/recording.ts";
import type { SideTab } from "@/types/recording.ts";

interface RecordingSidePanelProps {
  tab: SideTab;
  onTabChange: (tab: SideTab) => void;
}

const TABS: { id: SideTab; label: string }[] = [
  { id: "summary", label: "ライブ要約" },
  { id: "speakers", label: "話者" },
  { id: "actions", label: "アクション" },
];

const SECTION_LABEL_STYLE: CSSProperties = {
  fontSize: 11,
  color: "var(--fg-subtle)",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  marginBottom: "var(--s-3)",
  fontWeight: 500,
};

const ACTIONS_FOOTER_STYLE: CSSProperties = {
  fontSize: 11,
  color: "var(--fg-subtle)",
  marginTop: "var(--s-3)",
  display: "flex",
  alignItems: "center",
  gap: 4,
};

export function RecordingSidePanel({ tab, onTabChange }: RecordingSidePanelProps): ReactNode {
  return (
    <div className="rec-side">
      <div className="rec-side-tabs" role="tablist" aria-label="サイドパネル">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={`rec-side-tab ${tab === t.id ? "active" : ""}`}
            onClick={() => onTabChange(t.id)}
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
            <div style={SECTION_LABEL_STYLE}>発言時間</div>
            {SPEAKER_STATS.map((s) => (
              <div key={s.id} className="speaker-row">
                <span className="speaker-dot" style={{ background: s.color }} aria-hidden="true" />
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
            <div style={ACTIONS_FOOTER_STYLE}>
              <Icon name="sparkles" size={11} />
              会話から自動抽出
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
