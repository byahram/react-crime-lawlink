import { NavLink } from "react-router-dom";

export default function Header() {
  const link = "px-3 py-2 rounded-lg hover:bg-gray-100";
  const active = "font-semibold underline";
  return (
    <header className="border-b">
      <nav className="container mx-auto px-4 py-3 flex gap-3">
        <NavLink
          to="/"
          className={({ isActive }) => `${link} ${isActive ? active : ""}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/crime-stats"
          className={({ isActive }) => `${link} ${isActive ? active : ""}`}
        >
          CrimeStats
        </NavLink>
        <NavLink
          to="/cases-search"
          className={({ isActive }) => `${link} ${isActive ? active : ""}`}
        >
          CaseSearch
        </NavLink>
        <NavLink
          to="/analysis"
          className={({ isActive }) => `${link} ${isActive ? active : ""}`}
        >
          Analysis
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => `${link} ${isActive ? active : ""}`}
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}
