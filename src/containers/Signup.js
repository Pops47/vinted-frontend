import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./SignupAndLogin.scss";
import axios from "axios";

function Signup({ setUser }) {
  const navigate = useNavigate();
  const [username, setUSername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
          newsletter: newsletter,
        }
      );
      setUser(response.data.token);
      navigate("/publish");
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("Cet email est déja utilisé !");
      }
    }
  };

  return (
    <div>
      <form className="signup-login-form" type="submit" onSubmit={handleSubmit}>
        <p className="title">S'inscrire</p>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          name="username"
          value={username}
          onChange={(event) => setUSername(event.target.value)}
        />
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
        <div>
          <input
            className="checkbox"
            type="checkbox"
            name="newsletter"
            value={newsletter}
            onChange={(event) => setNewsletter(event.target.checked)}
          />
          <span>S'inscrire à notre newsletter</span>
        </div>
        <p className="warning">
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>

        <input className="green-button" type="submit" value="S'inscrire" />
        <p style={{ color: "red" }}>{errorMessage}</p>
        <div>
          <p className="green-text">
            Tu as déja un compte?
            <span>
              <Link
                style={{ textDecoration: "none", color: "#09adb6" }}
                to="/login"
              >
                {" "}
                Connecte-toi !
              </Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
