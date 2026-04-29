import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { useInterval } from "@/hooks/useInterval.ts";

function Tick({ fn, delay }: { fn: () => void; delay: number | null }) {
  useInterval(fn, delay);
  return null;
}

describe("useInterval", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("invokes the callback at the given delay", () => {
    const fn = vi.fn();
    render(<Tick fn={fn} delay={100} />);
    vi.advanceTimersByTime(350);
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("does not invoke the callback when delay is null", () => {
    const fn = vi.fn();
    render(<Tick fn={fn} delay={null} />);
    vi.advanceTimersByTime(1000);
    expect(fn).not.toHaveBeenCalled();
  });

  it("reschedules when the delay changes", () => {
    const fn = vi.fn();
    const { rerender } = render(<Tick fn={fn} delay={100} />);
    vi.advanceTimersByTime(150);
    expect(fn).toHaveBeenCalledTimes(1);

    rerender(<Tick fn={fn} delay={null} />);
    vi.advanceTimersByTime(500);
    expect(fn).toHaveBeenCalledTimes(1);

    rerender(<Tick fn={fn} delay={50} />);
    vi.advanceTimersByTime(120);
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("uses the latest callback without resetting the timer", () => {
    const a = vi.fn();
    const b = vi.fn();
    const { rerender } = render(<Tick fn={a} delay={100} />);
    vi.advanceTimersByTime(50);
    rerender(<Tick fn={b} delay={100} />);
    vi.advanceTimersByTime(60);
    expect(a).not.toHaveBeenCalled();
    expect(b).toHaveBeenCalledTimes(1);
  });
});
