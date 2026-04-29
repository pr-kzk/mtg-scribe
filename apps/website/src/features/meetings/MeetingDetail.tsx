import { useEffect, useRef, useState, type ReactNode } from "react";
import { DropdownMenu, type DropdownEntry } from "@/components/DropdownMenu.tsx";
import { useAutoSave } from "@/hooks/useAutoSave.ts";
import { meetingToMarkdown } from "@/lib/markdown.ts";
import type { Meeting } from "@/types/meeting.ts";
import type { DetailMode } from "@/types/ui.ts";
import { MeetingDetailToolbar } from "./MeetingDetailToolbar.tsx";
import { MeetingEditor } from "./MeetingEditor.tsx";
import { MeetingPreview } from "./MeetingPreview.tsx";
import { MeetingSplit } from "./MeetingSplit.tsx";

interface MeetingDetailProps {
  meeting: Meeting;
  onBackToList: () => void;
  isMobile: boolean;
}

const noopSave = (): void => {
  /* draft は state のみ。永続化は未実装 */
};

export function MeetingDetail({ meeting, onBackToList, isMobile }: MeetingDetailProps): ReactNode {
  const [mode, setMode] = useState<DetailMode>("preview");
  const [draft, setDraft] = useState<string>(() => meetingToMarkdown(meeting));
  const [menuRect, setMenuRect] = useState<DOMRect | null>(null);
  const moreBtnRef = useRef<HTMLButtonElement>(null);

  const { savedAt, reset: resetSavedAt } = useAutoSave(draft, {
    delayMs: 600,
    enabled: mode === "edit" || mode === "split",
    onSave: noopSave,
  });

  useEffect(() => {
    setDraft(meetingToMarkdown(meeting));
    setMode("preview");
    resetSavedAt();
  }, [meeting, resetSavedAt]);

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

  return (
    <div className="detail">
      <MeetingDetailToolbar
        meeting={meeting}
        mode={mode}
        onModeChange={setMode}
        savedAt={savedAt}
        onMore={openMenu}
        onBack={onBackToList}
        isMobile={isMobile}
        menuOpen={menuRect !== null}
        moreBtnRef={moreBtnRef}
      />

      {menuRect && (
        <DropdownMenu items={menuItems} onClose={() => setMenuRect(null)} anchorRect={menuRect} />
      )}

      <div className={`detail-scroll mode-${mode}`}>
        {mode === "preview" && <MeetingPreview meeting={meeting} markdown={draft} />}
        {mode === "edit" && <MeetingEditor value={draft} onChange={setDraft} />}
        {mode === "split" && <MeetingSplit meeting={meeting} value={draft} onChange={setDraft} />}
      </div>
    </div>
  );
}
