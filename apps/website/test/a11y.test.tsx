import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { App } from "@/App.tsx";
import { Modal } from "@/components/Modal.tsx";
import { MOCK_MEETINGS } from "@/data/meetings.ts";
import { MeetingDetail } from "@/features/meetings/MeetingDetail.tsx";
import { NewMeetingModal } from "@/features/meetings/NewMeetingModal.tsx";
import { RecordingOverlay } from "@/features/recording/RecordingOverlay.tsx";
import { SettingsPage } from "@/features/settings/SettingsPage.tsx";
import { ThemeProvider } from "@/theme/ThemeProvider.tsx";

describe("a11y", () => {
  it("App has no a11y violations", async () => {
    const { container } = render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Modal has no a11y violations", async () => {
    const { container } = render(
      <Modal title="アクセシビリティ確認" onClose={vi.fn()}>
        <p>テスト本文</p>
      </Modal>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("RecordingOverlay has no a11y violations", async () => {
    const { container } = render(
      <ThemeProvider>
        <RecordingOverlay initialTitle="テスト録音" mode="online" onStop={vi.fn()} />
      </ThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("SettingsPage has no a11y violations", async () => {
    const { container } = render(
      <ThemeProvider>
        <SettingsPage onMenu={vi.fn()} isMobile={false} />
      </ThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("NewMeetingModal has no a11y violations", async () => {
    const { container } = render(
      <ThemeProvider>
        <NewMeetingModal onClose={vi.fn()} onStart={vi.fn()} />
      </ThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("MeetingDetail has no a11y violations", async () => {
    const meeting = MOCK_MEETINGS[0]!;
    const { container } = render(
      <ThemeProvider>
        <MeetingDetail meeting={meeting} onBackToList={vi.fn()} isMobile={false} />
      </ThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
