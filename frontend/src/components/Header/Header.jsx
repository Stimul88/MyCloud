import {Nav} from "../Nav/Nav";
import "./header.css"
import logo from './logo.png';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {cleanInfo, saveIdUser} from "../../store/login";
import {loginWord} from "../../js/loginWord";
import {fetchLogout} from "../../store/logout";
import {cleanUserInfo} from "../../store/user";

export const Header = () => {
  const { loginInfo, saveLogin } = useSelector((state) => state.login);
  const dispatch = useDispatch();


  const logoutEnter = () => {
    dispatch(fetchLogout())
    dispatch(saveIdUser(''))
    localStorage.clear();
    dispatch(cleanUserInfo())

    navigate('/')
    dispatch(cleanInfo())
  }

  const navigate = useNavigate();
  return (
    <>
      <header className="header">
        <img
          onClick={() => navigate('/')}
          src={logo} alt="logo" className="logo"/>
        <nav className="nav">
          <Nav />
        </nav>
        <div className="buttons">
          {!Object.keys(loginInfo).length && <button
            className="enter"
            onClick={() => navigate('/login')}
          >Войти</button>}
          {!Object.keys(loginInfo).length && <button
            className="registration"
            onClick={() => navigate('/signup')}
          >Зарегистрироваться</button>}
          {Object.keys(loginInfo).length !== 0 && <div
            className="avatar"
            id="avatar"
          >{loginWord(saveLogin)}</div>}
          {Object.keys(loginInfo).length !== 0 && <button
            className="logout"
            onClick={logoutEnter}
          >Выход</button>}
        </div>
      </header>
    </>
  );
};
