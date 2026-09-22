import { Outlet } from "react-router-dom";
import AppHeader from "../../../components/AppHeader/AppHeader";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./AppLayout.css";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <AppHeader />

      <div className="app-layout__body">
        <Sidebar />

        <main className="app-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}