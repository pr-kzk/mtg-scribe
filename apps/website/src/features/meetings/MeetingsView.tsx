import { useState, type ReactNode } from "react";
import { Icon } from "@/components/Icon.tsx";
import { MOCK_MEETINGS } from "@/data/meetings.ts";
import type { ListView } from "@/types/ui.ts";
import { MeetingDetail } from "./MeetingDetail.tsx";
import { MeetingList } from "./MeetingList.tsx";

interface MeetingsViewProps {
  view: ListView;
  isMobile: boolean;
  isTablet: boolean;
  onMenu: () => void;
  navHidden: boolean;
  onToggleSidebar: () => void;
  onShowDetailChange: (show: boolean) => void;
}

export function MeetingsView({
  view,
  isMobile,
  isTablet,
  onMenu,
  navHidden,
  onToggleSidebar,
  onShowDetailChange,
}: MeetingsViewProps): ReactNode {
  const [selectedId, setSelectedId] = useState<string>(MOCK_MEETINGS[0]?.id ?? "");
  const [query, setQuery] = useState("");

  const selected = MOCK_MEETINGS.find((m) => m.id === selectedId);

  const onSelect = (id: string): void => {
    setSelectedId(id);
    onShowDetailChange(true);
  };

  return (
    <>
      <MeetingList
        meetings={MOCK_MEETINGS}
        selectedId={selectedId}
        onSelect={onSelect}
        query={query}
        setQuery={setQuery}
        view={view}
        isMobile={isTablet}
        onMenu={onMenu}
        onToggleSidebar={onToggleSidebar}
        sidebarHidden={navHidden}
      />
      {selected ? (
        <MeetingDetail
          meeting={selected}
          isMobile={isMobile}
          onBackToList={() => onShowDetailChange(false)}
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
  );
}
