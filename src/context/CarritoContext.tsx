import { createContext, useContext, useState, ReactNode } from "react";
import { Producto } from "@/types/Producto"; // Defínelo en un archivo si no existe

type CarritoItem = Producto & { cantidad: number };

type CarritoContextType = {
  carrito: CarritoItem[];
  agregarAlCarrito: (producto: Producto) => void;
  quitarDelCarrito: (id: number) => void;
  limpiarCarrito: () => void;
};

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const quitarDelCarrito = (id: number) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  const limpiarCarrito = () => setCarrito([]);

  const aumentarCantidad = (id: number) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  const disminuirCantidad = (id: number) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        quitarDelCarrito,
        limpiarCarrito,
        aumentarCantidad,
        disminuirCantidad,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};


export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context)
    throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  return context;
};
