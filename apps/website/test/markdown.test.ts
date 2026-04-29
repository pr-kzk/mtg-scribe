import { describe, expect, it } from "vitest";
import { meetingToMarkdown, parseInline, parseMarkdown } from "@/lib/markdown.ts";
import type { Meeting } from "@/types/meeting.ts";

describe("parseMarkdown", () => {
  it("returns empty array for empty input", () => {
    expect(parseMarkdown("")).toEqual([]);
  });

  it("parses h1, h2, paragraphs, and bullet lists separated by blank lines", () => {
    const md = ["# タイトル", "", "## 見出し", "段落", "", "- 項目1", "- 項目2"].join("\n");
    expect(parseMarkdown(md)).toEqual([
      { type: "h1", text: "タイトル" },
      { type: "h2", text: "見出し" },
      { type: "p", text: "段落" },
      { type: "ul", items: ["項目1", "項目2"] },
    ]);
  });

  it("flushes a list before a heading even without blank line", () => {
    const md = ["- a", "- b", "## next"].join("\n");
    expect(parseMarkdown(md)).toEqual([
      { type: "ul", items: ["a", "b"] },
      { type: "h2", text: "next" },
    ]);
  });
});

describe("parseInline", () => {
  it("returns a single text segment when no bold markers exist", () => {
    expect(parseInline("plain")).toEqual([{ kind: "text", text: "plain" }]);
  });

  it("splits multiple bold spans interleaved with text", () => {
    expect(parseInline("a**b**c**d**e")).toEqual([
      { kind: "text", text: "a" },
      { kind: "bold", text: "b" },
      { kind: "text", text: "c" },
      { kind: "bold", text: "d" },
      { kind: "text", text: "e" },
    ]);
  });
});

describe("meetingToMarkdown", () => {
  it("renders date, attendees, topics, and todos", () => {
    const meeting: Meeting = {
      id: "x",
      title: "X",
      date: "2026-04-30T14:00:00",
      endDate: "2026-04-30T14:47:00",
      duration: "47:00",
      mode: "online",
      source: "Meet",
      attendees: [{ name: "田中", initials: "田", color: "#000" }],
      topics: [
        {
          title: "テーマ",
          ronten: "論点本文",
          statements: [{ name: "田中", text: "意見" }],
          decision: "やる",
        },
      ],
      todos: [{ text: "宿題", owner: "田中", due: "5/1", done: false }],
      transcript: [],
      tags: [],
    };
    const md = meetingToMarkdown(meeting);
    expect(md).toContain("# 議事録");
    expect(md).toContain("## 日時");
    expect(md).toContain("04/30 14:00 〜 14:47");
    expect(md).toContain("## 参加者");
    expect(md).toContain("田中");
    expect(md).toContain("## テーマ");
    expect(md).toContain("**論点：** 論点本文");
    expect(md).toContain("- 意見（田中）");
    expect(md).toContain("**決定事項：**");
    expect(md).toContain("やる");
    expect(md).toContain("## TODO");
    expect(md).toContain("- 宿題（田中）");
  });
});
