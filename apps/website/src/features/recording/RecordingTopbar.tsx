import type { ChangeEvent, ReactNode } from "react";
import { Icon } from "@/components/Icon.tsx";
import { fmtRecordingTime } from "@/lib/format.ts";
import type { MeetingMode } from "@/types/meeting.ts";

interface RecordingTopbarProps {
  title: string;
  onTitleChange: (title: string) => void;
  seconds: number;
  mode: MeetingMode;
  paused: boolean;
}

export function RecordingTopbar({
  title,
  onTitleChange,
  seconds,
  mode,
  paused,
}: RecordingTopbarProps): ReactNode {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => onTitleChange(e.target.value);

  return (
    <div className="rec-topbar">
      <div className="rec-topbar-left">
        <span className={`rec-pill ${paused ? "paused" : ""}`} aria-live="polite">
          <span className="rec-dot" aria-hidden="true" />
          {paused ? "一時停止中" : "録音中"}
        </span>
        <input
          className="rec-meeting-title"
          value={title}
          onChange={handleChange}
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
  );
}
