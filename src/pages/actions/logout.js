import { redirect } from "react-router-dom";
import { deleteAuthToken } from "../../util/auth"

export function action() {
  deleteAuthToken();
  return redirect("/welcome");
}
