import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, renderHook } from "@testing-library/react";
import { useAutoSave } from "@/hooks/useAutoSave.ts";

describe("useAutoSave", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("calls onSave after the given delay when enabled", () => {
    const onSave = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }) => useAutoSave(value, { delayMs: 500, enabled: true, onSave }),
      { initialProps: { value: "a" } },
    );
    rerender({ value: "b" });
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(onSave).toHaveBeenCalledWith("b");
    expect(result.current.savedAt).toBeInstanceOf(Date);
  });

  it("debounces by resetting the timer on each value change", () => {
    const onSave = vi.fn();
    const { rerender } = renderHook(
      ({ value }) => useAutoSave(value, { delayMs: 500, enabled: true, onSave }),
      { initialProps: { value: "a" } },
    );
    rerender({ value: "b" });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    rerender({ value: "c" });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(onSave).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("c");
  });

  it("does not call onSave when disabled", () => {
    const onSave = vi.fn();
    renderHook(({ value }) => useAutoSave(value, { delayMs: 500, enabled: false, onSave }), {
      initialProps: { value: "a" },
    });
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(onSave).not.toHaveBeenCalled();
  });

  it("reset() clears savedAt", () => {
    const onSave = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }) => useAutoSave(value, { delayMs: 500, enabled: true, onSave }),
      { initialProps: { value: "a" } },
    );
    rerender({ value: "b" });
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current.savedAt).not.toBeNull();
    act(() => {
      result.current.reset();
    });
    expect(result.current.savedAt).toBeNull();
  });

  // Render side-effect smoke test (avoid import-only lint warning on `render`)
  it("can be used inside a component", () => {
    function Comp() {
      useAutoSave("x", { delayMs: 100, enabled: true, onSave: () => undefined });
      return null;
    }
    render(<Comp />);
  });
});
