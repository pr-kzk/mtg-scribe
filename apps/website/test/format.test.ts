import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fmtDate, fmtFullDate, fmtRange, fmtRecordingTime, groupMeetings } from "@/lib/format.ts";
import type { Meeting } from "@/types/meeting.ts";

const FIXED_NOW = new Date("2026-04-30T12:00:00");

const baseMeeting = (id: string, date: string): Meeting => ({
  id,
  title: id,
  date,
  duration: "10:00",
  mode: "online",
  source: "x",
  attendees: [],
  topics: [],
  todos: [],
  transcript: [],
  tags: [],
});

describe("fmtDate", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_NOW);
  });
  afterEach(() => vi.useRealTimers());

  it("returns '今日 HH:MM' for the same day", () => {
    expect(fmtDate("2026-04-30T09:05:00")).toBe("今日 09:05");
  });

  it("returns '昨日 HH:MM' for the previous day", () => {
    expect(fmtDate("2026-04-29T18:30:00")).toBe("昨日 18:30");
  });

  it("returns 'N日前' for 2-6 days ago", () => {
    expect(fmtDate("2026-04-26T10:00:00")).toBe("4日前");
  });

  it("returns 'M月D日' for 7+ days ago", () => {
    expect(fmtDate("2026-04-22T10:00:00")).toBe("4月22日");
  });
});

describe("fmtFullDate", () => {
  it("formats with weekday and time", () => {
    expect(fmtFullDate("2026-04-30T14:00:00")).toBe("2026年4月30日 (木) 14:00");
  });
});

describe("fmtRange", () => {
  it("collapses same-day range to single date", () => {
    expect(fmtRange("2026-04-30T14:00:00", "2026-04-30T14:47:00")).toBe("04/30 14:00 〜 14:47");
  });

  it("keeps both dates for cross-day range", () => {
    expect(fmtRange("2026-04-30T23:30:00", "2026-05-01T01:00:00")).toBe(
      "04/30 23:30 〜 05/01 01:00",
    );
  });
});

describe("fmtRecordingTime", () => {
  it("formats sub-hour as MM:SS", () => {
    expect(fmtRecordingTime(0)).toBe("00:00");
    expect(fmtRecordingTime(65)).toBe("01:05");
    expect(fmtRecordingTime(3599)).toBe("59:59");
  });

  it("formats hour+ as H:MM:SS", () => {
    expect(fmtRecordingTime(3600)).toBe("1:00:00");
    expect(fmtRecordingTime(3661)).toBe("1:01:01");
  });
});

describe("groupMeetings", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_NOW);
  });
  afterEach(() => vi.useRealTimers());

  it("buckets meetings into 今日/昨日/今週/それ以前 and drops empty buckets", () => {
    const meetings: Meeting[] = [
      baseMeeting("today1", "2026-04-30T09:00:00"),
      baseMeeting("today2", "2026-04-30T15:00:00"),
      baseMeeting("yest", "2026-04-29T20:00:00"),
      baseMeeting("week", "2026-04-25T10:00:00"),
      baseMeeting("older", "2026-04-10T10:00:00"),
    ];
    const groups = groupMeetings(meetings);
    const labels = groups.map(([label]) => label);
    expect(labels).toEqual(["今日", "昨日", "今週", "それ以前"]);
    expect(groups[0]?.[1]).toHaveLength(2);
    expect(groups[3]?.[1]).toHaveLength(1);
  });
});
