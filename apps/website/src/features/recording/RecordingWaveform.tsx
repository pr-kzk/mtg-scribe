import type { ReactNode } from "react";

interface RecordingWaveformProps {
  values: number[];
  paused: boolean;
}

export function RecordingWaveform({ values, paused }: RecordingWaveformProps): ReactNode {
  return (
    <div className="rec-waveform-wrap">
      <div className="waveform" aria-hidden="true">
        {values.map((h, i) => (
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
  );
}
