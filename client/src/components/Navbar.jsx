import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-slate-100 dark:bg-slate-800 shadow">
      <h1 className="text-xl font-bold text-primary dark:text-white">
        Student Progress Manager
      </h1>
      <DarkModeToggle />
    </nav>
  );
}
  