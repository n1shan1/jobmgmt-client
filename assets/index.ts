import amazonLogo from "./amazon.svg";
import swiggyLogo from "./swiggy.svg";
import teslaLogo from "./tesla.svg";
import logo from "./logo.svg";
import placeholder from "./placeholder.svg";

export const companyLogos = {
  amazon: amazonLogo,
  swiggy: swiggyLogo,
  tesla: teslaLogo,
};
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
export const LOGO = logo;
export const PLACEHOLDER = placeholder;
