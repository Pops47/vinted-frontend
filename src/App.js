import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Offer from "./containers/Offer";
import Payment from "./containers/Payment";
import Publish from "./containers/Publish";
import Signup from "./containers/Signup";
library.add(faMagnifyingGlass);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [search, setSearch] = useState("");

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
      <Header
        token={token}
        setUser={setUser}
        search={search}
        setSearch={setSearch}
      />

      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/offer/:id" element={<Offer token={token} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />}></Route>
        <Route path="/login" element={<Login setUser={setUser} />}></Route>
        <Route path="/publish" element={<Publish token={token} />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
