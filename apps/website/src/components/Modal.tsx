import { useEffect, useId, useRef, type MouseEvent, type ReactNode } from "react";
import { useFocusTrap } from "../hooks/useFocusTrap.ts";
import { useEscapeKey } from "../hooks/useEscapeKey.ts";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  closeOnEscape?: boolean;
  closeOnScrimClick?: boolean;
  headerActions?: ReactNode;
}

export function Modal({
  title,
  onClose,
  children,
  footer,
  closeOnEscape = true,
  closeOnScrimClick = true,
  headerActions,
}: ModalProps): ReactNode {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useFocusTrap(dialogRef, true);
  useEscapeKey(onClose, closeOnEscape);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const onScrimClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (closeOnScrimClick && e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-scrim" onClick={onScrimClick}>
      <div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <div className="modal-header">
          <div id={titleId} className="modal-title">
            {title}
          </div>
          {headerActions}
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
