import { useDispatch } from "react-redux";
import Buttons from "../../Components/Buttons";
import { decreaseItemQuantity, increaseItemQuantity } from "./CartSlice";

function UpdateItemQuantity({ pizzaId, currentQuantitiy }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Buttons
        type={"round"}
        Click={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Buttons>
      <span className="text-sm">{currentQuantitiy}</span>
      <Buttons
        type={"round"}
        Click={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Buttons>
    </div>
  );
}

export default UpdateItemQuantity;
