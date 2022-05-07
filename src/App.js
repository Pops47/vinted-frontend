import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Header from "./components/Header";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);

  const setUser = (token) => {
    if (token === null) {
      Cookies.remove("token");
    } else {
      Cookies.set("token", token, { expires: 10 });
    }
    setToken(token);
  };

  return (
    <Router>
      <Header token={token} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup setUser={setUser} />}></Route>
        <Route path="/login" element={<Login setUser={setUser} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
