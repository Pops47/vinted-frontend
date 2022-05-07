import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./SignupAndLogin.scss";
import axios from "axios";

function Login({ setUser }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
    } catch (error) {}
  };

  return (
    <div>
      <form type="submit" onSubmit={handleSubmit}>
        <p className="title">Se connecter</p>

        <input
          type="email"
          placeholder="Adresse Email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <input
          className="connect-button green-button"
          type="submit"
          value="Se connecter"
        />
        <p style={{ color: "red" }}>{errorMessage}</p>
        <div>
          <p className="green-text">
            Pas encore de compte?
            <span>
              <Link
                style={{ textDecoration: "none", color: "#09adb6" }}
                to="/signup"
              >
                {" "}
                Inscris-toi !
              </Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
