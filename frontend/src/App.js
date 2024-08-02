import './App.css';
import { Route, Routes} from "react-router-dom";
import {Layout} from "./components";
import {Home, Disk, NotFound, Login, SignUp, UsersDisk, Users} from "./pages";


function App() {
  return (
     <div className="container">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/disk" element={<Disk />} />
          <Route path="/userdisk" element={<UsersDisk />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

