import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { App } from "../src/App.tsx";
import { Modal } from "../src/components/Modal.tsx";
import { ThemeProvider } from "../src/theme/ThemeProvider.tsx";

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
});
