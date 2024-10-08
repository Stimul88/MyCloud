import { Outlet } from "react-router-dom";
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";
import "./layout.css"

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
