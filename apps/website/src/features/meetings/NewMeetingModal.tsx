import { useState, type ReactNode } from "react";
import { Icon } from "@/components/Icon.tsx";
import { Modal } from "@/components/Modal.tsx";
import { IN_PERSON_MICS, TABS } from "@/data/sources.ts";
import type { MeetingMode } from "@/types/meeting.ts";

export interface NewMeetingPayload {
  mode: MeetingMode;
  title: string;
}

interface NewMeetingModalProps {
  onClose: () => void;
  onStart: (payload: NewMeetingPayload) => void;
}

export function NewMeetingModal({ onClose, onStart }: NewMeetingModalProps): ReactNode {
  const [mode, setMode] = useState<MeetingMode>("online");
  const [tabSource, setTabSource] = useState<string>("meet");
  const [micSource, setMicSource] = useState<string>("default");
  const [title, setTitle] = useState<string>("");

  const handleStart = (): void => {
    onStart({ mode, title: title || "新しい会議" });
  };

  const headerActions = (
    <button type="button" className="icon-btn" onClick={onClose} aria-label="閉じる">
      <Icon name="x" size={16} />
    </button>
  );

  const footer = (
    <>
      <button type="button" className="btn ghost" onClick={onClose}>
        キャンセル
      </button>
      <button type="button" className="btn primary" onClick={handleStart}>
        <Icon name="mic" size={14} />
        録音を開始
      </button>
    </>
  );

  return (
    <Modal title="新規会議を開始" onClose={onClose} headerActions={headerActions} footer={footer}>
      <div className="field">
        <label className="field-label" htmlFor="new-meeting-title">
          会議タイトル (任意)
        </label>
        <input
          id="new-meeting-title"
          className="field-input"
          placeholder="例: Q2 ロードマップレビュー"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="field">
        <span className="field-label" id="new-meeting-mode-label">
          会議モード
        </span>
        <div className="segment" role="radiogroup" aria-labelledby="new-meeting-mode-label">
          <button
            type="button"
            role="radio"
            aria-checked={mode === "in-person"}
            className={`segment-btn ${mode === "in-person" ? "active" : ""}`}
            onClick={() => setMode("in-person")}
          >
            <Icon name="users" size={14} />
            面着
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={mode === "online"}
            className={`segment-btn ${mode === "online" ? "active" : ""}`}
            onClick={() => setMode("online")}
          >
            <Icon name="monitor" size={14} />
            オンライン
          </button>
        </div>
      </div>

      {mode === "in-person" ? (
        <div className="field">
          <span className="field-label" id="new-meeting-mic-label">
            マイク入力
          </span>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "var(--s-2)" }}
            role="radiogroup"
            aria-labelledby="new-meeting-mic-label"
          >
            {IN_PERSON_MICS.map((m) => (
              <button
                type="button"
                key={m.id}
                role="radio"
                aria-checked={micSource === m.id}
                className={`source-tile ${micSource === m.id ? "selected" : ""}`}
                onClick={() => setMicSource(m.id)}
              >
                <div className="source-tile-icon">
                  <Icon name={m.icon} size={16} />
                </div>
                <div className="source-tile-body">
                  <div className="source-tile-title">{m.title}</div>
                  <div className="source-tile-sub">{m.sub}</div>
                </div>
                <div className="source-tile-radio" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="field">
            <span className="field-label" id="new-meeting-tab-label">
              音声を取得するウィンドウ・タブ
            </span>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "var(--s-2)" }}
              role="radiogroup"
              aria-labelledby="new-meeting-tab-label"
            >
              {TABS.map((t) => (
                <button
                  type="button"
                  key={t.id}
                  role="radio"
                  aria-checked={tabSource === t.id}
                  className={`source-tile ${tabSource === t.id ? "selected" : ""}`}
                  onClick={() => setTabSource(t.id)}
                >
                  <div className="source-tile-icon">
                    <Icon name={t.icon} size={16} />
                  </div>
                  <div className="source-tile-body">
                    <div className="source-tile-title">{t.title}</div>
                    <div className="source-tile-sub">{t.sub}</div>
                  </div>
                  <div className="source-tile-radio" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="new-meeting-mic-mix">
              あなたのマイク (ミックス)
            </label>
            <select
              id="new-meeting-mic-mix"
              className="field-select"
              value={micSource}
              onChange={(e) => setMicSource(e.target.value)}
            >
              <option value="default">MacBook Pro 内蔵マイク</option>
              <option value="airpods">AirPods Pro</option>
              <option value="yeti">Blue Yeti USB Microphone</option>
              <option value="off">マイクを使用しない</option>
            </select>
          </div>
        </>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--s-2)",
          padding: "var(--s-3) var(--s-4)",
          background: "var(--bg-subtle)",
          borderRadius: "var(--r-md)",
          fontSize: 12,
          color: "var(--fg-muted)",
        }}
      >
        <Icon name="cpu" size={14} style={{ color: "var(--success)", flexShrink: 0 }} />
        <div>
          すべての文字起こしと要約は
          <strong style={{ color: "var(--fg)" }}>ローカルLLM (Llama 3.1 8B)</strong>
          で処理されます。データは外部に送信されません。
        </div>
      </div>
    </Modal>
  );
}
