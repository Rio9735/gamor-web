import actionImage from "../assets/categoriesBg/action.jpg";
import adventureImage from "../assets/categoriesBg/adventure.jpg";
import generic from "../assets/categoriesBg/all.jpg";
import arcadeImage from "../assets/categoriesBg/arcade.jpg";
import fantasyImage from "../assets/categoriesBg/fantasy.jpg";
import shooterImage from "../assets/categoriesBg/shooter.jpg";
import sportImage from "../assets/categoriesBg/sport.jpg";
import strategyImage from "../assets/categoriesBg/strategy.jpg";

export const categories = [
  { category: "Action Games", color: "#FF5512", image: actionImage },
  { category: "Sport Games", color: "#0B5BDC", image: sportImage },
  { category: "Adventure Games", color: "#DC0B66", image: adventureImage },
  { category: "Arcade Games", color: "#FFF345", image: arcadeImage },
  { category: "Fantasy Games", color: "#8C1EE7", image: fantasyImage },
  { category: "Strategy", color: "#1FF350", image: strategyImage },
  { category: "Shooter Games", color: "#FD0000", image: shooterImage },
  { category: "All Categories", color: "", image: generic },
];
