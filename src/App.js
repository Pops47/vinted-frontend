import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Header from "./components/Header";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Publish from "./containers/Publish";
import Cookies from "js-cookie";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./components/CheckoutForm";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

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
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup setUser={setUser} />}></Route>
        <Route path="/login" element={<Login setUser={setUser} />}></Route>
        <Route path="/publish" element={<Publish token={token} />}></Route>
        <Route
          path="/checkout"
          element={
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
