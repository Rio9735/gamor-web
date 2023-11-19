import actionImage from "../assets/categoriesBg/action.jpg";
import adventureImage from "../assets/categoriesBg/adventure.jpg";
import generic from "../assets/categoriesBg/all.jpg";
import arcadeImage from "../assets/categoriesBg/arcade.jpg";
import fantasyImage from "../assets/categoriesBg/fantasy.jpg";
import shooterImage from "../assets/categoriesBg/shooter.jpg";
import sportImage from "../assets/categoriesBg/sport.jpg";
import strategyImage from "../assets/categoriesBg/strategy.jpg";

export const categories = [
  {
    category: "Action Games",
    color: "var(--color31)",
    image: actionImage,
  },
  { category: "Sport Games", color: "var(--color34)", image: sportImage },
  {
    category: "Adventure Games",
    color: "var(--color33)",
    image: adventureImage,
  },
  {
    category: "Arcade Games",
    color: "var(--color37)",
    image: arcadeImage,
  },
  {
    category: "Fantasy Games",
    color: "var(--color35)",
    image: fantasyImage,
  },
  {
    category: "Strategy",
    color: "var(--color36)",
    image: strategyImage,
  },
  {
    category: "Shooter Games",
    color: "var(--color32)",
    image: shooterImage,
  },
  { category: "All Categories", color: "", image: generic },
];
