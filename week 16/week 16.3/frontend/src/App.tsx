import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import './App.css'
import Signin from "./components/Signin";
import { User } from "./components/User";

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/signin"} element={<Signin />} />
        <Route path={"/user"} element={<User />} />
      </Routes>
      <Link to="/signin">Signin page</Link>
      <br />
      <Link to="/user">User page</Link>
    </BrowserRouter>
  )
}

export default App
