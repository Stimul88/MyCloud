import './App.css';
import { Route, Routes} from "react-router-dom";
import {Layout} from "./components";
import {Home, Disk, Movie, NotFound, Login, SignUp} from "./pages";
import {Users} from "./pages/Users/Users";


function App() {
  return (
     <div className="container">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/disk" element={<Disk />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        {/*<Route path="/login" element={<Login />} />*/}
        {/*<Route path="/signup" element={<SignUp />} />*/}
      </Routes>
    </div>
  );
}

export default App;

