import { ReactNode } from "react";
import { Container, AppBar, Toolbar, Typography, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { useCarrito } from "@/context/CarritoContext";
import { useRouter } from "next/router";
import Link from "next/link"; // ✅ import necesario

type Props = {
  children: ReactNode;
  titulo?: string;
};

const MainLayout = ({ children, titulo }: Props) => {
  const { carrito } = useCarrito();
  const router = useRouter();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              component={Link} // ✅ usamos el Link de Next.js
              href="/" // ✅ destino del link
              sx={{
                textDecoration: "none", // quitamos subrayado
                color: "inherit", // usamos el color del texto normal
                "&:hover": {
                  textDecoration: "underline", // o ningún cambio si preferís
                },
              }}
            >
              {titulo || "Ecommerce"}
            </Typography>
          </Box>

          <IconButton color="inherit" onClick={() => router.push("/carrito")}>
            <Badge badgeContent={carrito.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>{children}</Container>
    </>
  );
};

export default MainLayout;
