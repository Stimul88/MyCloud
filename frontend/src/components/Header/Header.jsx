import {Nav} from "../Nav/Nav";
import "./header.css"
import logo from './logo.png';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAuthStatus} from "../../store/auth";
import {cleanInfo, getEnterStatus} from "../../store/login";
import {useEffect, useState} from "react";
import {loginWord} from "../../js/loginWord";
import {fetchLogout} from "../../store/logout";

export const Header = () => {
  // const { enterStatus } = useSelector((state) => state.auth);
  const { info, saveLogin, loginError } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {

  }, [isAuth])

  console.log(info)

  // useEffect(() => {
  //   dispatch(getEnterStatus(false))
  //   // dispatch(getStatus(''))
  // }, [])

  const logoutEnter = () => {
    dispatch(fetchLogout())
    localStorage.clear();

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
          {!Object.keys(info).length && <button
            className="enter"
            onClick={() => navigate('/login')}
          >Войти</button>}
          {!Object.keys(info).length && <button
            className="registration"
            onClick={() => navigate('/signup')}
          >Зарегистрироваться</button>}
          {Object.keys(info).length !== 0 && <div
            className="avatar"
            id="avatar"
          >{loginWord(saveLogin)}</div>}
          {Object.keys(info).length !== 0 && <button
            className="logout"
            onClick={logoutEnter}
          >Выход</button>}
        </div>
      </header>
      {/*<hr/>*/}
    </>
  );
};
