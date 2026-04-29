import type { ReactNode } from "react";
import type { FallbackProps } from "./ErrorBoundary.tsx";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps): ReactNode {
  return (
    <div role="alert" className="error-fallback">
      <div className="error-fallback-inner">
        <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em" }}>
          予期しないエラーが発生しました
        </div>
        <p style={{ color: "var(--fg-muted)", lineHeight: 1.6 }}>
          画面の読み込み中に問題が発生しました。再試行しても解決しない場合は、ページを再読み込みしてください。
        </p>
        <pre>{error.message}</pre>
        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" className="btn" onClick={resetErrorBoundary}>
            再試行
          </button>
          <button type="button" className="btn primary" onClick={() => window.location.reload()}>
            再読み込み
          </button>
        </div>
      </div>
    </div>
  );
}
