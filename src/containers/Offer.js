import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Offer.scss";

function Offer({ token }) {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );

      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return isLoading === true ? (
    <div>Loading...</div>
  ) : (
    <div className="offer-in-offer">
      <img src={data.product_image.secure_url} alt="not found" />
      <div className="offer-details">
        <div className="top-details">
          <p className="p-price">{data.product_price} €</p>

          {data.product_details.map((item, index) => {
            const key = Object.keys(item);

            return (
              <p key={index}>
                <span>{key[0]} : </span>
                <span>{item[key[0]]}</span>
              </p>
            );
          })}
        </div>
        <div className="bottom-details">
          <div>
            <p className="p-name">{data.product_name}</p>
            <p className="p-description">{data.product_description}</p>
          </div>
          <div className="bottom-owner-details">
            <img
              src={
                data.owner.account.avatar &&
                data.owner.account.avatar.secure_url
              }
              alt="not found"
            />
            <p>{data.owner.account.username}</p>
          </div>
        </div>
        {token ? (
          <Link
            to="/payment"
            state={{
              title: data.product_name,
              price: data.product_price,
              username: data.owner.account.username,
            }}
          >
            <button>Acheter</button>
          </Link>
        ) : (
          <Link to="/login">
            <button>Acheter</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Offer;
