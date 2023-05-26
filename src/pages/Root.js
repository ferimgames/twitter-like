import { Outlet } from "react-router-dom";
import styles from "./Root.module.css";
import MainNavigation from "../components/Atoms/MainNavigation/MainNavigation";
const RootLayout = () => {

  return (
    <>
      <MainNavigation />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
