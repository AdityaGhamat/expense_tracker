import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "./lib/api";
import { useQuery } from "@tanstack/react-query";

const App = () => {
  async function getTodos() {
    const firstResponse = await api.expenses["totalexpenses"].$get();
    const jsonResponse = await firstResponse.json();
    return jsonResponse;
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
  if (error) return error.message;
  return (
    <div className="w-[350px] m-auto">
      <Card>
        <CardHeader>
          <CardTitle>Expense Card</CardTitle>
          <CardDescription>Find your expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Expenses: {isLoading ? "..." : data?.total}</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default App;
