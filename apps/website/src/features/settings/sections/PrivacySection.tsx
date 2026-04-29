import type { ReactNode } from "react";

export function PrivacySection(): ReactNode {
  return (
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
  );
}
