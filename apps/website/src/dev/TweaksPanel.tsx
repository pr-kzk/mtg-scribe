import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTheme } from "@/theme/ThemeProvider.tsx";
import { ACCENT_LABELS, ACCENTS } from "@/theme/accents.ts";
import type { AccentName, Theme } from "@/types/ui.ts";

const TWEAKS_STYLE = `
.twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
  max-height:calc(100vh - 32px);display:flex;flex-direction:column;
  background:var(--bg-elev);color:var(--fg);
  border:1px solid var(--border);border-radius:14px;
  box-shadow:var(--shadow-xl);
  font:11.5px/1.4 var(--font-sans);overflow:hidden}
.twk-hd{display:flex;align-items:center;justify-content:space-between;
  padding:10px 8px 10px 14px;user-select:none;border-bottom:1px solid var(--border)}
.twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
.twk-x{appearance:none;border:0;background:transparent;color:var(--fg-subtle);
  width:22px;height:22px;border-radius:6px;font-size:13px;line-height:1;cursor:pointer}
.twk-x:hover{background:var(--bg-hover);color:var(--fg)}
.twk-body{padding:10px 14px;display:flex;flex-direction:column;gap:12px;
  overflow-y:auto;min-height:0}
.twk-toggle-btn{position:fixed;right:16px;bottom:16px;z-index:2147483645;
  width:36px;height:36px;border-radius:999px;border:1px solid var(--border);
  background:var(--bg-elev);color:var(--fg);cursor:pointer;
  box-shadow:var(--shadow-md);display:grid;place-items:center;font-size:14px}
.twk-toggle-btn:hover{background:var(--bg-hover)}
.twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
  color:var(--fg-subtle);padding-top:4px}
.twk-row{display:flex;flex-direction:column;gap:6px}
.twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
.twk-lbl{font-size:11.5px;color:var(--fg-muted);font-weight:500}
.twk-seg{display:flex;padding:2px;border-radius:8px;background:var(--bg-subtle);gap:2px}
.twk-seg button{appearance:none;flex:1;border:0;background:transparent;color:inherit;
  font:inherit;font-weight:500;min-height:22px;border-radius:6px;cursor:pointer;
  padding:4px 6px}
.twk-seg button[data-active="1"]{background:var(--bg-elev);box-shadow:var(--shadow-sm)}
.twk-accents{display:flex;gap:6px;flex-wrap:wrap}
.twk-accent{width:20px;height:20px;border-radius:999px;border:0;cursor:pointer;padding:0}
.twk-accent[data-active="1"]{outline:2px solid var(--accent);outline-offset:2px}
.twk-btn{appearance:none;height:28px;padding:0 12px;border:1px solid var(--border);
  border-radius:7px;background:var(--bg);color:var(--fg);font:inherit;font-weight:500;
  cursor:pointer}
.twk-btn:hover{background:var(--bg-hover)}
`;

interface TweaksPanelProps {
  onShowNewModal: () => void;
  onShowRecording: () => void;
  onShowSettings: () => void;
}

export function TweaksPanel({
  onShowNewModal,
  onShowRecording,
  onShowSettings,
}: TweaksPanelProps): ReactNode {
  const [open, setOpen] = useState(false);
  const { theme, accent, setTheme, setAccent } = useTheme();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    if (styleRef.current) return;
    const el = document.createElement("style");
    el.textContent = TWEAKS_STYLE;
    document.head.appendChild(el);
    styleRef.current = el;
    return () => {
      el.remove();
      styleRef.current = null;
    };
  }, []);

  if (!open) {
    return (
      <button
        type="button"
        className="twk-toggle-btn"
        aria-label="Tweaks パネルを開く (DEV)"
        onClick={() => setOpen(true)}
      >
        ⚙
      </button>
    );
  }

  return (
    <div className="twk-panel" role="region" aria-label="開発用 Tweaks">
      <div className="twk-hd">
        <b>Tweaks (DEV)</b>
        <button type="button" className="twk-x" aria-label="閉じる" onClick={() => setOpen(false)}>
          ✕
        </button>
      </div>
      <div className="twk-body">
        <div className="twk-sect">テーマ</div>
        <div className="twk-row">
          <div className="twk-lbl">モード</div>
          <div className="twk-seg" role="radiogroup" aria-label="テーマモード">
            {(["light", "dark"] as Theme[]).map((t) => (
              <button
                key={t}
                type="button"
                role="radio"
                aria-checked={theme === t}
                data-active={theme === t ? "1" : "0"}
                onClick={() => setTheme(t)}
              >
                {t === "light" ? "ライト" : "ダーク"}
              </button>
            ))}
          </div>
        </div>
        <div className="twk-row">
          <div className="twk-lbl">アクセント</div>
          <div className="twk-accents" role="radiogroup" aria-label="アクセントカラー">
            {(Object.keys(ACCENTS) as AccentName[]).map((name) => (
              <button
                key={name}
                type="button"
                role="radio"
                aria-checked={accent === name}
                aria-label={ACCENT_LABELS[name]}
                data-active={accent === name ? "1" : "0"}
                className="twk-accent"
                style={{ background: ACCENTS[name].color }}
                onClick={() => setAccent(name)}
              />
            ))}
          </div>
        </div>
        <div className="twk-sect">プレビュー</div>
        <button type="button" className="twk-btn" onClick={onShowNewModal}>
          新規会議モーダルを表示
        </button>
        <button type="button" className="twk-btn" onClick={onShowRecording}>
          録音中画面を表示
        </button>
        <button type="button" className="twk-btn" onClick={onShowSettings}>
          設定画面を表示
        </button>
      </div>
    </div>
  );
}
