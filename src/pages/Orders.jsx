import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ORDER_STATES } from "../context/orderStates";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
`;

const OrderNumber = styled.div`
  margin-bottom: 24px;
  font-weight: bold;
`;

const Timeline = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const Step = styled.div`
  flex: 1;
  text-align: center;
  padding: 12px;
  border-top: 4px solid #ccc;
  color: #999;
  cursor: ${(props) => (props.$clickable ? "pointer" : "not-allowed")};

  &.active {
    border-top-color: #222;
    color: #222;
    font-weight: bold;
  }

  &.completed {
    border-top-color: green;
    color: green;
    font-weight: bold;
  }
`;

const Summary = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
`;

const PrimaryButton = styled.button`
  margin-top: 16px;
  padding: 10px 16px;
  background-color: #222;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 6px;

  &:hover {
    opacity: 0.9;
  }
`;

const ORDER_FLOW = [
  ORDER_STATES.CONFIRMADO,
  ORDER_STATES.EN_CAMINO,
  ORDER_STATES.RESENA,
];

function Orders() {
  const navigate = useNavigate();
  const { pedidos, cambiarEstadoPedido } = useContext(CartContext);

  if (!Array.isArray(pedidos)) {
    return null;
  }

  // Último pedido válido (confirmado / en camino / reseña)
  const pedidoActivo = [...pedidos]
    .filter(
      (p) =>
        p &&
        Array.isArray(p.productos) &&
        p.productos.length > 0 &&
        p.estado &&
        p.estado !== ORDER_STATES.LIBRE
    )
    .at(-1);

  if (!pedidoActivo || !pedidoActivo.productos || pedidoActivo.productos.length === 0) {
    return (
      <EmptyState>
        <h2>No tenés pedidos activos</h2>
        <p>
          Todavía no realizaste ningún canje de créditos o ya finalizaste todos tus pedidos.
        </p>
        <PrimaryButton
          onClick={() => navigate("/products")}
        >
          Ver productos disponibles
        </PrimaryButton>
      </EmptyState>
    );
  }

  const estadoActual = pedidoActivo.estado;

  const canMoveTo = (estado) => {
    return ORDER_FLOW.indexOf(estado) >= ORDER_FLOW.indexOf(estadoActual);
  };

  const isCompleted = (estado) => {
    return ORDER_FLOW.indexOf(estadoActual) >= ORDER_FLOW.indexOf(estado);
  };

  const isActive = (estado) => estadoActual === estado;

  const renderTimeline = () => (
    <Timeline>
      <Step
        $clickable={canMoveTo(ORDER_STATES.CONFIRMADO)}
        className={isActive(ORDER_STATES.CONFIRMADO) ? "active" : isCompleted(ORDER_STATES.CONFIRMADO) ? "completed" : ""}
        onClick={() => {
          if (canMoveTo(ORDER_STATES.CONFIRMADO) && estadoActual !== ORDER_STATES.CONFIRMADO) {
            cambiarEstadoPedido(ORDER_STATES.CONFIRMADO);
          }
        }}
      >
        Pedido confirmado
        <p>Tu pedido está en camino</p>
      </Step>

      <Step
        $clickable={canMoveTo(ORDER_STATES.EN_CAMINO)}
        className={isActive(ORDER_STATES.EN_CAMINO) ? "active" : isCompleted(ORDER_STATES.EN_CAMINO) ? "completed" : ""}
        onClick={() => {
          if (canMoveTo(ORDER_STATES.EN_CAMINO) && estadoActual !== ORDER_STATES.EN_CAMINO) {
            cambiarEstadoPedido(ORDER_STATES.EN_CAMINO);
          }
        }}
      >
        Pedido en domicilio
        <p>
          {!isCompleted(ORDER_STATES.EN_CAMINO)
            ? "Esperando entrega"
            : "Esperá 48hs para evaluar"}
        </p>
      </Step>

      <Step
        $clickable={canMoveTo(ORDER_STATES.RESENA)}
        className={isActive(ORDER_STATES.RESENA) ? "active" : isCompleted(ORDER_STATES.RESENA) ? "completed" : ""}
        onClick={() => {
          if (canMoveTo(ORDER_STATES.RESENA) && estadoActual !== ORDER_STATES.RESENA) {
            cambiarEstadoPedido(ORDER_STATES.RESENA);
          }
        }}
      >
        Evaluación disponible
        <p>
          {!isCompleted(ORDER_STATES.RESENA)
            ? "Aún no disponible"
            : "Podés evaluar y recuperar créditos"}
        </p>
      </Step>
    </Timeline>
  );

  return (
    <Container>
      <Title>Detalle del pedido</Title>

      <OrderNumber>
        Número de pedido: {pedidoActivo.id}
      </OrderNumber>

      {renderTimeline()}

      {estadoActual === ORDER_STATES.RESENA && (
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <PrimaryButton
            onClick={() => navigate("/review")}
            style={{
              padding: "12px 20px",
              backgroundColor: "green",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              borderRadius: "6px",
            }}
          >
            Evaluar productos y recuperar créditos
          </PrimaryButton>
        </div>
      )}

      <Summary>
        <h3>Resumen del pedido</h3>

        {Array.isArray(pedidoActivo.productos) &&
          pedidoActivo.productos
            .filter((prod) => prod && prod.nombre && prod.precioCreditos)
            .map((producto, index) => (
              <Item key={index}>
                <span>{producto?.nombre ?? "Producto"}</span>
                <span>{producto?.precioCreditos ?? 0} créditos</span>
              </Item>
            ))}

        <hr />

        <strong>Total: {pedidoActivo.creditosUsados} créditos</strong>
      </Summary>
    </Container>
  );
}

export default Orders;