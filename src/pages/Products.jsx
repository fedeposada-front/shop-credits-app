import { useEffect, useState } from "react";
import OrderBanner from "../components/OrderBanner";
import ProductList from "../components/ProductList";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

const PageContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 16px;
`;

function Products() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProductos = async () => {
      try {
        const response = await fetch(
          "https://693fb179993d68afba69535a.mockapi.io/products",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Error al cargar los productos");
        }

        const data = await response.json();
        setProductos(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          toast.error("No se pudieron cargar los productos");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();

    return () => controller.abort();
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <PageContainer>
      <Helmet>
        <title>Productos disponibles</title>
        <meta name="description" content="Explora nuestros productos disponibles para canje de créditos" />
      </Helmet>
      <OrderBanner />

      <ProductList productos={productos} />
    </PageContainer>
  );
}

export default Products;