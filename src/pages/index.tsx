// src/pages/index.tsx
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Skeleton,
} from "@mui/material";
import MainLayout from "@/components/layouts/MainLayout";
import { useRouter } from "next/router";

type CategoriaType = {
  slug: string;
  name: string;
  url: string;
  imagen?: string;
};

const CategoriasPage = () => {
  const [categorias, setCategorias] = useState<CategoriaType[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toTitleCase = (str: string) =>
    str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
    );

  useEffect(() => {
    const fetchCategorias = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
        const data = await res.json();

        if (!Array.isArray(data)) throw new Error("Formato inesperado");

        // convertimos en objetos
        const categoriasBase: CategoriaType[] = data.map((cat: any) => {
          const slug = typeof cat === "string" ? cat : cat.slug;
          return {
            slug,
            name: toTitleCase(slug.replace(/-/g, " ")),
            url: `https://dummyjson.com/products/category/${slug}`,
          };
        });

        // obtenemos la imagen de la categoría (primer producto)
        const categoriasConImagen = await Promise.all(
          categoriasBase.map(async (categoria) => {
            try {
              const res = await fetch(
                `https://dummyjson.com/products/category/${categoria.slug}?limit=1`
              );
              const data = await res.json();
              const imagen = data.products?.[0]?.thumbnail || "";

              return { ...categoria, imagen };
            } catch (err) {
              return { ...categoria, imagen: "" };
            }
          })
        );

        setCategorias(categoriasConImagen);
      } catch (err) {
        console.error("Error al cargar categorías", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  return (
    <MainLayout titulo="Categorías de productos">
      <Typography variant="h5" mb={4}>
        Explora por categoría
      </Typography>

      {loading && (
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rectangular" height={200} />
              <Skeleton height={40} width="80%" />
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && (
        <Grid container spacing={3}>
          {categorias.map((categoria) => (
            <Grid item xs={12} sm={6} md={4} key={categoria.slug}>
              <Card
                sx={{ cursor: "pointer", height: "100%" }}
                onClick={() =>
                  router.push(`/productos/categoria/${categoria.slug}`)
                }
              >
                {categoria.imagen && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={categoria.imagen}
                    alt={categoria.name}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" align="center">
                    {categoria.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </MainLayout>
  );
};

export default CategoriasPage;
