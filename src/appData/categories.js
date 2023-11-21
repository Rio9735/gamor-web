import { useAppData } from "../context/appContext";
import actionImage from "../assets/categoriesBg/action.jpg";
import adventureImage from "../assets/categoriesBg/adventure.jpg";
import generic from "../assets/categoriesBg/all.jpg";
import arcadeImage from "../assets/categoriesBg/arcade.jpg";
import fantasyImage from "../assets/categoriesBg/fantasy.jpg";
import shooterImage from "../assets/categoriesBg/shooter.jpg";
import sportImage from "../assets/categoriesBg/sport.jpg";
import strategyImage from "../assets/categoriesBg/strategy.jpg";

export default function CategoriesManagement() {
  const { categories } = useAppData();
  const colors = [
    "var(--color31)",
    "var(--color34)",
    "var(--color33)",
    "var(--color37)",
    "var(--color35)",
    "var(--color36)",
    "var(--color32)",
  ];
  const images = [
    actionImage,
    sportImage,
    adventureImage,
    arcadeImage,
    fantasyImage,
    strategyImage,
    shooterImage,
    generic,
  ];
  
  const categoriesData = categories.map((item, index) => ({
    category: item.category_name,
    color: colors[index],
    image: images[index],
  }));

  categoriesData.push({
    category: "All Categories",
    color: "",
    imagen: images[7],
  });
  return categoriesData;
}
