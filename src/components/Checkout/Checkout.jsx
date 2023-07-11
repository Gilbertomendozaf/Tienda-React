import React, { useState } from "react";
import { createOrder } from "../../services/firebase";
import "./checkout.css";

const CheckoutForm = ({ onConfirm }) => {
  const [userData, setUserData] = useState({
    nombre: "",
    phone: "",
    email: "",
  });

  const onInputChange = (e) => {
    const prop = e.target.name;
    const value = e.target.value;

    setUserData((prevData) => ({
      ...prevData,
      [prop]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Aquí podrías realizar las validaciones necesarias antes de crear la orden

      const orderId = await createOrder(userData);
      onConfirm(orderId);

      // Redirigir a la página de agradecimiento con el número de orden
      // Aquí puedes utilizar el enfoque que utilices para la navegación en tu proyecto
      // Por ejemplo, podrías hacer un cambio en el estado para mostrar la pantalla de agradecimiento
    } catch (error) {
      console.log(error);
      // Manejar el error en caso de fallo al crear la orden
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setUserData({
      nombre: "",
      phone: "",
      email: "",
    });
  };

  return (
    <form className="checkout-container" onSubmit={onSubmit}>
      <h1>Ingresa tus datos para completar la compra</h1>
      <div className="checkout-input">
        <label className="checkout-label">Nombre</label>
        <input
          className="checkout-field"
          value={userData.nombre}
          name="nombre"
          type="text"
          onChange={onInputChange}
        />
      </div>
      <div className="checkout-input">
        <label className="checkout-label">Teléfono</label>
        <input
          className="checkout-field"
          value={userData.phone}
          name="phone"
          type="text"
          onChange={onInputChange}
        />
      </div>
      <div className="checkout-input">
        <label className="checkout-label">Email</label>
        <input
          className="checkout-field"
          value={userData.email}
          name="email"
          type="text"
          onChange={onInputChange}
        />
      </div>
      <div className="checkout-buttons">
        <button className="checkout-button" type="submit">
          Crear orden
        </button>
        <button className="checkout-button" onClick={handleReset}>
          Vaciar
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
