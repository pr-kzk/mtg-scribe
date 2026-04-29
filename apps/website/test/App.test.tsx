import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { App } from "../src/App.tsx";
import { ThemeProvider } from "../src/theme/ThemeProvider.tsx";

const renderApp = () =>
  render(
    <ThemeProvider>
      <App />
    </ThemeProvider>,
  );

describe("App", () => {
  it("renders brand and first meeting title", () => {
    renderApp();
    expect(screen.getByText("MTG Scribe")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Q2 プロダクトロードマップ レビュー" }),
    ).toBeInTheDocument();
  });

  it("shows the meeting list view title", () => {
    renderApp();
    expect(screen.getByRole("heading", { name: "すべての会議" })).toBeInTheDocument();
  });
});
