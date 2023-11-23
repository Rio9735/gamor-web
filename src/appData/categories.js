import { useAppData } from "../context/appContext";
import actionImage from "../assets/categoriesBg/action.webp";
import adventureImage from "../assets/categoriesBg/adventure.webp";
import generic from "../assets/categoriesBg/all.webp";
import arcadeImage from "../assets/categoriesBg/arcade.webp";
import fantasyImage from "../assets/categoriesBg/fantasy.webp";
import shooterImage from "../assets/categoriesBg/shooter.webp";
import sportImage from "../assets/categoriesBg/sport.webp";
import strategyImage from "../assets/categoriesBg/strategy.webp";

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
    image: images[7],
  });
  return categoriesData;
}
