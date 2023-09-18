// import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import "./Payment.scss";
import CheckoutForm from "../components/CheckoutForm";

function Payment() {
  const location = useLocation();
  const { title, price } = location.state;

  const stripePromise = loadStripe(process.env.REACT_APP_REACTEUR_PUBLIC_API); //clé du back du Reacteur

  return (
    <div className="buy-body">
      <div className="buy-form">
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
            <p>{(price + 1.2).toFixed(2)} €</p>
          </div>
          <p>
            Il ne vous reste plus qu'une étape pour vous offrir cet article :
            <br /> <span>{title}</span>. <br />
            <br />
            Vous allez payer un total de{" "}
            <span>{(price + 1.2).toFixed(2)} €</span>
            (frais inclus).
          </p>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm title={title} price={price}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
}

export default Payment;
