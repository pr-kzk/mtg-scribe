import type { ChangeEvent, ReactNode } from "react";

interface MeetingEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function MeetingEditor({ value, onChange }: MeetingEditorProps): ReactNode {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => onChange(e.target.value);
  return (
    <div className="md-editor-wrap">
      <textarea
        className="md-editor"
        value={value}
        onChange={handleChange}
        spellCheck={false}
        aria-label="議事録を編集"
      />
    </div>
  );
}
