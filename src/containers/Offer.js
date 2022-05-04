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
          <p>{currentOffer.product_price}</p>

          <p>
            MARQUE :{" "}
            {currentOffer.product_details[0] &&
              currentOffer.product_details[0].MARQUE}
          </p>
          <p>
            TAILLE :{" "}
            {currentOffer.product_details[1] &&
              currentOffer.product_details[1].TAILLE}
          </p>
          <p>
            ETAT :{" "}
            {currentOffer.product_details[2] &&
              currentOffer.product_details[2].ETAT}
          </p>
          <p>
            COULEUR :{" "}
            {currentOffer.product_details[3] &&
              currentOffer.product_details[3].COULEUR}
          </p>
          <p>
            EMPLACEMENT :{" "}
            {currentOffer.product_details[4] &&
              currentOffer.product_details[4].EMPLACEMENT}
          </p>
        </div>
        <div className="bottom-details">
          <div className="bottom-owner-details">
            <p>{currentOffer.product_name}</p>
            <p>{currentOffer.product_description}</p>
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
