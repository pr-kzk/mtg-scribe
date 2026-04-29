import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MeetingList } from "@/features/meetings/MeetingList.tsx";
import { MOCK_MEETINGS } from "@/data/meetings.ts";

const baseProps = {
  meetings: MOCK_MEETINGS,
  selectedId: MOCK_MEETINGS[0]!.id,
  onSelect: vi.fn(),
  query: "",
  setQuery: vi.fn(),
  view: "all" as const,
  isMobile: false,
  onMenu: vi.fn(),
  onToggleSidebar: vi.fn(),
  sidebarHidden: false,
};

describe("MeetingList", () => {
  it("renders the total count", () => {
    render(<MeetingList {...baseProps} />);
    expect(screen.getByText(`${MOCK_MEETINGS.length} 件`)).toBeInTheDocument();
  });

  it("filters meetings via search input", async () => {
    const user = userEvent.setup();
    const setQuery = vi.fn();
    render(<MeetingList {...baseProps} query="" setQuery={setQuery} meetings={MOCK_MEETINGS} />);
    const input = screen.getByLabelText("議事録を検索");
    await user.type(input, "Q");
    expect(setQuery).toHaveBeenCalled();
  });

  it("calls onSelect when a meeting is clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<MeetingList {...baseProps} onSelect={onSelect} />);
    const target = MOCK_MEETINGS[1]!;
    await user.click(screen.getByText(target.title));
    expect(onSelect).toHaveBeenCalledWith(target.id);
  });
});
