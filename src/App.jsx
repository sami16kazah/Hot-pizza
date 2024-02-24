import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home";
import { loader as MenuLoader } from "./features/menu/Menu";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order, { loader as OrderLoader } from "./features/order/Order";
import CreatOrder, {
  action as createOrderAction,
} from "./features/order/CreatOrder";
import AppLayout from "./Components/AppLayout";
import Error from "./Components/Error";
const router = createBrowserRouter([
  {
    element: <AppLayout></AppLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Menu></Menu>,
        loader: MenuLoader,
        errorElement: <Error></Error>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/order/new",
        element: <CreatOrder></CreatOrder>,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order></Order>,
        loader: OrderLoader,
        errorElement: <Error></Error>,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
