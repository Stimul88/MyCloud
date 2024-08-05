import {useDispatch, useSelector} from "react-redux";
import "./disk.css"
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {fetchDisk, saveData, saveFileInfo} from "../../store/disk";
import { jwtDecode } from "jwt-decode";
import { saveIdUser} from "../../store/login";
import {PostFileCard} from "../../components/PostFileCard/PostFileCard";
import {FileCard} from "../../components/FileCard/FileCard";
import {OpenImage, ReloadFileCard} from "../../components";
import {getReloadStatus} from "../../store/reloadFile";


export function Disk() {
  const { fileInfo, info, deleteStatus  } = useSelector((state) => state.disk);
  const { userInfo } = useSelector((state) => state.user);
  const { idUser } = useSelector((state) => state.login);
  const {  reloadStatus, reloadResponse } = useSelector((state) => state.reloadFile);
  const { response } = useSelector((state) => state.postFile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(response !== 'OK') return;

    const decoded = jwtDecode(localStorage.getItem('access_token'));
    dispatch(fetchDisk(decoded.user_id))

  }, [response])

  useEffect(() => {
    if(deleteStatus !== "deleted successfully!") return;

    const decoded = jwtDecode(localStorage.getItem('access_token'));
    dispatch(fetchDisk(decoded.user_id))

    // dispatch(fetchDisk(info.id))

  }, [deleteStatus])

  useEffect(() => {
    if(!reloadResponse) return;

    const decoded = jwtDecode(localStorage.getItem('access_token'));
    dispatch(fetchDisk(decoded.user_id))

  }, [reloadResponse])

  useEffect(() => {
    if(localStorage.getItem('access_token') === null) {
      navigate("/login")
    } else {
      const decoded = jwtDecode(localStorage.getItem('access_token'));
      dispatch(fetchDisk(decoded.user_id))
      dispatch(saveIdUser(decoded.user_id))
      dispatch(saveData(''))
      dispatch(saveFileInfo(false))
      dispatch(getReloadStatus(false))
    }
  }, [])


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
    dispatch(saveData(fileObj))

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
        />}
      {reloadStatus &&
        <ReloadFileCard
        />}
      <OpenImage/>
    </>
  )
}