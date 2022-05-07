import logoVinted from "../assets/images/logo-vinted.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.scss";

function Header({ token, setUser }) {
  const navigate = useNavigate();
  return (
    <div className="header">
      <img
        className="logoVinted"
        src={logoVinted}
        alt="logo Vinted"
        onClick={() => {
          navigate("/");
        }}
      />

      <div className="searchbar">
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="icon" />
        <input type="text" placeholder="Recherche des articles" />
      </div>
      {token === null ? (
        <div className="header-grey-buttons">
          <Link to="/signup">
            <button>S'inscrire</button>
          </Link>
          <Link to="/login">
            <button>Se connecter</button>
          </Link>
        </div>
      ) : (
        <div className="header-grey-buttons">
          <button
            onClick={() => {
              setUser(null);
              navigate("/");
            }}
          >
            Déconnexion
          </button>
        </div>
      )}
      <button className="header-green-button">Vends tes articles</button>
    </div>
  );
}

export default Header;
