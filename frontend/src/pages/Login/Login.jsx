import React, {useEffect, useState} from "react";
import "./login.css"
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearAuthError, clearAuthInfo, fetchAuth, getAuthStatus} from "../../store/auth";
import {fetchLogin, saveLogin} from "../../store/login";
import axios from "axios";


export function Login (){
  const { info, refresh, access, loginError } = useSelector((state) => state.login);
  const [inputData, setInputData] = useState({login: '', password: ''})
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {login, password} = inputData;



  useEffect(() => {
    dispatch(clearAuthInfo(''))
  }, [])

  // useEffect(() => {
  //   dispatch(clearAuthInfo(''))
  // }, [])


  useEffect(() => {
    console.log(loginError)
    if(loginError.message === 401) {
      console.log(loginError)
      alert('Неправильно введен логин или пароль!')
    }
    if(Object.keys(info).length) {
      dispatch(saveLogin(login))
      localStorage.clear()
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

      navigate("/disk")
    }
  }, [info, loginError])



  const enter = (e) => {
    e.preventDefault()
    const user = {
      username: login,
      password: password,
    }

    dispatch(fetchLogin(user));
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
        {/*<p className="forgot-password text-right">*/}
        {/*  Forgot <a href="#">password?</a>*/}
        {/*</p>*/}
      </form>
    );
}
