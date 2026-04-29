import type { CSSProperties, ReactNode } from "react";
import { Icon } from "@/components/Icon.tsx";
import { MarkdownPreview } from "@/components/MarkdownPreview.tsx";
import { fmtFullDate, fmtRange } from "@/lib/format.ts";
import type { Meeting } from "@/types/meeting.ts";

interface MeetingPreviewProps {
  meeting: Meeting;
  markdown: string;
  contentStyle?: CSSProperties;
}

export function MeetingPreview({
  meeting,
  markdown,
  contentStyle,
}: MeetingPreviewProps): ReactNode {
  const dateRange = meeting.endDate
    ? fmtRange(meeting.date, meeting.endDate)
    : fmtFullDate(meeting.date);

  return (
    <div className="detail-content minutes" style={contentStyle}>
      <div className="minutes-header">
        <h1 className="detail-title">{meeting.title}</h1>
        <div className="detail-meta-row">
          {meeting.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
          {meeting.tags.length > 0 && <span className="list-item-meta-dot" aria-hidden="true" />}
          <span className="u-text-meta">所要 {meeting.duration}</span>
          <span className="u-text-meta">{dateRange}</span>
          <span className="local-llm-badge" style={{ marginLeft: "auto" }}>
            <Icon name="sparkles" size={11} />
            Llama 3.1 でまとめ
          </span>
        </div>
      </div>
      <MarkdownPreview md={markdown} />
    </div>
  );
}
