import { LockKeyhole, Settings } from "lucide-react";
import "./AppHeader.css";

export default function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        <LockKeyhole size={20} />
        <span>Sentinel</span>
      </div>

      <div className="app-header__actions">
        <span>Jordan</span>
        <button aria-label="Settings">
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
}