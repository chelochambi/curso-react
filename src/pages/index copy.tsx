import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
// import Link from "next/link";

export interface TareaType {
  nombre: string;
  completada: boolean;
}

const Home = () => {
  const router = useRouter();
  return (
    <Box style={{ textAlign: "center" }}>
      <Typography variant="h1" align="center" gutterBottom>
        Curso de React con TypeScript v3.0
      </Typography>
      <Stack>
      <Button variant="contained" onClick={() => router.push("/primerTrabajo")}>
        Ir a Lista
      </Button>
      <Button variant="contained" onClick={() => router.push("/tienda")}>
        Ir a productos
      </Button>
      </Stack>
    </Box>
  );
};

export default Home;
