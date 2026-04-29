import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/Icon.tsx";
import type { View } from "@/types/ui.ts";

interface NavRailProps {
  view: View;
  setView: (view: View) => void;
  onNew: () => void;
  counts: Record<"all" | "today" | "starred" | "archive", number>;
  isMobile: boolean;
  onClose: () => void;
}

interface NavItem {
  id: View;
  icon: IconName;
  label: string;
  count: number;
}

export function NavRail({
  view,
  setView,
  onNew,
  counts,
  isMobile,
  onClose,
}: NavRailProps): ReactNode {
  const items: NavItem[] = [
    { id: "all", icon: "home", label: "すべての会議", count: counts.all },
    { id: "today", icon: "clock", label: "今日", count: counts.today },
    { id: "starred", icon: "star", label: "スター付き", count: counts.starred },
    { id: "archive", icon: "archive", label: "アーカイブ", count: counts.archive },
  ];

  const handleSelect = (id: View): void => {
    setView(id);
    if (isMobile) onClose();
  };

  return (
    <aside className="nav" aria-label="ナビゲーション">
      <div className="nav-brand">
        <div className="nav-brand-mark" aria-hidden="true">
          M
        </div>
        <div className="nav-brand-name">MTG Scribe</div>
        {isMobile && (
          <button
            type="button"
            className="icon-btn"
            style={{ marginLeft: "auto" }}
            onClick={onClose}
            aria-label="メニューを閉じる"
          >
            <Icon name="x" size={16} />
          </button>
        )}
      </div>
      <button
        type="button"
        className="nav-cta"
        onClick={() => {
          onNew();
          if (isMobile) onClose();
        }}
      >
        <Icon name="plus" size={14} />
        新規会議を開始
      </button>
      <div className="nav-section-label">会議</div>
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          className={`nav-item ${view === it.id ? "active" : ""}`}
          onClick={() => handleSelect(it.id)}
          aria-current={view === it.id ? "page" : undefined}
        >
          <Icon name={it.icon} size={15} />
          <span>{it.label}</span>
          <span className="nav-item-count">{it.count}</span>
        </button>
      ))}
      <div className="nav-section-label">タグ</div>
      <button type="button" className="nav-item">
        <span className="speaker-dot" style={{ background: "#5b6cf9" }} aria-hidden="true" />
        <span>プロダクト</span>
      </button>
      <button type="button" className="nav-item">
        <span className="speaker-dot" style={{ background: "#16a394" }} aria-hidden="true" />
        <span>1on1</span>
      </button>
      <button type="button" className="nav-item">
        <span className="speaker-dot" style={{ background: "#e07a3c" }} aria-hidden="true" />
        <span>エンジニアリング</span>
      </button>
      <div className="nav-spacer" />
      <button
        type="button"
        className={`nav-item ${view === "settings" ? "active" : ""}`}
        onClick={() => handleSelect("settings")}
        aria-current={view === "settings" ? "page" : undefined}
      >
        <Icon name="settings" size={15} />
        <span>設定</span>
      </button>
      <div className="nav-user">
        <div className="avatar" aria-hidden="true">
          YT
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="nav-user-name">Yuto Tanaka</div>
          <div className="nav-user-email">
            <span className="local-llm-badge">
              <span className="local-llm-badge-dot" aria-hidden="true" />
              ローカル稼働中
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
