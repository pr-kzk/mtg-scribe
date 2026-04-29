import type { ReactNode } from "react";
import { parseInline, parseMarkdown } from "../lib/markdown.ts";

interface MarkdownPreviewProps {
  md: string;
}

function renderInline(text: string): ReactNode[] {
  return parseInline(text).map((seg, i) =>
    seg.kind === "bold" ? <strong key={i}>{seg.text}</strong> : <span key={i}>{seg.text}</span>,
  );
}

export function MarkdownPreview({ md }: MarkdownPreviewProps): ReactNode {
  const blocks = parseMarkdown(md);
  return (
    <div className="md-preview">
      {blocks.map((b, i) => {
        if (b.type === "h1") {
          return (
            <h1 key={i} className="md-pv-h1">
              <span className="md-pv-hash">#</span> {renderInline(b.text)}
            </h1>
          );
        }
        if (b.type === "h2") {
          return (
            <h2 key={i} className="md-pv-h2">
              <span className="md-pv-hash">##</span> {renderInline(b.text)}
            </h2>
          );
        }
        if (b.type === "ul") {
          return (
            <ul key={i} className="md-pv-ul">
              {b.items.map((it, j) => (
                <li key={j}>{renderInline(it)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="md-pv-p">
            {renderInline(b.text)}
          </p>
        );
      })}
    </div>
  );
}
