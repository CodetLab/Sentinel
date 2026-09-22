import { KeyRound, ShieldCheck, WandSparkles } from "lucide-react";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <a className="sidebar__item sidebar__item--active" href="/vault">
          <KeyRound size={18} />
          Vault
        </a>

        <a className="sidebar__item" href="#">
          <ShieldCheck size={18} />
          Security
        </a>

        <a className="sidebar__item" href="#">
          <WandSparkles size={18} />
          Generator
        </a>
      </nav>
    </aside>
  );
}