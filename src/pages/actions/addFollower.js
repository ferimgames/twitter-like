import { redirect } from "react-router-dom";
import { addFollower } from "../../util/twitter-db-handler";

export async function action({ request }) {
  //Geting form data from action in the router
  const data = await request.formData();
  addFollower({ userIDtoFollow: data.get("userID") });
  return redirect("/");
}
