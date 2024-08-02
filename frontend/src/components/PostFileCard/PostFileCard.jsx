import './postFileCard.css'
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPostFile} from "../../store/postFile";
import {saveData, saveFileInfo} from "../../store/disk";

export const PostFileCard = () => {
  const { idUser } = useSelector((state) => state.login);
  const {  data } = useSelector((state) => state.disk);
  // const {  data } = useSelector((state) => state.disk);
  const [inputData, setInputData] = useState({text: '', nameFile: `${data.name}`})
  const dispatch = useDispatch();

  const { text, nameFile } = inputData

  const submitFile = () => {
    // const body = {
    //   id: idUser,
    //   fileName: nameFile,
    //   size: props.size,
    //   title: text,
    //   path: props,
    // }
    const body = {
      id: idUser,
      fileName: nameFile,
      size: data.size,
      title: text,
      path: data,
    }

    // console.log(fileInfo)
    dispatch(fetchPostFile(body))
    dispatch(saveData(''))
    dispatch(saveFileInfo(false))
  }

  const inputChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target

    setInputData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }


  return (
  <form className="post-file-card">
    <div className="background-card"></div>
    <div className="mb-3">
      <input
        type="text"
        name={"text"}
        value={text}
        className="form-control-card"
        placeholder="Коментарий к файлу..."
        onChange={inputChange}
      />
    </div>
    <input
      className="file-name"
      type="text"
      name={"nameFile"}
      value={nameFile}
      onChange={inputChange}
    />
    <div
      onClick={submitFile}
      className="d-grid">
      <button
        type="submit" className="submit-btn">Отправить</button>
    </div>
  </form>
  )
}