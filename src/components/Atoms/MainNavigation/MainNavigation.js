import { Form, useRouteLoaderData } from "react-router-dom";
import { getUserInfo } from "../../../util/twitter-db-handler";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const token = useRouteLoaderData("root");
  let userNavHTL = "";
  if (token) {
    const userName = getUserInfo() ? getUserInfo().name : "";
    if (userName !== "") {
      userNavHTL = (
        <>
          <li>{userName}</li>
          <li>
            <Form action="/logout" method="post">
              <button>Logout</button>
            </Form>
          </li>
        </>
      );
    }
  }

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          {userNavHTL}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
