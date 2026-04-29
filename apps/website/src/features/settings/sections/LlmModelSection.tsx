import type { CSSProperties, ReactNode } from "react";
import { Icon } from "@/components/Icon.tsx";
import { MOCK_LLM_MODELS } from "@/data/models.ts";

interface LlmModelSectionProps {
  selectedId: string;
  onChange: (id: string) => void;
}

const FOOTER_STYLE: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  marginTop: "var(--s-3)",
  fontSize: 12,
  color: "var(--fg-subtle)",
};

export function LlmModelSection({ selectedId, onChange }: LlmModelSectionProps): ReactNode {
  return (
    <section className="settings-section" aria-labelledby="settings-llm-title">
      <h2 className="settings-section-title" id="settings-llm-title">
        要約・分析モデル (LLM)
      </h2>
      <div className="model-select" role="radiogroup" aria-labelledby="settings-llm-title">
        {MOCK_LLM_MODELS.map((m) => (
          <button
            type="button"
            key={m.id}
            role="radio"
            aria-checked={selectedId === m.id}
            className={`model-row ${selectedId === m.id ? "selected" : ""}`}
            onClick={() => onChange(m.id)}
          >
            <Icon name="cpu" size={16} style={{ color: "var(--fg-muted)" }} />
            <div className="model-row-info">
              <div className="model-row-name">{m.name}</div>
              <div className="model-row-desc">{m.desc}</div>
            </div>
            <div className="model-row-size">{m.size}</div>
          </button>
        ))}
      </div>
      <div style={FOOTER_STYLE}>
        <Icon name="cpu" size={12} style={{ color: "var(--success)" }} />
        すべてのモデルは <strong style={{ color: "var(--fg-muted)" }}>
          ~/.mtg-scribe/models/
        </strong>{" "}
        にローカル保存されます
      </div>
    </section>
  );
}
