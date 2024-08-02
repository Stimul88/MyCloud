import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {fetchPostFile} from "../../store/postFile";
import {saveData, saveFileInfo} from "../../store/disk";
import './reloadFileCard.css';
import {fetchPutFile, getReloadStatus} from "../../store/reloadFile";

export const ReloadFileCard = () => {
  const { idUser } = useSelector((state) => state.login);
  const { data } = useSelector((state) => state.disk);
  const [inputData, setInputData] = useState({text: data.title, nameFile: data.filename})
  const dispatch = useDispatch();

  const { text, nameFile } = inputData

  const submitFile = () => {
    const body = {
      id: data.id,
      dataInfo: {
        filename: nameFile,
        title: text,
      }
    }
    dispatch(fetchPutFile(body))
    dispatch(saveData(''))
    dispatch(getReloadStatus(false))
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