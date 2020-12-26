import { FaWordpressSimple } from "react-icons/fa";

export const convertToTitleCase = (words: string): string =>
  words
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.substr(1))
    .join(" ");
