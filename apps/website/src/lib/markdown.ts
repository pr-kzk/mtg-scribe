import type { Meeting } from "@/types/meeting.ts";
import { fmtFullDate, fmtRange } from "./format.ts";

export function meetingToMarkdown(m: Meeting): string {
  const lines: string[] = [];
  lines.push("# 議事録", "");
  lines.push("## 日時");
  lines.push(m.endDate ? fmtRange(m.date, m.endDate) : fmtFullDate(m.date));
  lines.push("");
  lines.push("## 参加者");
  for (const a of m.attendees) lines.push(a.name);
  lines.push("");
  for (const t of m.topics) {
    lines.push(`## ${t.title}`);
    lines.push(`**論点：** ${t.ronten}`, "");
    for (const s of t.statements) {
      lines.push(`- ${s.text}（${s.name}）`);
    }
    if (t.statements.length > 0) lines.push("");
    if (t.decision) {
      lines.push("**決定事項：**");
      lines.push(t.decision, "");
    }
  }
  if (m.todos.length > 0) {
    lines.push("## TODO");
    for (const a of m.todos) {
      lines.push(`- ${a.text}（${a.owner}）`);
    }
  }
  return lines.join("\n").trim();
}

export type MarkdownBlock =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export function parseMarkdown(md: string): MarkdownBlock[] {
  if (!md) return [];
  const lines = md.split("\n");
  const blocks: MarkdownBlock[] = [];
  let buf: string[] = [];

  const flush = (): void => {
    if (buf.length === 0) return;
    blocks.push({ type: "ul", items: buf });
    buf = [];
  };

  for (const ln of lines) {
    if (ln.startsWith("# ")) {
      flush();
      blocks.push({ type: "h1", text: ln.slice(2) });
    } else if (ln.startsWith("## ")) {
      flush();
      blocks.push({ type: "h2", text: ln.slice(3) });
    } else if (ln.startsWith("- ")) {
      buf.push(ln.slice(2));
    } else if (ln.trim() === "") {
      flush();
    } else {
      flush();
      blocks.push({ type: "p", text: ln });
    }
  }
  flush();
  return blocks;
}

export type InlineSegment = { kind: "text"; text: string } | { kind: "bold"; text: string };

export function parseInline(text: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  const re = /\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) segments.push({ kind: "text", text: text.slice(last, m.index) });
    segments.push({ kind: "bold", text: m[1]! });
    last = m.index + m[0].length;
  }
  if (last < text.length) segments.push({ kind: "text", text: text.slice(last) });
  return segments;
}
