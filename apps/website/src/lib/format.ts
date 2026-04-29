import type { Meeting } from "../types/meeting.ts";

const pad2 = (n: number): string => String(n).padStart(2, "0");
const sameDay = (a: Date, b: Date): boolean => a.toDateString() === b.toDateString();

const WEEKDAY_JA = ["日", "月", "火", "水", "木", "金", "土"] as const;

export function fmtDate(iso: string): string {
  const d = new Date(iso);
  const today = new Date();
  const yest = new Date();
  yest.setDate(yest.getDate() - 1);
  const time = `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
  if (sameDay(d, today)) return `今日 ${time}`;
  if (sameDay(d, yest)) return `昨日 ${time}`;
  const diff = Math.floor((today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 7) return `${diff}日前`;
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

export function fmtFullDate(iso: string): string {
  const d = new Date(iso);
  const wd = WEEKDAY_JA[d.getDay()];
  const time = `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 (${wd}) ${time}`;
}

export function fmtRange(startIso: string, endIso: string): string {
  const s = new Date(startIso);
  const e = new Date(endIso);
  const md = (d: Date): string => `${pad2(d.getMonth() + 1)}/${pad2(d.getDate())}`;
  const hm = (d: Date): string => `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
  return s.toDateString() === e.toDateString()
    ? `${md(s)} ${hm(s)} 〜 ${hm(e)}`
    : `${md(s)} ${hm(s)} 〜 ${md(e)} ${hm(e)}`;
}

export type MeetingGroupLabel = "今日" | "昨日" | "今週" | "それ以前";

export function groupMeetings(meetings: Meeting[]): [MeetingGroupLabel, Meeting[]][] {
  const groups: Record<MeetingGroupLabel, Meeting[]> = {
    今日: [],
    昨日: [],
    今週: [],
    それ以前: [],
  };
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yest = new Date(today);
  yest.setDate(yest.getDate() - 1);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  for (const m of meetings) {
    const d = new Date(m.date);
    if (d >= today) groups["今日"].push(m);
    else if (d >= yest) groups["昨日"].push(m);
    else if (d >= weekAgo) groups["今週"].push(m);
    else groups["それ以前"].push(m);
  }

  return (Object.entries(groups) as [MeetingGroupLabel, Meeting[]][]).filter(
    ([, list]) => list.length > 0,
  );
}

export function fmtRecordingTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return h > 0 ? `${h}:${pad2(m)}:${pad2(s)}` : `${pad2(m)}:${pad2(s)}`;
}
