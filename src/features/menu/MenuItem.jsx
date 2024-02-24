import { useDispatch, useSelector } from "react-redux";
import Buttons from "../../Components/Buttons";
import { addItem, getCurrentQuantityById } from "../cart/CartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
function MenuItem({ item }) {
  const { id, name, unitPrice, imageUrl, soldOut, ingredients } = item;
  const dispatch = useDispatch();
  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name: name,
      unitPrice: unitPrice,
      quantity: 1,
      totalPrice: 1 * unitPrice,
    };
    dispatch(addItem(newItem));
  }
  const currentQuantitiy = useSelector(getCurrentQuantityById(id));

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      ></img>
      <div className="flex flex-grow flex-col pt-0.5">
        <p className="font-medium ">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm ">${unitPrice}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {currentQuantitiy > 0 && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantitiy={currentQuantitiy}
              ></UpdateItemQuantity>
              <DeleteItem pizzaId={id}></DeleteItem>
            </div>
          )}

          {!soldOut && !currentQuantitiy > 0 && (
            <Buttons Click={handleAddToCart} type={"small"}>
              Add to cart
            </Buttons>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
