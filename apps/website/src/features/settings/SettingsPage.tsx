import { useState, type ReactNode } from "react";
import { Icon } from "@/components/Icon.tsx";
import { DEFAULT_LLM_MODEL_ID, DEFAULT_WHISPER_MODEL_ID } from "@/data/models.ts";
import { useTheme } from "@/theme/ThemeProvider.tsx";
import { AppearanceSection } from "./sections/AppearanceSection.tsx";
import { AutomationSection } from "./sections/AutomationSection.tsx";
import { LanguageSection } from "./sections/LanguageSection.tsx";
import { LlmModelSection } from "./sections/LlmModelSection.tsx";
import { PrivacySection } from "./sections/PrivacySection.tsx";
import { SttModelSection } from "./sections/SttModelSection.tsx";

interface SettingsPageProps {
  onMenu: () => void;
  isMobile: boolean;
}

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

          <AppearanceSection
            theme={theme}
            accent={accent}
            onThemeChange={setTheme}
            onAccentChange={setAccent}
          />
          <SttModelSection selectedId={whisperModel} onChange={setWhisperModel} />
          <LlmModelSection selectedId={llmModel} onChange={setLlmModel} />
          <LanguageSection value={language} onChange={setLanguage} />
          <AutomationSection
            autoSummary={autoSummary}
            autoActions={autoActions}
            onAutoSummaryChange={setAutoSummary}
            onAutoActionsChange={setAutoActions}
          />
          <PrivacySection />
        </div>
      </div>
    </div>
  );
}
