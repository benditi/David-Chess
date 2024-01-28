import BlackQueen from "~/assets/images/Chess_qdt45.svg";
import BlackKnight from "~/assets/images/Chess_bdt45.svg";
import BlackKing from "~/assets/images/Chess_kdt45.svg";
import BlackRook from "~/assets/images/Chess_rdt45.svg";

export function getPieceSrc(color: "black" | "white" | "", name: string) {
  switch (name) {
    case "queen": {
      return color === "black" ? BlackQueen : "";
    }
    case "knight": {
      return color === "black" ? BlackKnight : "";
    }
    case "king": {
      return color === "black" ? BlackKing : "";
    }
    case "rook": {
      return color === "black" ? BlackRook : "";
    }
    default: {
      return "";
    }
  }
}
