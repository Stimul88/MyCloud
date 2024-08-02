import './fileCard.css'
import {bytesToMegaBytes} from "../../js/convertMB";
import {useDispatch, useSelector} from "react-redux";
import {reduceText} from "../../js/reduceText";
import axios from "axios";
import fileDownload from 'js-file-download'
import {deleteStatus, hiddenTag, openEl, saveData} from "../../store/disk";
import {fetchPutFile, getReloadStatus} from "../../store/reloadFile";
import moment from "moment";

const server = process.env.REACT_APP_API_URL;

export function FileCard({props}) {
  const { openFile, hiddenClass, data } = useSelector((state) => state.disk);
  const dispatch = useDispatch();

  const handleClick = (url, filename) => {
    axios.get(url, {
      responseType: 'blob',
    })
      .then((res) => {
        fileDownload(res.data, filename)
      })

    // moment.locale("de").format('LLL')

    const newDate = moment().format('YYYY-MM-DD HH:mm')

    const body = {
      id: props.id,
      dataInfo: {
        download_date: newDate,
      }
    }
    dispatch(fetchPutFile(body))


  }

  const copyLink = async () => {
    await navigator.clipboard.writeText(`${server}${props.url}`);

    alert('ссылка скопирована')

  }

  const open = () => {
    dispatch(openEl(`${server}${props.path}`))
    dispatch(hiddenTag(''))
  }

  const renameInfo = (event) => {

    // console.log(event.target.id)

    dispatch(saveData(props))

    // axios
    //   (`${server}/file/${props.id}`)
    //   .then(response => {
    //     dispatch(saveData(response.data))
    //   })

    dispatch(getReloadStatus(true))

    // event.target.value = null;
  }

  const deleteFile = () => {
    axios
      .delete(`${server}/delete/${props.id}/`)
      .then(response => {
        dispatch(deleteStatus("deleted successfully!"))
      })
  }
  return (
    <div className="file-info">
      <span
        onClick={open}
        className="filename">{reduceText(props.filename)}</span>
      <span className="size">{bytesToMegaBytes(Number(props.size))}</span>
      <span className="title">{reduceText(props.title)}</span>
      <div className="data">
        <span >Дата загрузки</span>
        <span className="load-data">{props.created_at}</span>
      </div>
      <div className="data2">
        <span >Дата скачивания</span>
        <span className="load-data">{props.download_date}</span>
      </div>
      <div
        className="copy-link"
        onClick={copyLink}
      >&#9939;</div>
      <button className="link"
              onClick={() => handleClick(`${server}${props.path}`, props.filename)}
      >Скачать файл</button>
      <div
        id={props.id}
        onClick={renameInfo}
        className="change">&#9998;</div>
      <div
        onClick={deleteFile}
        className="delete">&#x2716;</div>
    </div>
  )
}
