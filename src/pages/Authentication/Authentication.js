import { json, redirect } from "react-router-dom";
import AuthForm from "../../components/Organims/AuthForm/AuthForm";
import { writeAuthToken } from "../../util/auth";
import { addUser, loginUser } from "../../util/twitter-db-handler";

function AuthenticationPage() {
  return <AuthForm />;
}

export async function action({ request }) {
  //Geting form data from action in the router
  const data = await request.formData();

  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "signup";
  //Default state of the page is signup else we take the mode on the URL
  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  if (mode === "signup") {
    //Creating body for request
    const authData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    };
    const response = addUser(authData);

    // Handler specific error responses 401
    if (response.status === 401) {
      return response;
    }

    if (!response.ok) {
      throw json(
        { message: "Something went wrong please try again later." },
        { status: 500 }
      );
    }
    writeAuthToken(response.token);
  } else {
    //Creating body for request
    const authData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    const response = loginUser(authData);
    // Handler specific error responses 401
    if (response.status === 401) {
      return response;
    }

    if (!response.ok) {
      throw json(
        { message: "Something went wrong please try again later." },
        { status: 500 }
      );
    }
    writeAuthToken(response.token);
  }

  return redirect("/");
}

export default AuthenticationPage;
