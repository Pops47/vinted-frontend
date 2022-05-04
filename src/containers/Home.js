// import { Link } from "react-router-dom";
import hero from "../assets/images/hero.jpg";

function Home({ offers }) {
  return (
    <div className="homeMain">
      <div className="homeHero">
        <img src={hero} alt="two women looking at clothes" />
        <div className="boxInHero">
          <p>Prêts à faire du tri dans vos placards ?</p>
          <button>Commencer à vendre</button>
        </div>
      </div>
      <div className="homeItems">
        {offers.map((item) => {
          console.log(item);

          return (
            <div className="offer">
              <div className="topOffer">
                <img
                  src={
                    item.owner.account.avatar &&
                    item.owner.account.avatar.secure_url
                  }
                  alt="avatar"
                />
                <p>{item.owner.account.username}</p>
              </div>
              <div className="middleOffer">
                <img src={item.product_image.secure_url} alt="" />
              </div>
              <div className="bottomOffer">
                <p>{item.product_price} €</p>
                <p>
                  {item.product_details[1].TAILLE &&
                    item.product_details[1].TAILLE}
                </p>
                <p>{item.product_details[0].MARQUE}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
