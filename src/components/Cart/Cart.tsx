import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { currencyTransform, totalPrice, totalQuantity } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import CartSkeleton from "../CartSkeleton/CartSkeleton";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  productId: number | undefined;
  quantity: number | undefined;
}

const Cart: React.FC<CartProps> = ({ productId, quantity }) => {
  const cartStorage = useLocalStorage<CartItem[]>("cart");
  const cartDateStorage = useLocalStorage<string>("cartDate");
  const [cart, setCart] = useState<CartItem[]>(
    () => cartStorage.getItem() || []
  );
  const [cartDate, setCartDate] = useState<string | null>(
    () => cartDateStorage.getItem() ?? null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    if (productId === undefined || quantity === undefined) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }

      const product: Product = await response.json();
      const notNullQty = Math.max(0, quantity);

      if (!cartDate) {
        const newDate = new Date().toLocaleString();
        setCartDate(newDate);
        cartDateStorage.setItem(newDate);
      }

      setCart((prevCart) => {
        const existingItemIndex = prevCart.findIndex(
          (item) => item.id === product.id
        );

        if (existingItemIndex >= 0) {
          const newCart = [...prevCart];
          newCart[existingItemIndex] = {
            ...newCart[existingItemIndex],
            quantity: newCart[existingItemIndex].quantity + notNullQty,
          };

          cartStorage.setItem(newCart);
          return newCart;
        } else {
          const newItem: CartItem = {
            ...product,
            quantity: notNullQty,
          };

          const newCart = [...prevCart, newItem];
          cartStorage.setItem(newCart);
          return newCart;
        }
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );

      const filteredCart = updatedCart.filter((item) => item.quantity > 0);

      if (filteredCart.length === 0) {
        setCartDate(null);
        cartDateStorage.removeItem();
      }

      cartStorage.setItem(filteredCart);
      return filteredCart;
    });
  };

  useEffect(() => {
    if (productId !== undefined && quantity !== undefined) {
      fetchProduct();
    }
  }, [productId, quantity]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl">Carrito de compra</h2>
        {cartDate && (
          <span className="text-sm text-gray-500 tracking-wide">
            Iniciado: {cartDate.toLocaleString()}
          </span>
        )}
      </div>

      {isLoading ? (
        <CartSkeleton />
      ) : (
        <section className="flex">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Cant</TableHead>
                <TableHead className="max-w-[250px]">Nombre</TableHead>
                <TableHead>Precio p/u</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Foto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart && cart.length > 0 ? (
                cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium px-2">
                    <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              Math.max(0, item.quantity - 1)
                            )
                          }
                        >
                          -
                        </Button>
                        <span className="font-medium px-1">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium truncate max-w-[250px]">
                      {item.title}
                    </TableCell>
                    <TableCell>{currencyTransform(item.price)}</TableCell>
                    <TableCell>
                      {currencyTransform(item.price * (item.quantity ?? 0))}
                    </TableCell>
                    <TableCell className="flex justify-center items-center text-right">
                      <img className="h-16" src={item.image} alt={item.title} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No hay productos en el carrito
                  </TableCell>
                </TableRow>
              )}
              {cart.length > 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="h-3 font-medium">
                    La cantidad de productos es de: {totalQuantity(cart)}
                  </TableCell>
                  <TableCell colSpan={3} className="h-3 font-medium">
                    Total: {currencyTransform(totalPrice(cart))}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </section>
      )}
    </div>
  );
};

export default Cart;
