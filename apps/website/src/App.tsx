import { useState, type ReactNode } from "react";
import { AppShell } from "./AppShell.tsx";
import { MEETING_COUNTS, MOCK_MEETINGS } from "./data/meetings.ts";
import { TweaksPanel } from "./dev/TweaksPanel.tsx";
import { MeetingsView } from "./features/meetings/MeetingsView.tsx";
import { NewMeetingModal, type NewMeetingPayload } from "./features/meetings/NewMeetingModal.tsx";
import { RecordingOverlay } from "./features/recording/RecordingOverlay.tsx";
import { SettingsPage } from "./features/settings/SettingsPage.tsx";
import { useViewport } from "./hooks/useViewport.ts";
import { fmtDate } from "./lib/format.ts";
import type { ListView, View } from "./types/ui.ts";

export function App(): ReactNode {
  const [view, setView] = useState<View>("all");
  const [showDetail, setShowDetail] = useState(false);
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

  const isSettings = view === "settings";
  const listView: ListView = isSettings ? "all" : (view as ListView);

  const startRecording = (payload: NewMeetingPayload): void => {
    setShowNewModal(false);
    setRecording(payload);
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
      <AppShell
        view={view}
        setView={handleViewChange}
        onNew={() => setShowNewModal(true)}
        counts={counts}
        isTablet={isTablet}
        navOpen={navOpen}
        setNavOpen={setNavOpen}
        navHidden={navHidden}
        className={appClass}
      >
        {isSettings ? (
          <SettingsPage onMenu={() => setNavOpen(true)} isMobile={isTablet} />
        ) : (
          <MeetingsView
            view={listView}
            isMobile={isMobile}
            isTablet={isTablet}
            onMenu={() => setNavOpen(true)}
            navHidden={navHidden}
            onToggleSidebar={() => setNavHidden((h) => !h)}
            onShowDetailChange={setShowDetail}
          />
        )}
      </AppShell>

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
