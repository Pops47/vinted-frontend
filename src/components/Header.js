import logoVinted from "../assets/images/logo-vinted.png";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.scss";

function Header({ token, setUser, search, setSearch }) {
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
        <input
          type="text"
          name="search"
          placeholder="Recherche des articles"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
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
        <div>
          <button
            className="header-red-button"
            onClick={() => {
              setUser(null);
              navigate("/");
            }}
          >
            Se déconnecter
          </button>
        </div>
      )}
      <Link to="/publish">
        <button className="header-green-button">Vends tes articles</button>
      </Link>
    </div>
  );
}

export default Header;
