import {useDispatch, useSelector} from "react-redux";
import "./users.css"
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {fetchDisk} from "../../store/disk";
import {fetchUsers} from "../../store/users";
import {UsersCard} from "../../components/UsersCard/UsersCard";
import {fetchPostFile} from "../../store/postFile";

const formData = new FormData();

export function Users() {
  const { usersArray } = useSelector((state) => state.users);
  const { info, refresh, access, loginError } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    title: "sdfsdf",
    content: "sdfsdf",
    file: ""})


  useEffect(() => {
    if(localStorage.getItem('access_token') === null) {
      navigate("/login")
    } else {
      dispatch(fetchUsers())
    }
  }, [])

  // const {title, content, file} = inputData;

  console.log(info)


  const inputRef = useRef(null);

  const handleClick = (e) => {
    inputRef.current.click()
  }

  const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) return;
    const reader = new FileReader()

    if(fileObj){
      reader.readAsDataURL(fileObj)
    }
    setInputData(fileObj)
    const body = {title:'dfgdfg',content:'dfgdfg',file:fileObj}

    console.log(body)

    // const fileObj = event.target.files && event.target.files[0];
    // if (!fileObj) return;
    // const reader = new FileReader()
    //
    // if(fileObj){
    //   reader.readAsDataURL(fileObj)
    // }

    // formData.append("image", fileObj);



    dispatch(fetchPostFile( body));

    console.log('fileObj is', body);

    // 👇️ Reset file input
    event.target.value = null;

    // 👇️ Is now empty
    console.log(event.target.files);

    // 👇️ Can still access the file object here
    // console.log(fileObj);
    // console.log(fileObj.name);
  };

  return (
    <div className="users">
      <div className="left">
        <input
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          className="button hidden"/>
        <button
          onClick={handleClick}
          className="button">Загрузить</button>
        {/*{info.is_superuser &&*/}
        {/*  Array.from(usersArray).map(item =>*/}
        {/*      <UsersCard*/}
        {/*        key={item.id}*/}
        {/*        props={item}*/}
        {/*      />)}*/}
        {/*{!info.is_superuser &&*/}
        {/*  <>*/}
        {/*    <input*/}
        {/*      ref={inputRef}*/}
        {/*      type="file"*/}
        {/*      onChange={handleFileChange}*/}
        {/*      className="button hidden"/>*/}
        {/*    <button*/}
        {/*      onClick={handleClick}*/}
        {/*      className="button">Загрузить</button>*/}
        {/*  </>*/}
        {/*}*/}
      </div>
      {/*{info.is_superuser &&*!/*/}
      {/*  <div className="left">*/}
      {/*    {Array.from(usersArray).map(item =>*/}
      {/*      <UsersCard*/}
      {/*        key={item.id}*/}
      {/*        props={item}*/}
      {/*      />)}*/}
      {/*{info.is_superuser &&*/}
      {/*  <div className="left">*/}
      {/*    {Array.from(usersArray).map(item =>*/}
      {/*      <UsersCard*/}
      {/*        key={item.id}*/}
      {/*        props={item}*/}
      {/*      />)}*/}
      {/*  <div className="left">*/}
      {/*      {Array.from(usersArray).map(item =>*/}
      {/*        <UsersCard*/}
      {/*          key={item.id}*/}
      {/*          props={item}*/}
      {/*        />)}*/}
      {/*    /!*<input*!/*/}
      {/*    /!*  ref={inputRef}*!/*/}
      {/*    /!*  type="file"*!/*/}
      {/*    /!*  onChange={handleFileChange}*!/*/}
      {/*    /!*  className="button hidden"/>*!/*/}
      {/*    /!*<button*!/*/}
      {/*    /!*  onClick={handleClick}*!/*/}
      {/*    /!*  className="button">Загрузить</button>*!/*/}
      {/*    /!*<button*!/*/}
      {/*    /!*  className="button">Файлы</button>*!/*/}
      {/*    /!*{<Buttons props={buttons}/>}*!/*/}
      {/*  <div className="right"></div>*/}
      </div>
  )
}