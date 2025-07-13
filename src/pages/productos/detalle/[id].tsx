// src/pages/productos/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Rating from "@mui/material/Rating"; // ⭐ NUEVO
import { Box, Typography, CardMedia, Skeleton, Button } from "@mui/material";
import MainLayout from "@/components/layouts/MainLayout";
import { useCarrito } from "@/context/CarritoContext";

type Producto = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
  brand: string;
  category: string;
  rating: number; // ⭐ NUEVO
};

const DetalleProductoPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(false);
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const fetchProducto = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProducto(data);
      } catch (err) {
        console.error("Error al cargar detalle del producto", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  return (
    <MainLayout titulo={producto?.title || "Detalle del producto"}>
      <Button
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        sx={{ mt: 2, ml: 2 }}
        onClick={() =>
          router.push(`/productos/categoria/${producto?.category || ""}`)
        }
      >
        Volver a productos
      </Button>

      <Box mt={4}>
        {loading && (
          <Box display="flex" gap={4} flexWrap="wrap">
            <Skeleton variant="rectangular" width={400} height={400} />
            <Box flex="1">
              <Skeleton height={40} width="60%" />
              <Skeleton height={30} width="40%" />
              <Skeleton height={80} />
              <Skeleton height={50} width="30%" />
            </Box>
          </Box>
        )}

        {!loading && producto && (
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            gap={4}
          >
            {/* Galería de imágenes */}
            <Box
              minWidth={300}
              maxWidth={400}
              display="flex"
              flexDirection="column"
              gap={2}
            >
              <CardMedia
                component="img"
                height="400"
                image={producto.thumbnail}
                alt={producto.title}
                sx={{
                  borderRadius: 2,
                  objectFit: "contain",
                  bgcolor: "#f5f5f5",
                }}
              />
              <Box display="flex" gap={1} overflow="auto">
                {producto.images.map((img, i) => (
                  <CardMedia
                    key={i}
                    component="img"
                    image={img}
                    alt={`Vista ${i + 1}`}
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 1,
                      objectFit: "cover",
                      border: "1px solid #ccc",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setProducto((prev) =>
                        prev ? { ...prev, thumbnail: img } : prev
                      )
                    }
                  />
                ))}
              </Box>
            </Box>

            {/* Información del producto */}
            <Box flex="1">
              <Typography variant="h4" gutterBottom>
                {producto.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" mb={1}>
                Marca: {producto.brand} | Categoría: {producto.category}
              </Typography>
              <Typography variant="h5" color="primary" mb={1}>
                ${producto.price}
              </Typography>

              {/* ⭐ Rating */}
              <Rating
                name="product-rating"
                value={producto.rating}
                precision={0.1}
                readOnly
                sx={{ mb: 1 }}
              />
              <Typography variant="body2" color="text.secondary" mb={2}>
                Calificación: {producto.rating.toFixed(1)} / 5
              </Typography>

              <Typography variant="body1" paragraph>
                {producto.description}
              </Typography>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => agregarAlCarrito(producto)}
              >
                Añadir al carrito
              </Button>
            </Box>
          </Box>
        )}

        {!loading && !producto && (
          <Typography color="error" mt={4}>
            No se pudo cargar el producto.
          </Typography>
        )}
      </Box>
    </MainLayout>
  );
};

export default DetalleProductoPage;
