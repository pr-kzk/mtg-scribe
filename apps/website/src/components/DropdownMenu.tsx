import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Icon } from "./Icon.tsx";
import type { DropdownEntry, DropdownItem } from "@/types/dropdown.ts";

export type { DropdownEntry, DropdownItem } from "@/types/dropdown.ts";

interface DropdownMenuProps {
  items: DropdownEntry[];
  onClose: () => void;
  anchorRect: DOMRect;
}

export function DropdownMenu({ items, onClose, anchorRect }: DropdownMenuProps): ReactNode {
  const ref = useRef<HTMLDivElement>(null);
  const interactive = items.flatMap((it, i): { item: DropdownItem; index: number }[] =>
    "divider" in it ? [] : [{ item: it, index: i }],
  );
  const [focusIdx, setFocusIdx] = useState(0);

  useEffect(() => {
    const onDoc = (e: MouseEvent): void => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusIdx((i) => (i + 1) % interactive.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusIdx((i) => (i - 1 + interactive.length) % interactive.length);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const target = interactive[focusIdx];
        if (target) {
          target.item.onClick?.();
          onClose();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [focusIdx, interactive, onClose]);

  const style: CSSProperties = {
    position: "fixed",
    top: anchorRect.bottom + 6,
    right: window.innerWidth - anchorRect.right,
    zIndex: 110,
  };

  return (
    <div ref={ref} className="dropdown-menu" style={style} role="menu">
      {items.map((it, i) => {
        if ("divider" in it)
          return <div key={`d${i}`} className="dropdown-divider" role="separator" />;
        const interactiveIndex = interactive.findIndex((e) => e.index === i);
        const focused = interactiveIndex === focusIdx;
        return (
          <button
            key={i}
            className={`dropdown-item ${it.danger ? "danger" : ""} ${focused ? "focused" : ""}`}
            role="menuitem"
            onMouseEnter={() => interactiveIndex >= 0 && setFocusIdx(interactiveIndex)}
            onClick={() => {
              it.onClick?.();
              onClose();
            }}
          >
            {it.icon && <Icon name={it.icon} size={14} />}
            <span>{it.label}</span>
            {it.kbd && <span className="dropdown-kbd">{it.kbd}</span>}
          </button>
        );
      })}
    </div>
  );
}
