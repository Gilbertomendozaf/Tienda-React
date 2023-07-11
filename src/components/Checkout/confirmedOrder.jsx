import { useParams } from "react-router-dom";

function ConfirmedOrder() {
  const { orderid } = useParams();
  return (
    <div>
      <h1>Gracias por tu compra!</h1>
      <small>Tu comprobante de compra es el siguiente: {orderid}</small>
    </div>
  );
}

export default ConfirmedOrder;