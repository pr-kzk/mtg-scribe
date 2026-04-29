import { useCallback, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/Icon.tsx";
import { INITIAL_LINES, INTERIM_PHRASES } from "@/data/recording.ts";
import { useInterval } from "@/hooks/useInterval.ts";
import type { MeetingMode } from "@/types/meeting.ts";
import type { RecLine, SideTab } from "@/types/recording.ts";
import { RecordingSidePanel } from "./RecordingSidePanel.tsx";
import { RecordingTopbar } from "./RecordingTopbar.tsx";
import { RecordingTranscript } from "./RecordingTranscript.tsx";
import { RecordingWaveform } from "./RecordingWaveform.tsx";

interface RecordingOverlayProps {
  initialTitle: string;
  mode: MeetingMode;
  onStop: () => void;
}

const initialWaveform = (): number[] => Array.from({ length: 60 }, () => Math.random() * 0.3);

export function RecordingOverlay({ initialTitle, mode, onStop }: RecordingOverlayProps): ReactNode {
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [tab, setTab] = useState<SideTab>("summary");
  const [waveform, setWaveform] = useState<number[]>(initialWaveform);
  const [lines] = useState<RecLine[]>(INITIAL_LINES);
  const [interim, setInterim] = useState<string>(INTERIM_PHRASES[0]);
  const interimIndex = useRef(0);

  useInterval(() => setSeconds((s) => s + 1), paused ? null : 1000);

  useInterval(
    () =>
      setWaveform((w) => {
        const next = w.slice(1);
        const intensity = 0.3 + Math.random() * 0.7;
        next.push(intensity);
        return next;
      }),
    paused ? null : 80,
  );

  useInterval(
    () => {
      interimIndex.current = (interimIndex.current + 1) % INTERIM_PHRASES.length;
      const phrase = INTERIM_PHRASES[interimIndex.current];
      if (phrase) setInterim(phrase);
    },
    paused ? null : 1400,
  );

  const confirmStop = useCallback((): void => {
    if (window.confirm("録音を終了しますか?")) onStop();
  }, [onStop]);

  return (
    <div className="rec-overlay" role="dialog" aria-modal="true" aria-label="録音中">
      <RecordingTopbar
        title={title}
        onTitleChange={setTitle}
        seconds={seconds}
        mode={mode}
        paused={paused}
      />
      <div className="rec-body">
        <div className="rec-main">
          <RecordingWaveform values={waveform} paused={paused} />
          <RecordingTranscript lines={lines} interim={interim} seconds={seconds} paused={paused} />
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
        <RecordingSidePanel tab={tab} onTabChange={setTab} />
      </div>
    </div>
  );
}
