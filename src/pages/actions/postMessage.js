import { redirect } from "react-router-dom";
import { addPost } from "../../util/twitter-db-handler";

export async function action({ request }) {
  //Geting form data from action in the router
  const data = await request.formData();
  const content = data.get("content");
  addPost({content})
  return redirect("/");
}
