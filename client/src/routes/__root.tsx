import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => <Root />,
});

const Navbar = () => {
  return (
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
      <Link to="/expenses" className="[&.active]:font-bold">
        Expenses
      </Link>
      <Link to="/create-expenses" className="[&.active]:font-bold">
        Create Expenses
      </Link>
    </div>
  );
};

const Root = () => {
  return (
    <>
      <Navbar />
      <hr />
      <Outlet />
    </>
  );
};
