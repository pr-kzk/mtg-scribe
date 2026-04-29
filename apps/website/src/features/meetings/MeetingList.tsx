import { Fragment, type ReactNode } from "react";
import { Icon } from "@/components/Icon.tsx";
import { fmtDate, groupMeetings } from "@/lib/format.ts";
import type { Meeting } from "@/types/meeting.ts";
import type { ListView } from "@/types/ui.ts";

interface MeetingListProps {
  meetings: Meeting[];
  selectedId: string;
  onSelect: (id: string) => void;
  query: string;
  setQuery: (q: string) => void;
  view: ListView;
  isMobile: boolean;
  onMenu: () => void;
  onToggleSidebar: () => void;
  sidebarHidden: boolean;
}

const VIEW_TITLES: Record<ListView, string> = {
  all: "すべての会議",
  today: "今日",
  starred: "スター付き",
  archive: "アーカイブ",
};

const formatTimeOnly = (iso: string): string => {
  const formatted = fmtDate(iso);
  const parts = formatted.split(" ");
  return parts[1] ?? formatted;
};

export function MeetingList({
  meetings,
  selectedId,
  onSelect,
  query,
  setQuery,
  view,
  isMobile,
  onMenu,
  onToggleSidebar,
  sidebarHidden,
}: MeetingListProps): ReactNode {
  const filtered = meetings.filter(
    (m) => !query || m.title.toLowerCase().includes(query.toLowerCase()),
  );
  const grouped = groupMeetings(filtered);

  return (
    <div className="list">
      <div className="list-header">
        <div className="list-title-row">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {isMobile ? (
              <button
                type="button"
                className="icon-btn"
                onClick={onMenu}
                aria-label="メニューを開く"
              >
                <Icon name="panel-left" size={16} />
              </button>
            ) : (
              <button
                type="button"
                className="icon-btn"
                onClick={onToggleSidebar}
                aria-label={sidebarHidden ? "サイドバーを表示" : "サイドバーを隠す"}
                aria-pressed={!sidebarHidden}
              >
                <Icon name="panel-left" size={16} />
              </button>
            )}
            <h1 className="list-title">{VIEW_TITLES[view]}</h1>
          </div>
          <div className="list-count" aria-live="polite">
            {filtered.length} 件
          </div>
        </div>
        <div className="search">
          <Icon name="search" size={14} className="search-icon" />
          <input
            className="search-input"
            placeholder="議事録を検索..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="議事録を検索"
            type="search"
          />
        </div>
      </div>
      <div className="list-scroll">
        {grouped.length === 0 ? (
          <div
            style={{
              padding: "var(--s-10) var(--s-5)",
              textAlign: "center",
              color: "var(--fg-subtle)",
              fontSize: 13,
            }}
          >
            該当する議事録がありません
          </div>
        ) : (
          grouped.map(([label, list]) => (
            <Fragment key={label}>
              <div className="list-group-label">{label}</div>
              {list.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`list-item ${selectedId === m.id ? "active" : ""}`}
                  onClick={() => onSelect(m.id)}
                  aria-current={selectedId === m.id ? "true" : undefined}
                >
                  <div className="list-item-row">
                    <span className="list-item-title">{m.title}</span>
                    <span className="list-item-time">{formatTimeOnly(m.date)}</span>
                  </div>
                  <div className="list-item-snippet">{m.snippet ?? ""}</div>
                  <div className="list-item-meta">
                    <span className={`tag ${m.mode}`}>
                      <Icon name={m.mode === "online" ? "monitor" : "users"} size={10} />
                      {m.mode === "online" ? "オンライン" : "面着"}
                    </span>
                    <span className="list-item-meta-dot" aria-hidden="true" />
                    <span>{m.duration}</span>
                    <span className="list-item-meta-dot" aria-hidden="true" />
                    <span>{m.attendees.length}名</span>
                  </div>
                </button>
              ))}
            </Fragment>
          ))
        )}
      </div>
    </div>
  );
}
