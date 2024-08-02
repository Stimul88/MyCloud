import './openImage.css'
import {useDispatch, useSelector} from "react-redux";
import {hiddenTag, openEl} from "../../store/disk";

export function OpenImage() {
  const { openFile, hiddenClass } = useSelector((state) => state.disk);
  const dispatch = useDispatch();

  const close = () => {
    dispatch(openEl(''))
    dispatch(hiddenTag('hidden'))
  }

  return (
    <div className={`open-image ${hiddenClass}`}>
      <img
        className='image-user'
        src={openFile} alt={openFile.filename}/>
      <div
        onClick={close}
        className="close">&#x2716;</div>
    </div>
  )
}