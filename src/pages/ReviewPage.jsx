import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 24px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
`;

const Product = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 12px 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  margin-top: 8px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

const Button = styled.button`
  margin-top: 16px;
  padding: 12px 18px;
  background-color: ${(props) => (props.disabled ? "#999" : "#222")};
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 15px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) =>
        props.disabled ? "#999" : "#000"};
  }
`;

function ReviewPage() {
    const navigate = useNavigate();
    const { creditosARecuperar, confirmarResenaYRecuperarCreditos } =
        useContext(CartContext);

    const [review, setReview] = useState("");

    // No hay créditos para recuperar
    if (!creditosARecuperar) {
        return (
            <Container>
                <Helmet>
                  <title>Sin créditos para recuperar</title>
                  <meta
                    name="description"
                    content="No tenés créditos pendientes para recuperar en este momento"
                  />
                </Helmet>
                <EmptyState>
                    <h2>No tenés créditos para recuperar</h2>
                    <p>
                        Todavía no realizaste ningún pedido o ya recuperaste todos tus créditos.
                    </p>
                    <Button onClick={() => navigate("/products")}>
                        Ver productos disponibles
                    </Button>
                </EmptyState>
            </Container>
        );
    }

    const { productos, creditos } = creditosARecuperar;
    const isValidReview = review.trim().length >= 20;

    const handleSubmit = () => {
        if (!isValidReview) {
            toast.error("La reseña debe tener al menos 20 caracteres");
            return;
        }

        confirmarResenaYRecuperarCreditos(review.trim());

        toast.success("¡Créditos recuperados con éxito!");

        navigate("/products");
    };

    return (
        <Container>
            <Helmet>
              <title>Recuperar créditos</title>
              <meta
                name="description"
                content="Dejá una reseña de tu pedido y recuperá los créditos utilizados"
              />
            </Helmet>
            <h2>Recuperar créditos</h2>

            <p>
                Dejá una reseña (mínimo 20 caracteres) para recuperar los créditos
                utilizados en este pedido.
            </p>

            <h3>Productos del pedido</h3>

            {productos.map((producto, index) => (
                <Product key={index}>
                    <strong>{producto.nombre}</strong> — {producto.precioCreditos} créditos
                </Product>
            ))}

            <p>
                <strong>Créditos a recuperar:</strong> {creditos}
            </p>

            <TextArea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Escribí tu reseña..."
            />

            <Button
                onClick={handleSubmit}
                disabled={!isValidReview}
            >
                Enviar reseña y recuperar créditos
            </Button>
        </Container>
    );
}

export default ReviewPage;