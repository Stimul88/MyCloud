import React, {useEffect, useState} from "react";
import "./login.css"
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {cleanError, fetchLogin, saveLogin} from "../../store/login";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {fetchUser} from "../../store/user";

export function Login (){
  const { loginInfo, refresh, access, loginError } = useSelector((state) => state.login);
  const { userInfo } = useSelector((state) => state.user);
  const [inputData, setInputData] = useState({login: '', password: ''})
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {login, password} = inputData;


  useEffect(() => {

    if(Object.keys(loginInfo).length === 0) return;

    if(userInfo.is_superuser === false) {
      navigate("/disk")
    }
    if(userInfo.is_superuser === true) {
      navigate("/users")
    }

  }, [userInfo])





  useEffect(() => {
    // if(Object.keys(userInfo).length === 0) return;
    // if(loginError === {}) {
    //   navigate("*")
    //   return
    // }
    if(loginError === undefined) {
      navigate("*")
      dispatch(cleanError())
      return
    }
    if(loginError.message === 401) {

      alert('Неправильно введен логин или пароль!')
    }
    if(Object.keys(loginInfo).length !==0) {

      dispatch(saveLogin(login))
      localStorage.clear()
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

      const decoded = jwtDecode(access);

      dispatch(fetchUser(decoded.user_id))
    }
  }, [loginInfo, loginError])

  const enter = (e) => {
    e.preventDefault()
    const user = {
      username: login,
      password: password,
    }
    dispatch(fetchLogin(user))
  }

  const inputChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;

    setInputData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

    return (
      <form className="login-form">
        <div className="background"></div>
        <h3 className="enter-name">Вход</h3>
        <div className="mb-3">
          <label>Логин</label>
          <input
            name={"login"}
            value={login}
            onChange={inputChange}
            type="text"
            className="form-control"
            placeholder="Введите логин"
          />
        </div>
        <div className="mb-3">
          <label>Пароль</label>
          <input
            name={"password"}
            value={password}
            onChange={inputChange}
            type="password"
            className="form-control"
            placeholder="Введите пароль"
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">Запомнить меня</label>
          </div>
        </div>
        <div
          onClick={enter}
          className="d-grid">
          <button
            disabled={login?.length === 0 || password?.length === 0}
            type="submit" className="enter-btn">Войти</button>
        </div>
      </form>
    );
}
