import { redirect } from "react-router-dom";
import { removeFollower } from "../../util/twitter-db-handler";

export async function action({ request }) {
  //Geting form data from action in the router
  const data = await request.formData();
  removeFollower({ userIDtoUnFollow: data.get("userID") });
  return redirect("/");
}
