import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ORDER_STATES } from "../context/orderStates";

function OrderBanner() {
  const {
    estadoPedido,
    cambiarEstadoPedido,
    vaciarCarrito,
  } = useContext(CartContext);

  const navigate = useNavigate();

  if (!estadoPedido || estadoPedido === ORDER_STATES.LIBRE) {
    return null;
  }

  const cancelarPedido = () => {
    const confirmar = window.confirm(
      "Si cancelás el pedido se perderá el seguimiento actual. ¿Querés continuar?"
    );

    if (!confirmar) return;

    cambiarEstadoPedido(ORDER_STATES.LIBRE);
    vaciarCarrito();
  };

  const configPorEstado = {
    [ORDER_STATES.CONFIRMADO]: {
      titulo: "📦 Pedido confirmado",
      descripcion:
        "Tu pedido fue registrado y se está preparando para el envío.",
      boton: {
        label: "Pedido en preparación",
        disabled: true,
      },
    },
    [ORDER_STATES.EN_CAMINO]: {
      titulo: "🚚 Pedido en camino",
      descripcion:
        "El pedido ya salió y llegará a tu domicilio en las próximas 24–48 horas.",
      boton: {
        label: "Pedido en camino",
        disabled: true,
      },
    },
    [ORDER_STATES.RESENA]: {
      titulo: "⭐ Producto entregado",
      descripcion:
        "Ya podés dejar tu reseña para recuperar los créditos utilizados.",
      boton: {
        label: "Ir a la reseña",
        disabled: false,
      },
    },
  };

  if (!configPorEstado[estadoPedido]) {
    return null;
  }

  const estadoConfig = configPorEstado[estadoPedido];
  if (!estadoConfig) {
    return null;
  }

  return (
    <div
      style={{
        border: "2px solid orange",
        padding: "16px",
        margin: "16px 0",
        backgroundColor: "#fff7e6",
      }}
    >
      <p style={{ margin: 0, fontWeight: "bold", color: "orange" }}>
        ⚠️ Tenés un pedido en curso
      </p>

      <h3 style={{ margin: "8px 0" }}>
        {estadoConfig?.titulo ?? "Estado de pedido desconocido"}
      </h3>

      <p style={{ margin: "8px 0", color: "#555" }}>
        {estadoConfig?.descripcion ?? "No hay información disponible para este estado."}
      </p>

      <p style={{ fontSize: "14px", color: "#777" }}>
        Mientras este pedido esté activo, no podés solicitar nuevos productos.
      </p>

      <div style={{ marginTop: "12px" }}>
        <button
          disabled={estadoConfig?.boton?.disabled ?? true}
          onClick={() => {
            if (estadoPedido === ORDER_STATES.RESENA) {
              navigate("/review");
            }
          }}
          style={{
            marginRight: "8px",
            opacity: estadoConfig?.boton?.disabled ? 0.6 : 1,
            cursor: estadoConfig?.boton?.disabled ? "not-allowed" : "pointer",
          }}
        >
          {estadoConfig?.boton?.label ?? "Continuar"}
        </button>

        <button
          onClick={cancelarPedido}
          style={{
            backgroundColor: "#ffe5e5",
            border: "1px solid #ff9999",
          }}
        >
          Cancelar pedido
        </button>
      </div>
    </div>
  );
}

export default OrderBanner;