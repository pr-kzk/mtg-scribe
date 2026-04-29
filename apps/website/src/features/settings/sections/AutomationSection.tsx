import type { ReactNode } from "react";

interface AutomationSectionProps {
  autoSummary: boolean;
  autoActions: boolean;
  onAutoSummaryChange: (value: boolean) => void;
  onAutoActionsChange: (value: boolean) => void;
}

interface ToggleRowProps {
  name: string;
  desc: string;
  ariaLabel: string;
  checked: boolean;
  onToggle: () => void;
}

function ToggleRow({ name, desc, ariaLabel, checked, onToggle }: ToggleRowProps): ReactNode {
  return (
    <div className="settings-row">
      <div className="settings-row-label">
        <div className="settings-row-name">{name}</div>
        <div className="settings-row-desc">{desc}</div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel}
        className={`switch ${checked ? "on" : ""}`}
        onClick={onToggle}
      />
    </div>
  );
}

export function AutomationSection({
  autoSummary,
  autoActions,
  onAutoSummaryChange,
  onAutoActionsChange,
}: AutomationSectionProps): ReactNode {
  return (
    <section className="settings-section" aria-labelledby="settings-auto-title">
      <h2 className="settings-section-title" id="settings-auto-title">
        自動化
      </h2>
      <ToggleRow
        name="録音中のリアルタイム要約"
        desc="30秒ごとに要約を自動更新"
        ariaLabel="リアルタイム要約"
        checked={autoSummary}
        onToggle={() => onAutoSummaryChange(!autoSummary)}
      />
      <ToggleRow
        name="アクションアイテム自動抽出"
        desc="会話から「やること」を自動検出"
        ariaLabel="アクションアイテム自動抽出"
        checked={autoActions}
        onToggle={() => onAutoActionsChange(!autoActions)}
      />
    </section>
  );
}
