import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const CartSkeleton = () => {
  return (
    <div className="space-y-4">
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
            {[...Array(3)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-8" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[200px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell className="flex justify-center items-center">
                  <Skeleton className="h-16 w-16" />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3}>
                <Skeleton className="h-4 w-64" />
              </TableCell>
              <TableCell colSpan={2}>
                <Skeleton className="h-4 w-32" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default CartSkeleton;
