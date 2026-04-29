export type MeetingMode = "online" | "in-person";

export type SpeakerId = 1 | 2 | 3 | 4 | 5;

export interface Attendee {
  name: string;
  initials: string;
  color: string;
}

export interface Statement {
  name: string;
  text: string;
}

export interface Topic {
  title: string;
  ronten: string;
  statements: Statement[];
  decision?: string;
}

export interface Todo {
  text: string;
  owner: string;
  due: string;
  done: boolean;
}

export interface TranscriptLine {
  time: string;
  speaker: SpeakerId;
  name: string;
  text: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  duration: string;
  mode: MeetingMode;
  source: string;
  attendees: Attendee[];
  snippet?: string;
  topics: Topic[];
  todos: Todo[];
  transcript: TranscriptLine[];
  tags: string[];
}
