import {useDispatch, useSelector} from "react-redux";
import "./disk.css"
import {useEffect, useRef, useState} from "react";
import {fetchPostFile} from "../../store/postFile";
import {clearAuthError} from "../../store/auth";
import {useNavigate} from "react-router-dom";
import {fetchDisk} from "../../store/disk";
import {fetchUser} from "../../store/user";
import {fetchUsers} from "../../store/users";
import { jwtDecode } from "jwt-decode";

const formData = new FormData();

export function Disk() {
  const { info } = useSelector((state) => state.disk);
  // const { userInfo } = useSelector((state) => state.user);
  const { access } = useSelector((state) => state.login);

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
      // const token = "eyJ0eXAiO.../// jwt token";
      const decoded = jwtDecode(localStorage.getItem('access_token'));

      console.log(decoded);
      dispatch(fetchUser(1))
    }
  }, [])


  // const {title, content, file} = inputData;

  // console.log(userInfo)


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



    // dispatch(fetchPostFile(body));

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
    <>
      <div className="disk">
        <div className="left">
          <input
            ref={inputRef}
            type="file"
            onChange={handleFileChange}
            className="button hidden"/>
          <button
            onClick={handleClick}
            className="button">Загрузить</button>
          <button
            className="button">Файлы</button>
          {/*{<Buttons props={buttons}/>}*/}
        </div>
        <div className="right"></div>
      </div>
    </>
  )
}