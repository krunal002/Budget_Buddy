import "./header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header-container">
      <h2 id="h1">Budget_Buddy</h2>
      <h4 id="h2">Your Journey to Financial Freedom Starts Here!</h4>
      <nav className="navlinks-container">
        <NavLink to="/" className="navlink-wrapper">
          Income
        </NavLink>
        <NavLink to="/expense" className="navlink-wrapper">
          Expense
        </NavLink>
        <NavLink to="/saving" className="navlink-wrapper">
          Savings
        </NavLink>
        <NavLink to="/reports" className="navlink-wrapper">
          Reports
        </NavLink>
      </nav>
    </header>
  );
};
export default Header;
