import { useFetcher } from "react-router-dom";
import Buttons from "../../Components/Buttons";
import { updateOrder } from "../../services/apiServices";

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Buttons type={"primary"}>Make priority</Buttons>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
