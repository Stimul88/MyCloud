import {useDispatch, useSelector} from "react-redux";
import "./users.css"
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {fetchUsers} from "../../store/users";
import {UsersCard} from "../../components/UsersCard/UsersCard";
import {saveIdUser} from "../../store/login";
import {jwtDecode} from "jwt-decode";


export function Users() {
  const { usersArray, deleteUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();


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
    dispatch(fetchUsers())

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