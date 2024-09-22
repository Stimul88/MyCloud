import './usersCard.css'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {calculateSum} from "../../js/calculateSum";
import axios from "axios";
import {deleteUserStatus} from "../../store/users";
import {fetchDisk} from "../../store/disk";

const server = process.env.REACT_APP_API_URL;

export const UsersCard = ({props}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { owners } = props

  const getFiles = (e) => {
    e.preventDefault()
    dispatch(fetchDisk(props.id))
      navigate('/disk')
    // navigate('/userdisk')

  }

  const deleteUser = () => {
    axios
      .delete(`${server}/delete_user/${props.id}/`)
      .then(response => {
        dispatch(deleteUserStatus("deleted successfully!"))
      })
  }


  return (
    <div className="userCard">
      <span className="name">{props.username}</span>
      <span className="email">{props.email}</span>
      <span className="full_name">{props.first_name}</span>
      <span className="admin">Admin:  {props.is_superuser === true ? "Да": "Нет"}</span>
      <span className="count_files">Файлы,шт: </span>
      <span className="count">{props.owners.length} </span>
      <span className="size-files">Общий размер: </span>
      <span className="size-users">
        {calculateSum(owners, 'size')} </span>
      <div
        onClick={getFiles}
        className="change">&#9998;</div>
      <div
        onClick={deleteUser}
        className="delete">&#x2716;</div>
    </div>
  )
}