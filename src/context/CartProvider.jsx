import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CartContext } from "./CartContext";
import { ORDER_STATES } from "./orderStates";

const INITIAL_CREDITS = 500;

function CartProvider({ children }) {
    // --- Estado base ---

    const [carrito, setCarrito] = useState([]);
    const [creditos, setCreditos] = useState(() => {
        const stored = localStorage.getItem("creditos");
        return stored ? Number(stored) : INITIAL_CREDITS;
    });

    const [pedidos, setPedidos] = useState(() => {
        const stored = localStorage.getItem("pedidos");
        if (!stored) return [];

        try {
            const parsed = JSON.parse(stored);

            // 🔒 Normalización defensiva:
            // - Elimina pedidos sin productos
            // - Elimina pedidos con estado LIBRE (estado inválido)
            // - Elimina pedidos malformados
            return Array.isArray(parsed)
                ? parsed.filter(
                      (p) =>
                          p &&
                          Array.isArray(p.productos) &&
                          p.productos.length > 0 &&
                          p.estado &&
                          p.estado !== ORDER_STATES.LIBRE
                  )
                : [];
        } catch {
            return [];
        }
    });

    // --- Persistencia ---
    useEffect(() => {
        localStorage.setItem("creditos", creditos);
    }, [creditos]);

    useEffect(() => {
        localStorage.setItem("pedidos", JSON.stringify(pedidos));
    }, [pedidos]);

    // --- Pedido activo derivado (NO estado duplicado) ---
    const pedidoActivo = [...pedidos]
        .filter((p) => p.estado !== ORDER_STATES.FINALIZADO)
        .at(-1);

    const estadoPedido = pedidoActivo?.estado ?? ORDER_STATES.LIBRE;

    // --- Carrito ---
    const agregarAlCarrito = (producto) => {
        if (pedidoActivo) {
            toast.error("No podés agregar productos con un pedido en curso");
            return;
        }
        setCarrito((prev) => [...prev, producto]);
    };

    const eliminarDelCarrito = (index) => {
        setCarrito((prev) => prev.filter((_, i) => i !== index));
    };

    const vaciarCarrito = () => setCarrito([]);

    const totalCreditosCarrito = carrito.reduce(
        (acc, p) => acc + p.precioCreditos,
        0
    );

    // --- Confirmar canje ---
    const confirmarCanje = () => {
        if (pedidoActivo) {
            toast.error("Ya tenés un pedido en curso");
            return;
        }

        if (carrito.length === 0 || totalCreditosCarrito > creditos) return;

        const nuevoPedido = {
            id: `ORD-${Date.now()}`,
            productos: carrito,
            creditosUsados: totalCreditosCarrito,
            estado: ORDER_STATES.CONFIRMADO,
            resenaRealizada: false,
            fecha: new Date().toISOString(),
        };

        setPedidos((prev) => [...prev, nuevoPedido]);
        setCreditos((prev) => prev - totalCreditosCarrito);
        setCarrito([]);

        toast.success("Canje confirmado. Pedido creado.");
    };

    // --- Cambio de estado manual (timeline) ---
    const cambiarEstadoPedido = (nuevoEstado) => {
        if (!pedidoActivo) return;

        if (nuevoEstado === ORDER_STATES.LIBRE) {
            console.warn("Intento de setear estado LIBRE ignorado");
            return;
        }

        setPedidos((prev) =>
            prev.map((p) =>
                p.id === pedidoActivo.id
                    ? { ...p, estado: nuevoEstado }
                    : p
            )
        );
    };

    // --- Pedido pendiente de reseña ---
    const pedidoPendienteDeResena =
        pedidoActivo &&
            pedidoActivo.estado === ORDER_STATES.RESENA &&
            !pedidoActivo.resenaRealizada
            ? pedidoActivo
            : null;

    const creditosARecuperar = pedidoPendienteDeResena
        ? {
            pedidoId: pedidoPendienteDeResena.id,
            productos: pedidoPendienteDeResena.productos,
            creditos: pedidoPendienteDeResena.creditosUsados,
        }
        : null;

    // --- Confirmar reseña ---
    const confirmarResenaYRecuperarCreditos = (textoResena) => {
        if (!pedidoPendienteDeResena) return;

        if (!textoResena || textoResena.trim().length < 20) {
            toast.error("La reseña debe tener al menos 20 caracteres");
            return;
        }

        setCreditos((prev) => prev + pedidoPendienteDeResena.creditosUsados);

        setPedidos((prev) =>
            prev.map((p) =>
                p.id === pedidoPendienteDeResena.id
                    ? {
                        ...p,
                        estado: ORDER_STATES.FINALIZADO,
                        resenaRealizada: true,
                    }
                    : p
            )
        );

        toast.success("Créditos recuperados correctamente 🎉");
    };

    const limpiarPedidos = () => {
        setPedidos([]);
        localStorage.removeItem("pedidos");
        toast.info("Pedidos limpiados");
    };

    return (
        <CartContext.Provider
            value={{
                carrito,
                creditos,
                pedidos,
                estadoPedido,
                totalCreditosCarrito,
                agregarAlCarrito,
                eliminarDelCarrito,
                vaciarCarrito,
                confirmarCanje,
                cambiarEstadoPedido,
                pedidoPendienteDeResena,
                creditosARecuperar,
                confirmarResenaYRecuperarCreditos,
                limpiarPedidos,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;