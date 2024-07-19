import {Link} from "react-router-dom";
import "./notFound.css";

export function NotFound() {

  return (
    <div className="notFound">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link className="notFound__btn" to="/">
        Home
      </Link>
    </div>
  )
}