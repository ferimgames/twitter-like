import { redirect } from "react-router-dom";
import { getUserInfo } from "./twitter-db-handler";

//Number of hours for the token to expired
const EXPIRATION_TIME = 1;

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }
  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
}

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  return duration;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/welcome");
  }

  if(!getUserInfo()){
    deleteAuthToken();
    return redirect("/welcome");
  }

  return null; // this is missing in the next lecture video and should be added by you
}
/**
 * Set the authentication token in local storage and set expiration time
 * @param {string} token token returned from server response
 */
export function writeAuthToken(token) {
  localStorage.setItem("token", token);

  const now = new Date();
  now.setHours(now.getHours() + EXPIRATION_TIME);
  localStorage.setItem("expiration", now.toISOString());
}

export function deleteAuthToken() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
}
