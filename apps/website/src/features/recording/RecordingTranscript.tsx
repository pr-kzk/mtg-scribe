import type { CSSProperties, ReactNode } from "react";
import { fmtRecordingTime } from "@/lib/format.ts";
import type { RecLine } from "@/types/recording.ts";

interface RecordingTranscriptProps {
  lines: RecLine[];
  interim: string;
  seconds: number;
  paused: boolean;
}

const TIME_STYLE: CSSProperties = {
  color: "var(--fg-subtle)",
  fontWeight: 400,
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  marginLeft: 4,
};

export function RecordingTranscript({
  lines,
  interim,
  seconds,
  paused,
}: RecordingTranscriptProps): ReactNode {
  return (
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
              <span style={TIME_STYLE}>{l.time}</span>
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
              <span style={TIME_STYLE}>{fmtRecordingTime(seconds)}</span>
            </div>
            <div className="transcript-text">
              {interim}
              <span className="interim-cursor" aria-hidden="true" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
