import { useState, type ReactNode } from "react";
import { Icon } from "../../components/Icon.tsx";
import {
  DEFAULT_LLM_MODEL_ID,
  DEFAULT_WHISPER_MODEL_ID,
  MOCK_LLM_MODELS,
  MOCK_WHISPER_MODELS,
} from "../../data/models.ts";
import { useTheme } from "../../theme/ThemeProvider.tsx";
import { ACCENT_LABELS, ACCENTS } from "../../theme/accents.ts";
import type { AccentName, Theme } from "../../types/ui.ts";

interface SettingsPageProps {
  onMenu: () => void;
  isMobile: boolean;
}

const LANG_OPTIONS = [
  { value: "ja", label: "日本語" },
  { value: "en", label: "English" },
  { value: "auto", label: "自動検出" },
] as const;

const THEME_OPTIONS: { value: Theme; label: string }[] = [
  { value: "light", label: "ライト" },
  { value: "dark", label: "ダーク" },
];

export function SettingsPage({ onMenu, isMobile }: SettingsPageProps): ReactNode {
  const { theme, accent, setTheme, setAccent } = useTheme();
  const [llmModel, setLlmModel] = useState<string>(DEFAULT_LLM_MODEL_ID);
  const [whisperModel, setWhisperModel] = useState<string>(DEFAULT_WHISPER_MODEL_ID);
  const [autoSummary, setAutoSummary] = useState(true);
  const [autoActions, setAutoActions] = useState(true);
  const [language, setLanguage] = useState<string>("ja");

  return (
    <div className="detail">
      <div className="detail-toolbar">
        <div className="detail-toolbar-left">
          {isMobile && (
            <button type="button" className="icon-btn" onClick={onMenu} aria-label="メニューを開く">
              <Icon name="panel-left" size={16} />
            </button>
          )}
          <span style={{ fontSize: 14, fontWeight: 500 }}>設定</span>
        </div>
      </div>
      <div className="detail-scroll">
        <div className="settings">
          <h1 className="settings-title">設定</h1>
          <div className="settings-subtitle">
            音声認識・要約モデル、言語、自動化、プライバシーなどを構成します。
          </div>

          <section className="settings-section" aria-labelledby="settings-appearance-title">
            <h2 className="settings-section-title" id="settings-appearance-title">
              外観
            </h2>
            <div className="settings-row">
              <div className="settings-row-label">
                <div className="settings-row-name">テーマ</div>
                <div className="settings-row-desc">ライトとダークを切り替え</div>
              </div>
              <div className="segment" role="radiogroup" aria-label="テーマ">
                {THEME_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    role="radio"
                    aria-checked={theme === opt.value}
                    className={`segment-btn ${theme === opt.value ? "active" : ""}`}
                    onClick={() => setTheme(opt.value)}
                  >
                    <Icon name={opt.value === "light" ? "sun" : "moon"} size={13} />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="settings-row">
              <div className="settings-row-label">
                <div className="settings-row-name">アクセントカラー</div>
                <div className="settings-row-desc">UIに使われる強調色</div>
              </div>
              <div
                role="radiogroup"
                aria-label="アクセントカラー"
                style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
              >
                {(Object.keys(ACCENTS) as AccentName[]).map((name) => (
                  <button
                    key={name}
                    type="button"
                    role="radio"
                    aria-checked={accent === name}
                    aria-label={ACCENT_LABELS[name]}
                    onClick={() => setAccent(name)}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "var(--r-full)",
                      background: ACCENTS[name].color,
                      boxShadow:
                        accent === name
                          ? `0 0 0 3px var(--bg), 0 0 0 5px ${ACCENTS[name].color}`
                          : "var(--shadow-sm)",
                      border: "none",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            </div>
          </section>

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
                  aria-checked={whisperModel === m.id}
                  className={`model-row ${whisperModel === m.id ? "selected" : ""}`}
                  onClick={() => setWhisperModel(m.id)}
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
                  aria-checked={llmModel === m.id}
                  className={`model-row ${llmModel === m.id ? "selected" : ""}`}
                  onClick={() => setLlmModel(m.id)}
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginTop: "var(--s-3)",
                fontSize: 12,
                color: "var(--fg-subtle)",
              }}
            >
              <Icon name="cpu" size={12} style={{ color: "var(--success)" }} />
              すべてのモデルは{" "}
              <strong style={{ color: "var(--fg-muted)" }}>~/.mtg-scribe/models/</strong>{" "}
              にローカル保存されます
            </div>
          </section>

          <section className="settings-section" aria-labelledby="settings-lang-title">
            <h2 className="settings-section-title" id="settings-lang-title">
              言語
            </h2>
            <div className="settings-row">
              <div className="settings-row-label">
                <label className="settings-row-name" htmlFor="settings-language">
                  認識言語
                </label>
                <div className="settings-row-desc">音声認識・要約の対象言語</div>
              </div>
              <select
                id="settings-language"
                className="field-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{ width: 200 }}
              >
                {LANG_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section className="settings-section" aria-labelledby="settings-auto-title">
            <h2 className="settings-section-title" id="settings-auto-title">
              自動化
            </h2>
            <div className="settings-row">
              <div className="settings-row-label">
                <div className="settings-row-name">録音中のリアルタイム要約</div>
                <div className="settings-row-desc">30秒ごとに要約を自動更新</div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={autoSummary}
                aria-label="リアルタイム要約"
                className={`switch ${autoSummary ? "on" : ""}`}
                onClick={() => setAutoSummary((s) => !s)}
              />
            </div>
            <div className="settings-row">
              <div className="settings-row-label">
                <div className="settings-row-name">アクションアイテム自動抽出</div>
                <div className="settings-row-desc">会話から「やること」を自動検出</div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={autoActions}
                aria-label="アクションアイテム自動抽出"
                className={`switch ${autoActions ? "on" : ""}`}
                onClick={() => setAutoActions((s) => !s)}
              />
            </div>
          </section>

          <section className="settings-section" aria-labelledby="settings-privacy-title">
            <h2 className="settings-section-title" id="settings-privacy-title">
              プライバシー
            </h2>
            <div className="settings-row">
              <div className="settings-row-label">
                <div className="settings-row-name">クラウド送信</div>
                <div className="settings-row-desc">無効。すべての処理はこの端末上で完結します</div>
              </div>
              <span className="local-llm-badge">
                <span className="local-llm-badge-dot" aria-hidden="true" />
                オフライン
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
