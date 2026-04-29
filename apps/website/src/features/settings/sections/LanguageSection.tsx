import type { ChangeEvent, ReactNode } from "react";

interface LanguageSectionProps {
  value: string;
  onChange: (value: string) => void;
}

const LANG_OPTIONS = [
  { value: "ja", label: "日本語" },
  { value: "en", label: "English" },
  { value: "auto", label: "自動検出" },
] as const;

export function LanguageSection({ value, onChange }: LanguageSectionProps): ReactNode {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => onChange(e.target.value);
  return (
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
          value={value}
          onChange={handleChange}
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
  );
}
