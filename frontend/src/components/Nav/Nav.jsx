import { NavLink } from "react-router-dom";
import "./nav.css"
import {useSelector} from "react-redux";

export const Nav = () => {
  const { info, saveLogin, loginError } = useSelector((state) => state.login);
  const active = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav__link-active" : "";

  return (
      <ul className="nav__items">
         <li className="nav__item">
          <NavLink className={active} to="/">
            Home
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className={active} to="/users">
            Users
          </NavLink>
        </li>
        {Object.keys(info).length !== 0 && <li className="nav__item">
          <NavLink className={active} to="/disk">
            Disk
          </NavLink>
        </li>}
      </ul>
  );
};