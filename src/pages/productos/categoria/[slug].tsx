// src/pages/productos/categoria/[slug].tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Skeleton,
  Box,
  Pagination,
} from "@mui/material";
import MainLayout from "@/components/layouts/MainLayout";

type Producto = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

const DEFAULT_LIMIT = 6;

const ProductosPorCategoriaPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(false);
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [totalProductos, setTotalProductos] = useState(0);
  const [pagina, setPagina] = useState(1);

  const toTitleCase = (str: string) =>
    str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
    );

  const calcularSkip = (pagina: number, limite: number) =>
    (pagina - 1) * limite;
  const totalPaginas = Math.ceil(totalProductos / DEFAULT_LIMIT);

  useEffect(() => {
    if (!slug || typeof slug !== "string") return;

    const fetchProductos = async () => {
      setLoading(true);
      try {
        const skip = calcularSkip(pagina, DEFAULT_LIMIT);
        const res = await fetch(
          `https://dummyjson.com/products/category/${slug}?limit=${DEFAULT_LIMIT}&skip=${skip}`
        );
        const data = await res.json();
        setProductos(data.products || []);
        setTotalProductos(data.total || 0);
        setNombreCategoria(slug.replace(/-/g, " "));
      } catch (err) {
        console.error("Error al cargar productos por categoría", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [slug, pagina]);

  return (
    <MainLayout titulo={`Productos en ${toTitleCase(nombreCategoria)}`}>
      <Box mb={4}>
        <Typography variant="h5">
          Categoría: {toTitleCase(nombreCategoria)}
        </Typography>
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => router.push("/")}
        >
          Volver a Categorías
        </Button>
      </Box>

      {loading && (
        <Grid container spacing={3}>
          {Array.from({ length: DEFAULT_LIMIT }).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rectangular" height={200} />
              <Skeleton height={40} width="80%" />
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && productos.length === 0 && (
        <Typography>No hay productos en esta categoría.</Typography>
      )}

      {!loading && productos.length > 0 && (
        <>
          <Grid container spacing={3}>
            {productos.map((producto) => (
              <Grid item xs={12} sm={6} md={4} key={producto.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={producto.thumbnail}
                    alt={producto.title}
                    sx={{ cursor: "pointer" }}
                    onClick={() =>
                      router.push(`/productos/detalle/${producto.id}`)
                    }
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      noWrap
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        router.push(`/productos/detalle/${producto.id}`)
                      }
                    >
                      {producto.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      ${producto.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPaginas}
              page={pagina}
              onChange={(_, value) => setPagina(value)}
              variant="outlined"
              shape="rounded"
            />
          </Box>
        </>
      )}
    </MainLayout>
  );
};

export default ProductosPorCategoriaPage;
