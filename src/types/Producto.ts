export type Producto = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};
type CarritoContextType = {
  carrito: Producto[];
  agregarAlCarrito: (producto: Producto) => void;
  quitarDelCarrito: (id: number) => void;
  limpiarCarrito: () => void;
  aumentarCantidad: (id: number) => void;
  disminuirCantidad: (id: number) => void;
};
