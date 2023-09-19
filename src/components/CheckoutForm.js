import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import "./CheckoutForm.scss";
import axios from "axios";
import { Link } from "react-router-dom";

function CheckoutForm({ title, price }) {
  const stripe = useStripe();
  const elements = useElements();
  const [disabled, setDisabled] = useState(false);
  const [paymentSuceeded, setPaymentSucceded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    try {
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "12345678910",
        //valeur arbitraire (a retrouver avec un cookie par exemple)
      });
      const stripeToken = stripeResponse.token.id;
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title: title,
          amount: price,
        }
      );
      console.log(response.data);
      setDisabled(false);
      if (response.data.status === "succeeded") {
        alert("Votre paiement a bien été pris en compte");
        setPaymentSucceded(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return !paymentSuceeded ? (
    <div>
      <CardElement />
      <form onSubmit={handleSubmit}>
        <input
          className="payment-green-button"
          type="submit"
          value="Valider le paiement"
          disabled={disabled}
        />
      </form>
      <p class="test-message">
        Vous pouvez tester un paiement fictif à l'aide du numéro de carte
        suivant : 4242 4242 4242 4242 4/24 242
      </p>
    </div>
  ) : (
    <div>
      <p>Votre paiement a bien été validé</p>
      <Link to="/">Revenir à l'accueil</Link>
    </div>
  );
}

export default CheckoutForm;
