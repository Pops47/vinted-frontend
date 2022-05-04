import logoVinted from "../assets/images/logo-vinted.png";

function Header() {
  return (
    <div className="header">
      <img className="logoVinted" src={logoVinted} alt="logo Vinted" />
      <input
        className="searchbar"
        type="text"
        placeholder="Barre de recherche"
      />
      <button>S'inscrire</button>
      <button>Se connecter</button>
      <button>Vends tes articles</button>
    </div>
  );
}

export default Header;
