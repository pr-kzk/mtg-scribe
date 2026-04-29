import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "../../components/Icon.tsx";
import { MarkdownPreview } from "../../components/MarkdownPreview.tsx";
import { DropdownMenu, type DropdownEntry } from "../../components/DropdownMenu.tsx";
import { fmtFullDate, fmtRange } from "../../lib/format.ts";
import { meetingToMarkdown } from "../../lib/markdown.ts";
import type { Meeting } from "../../types/meeting.ts";
import type { DetailMode } from "../../types/ui.ts";

interface MeetingDetailProps {
  meeting: Meeting;
  onBackToList: () => void;
  isMobile: boolean;
}

export function MeetingDetail({ meeting, onBackToList, isMobile }: MeetingDetailProps): ReactNode {
  const [mode, setMode] = useState<DetailMode>("preview");
  const [draft, setDraft] = useState<string>(() => meetingToMarkdown(meeting));
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [menuRect, setMenuRect] = useState<DOMRect | null>(null);
  const moreBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setDraft(meetingToMarkdown(meeting));
    setMode("preview");
    setSavedAt(null);
  }, [meeting]);

  useEffect(() => {
    if (mode !== "edit" && mode !== "split") return;
    const t = setTimeout(() => setSavedAt(new Date()), 600);
    return () => clearTimeout(t);
  }, [draft, mode]);

  const openMenu = (): void => {
    if (moreBtnRef.current) {
      setMenuRect(moreBtnRef.current.getBoundingClientRect());
    }
  };

  const onCopy = (): void => {
    if (navigator.clipboard) void navigator.clipboard.writeText(draft);
  };

  const onDownload = (): void => {
    const blob = new Blob([draft], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${meeting.title}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const menuItems: DropdownEntry[] = [
    { label: "編集", icon: "edit", kbd: "E", onClick: () => setMode("edit") },
    { label: "分割表示 (編集 + プレビュー)", icon: "panel-left", onClick: () => setMode("split") },
    { divider: true },
    { label: "Markdown をコピー", icon: "file-text", onClick: onCopy },
    { label: "Markdown としてダウンロード", icon: "download", onClick: onDownload },
    { label: "PDF としてエクスポート", icon: "file-text" },
    { divider: true },
    { label: "再要約 (LLM 実行)", icon: "sparkles" },
    { label: "アーカイブ", icon: "archive" },
    { divider: true },
    { label: "削除", icon: "trash", danger: true },
  ];

  const dateRange = meeting.endDate
    ? fmtRange(meeting.date, meeting.endDate)
    : fmtFullDate(meeting.date);

  return (
    <div className="detail">
      <div className="detail-toolbar">
        <div className="detail-toolbar-left">
          {isMobile && (
            <button
              type="button"
              className="icon-btn"
              aria-label="一覧へ戻る"
              onClick={onBackToList}
            >
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
            <button
              type="button"
              role="tab"
              aria-selected={mode === "preview"}
              className={`segment-btn ${mode === "preview" ? "active" : ""}`}
              onClick={() => setMode("preview")}
            >
              <Icon name="file-text" size={13} />
              <span className="hide-sm">プレビュー</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "edit"}
              className={`segment-btn ${mode === "edit" ? "active" : ""}`}
              onClick={() => setMode("edit")}
            >
              <Icon name="edit" size={13} />
              <span className="hide-sm">編集</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "split"}
              className={`segment-btn ${mode === "split" ? "active" : ""}`}
              onClick={() => setMode("split")}
            >
              <Icon name="panel-left" size={13} />
              <span className="hide-sm">分割</span>
            </button>
          </div>
          {(mode === "edit" || mode === "split") && savedAt && (
            <span
              style={{ fontSize: 11, color: "var(--fg-subtle)" }}
              className="hide-sm"
              aria-live="polite"
            >
              <Icon name="check" size={11} style={{ marginRight: 4, verticalAlign: -1 }} />
              保存済み
            </span>
          )}
          <button
            ref={moreBtnRef}
            type="button"
            className="icon-btn"
            onClick={openMenu}
            aria-label="その他のメニュー"
            aria-haspopup="menu"
            aria-expanded={menuRect !== null}
          >
            <Icon name="more-horizontal" size={16} />
          </button>
        </div>
      </div>

      {menuRect && (
        <DropdownMenu items={menuItems} onClose={() => setMenuRect(null)} anchorRect={menuRect} />
      )}

      <div className={`detail-scroll mode-${mode}`}>
        {mode === "preview" && (
          <div className="detail-content minutes">
            <div className="minutes-header">
              <h1 className="detail-title">{meeting.title}</h1>
              <div className="detail-meta-row">
                {meeting.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
                {meeting.tags.length > 0 && (
                  <span className="list-item-meta-dot" aria-hidden="true" />
                )}
                <span style={{ fontSize: 12, color: "var(--fg-subtle)" }}>
                  所要 {meeting.duration}
                </span>
                <span style={{ fontSize: 12, color: "var(--fg-subtle)" }}>{dateRange}</span>
                <span className="local-llm-badge" style={{ marginLeft: "auto" }}>
                  <Icon name="sparkles" size={11} />
                  Llama 3.1 でまとめ
                </span>
              </div>
            </div>
            <MarkdownPreview md={draft} />
          </div>
        )}

        {mode === "edit" && (
          <div className="md-editor-wrap">
            <textarea
              className="md-editor"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              spellCheck={false}
              aria-label="議事録を編集"
            />
          </div>
        )}

        {mode === "split" && (
          <div className="md-split">
            <div className="md-split-pane">
              <textarea
                className="md-editor"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                spellCheck={false}
                aria-label="議事録を編集"
              />
            </div>
            <div className="md-split-pane md-split-preview">
              <div className="detail-content minutes" style={{ paddingTop: "var(--s-6)" }}>
                <MarkdownPreview md={draft} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
