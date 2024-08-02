import { NavLink } from "react-router-dom";
import "./nav.css"
import {useSelector} from "react-redux";

export const Nav = () => {
  const { loginInfo, saveLogin, loginError } = useSelector((state) => state.login);
  const { userInfo } = useSelector((state) => state.user);
  const active = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav__link-active" : "";

  return (
      <ul className="nav__items">
         <li className="nav__item">
          <NavLink className={active} to="/">
            Домой
          </NavLink>
        </li>
        {userInfo.is_superuser === true &&
          <li className="nav__item">
            <NavLink className={active} to="/users">
              Пользователи
            </NavLink>
          </li>
        }
        {Object.keys(loginInfo).length !== 0 && !userInfo.is_superuser && <li className="nav__item">
          <NavLink className={active} to="/disk">
            Диск
          </NavLink>
        </li>}
      </ul>
  );
};