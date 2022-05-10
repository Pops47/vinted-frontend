import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

function CheckoutForm() {
  //import elements from stripe
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
    //get the token in response
    const stripeToken = stripeResponse.token.id;
    //resquest backend for paiement with the token
    const response = await axios.post("http://localhost:3000/pay", {
      stripeToken,
    });
    // if all went well, paiement is completed
    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };
  return (
    <div>
      {" "}
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit">Valider</button>
        </form>
      ) : (
        <span>Paiement effectué ! </span>
      )}
    </div>
  );
}

export default CheckoutForm;
