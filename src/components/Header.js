import logoVinted from "../assets/images/logo-vinted.png";
import burger from "../assets/images/menu-bar.png";
import close from "../assets/images/close.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.scss";

function Header({ token, setUser, search, setSearch }) {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="header">
      <div className="small-screen-top-container">
        <img
          className="logo-vinted"
          src={logoVinted}
          alt="logo Vinted"
          onClick={() => {
            navigate("/");
          }}
        />
        <div className="burger">
          {!isMenuOpen ? (
            <img src={burger} onClick={toggleMenu} alt="" />
          ) : (
            <img src={close} onClick={toggleMenu} alt="" />
          )}
        </div>
      </div>
      <div className="line"></div>
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
        <div
          className={`header-white-buttons ${isMenuOpen ? "show-buttons" : ""}`}
        >
          <Link to="/signup">
            <button>S'inscrire</button>
          </Link>
          <Link to="/login">
            <button>Se connecter</button>
          </Link>
        </div>
      ) : (
        <div
          className={`header-red-button ${isMenuOpen ? "show-buttons" : ""}`}
        >
          <button
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
        <button
          className={`header-blue-button ${isMenuOpen ? "show-buttons" : ""}`}
        >
          Vends tes articles
        </button>
      </Link>
    </div>
  );
}

export default Header;
