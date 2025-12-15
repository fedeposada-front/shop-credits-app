import styled from "styled-components";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { canAddProducts } from "../context/orderRules";
import Button from "./ui/Button";
import { toast } from "react-toastify";

const PageContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
`;

const ProductCard = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 18px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
  }
`;

const Title = styled.h2`
  margin-bottom: 16px;
`;

const Alert = styled.div`
  margin-bottom: 16px;
  padding: 12px;
  border: 1px solid #f5c2c7;
  background-color: #f8d7da;
  color: #842029;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const AlertButton = styled.button`
  padding: 6px 12px;
  background-color: #842029;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ProductImage = styled.span`
  font-size: 48px;
  text-align: center;
  margin-bottom: 12px;
`;

const ProductTitle = styled.h3`
  margin: 8px 0;
`;

const ProductDescription = styled.p`
  flex-grow: 1;
  color: #555;
`;

const ProductPrice = styled.p`
  font-weight: bold;
  margin: 8px 0;
`;

const AddButton = styled.button`
  margin-top: 12px;
  padding: 10px 14px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  background-color: ${({ disabled }) => (disabled ? "#adb5bd" : "#212529")};
  color: #fff;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#adb5bd" : "#000")};
  }
`;

function ProductList({ productos }) {
  const {
    agregarAlCarrito,
    estadoPedido,
    creditos,
    totalCreditosCarrito,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const superaCreditos =
    totalCreditosCarrito >= creditos;

  return (
    <PageContainer>
      <Title>Productos disponibles</Title>

      {superaCreditos && (
        <Alert>
          <span>
            Superaste tus créditos disponibles. Eliminá algún producto del carrito
            para continuar.
          </span>
          <AlertButton onClick={() => navigate("/cart")}>
            Ir al carrito
          </AlertButton>
        </Alert>
      )}

      <ProductsGrid>
        {productos.map((producto) => (
          <ProductCard
            key={`${producto.id ?? producto.nombre}`}
          >
            <ProductImage>
              {producto.imagen}
            </ProductImage>

            <ProductTitle>{producto.nombre}</ProductTitle>

            <ProductDescription>
              {producto.descripcion}
            </ProductDescription>

            <ProductPrice>
              {producto.precioCreditos} créditos
            </ProductPrice>

            <AddButton
              onClick={() => {
                if (!canAddProducts(estadoPedido)) {
                  toast.error("Tenés un pedido en curso");
                  return;
                }

                if (superaCreditos) {
                  toast.error("No tenés créditos suficientes");
                  return;
                }

                agregarAlCarrito(producto);
                toast.success("Producto agregado al carrito 🛒");
              }}
              disabled={!canAddProducts(estadoPedido) || superaCreditos}
            >
              {canAddProducts(estadoPedido)
                ? "Agregar al carrito"
                : "Pedido en curso"}
            </AddButton>
          </ProductCard>
        ))}
      </ProductsGrid>
    </PageContainer>
  );
}

export default ProductList;