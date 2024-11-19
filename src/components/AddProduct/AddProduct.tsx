"use client";
import {
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export interface IAddProductData {
  productId: number;
  quantity: number;
}

export interface IAddProductProps {
  onSearch: (data: IAddProductData) => void;
}

const AddProduct: React.FC<IAddProductProps> = ({ onSearch }) => {
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    onSearch({
      productId: data.productId,
      quantity: data.productQuantity,
    });

    form.reset({
      productId: 0,
      productQuantity: 0,
    });
  };

  const formSchema = z.object({
    productId: z.preprocess(
      (value) => (value ? Number(value) : undefined),
      z
        .number()
        .min(1, { message: "El ID del producto debe ser mayor a 0" })
        .max(20, { message: "El ID del producto debe ser menor a 20" })
    ),
    productQuantity: z.preprocess(
      (value) => (value ? Number(value) : undefined),
      z.number().min(1, { message: "La cantidad debe ser mayor a 0" })
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: 0,
      productQuantity: 0,
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-row items-start justify-between min-w-[900px] gap-4 w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="productQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad</FormLabel>
                <FormControl>
                  <Input
                    className="w-[250px]"
                    placeholder="Cantidad"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID del Producto</FormLabel>
                <FormControl>
                  <Input
                    className="w-[250px]"
                    placeholder="ID del producto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex min-h-[100px]">
          <Button className="self-center" type="submit">
            Agregar producto
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddProduct;
