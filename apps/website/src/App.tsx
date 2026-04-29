import { useState, type ReactNode } from "react";
import { Icon } from "./components/Icon.tsx";
import { MEETING_COUNTS, MOCK_MEETINGS } from "./data/meetings.ts";
import { fmtDate } from "./lib/format.ts";
import { useViewport } from "./hooks/useViewport.ts";
import { NavRail } from "./features/meetings/NavRail.tsx";
import { MeetingList } from "./features/meetings/MeetingList.tsx";
import { MeetingDetail } from "./features/meetings/MeetingDetail.tsx";
import { NewMeetingModal, type NewMeetingPayload } from "./features/meetings/NewMeetingModal.tsx";
import { RecordingOverlay } from "./features/recording/RecordingOverlay.tsx";
import { SettingsPage } from "./features/settings/SettingsPage.tsx";
import { TweaksPanel } from "./dev/TweaksPanel.tsx";
import type { ListView, View } from "./types/ui.ts";

export function App(): ReactNode {
  const [view, setView] = useState<View>("all");
  const [selectedId, setSelectedId] = useState<string>(MOCK_MEETINGS[0]?.id ?? "");
  const [showDetail, setShowDetail] = useState(false);
  const [query, setQuery] = useState("");
  const [showNewModal, setShowNewModal] = useState(false);
  const [recording, setRecording] = useState<NewMeetingPayload | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const { isMobile, isTablet } = useViewport();

  const counts = {
    all: MOCK_MEETINGS.length,
    today: MOCK_MEETINGS.filter((m) => fmtDate(m.date).startsWith("今日")).length,
    starred: MEETING_COUNTS.starred,
    archive: MEETING_COUNTS.archive,
  };

  const selected = MOCK_MEETINGS.find((m) => m.id === selectedId);
  const isSettings = view === "settings";
  const listView: ListView = isSettings ? "all" : (view as ListView);

  const startRecording = (payload: NewMeetingPayload): void => {
    setShowNewModal(false);
    setRecording(payload);
  };

  const onSelect = (id: string): void => {
    setSelectedId(id);
    setShowDetail(true);
  };

  const handleViewChange = (v: View): void => {
    setView(v);
    setShowDetail(v === "settings");
  };

  const appClass = [
    "app",
    isSettings && "settings-view",
    showDetail && isMobile && "show-detail",
    !isTablet && navHidden && "nav-hidden",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div className={appClass}>
        {isTablet && navOpen && (
          <div className="nav-overlay" onClick={() => setNavOpen(false)} role="presentation" />
        )}
        {(!isTablet || navOpen) && (
          <div className={isTablet ? `nav-wrapper ${navOpen ? "open" : ""}` : undefined}>
            <NavRail
              view={view}
              setView={handleViewChange}
              onNew={() => setShowNewModal(true)}
              counts={counts}
              isMobile={isTablet}
              onClose={() => setNavOpen(false)}
            />
          </div>
        )}
        {isSettings ? (
          <SettingsPage onMenu={() => setNavOpen(true)} isMobile={isTablet} />
        ) : (
          <>
            <MeetingList
              meetings={MOCK_MEETINGS}
              selectedId={selectedId}
              onSelect={onSelect}
              query={query}
              setQuery={setQuery}
              view={listView}
              isMobile={isTablet}
              onMenu={() => setNavOpen(true)}
              onToggleSidebar={() => setNavHidden((h) => !h)}
              sidebarHidden={navHidden}
            />
            {selected ? (
              <MeetingDetail
                meeting={selected}
                isMobile={isMobile}
                onBackToList={() => setShowDetail(false)}
              />
            ) : (
              <div className="detail">
                <div className="empty-state">
                  <div className="empty-state-inner">
                    <div className="empty-icon" aria-hidden="true">
                      <Icon name="file-text" size={24} />
                    </div>
                    <div>議事録を選択してください</div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {showNewModal && (
        <NewMeetingModal onClose={() => setShowNewModal(false)} onStart={startRecording} />
      )}
      {recording && (
        <RecordingOverlay
          initialTitle={recording.title}
          mode={recording.mode}
          onStop={() => setRecording(null)}
        />
      )}

      {import.meta.env.DEV && (
        <TweaksPanel
          onShowNewModal={() => setShowNewModal(true)}
          onShowRecording={() => setRecording({ mode: "online", title: "プレビュー会議" })}
          onShowSettings={() => {
            setView("settings");
            setShowDetail(true);
          }}
        />
      )}
    </>
  );
}
