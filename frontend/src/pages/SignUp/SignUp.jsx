import "./signUp.css";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {clearAuthError, clearAuthInfo, fetchAuth} from "../../store/auth";
import {useDispatch, useSelector} from "react-redux";
import Regexes from "../../js/Regexes";

export function SignUp() {
  const { authInfo, authError } = useSelector((state) => state.auth);
  // const { enterStatus } = useSelector((state) => state.login);
  // const [inputData, setInputData] = useState({login: '', fullName: '',email: '', password: '', toggle: false})
  const [inputData, setInputData] = useState({login: '', fullName: '',email: '', password: '', toggle: false})
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {login, fullName, email, password, toggle} = inputData;


  // useEffect(() => {
  //   // dispatch(clearAuthError(''))
  //   dispatch(clearAuthInfo(''))
  //   console.log(authError)
  // }, [])

  
  useEffect(() => {
    console.log(authInfo)

    // if(authError !== ''){
    //   dispatch(clearAuthError(''))
    //   alert('Юзер с таким логином или паролем уже существует')
    //   return
    // }
    if(Object.keys(authInfo).length){


      navigate("/login")
    }
  }, [authInfo, authError])

  const regexes = new Regexes();

  const inputChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    // if(name === 'login') {
    //   if(!regexes.regexLogin(value) && value.length < 4) {
    //     alert('только латинские буквы и цифры, первый символ — буква, длина от 4 до 20 символов;')
    //     return;
    //   }
    //   setInputData((prevForm) => ({
    //     ...prevForm,
    //     login: value
    //   }))
    // }


    setInputData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  const send = async (e) => {
    e.preventDefault()
    // dispatch(getAuthStatus(''))
    if(!regexes.regexLogin(login)) {
      alert('Логин должен содержать только латинские буквы и цифры, первый символ — буква, длина от 4 до 20 символов')
      return
    }
    // if(!regexes.regexEmail(email)) {
    //   alert('email должен соответствовать формату адресов электронной почты')
    //   return
    // }
    // if(!regexes.regexPassword(password)) {
    //   alert('Пароль должен содержать не менее 6 символов: как минимум одна заглавная буква, одна цифра и один специальный символ')
    //   return
    // }

    const newInfo = {
      "username": `${login}`,
      "first_name":`${fullName}`,
      "email": `${email}`,
      "password": `${password}`,
    }

    dispatch(fetchAuth(newInfo));
  }

  return (
    <form
      onSubmit={send}
      className="signup-form">
      <div className="signup-background"></div>
      <h3 className="enter-name">Регистрация</h3>
      <div className="mb-3">
        <label htmlFor="login">Логин</label>
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
        <label htmlFor="login">Полное имя</label>
        <input
          name={"fullName"}
          value={fullName}
          onChange={inputChange}
          type="text"
          className="form-control"
          placeholder="Введите полное имя"
        />
      </div>
      <div className="mb-3">
        <label>Электронная почта</label>
        <input
          name={"email"}
          value={email}
          onChange={inputChange}
          type="email"
          className="form-control"
          placeholder="Введите почту"
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
            onChange={() => setInputData(prevForm => ({...prevForm, toggle: !toggle}))}
            checked={toggle}
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">Согласен с условиями</label>
        </div>
      </div>
      <div className="d-grid">
        <button
          disabled={login?.length === 0 || fullName?.length === 0 || email?.length === 0 || password?.length === 0 || toggle === false }
          // disabled={login?.length === 0 || toggle === false }
          type="submit" className="enter-btn">Продолжить</button>
      </div>
      {/*<p className="forgot-password text-right">*/}
      {/*  Forgot <a href="#">password?</a>*/}
      {/*</p>*/}
    </form>
  )
}