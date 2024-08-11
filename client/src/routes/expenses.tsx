import { createFileRoute } from "@tanstack/react-router";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const getExpenses = async () => {
  const response = await api.expenses.$get();
  const jsonResponse = await response.json();
  return jsonResponse;
};

export const Route = createFileRoute("/expenses")({
  component: () => <Expense />,
});

const Expense = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["Allexpenses"],
    queryFn: getExpenses,
  });
  if (error) return `error has occured ${error.message}`;
  return (
    <div className="p-3 max-w-3xl m-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <div>
              {Array(3)
                .fill(0)
                .map((_, id) => (
                  <TableRow key={id}>
                    <TableCell className="font-medium">
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                  </TableRow>
                ))}
            </div>
          ) : (
            data?.expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.id}</TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell>{expense.amount}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
