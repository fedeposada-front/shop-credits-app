import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 32px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  margin-bottom: 4px;
  font-size: 26px;
`;

const Subtitle = styled.p`
  margin-bottom: 24px;
  color: #666;
  font-size: 15px;
`;

const Field = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 15px;

  &:focus {
    outline: none;
    border-color: #222;
    box-shadow: 0 0 0 2px rgba(34, 34, 34, 0.15);
  }
`;

const PrimaryButton = styled.button`
  margin-top: 24px;
  width: 100%;
  padding: 14px;
  background-color: #222;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: #000;
  }
`;

function Checkout() {
  const navigate = useNavigate();
  const { confirmarCanje } = useContext(CartContext);

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    documento: "",
    telefono: "",
    calle: "",
    altura: "",
    provincia: "",
    localidad: "",
    codigoPostal: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirm = () => {
    const camposVacios = Object.values(form).some(
      (value) => value.trim() === ""
    );

    if (camposVacios) {
      toast.error("Completá todos los datos para continuar");
      return;
    }

    confirmarCanje();
    toast.success("Pedido confirmado 🚚");
    navigate("/orders");
  };

  return (
    <Container>
      <Title>Datos de envío</Title>
      <Subtitle>
        Completá tus datos para confirmar el envío a domicilio.
      </Subtitle>

      {Object.entries({
        nombre: "Nombre",
        apellido: "Apellido",
        documento: "Documento",
        telefono: "Teléfono",
        calle: "Calle",
        altura: "Altura",
        provincia: "Provincia",
        localidad: "Localidad",
        codigoPostal: "Código Postal",
      }).map(([campo, label]) => (
        <Field key={campo}>
          <Label>{label}</Label>
          <Input
            name={campo}
            value={form[campo]}
            onChange={handleChange}
          />
        </Field>
      ))}

      <PrimaryButton onClick={handleConfirm}>
        Solicitar envío a domicilio
      </PrimaryButton>
    </Container>
  );
}

export default Checkout;