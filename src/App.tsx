import { useState } from "react";
import "./App.css";

import Cart from "@/components/Cart/Cart";
import AddProduct from "@/components/AddProduct/AddProduct";

export interface IAddProductData {
  productId: number;
  quantity: number;
}

const App: React.FC = () => {
  const [productId, setProductId] = useState<number | undefined>();
  const [quantity, setQuantity] = useState<number | undefined>();

  const handleSearch = ({ productId, quantity }: IAddProductData) => {
    setProductId(productId);
    setQuantity(quantity);
  };

  return (
    <>
      <section className="flex justify-center items-center bg-slate-800">
        <a
          href="https://wallbit.io/"
          className="py-6 items-center"
          target="_blank"
        >
          <img
            className="w-[18rem] py-4"
            src="./isologotipo.webp"
            alt="wallbit-isologotipo"
          />
        </a>
      </section>
      <main className="flex flex-col max-w-7xl mx-auto">
        <section className="flex w-[60rem] pt-[3rem]">
          <div className="flex flex-col mx-auto">
            <AddProduct onSearch={handleSearch} />
            <Cart quantity={quantity} productId={productId} />
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
