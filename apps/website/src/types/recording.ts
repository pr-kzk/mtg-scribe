import type { SpeakerId } from "./meeting.ts";

export interface RecLine {
  time: string;
  speaker: SpeakerId;
  name: string;
  text: string;
}

export interface SpeakerStat {
  id: SpeakerId;
  name: string;
  time: string;
  color: string;
}

export type SideTab = "summary" | "speakers" | "actions";
