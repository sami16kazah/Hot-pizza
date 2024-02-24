import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiServices";
import Buttons from "../../Components/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/CartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { fetchAddress } from "../user/UserSlice";

//https://uibakery.io/regex-library/phone-number
const isValidPhone = /^\+?[1-9][0-9]{10,15}$/;
function CreatOrder() {
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const IsSubmitting = navigation.state === "Submitting";
  const formErrors = useActionData();
  const dispatch = useDispatch();
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: addressError,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  if (!cart.length) return <EmptyCart></EmptyCart>;

  return (
    <div className="px-4 py-6">
      <h1 className="mb-8 text-xl font-semibold">
        Ready to order ? Let's go!{" "}
      </h1>
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="font-medium sm:basis-40">First Name</label>
          <input
            type="text"
            className="input"
            defaultValue={username}
            name="customer"
            required
          ></input>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="font-medium sm:basis-40">Phone Number</label>
          <input type="tel" className="input  " name="phone" required></input>
        </div>
        {formErrors?.phone && (
          <p className="mb-2 mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
            {formErrors.phone}
          </p>
        )}

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="font-medium sm:basis-40">Address</label>
          <input
            className="input w-full "
            type="text"
            name="address"
            disabled={isLoadingAddress}
            defaultValue={address}
            required
          ></input>
          <span className="absolute  right-0.5 top-9 z-50  sm:bottom-0.5 sm:top-1">
            <Buttons
              type={"small"}
              disabled={isLoadingAddress}
              Click={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}
            >
              Get Position
            </Buttons>
          </span>
        </div>
        {addressStatus === "error" && (
          <p className="mb-2 mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
            {addressError}
          </p>
        )}

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center ">
          <input
            type="checkBox"
            name="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          ></input>
          <label className="font-medium sm:basis-80">
            Want to you to give order priority ?
          </label>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <input type="hidden" name="cart" value={JSON.stringify(cart)}></input>
          <input
            type="hidden"
            name="position"
            value={
              position.longtitude
                ? `${position.latitude} , ${position.longitude}`
                : ""
            }
          ></input>
          <Buttons disabled={IsSubmitting} type={"primary"}>
            {IsSubmitting ? "Placing Order ..." : "Order Now"}
          </Buttons>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const orderPrice = JSON.parse(data.cart).reduce(
    (sum, curr) => sum + curr.totalPrice,
    0,
  );
  const order = {
    ...data,
    status: false,
    estimatedDelivery: Date.now(),
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
    orderPrice: orderPrice,
    priorityPrice: 25,
  };

  const errors = {};
  if (!isValidPhone.test(order.phone.toString().trim().replace(" ", ""))) {
    errors.phone = "Please enter valid phone number";
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreatOrder;
