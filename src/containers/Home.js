import { Link } from "react-router-dom";
import hero from "../assets/images/hero.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Home.scss";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="homeMain">
      <div className="homeHero">
        <img src={hero} alt="two women looking at clothes" />
        <div className="boxInHero">
          <p>Prêts à faire du tri dans vos placards ?</p>
          <button>Commencer à vendre</button>
        </div>
      </div>
      <div className="homeItems">
        {data.offers.map((item) => {
          return (
            <div key={item._id} className="homeOffer">
              <div className="topOffer">
                <img
                  src={
                    item.owner.account.avatar &&
                    item.owner.account.avatar.secure_url
                  }
                  alt="not found"
                />
                <p>{item.owner.account.username}</p>
              </div>
              <div className="middleOffer">
                <Link to={`/offer/${item._id}`}>
                  {" "}
                  <img
                    src={
                      item.product_image.secure_url &&
                      item.product_image.secure_url
                    }
                    alt=""
                  />
                </Link>{" "}
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
