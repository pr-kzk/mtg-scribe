import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "../src/components/Modal.tsx";

describe("Modal", () => {
  it("renders with dialog role and accessible title", () => {
    render(
      <Modal title="テスト" onClose={vi.fn()}>
        <div>本文</div>
      </Modal>,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAccessibleName("テスト");
  });

  it("calls onClose when Escape pressed", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal title="テスト" onClose={onClose}>
        <button type="button">中身</button>
      </Modal>,
    );
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });

  it("focuses first focusable element on mount", () => {
    render(
      <Modal title="テスト" onClose={vi.fn()}>
        <button type="button">first</button>
        <button type="button">second</button>
      </Modal>,
    );
    expect(screen.getByText("first")).toHaveFocus();
  });
});
