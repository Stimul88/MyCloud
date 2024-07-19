import './usersCard.css'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {fetchDisk} from "../../store/disk";

export const UsersCard = ({props}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFiles = (e) => {
    e.preventDefault()
    dispatch(fetchDisk(props.id))
  }
  return (
    <>
      <button
        onClick={getFiles}
        className="userCard">{props.username}</button>
    </>
  )
}