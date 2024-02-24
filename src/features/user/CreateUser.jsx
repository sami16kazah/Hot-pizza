import { useState } from "react";
import Buttons from "../../Components/Buttons";
import { useDispatch } from "react-redux";
import { updateName } from "./UserSlice.js";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!user) return;
    dispatch(updateName(user));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="font-mono mb-4  text-sm text-stone-600  md:text-base">
        👋 Welcome! Please start by telling us your name :
      </p>
      <input
        type="text"
        placeholder="Your full name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="input mb-8 w-72"
      ></input>
      {user !== "" && (
        <div>
          <Buttons type={"primary"}>Start ordering</Buttons>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
