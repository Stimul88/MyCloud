import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {fetchDisk, saveFileInfo} from "../../store/disk";
import { jwtDecode } from "jwt-decode";
import {PostFileCard} from "../../components/PostFileCard/PostFileCard";
import {FileCard} from "../../components/FileCard/FileCard";

export function UsersDisk() {
  const { fileInfo, info } = useSelector((state) => state.disk);
  const { userInfo } = useSelector((state) => state.user);
  const { idUser } = useSelector((state) => state.login);
  const { response } = useSelector((state) => state.postFile);
  const [data, setInputData] = useState('')
  const dispatch = useDispatch();

  useEffect(() => {
    if(response !== 'OK') return;

    const decoded = jwtDecode(localStorage.getItem('access_token'));
    dispatch(fetchDisk(decoded.user_id))
  }, [response])

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

    dispatch(saveFileInfo(true))
    event.target.value = null;
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
          {idUser === userInfo.id &&
            <button
              onClick={handleClick}
              className="button">Загрузить</button>
          }
        </div>
        <div className="right">
          {info !== undefined && Array.from(info).map(item =>
            <FileCard
              key={item.id}
              props={item}
            />)}
        </div>
      </div>
      {fileInfo &&
        <PostFileCard
          props={data}
        />}
    </>
  )
}