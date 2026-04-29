import { type ReactNode, type RefObject } from "react";
import { Icon } from "@/components/Icon.tsx";
import type { Meeting } from "@/types/meeting.ts";
import type { DetailMode } from "@/types/ui.ts";

interface MeetingDetailToolbarProps {
  meeting: Meeting;
  mode: DetailMode;
  onModeChange: (mode: DetailMode) => void;
  savedAt: Date | null;
  onMore: () => void;
  onBack: () => void;
  isMobile: boolean;
  menuOpen: boolean;
  moreBtnRef: RefObject<HTMLButtonElement | null>;
}

const MODES: { id: DetailMode; label: string; icon: "file-text" | "edit" | "panel-left" }[] = [
  { id: "preview", label: "プレビュー", icon: "file-text" },
  { id: "edit", label: "編集", icon: "edit" },
  { id: "split", label: "分割", icon: "panel-left" },
];

export function MeetingDetailToolbar({
  meeting,
  mode,
  onModeChange,
  savedAt,
  onMore,
  onBack,
  isMobile,
  menuOpen,
  moreBtnRef,
}: MeetingDetailToolbarProps): ReactNode {
  return (
    <div className="detail-toolbar">
      <div className="detail-toolbar-left">
        {isMobile && (
          <button type="button" className="icon-btn" aria-label="一覧へ戻る" onClick={onBack}>
            <Icon name="arrow-left" size={16} />
          </button>
        )}
        <span className="tag">
          <Icon name={meeting.mode === "online" ? "monitor" : "users"} size={11} />
          {meeting.mode === "online" ? "オンライン" : "面着"}
        </span>
        <span className="toolbar-source" title={meeting.source}>
          {meeting.source}
        </span>
      </div>
      <div className="detail-toolbar-right">
        <div className="segment view-segment" role="tablist" aria-label="表示モード">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={mode === m.id}
              className={`segment-btn ${mode === m.id ? "active" : ""}`}
              onClick={() => onModeChange(m.id)}
            >
              <Icon name={m.icon} size={13} />
              <span className="hide-sm">{m.label}</span>
            </button>
          ))}
        </div>
        {(mode === "edit" || mode === "split") && savedAt && (
          <span className="u-text-meta-sm hide-sm" aria-live="polite">
            <Icon name="check" size={11} style={{ marginRight: 4, verticalAlign: -1 }} />
            保存済み
          </span>
        )}
        <button
          ref={moreBtnRef}
          type="button"
          className="icon-btn"
          onClick={onMore}
          aria-label="その他のメニュー"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
        >
          <Icon name="more-horizontal" size={16} />
        </button>
      </div>
    </div>
  );
}
