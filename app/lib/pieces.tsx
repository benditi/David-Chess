import BlackQueen from "~/assets/images/Chess_qdt45.svg";
import WhiteQueen from "~/assets/images/Chess_qlt45.svg";
import BlackKnight from "~/assets/images/Chess_ndt45.svg";
import WhiteKnight from "~/assets/images/Chess_nlt45.svg";
import BlackKing from "~/assets/images/Chess_kdt45.svg";
import WhiteKing from "~/assets/images/Chess_klt45.svg";
import BlackRook from "~/assets/images/Chess_rdt45.svg";
import WhiteRook from "~/assets/images/Chess_rlt45.svg";
import BlackPawn from "~/assets/images/Chess_pdt45.svg";
import WhitePawn from "~/assets/images/Chess_plt45.svg";
import BlackBishop from "~/assets/images/Chess_bdt45.svg";
import WhiteBishop from "~/assets/images/Chess_blt45.svg";

export function getPieceSrc(
  color: "black" | "white" | "",
  name: string | null,
) {
  switch (name) {
    case null: {
      return "";
    }
    case "queen": {
      return color === "black" ? BlackQueen : WhiteQueen;
    }
    case "knight": {
      return color === "black" ? BlackKnight : WhiteKnight;
    }
    case "bishop": {
      return color === "black" ? BlackBishop : WhiteBishop;
    }
    case "king": {
      return color === "black" ? BlackKing : WhiteKing;
    }
    case "rook": {
      return color === "black" ? BlackRook : WhiteRook;
    }
    case "pawn": {
      return color === "black" ? BlackPawn : WhitePawn;
    }
    default: {
      return "";
    }
  }
}
