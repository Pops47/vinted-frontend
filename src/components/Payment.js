import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Payment.scss";

function Payment({ token }) {
  // import from Offer
  const location = useLocation();
  const { title, price } = location.state;
  //import from stripe
  const stripe = useStripe();
  const elements = useElements();
  // state to know if paiement is accepted
  const [completed, setCompleted] = useState(false);
  // when submit checkoutForm
  const handleSubmit = async (e) => {
    e.preventDefault();
    //get data in the form
    const cardElement = elements.getElement(CardElement);
    //create a token sending data + user
    const stripeResponse = await stripe.createToken(cardElement, {
      name: "Toto",
    });
    console.log(stripeResponse);
    //get the token in response
    const stripeToken = stripeResponse.token.id;
    console.log("in front" + stripeToken);
    //resquest backend for paiement with the token
    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/payment",
      {
        token: stripeToken,
        title: title,
        amount: price,
      }
    );
    // if all went well, paiement is completed
    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };
  return (
    <div className="buy-body">
      {" "}
      {!completed ? (
        <form className="buy-form" onSubmit={handleSubmit}>
          <div className="buy-top">
            <p>Résumé de la commande</p>
            <div>
              <p>Commande</p>
              <p>{price} €</p>
            </div>
            <div>
              <p>Frais de protection de l'acheteur</p>
              <p>0.40 €</p>
            </div>
            <div>
              <p>Frais de port</p>
              <p>0.80 €</p>
            </div>
          </div>
          <div className="buy-bottom">
            <div>
              <p>Total</p>
              <p>{price + 1.2} €</p>
            </div>
            <p>
              Il ne vous reste plus qu'une étape pour vous offrir cet article :
              <br /> <span>{title}</span>. <br />
              <br />
              Vous allez payer un total de <span>{price + 1.2} €</span>
              (frais inclus).
            </p>
          </div>
          <CardElement />
          <button className="payment-green-button" type="submit">
            Valider le paiement
          </button>
        </form>
      ) : (
        <span>Paiement effectué ! </span>
      )}
    </div>
  );
}

export default Payment;
