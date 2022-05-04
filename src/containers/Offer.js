import { useParams } from "react-router-dom";

function Offer({ offers }) {
  const { id } = useParams();
  const currentOffer = offers.find((offer) => offer._id === id);
  console.log(currentOffer.product_details);

  return (
    <div className="offer-in-offer">
      <img src={currentOffer.product_image.secure_url} alt="not found" />
      <div className="offer-details">
        <div className="top-details">
          <p className="firstp">{currentOffer.product_price} €</p>

          <p>
            <span>MARQUE :</span>{" "}
            {currentOffer.product_details[0] &&
              currentOffer.product_details[0].MARQUE.toUpperCase()}
          </p>
          <p>
            <span>TAILLE :</span>{" "}
            {currentOffer.product_details[1] &&
              currentOffer.product_details[1].TAILLE.toUpperCase()}
          </p>
          <p>
            <span>ETAT :</span>{" "}
            {currentOffer.product_details[2] &&
              currentOffer.product_details[2].ÉTAT.toUpperCase()}
          </p>
          <p>
            <span>COULEUR :</span>{" "}
            {currentOffer.product_details[3] &&
              currentOffer.product_details[3].COULEUR.toUpperCase()}
          </p>
          <p>
            <span>EMPLACEMENT :</span>{" "}
            {currentOffer.product_details[4] &&
              currentOffer.product_details[4].EMPLACEMENT.toUpperCase()}
          </p>
        </div>
        <div className="bottom-details">
          <div>
            <p className="pname">{currentOffer.product_name}</p>
            <p className="pdescription">{currentOffer.product_description}</p>
          </div>
          <div className="bottom-owner-details">
            <img
              src={
                currentOffer.owner.account.avatar &&
                currentOffer.owner.account.avatar.secure_url
              }
              alt="not found"
            />
            <p>{currentOffer.owner.account.username}</p>
          </div>
        </div>
        <button>Acheter</button>
      </div>
    </div>
  );
}

export default Offer;
