import { useEffect, useRef } from "react";

const PaypalButtons = (props) => {
  // variables
  const {
    renderPaypalButtons
  } = props;
  const paypal = useRef();

  // effects
  useEffect(() => {
    renderPaypalButtons(paypal);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
};

export default PaypalButtons;
