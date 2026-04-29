import type { ReactNode } from "react";
import { NavRail } from "./features/meetings/NavRail.tsx";
import type { View } from "./types/ui.ts";

interface AppShellProps {
  view: View;
  setView: (view: View) => void;
  onNew: () => void;
  counts: Record<"all" | "today" | "starred" | "archive", number>;
  isTablet: boolean;
  navOpen: boolean;
  setNavOpen: (open: boolean) => void;
  navHidden: boolean;
  className: string;
  children: ReactNode;
}

export function AppShell({
  view,
  setView,
  onNew,
  counts,
  isTablet,
  navOpen,
  setNavOpen,
  className,
  children,
}: AppShellProps): ReactNode {
  return (
    <div className={className}>
      {isTablet && navOpen && (
        <div className="nav-overlay" onClick={() => setNavOpen(false)} role="presentation" />
      )}
      {(!isTablet || navOpen) && (
        <div className={isTablet ? `nav-wrapper ${navOpen ? "open" : ""}` : undefined}>
          <NavRail
            view={view}
            setView={setView}
            onNew={onNew}
            counts={counts}
            isMobile={isTablet}
            onClose={() => setNavOpen(false)}
          />
        </div>
      )}
      {children}
    </div>
  );
}
