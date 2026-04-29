import type { ChangeEvent, ReactNode } from "react";
import { MeetingPreview } from "./MeetingPreview.tsx";
import type { Meeting } from "@/types/meeting.ts";

interface MeetingSplitProps {
  meeting: Meeting;
  value: string;
  onChange: (value: string) => void;
}

export function MeetingSplit({ meeting, value, onChange }: MeetingSplitProps): ReactNode {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => onChange(e.target.value);
  return (
    <div className="md-split">
      <div className="md-split-pane">
        <textarea
          className="md-editor"
          value={value}
          onChange={handleChange}
          spellCheck={false}
          aria-label="議事録を編集"
        />
      </div>
      <div className="md-split-pane md-split-preview">
        <MeetingPreview
          meeting={meeting}
          markdown={value}
          contentStyle={{ paddingTop: "var(--s-6)" }}
        />
      </div>
    </div>
  );
}
