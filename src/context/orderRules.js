import { ORDER_STATES } from "./orderStates";

export const canAddProducts = (estadoPedido) => {
  return estadoPedido === ORDER_STATES.LIBRE;
};

export const canReviewProduct = (estadoPedido) => {
  return estadoPedido === ORDER_STATES.RESENA;
};