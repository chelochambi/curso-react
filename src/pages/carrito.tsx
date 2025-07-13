import { useCarrito } from "@/context/CarritoContext";
import MainLayout from "@/components/layouts/MainLayout";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";

const CarritoPage = () => {
  const {
    carrito,
    quitarDelCarrito,
    limpiarCarrito,
    aumentarCantidad,
    disminuirCantidad,
  } = useCarrito();

  const total = carrito.reduce(
    (acc, item) => acc + item.price * item.cantidad,
    0
  );

  return (
    <MainLayout titulo="Carrito de compras">
      <Typography variant="h5" gutterBottom>
        Carrito de compras
      </Typography>

      {carrito.length === 0 ? (
        <Typography>No tienes productos en el carrito.</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {carrito.map((item) => (
              <Grid item xs={12} md={6} key={item.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography>Precio unitario: ${item.price}</Typography>

                    <Box display="flex" alignItems="center" mt={1}>
                      <IconButton
                        onClick={() => disminuirCantidad(item.id)}
                        size="small"
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body1" sx={{ mx: 2 }}>
                        {item.cantidad}
                      </Typography>
                      <IconButton
                        onClick={() => aumentarCantidad(item.id)}
                        size="small"
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>

                    <Typography sx={{ mt: 1 }}>
                      Subtotal: ${(item.price * item.cantidad).toFixed(2)}
                    </Typography>

                    <Button
                      color="error"
                      size="small"
                      sx={{ mt: 1 }}
                      onClick={() => quitarDelCarrito(item.id)}
                    >
                      Quitar
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box mt={4}>
            <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
            <Button variant="outlined" color="error" onClick={limpiarCarrito}>
              Vaciar carrito
            </Button>
          </Box>
        </>
      )}
    </MainLayout>
  );
};

export default CarritoPage;
