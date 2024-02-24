import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Buttons from "./Buttons";

function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="  mb-8 text-xl font-semibold md:text-3xl ">
        The best pizza!
        <br></br>
        <span className="  text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === "" ? (
        <CreateUser></CreateUser>
      ) : (
        <Buttons to={"/menu"} type={"primary"}>
          Continue Ordering, {username}
        </Buttons>
      )}
    </div>
  );
}

export default Home;
