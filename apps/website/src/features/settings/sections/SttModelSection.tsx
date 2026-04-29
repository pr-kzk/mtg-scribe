import type { ReactNode } from "react";
import { Icon } from "@/components/Icon.tsx";
import { MOCK_WHISPER_MODELS } from "@/data/models.ts";

interface SttModelSectionProps {
  selectedId: string;
  onChange: (id: string) => void;
}

export function SttModelSection({ selectedId, onChange }: SttModelSectionProps): ReactNode {
  return (
    <section className="settings-section" aria-labelledby="settings-stt-title">
      <h2 className="settings-section-title" id="settings-stt-title">
        文字起こしモデル (Speech-to-Text)
      </h2>
      <div className="model-select" role="radiogroup" aria-labelledby="settings-stt-title">
        {MOCK_WHISPER_MODELS.map((m) => (
          <button
            type="button"
            key={m.id}
            role="radio"
            aria-checked={selectedId === m.id}
            className={`model-row ${selectedId === m.id ? "selected" : ""}`}
            onClick={() => onChange(m.id)}
          >
            <Icon name="mic" size={16} style={{ color: "var(--fg-muted)" }} />
            <div className="model-row-info">
              <div className="model-row-name">{m.name}</div>
              <div className="model-row-desc">{m.desc}</div>
            </div>
            <div className="model-row-size">{m.size}</div>
          </button>
        ))}
      </div>
    </section>
  );
}
