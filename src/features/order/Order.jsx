import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiServices";
import moment from "moment";
import OrderItem from "./OrderItem";

import EmptyCart from "../cart/EmptyCart";

function Order() {
  const order = useLoaderData();
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  if (!cart.length) return <EmptyCart></EmptyCart>;

  const deliveryIn = moment(estimatedDelivery).format("lll");
  return (
    <div className="space-y-8 px-4 py-6  ">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Status</h2>
        <div className="space-x-2 ">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium ">
          {deliveryIn >= 0
            ? `Only ${moment(estimatedDelivery).format("lll")} minutes left `
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated Delivery : {deliveryIn})
        </p>
      </div>

      <ul className="dive-stone-200 divide-y border-b border-t">
        {cart.map((item) => (
          <OrderItem item={item} key={item.pizzaId}></OrderItem>
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5 ">
        <p className="text-sm font-medium text-stone-600">
          Price pizza :$ {orderPrice}
        </p>
        {priority ? (
          <p className="text-sm font-medium text-stone-600">
            Price priority : $ {priorityPrice}
          </p>
        ) : null}

        <p className="font-bold">
          To Pay on delivery : ${" "}
          {priority ? orderPrice + priorityPrice : orderPrice}
        </p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
