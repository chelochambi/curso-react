// src/components/layouts/MainLayout.tsx
import { ReactNode } from "react";
import { Container, AppBar, Toolbar, Typography } from "@mui/material";

type Props = {
  children: ReactNode;
  titulo?: string;
};

const MainLayout = ({ children, titulo }: Props) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">{titulo || "Ecommerce"}</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>{children}</Container>
    </>
  );
};

export default MainLayout;
