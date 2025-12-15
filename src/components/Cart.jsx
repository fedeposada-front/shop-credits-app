import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 24px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
`;

const Summary = styled.p`
  margin: 6px 0;
  font-size: 15px;
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 8px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

const Button = styled.button`
  padding: 10px 16px;
  background-color: #222;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  font-weight: 500;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

const DeleteButton = styled.button`
  margin-left: 8px;
  padding: 6px 10px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;

  &:hover {
    background-color: #eee;
  }
`;

function Cart({ totalCreditosCarrito }) {
  const navigate = useNavigate();
  const {
    carrito,
    creditos,
    eliminarDelCarrito,
  } = useContext(CartContext);

  return (
    <Container>
      <Title>Carrito</Title>

      <Summary>Productos en carrito: {carrito.length}</Summary>
      <Summary>Total de créditos del carrito: {totalCreditosCarrito}</Summary>

      {totalCreditosCarrito > creditos && (
        <ErrorText>No tenés créditos suficientes para este canje</ErrorText>
      )}

      <List>
        {carrito.map((producto, index) => (
          <ListItem key={index}>
            <span>
              {producto.nombre} - {producto.precioCreditos} créditos
            </span>
            <DeleteButton onClick={() => eliminarDelCarrito(index)}>
              Eliminar
            </DeleteButton>
          </ListItem>
        ))}
      </List>

      <Button
        onClick={() => navigate("/checkout")}
        disabled={carrito.length === 0 || totalCreditosCarrito > creditos}
      >
        Continuar
      </Button>
    </Container>
  );
}

export default Cart;