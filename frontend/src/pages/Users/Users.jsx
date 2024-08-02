import {useDispatch, useSelector} from "react-redux";
import "./users.css"
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {fetchDisk} from "../../store/disk";
import {fetchUsers} from "../../store/users";
import {UsersCard} from "../../components/UsersCard/UsersCard";
import {fetchPostFile} from "../../store/postFile";
import {saveIdUser} from "../../store/login";
import {jwtDecode} from "jwt-decode";

const formData = new FormData();

export function Users() {
  const { usersArray, deleteUser } = useSelector((state) => state.users);
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
      const decoded = jwtDecode(localStorage.getItem('access_token'));
      dispatch(saveIdUser(decoded.user_id))
    }
  }, [])


  useEffect(() => {
    if(deleteUser !== "deleted successfully!") return;

    // const decoded = jwtDecode(localStorage.getItem('access_token'));
    // dispatch(fetchDisk(decoded.user_id))
    dispatch(fetchUsers())

    // dispatch(fetchDisk(info.id))

  }, [deleteUser])



  return (
    <div className="users">
      <div className="left"></div>
      <div className="right">
        {Array.from(usersArray).map(item =>
          <UsersCard
            key={item.id}
            props={item}
          />)}
      </div>
    </div>
  )
}