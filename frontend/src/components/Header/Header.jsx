import {Nav} from "../Nav/Nav";
import "./header.css"
import logo from './logo.png';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAuthStatus} from "../../store/auth";
import {cleanInfo, getEnterStatus, saveIdUser} from "../../store/login";
import {useEffect, useState} from "react";
import {loginWord} from "../../js/loginWord";
import {fetchLogout} from "../../store/logout";
import {cleanUserInfo} from "../../store/user";

export const Header = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { loginInfo, saveLogin, loginError } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false)

  // useEffect(() => {
  //
  // }, [isAuth])
  //
  // useEffect(() => {
  //   dispatch(getEnterStatus(false))
  //   // dispatch(getStatus(''))
  // }, [])

  const logoutEnter = () => {
    dispatch(fetchLogout())
    dispatch(saveIdUser(''))
    localStorage.clear();
    dispatch(cleanUserInfo())

    navigate('/')
    dispatch(cleanInfo())
    // dispatch(getEnterStatus(false))
    // dispatch(getAuthStatus(''))
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
      {/*<hr/>*/}
    </>
  );
};
