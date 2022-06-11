import { useTheme } from "../App";

export default function Header() {
  const { toggleTheme } = useTheme();

  return (
    <header className="header">
      <h3 className="header__title">Where in the world?</h3>
      <div className="themeswitch" onClick={toggleTheme}>
        <div className="themeswitch__icon" />
        <span className="themeswitch__title">Dark Mode</span>
      </div>
    </header>
  );
}
