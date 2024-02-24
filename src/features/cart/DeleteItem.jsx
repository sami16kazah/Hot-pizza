import { useDispatch } from "react-redux";
import Buttons from "../../Components/Buttons";
import { deleteItem } from "./CartSlice";

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Buttons type={"small"} Click={(e) => dispatch(deleteItem(pizzaId))}>
      {" "}
      delete
    </Buttons>
  );
}

export default DeleteItem;
