import { useState } from "react";
import { ReactComponent as Indicator } from "../../assets/svg/indicator.svg";
import actionImage from "../../assets/categoriesBg/action.jpg";
import adventureImage from "../../assets/categoriesBg/adventure.jpg";
import generic from "../../assets/categoriesBg/all.jpg";
import arcadeImage from "../../assets/categoriesBg/arcade.jpg";
import fantasyImage from "../../assets/categoriesBg/fantasy.jpg";
import shooterImage from "../../assets/categoriesBg/shooter.jpg";
import sportImage from "../../assets/categoriesBg/sport.jpg";
import strategyImage from "../../assets/categoriesBg/strategy.jpg";
import styles from "./CategoriesSection.module.css";

export default function CategoriesSection() {
  const [selectedButton, setSelectedButton] = useState(6);
  const categories = [
    { category: "Action Games", color: "#FF5512", image: actionImage },
    { category: "Sport Games", color: "#0B5BDC", image: sportImage },
    { category: "Adventure Games", color: "#DC0B66", image: adventureImage },
    { category: "Arcade Games", color: "#FFF345", image: arcadeImage },
    { category: "Fantasy Games", color: "#8C1EE7", image: fantasyImage },
    { category: "Strategy", color: "#1FF350", image: strategyImage },
    { category: "Shooter Games", color: "#FD0000", image: shooterImage },
    { category: "All Categories", color: "", image: generic },
  ];
  return (
    <div className={styles.container}>
      <h3>Trending Categories</h3>
      <div className={styles.categoriesGrid}>
        {categories.map((item, index) => (
          <button
            key={index}
            className={styles.categoryContainer}
            style={
              selectedButton === index
                ? {
                    background: `linear-gradient(rgba(118, 68, 160, 0.5), rgb(118, 68, 160)), url(${item.image})`,
                    backgroundSize: "cover",
                    color: "#ffffff",
                  }
                : {}
            }
            onClick={() => setSelectedButton(index)}
          >
            <div
              className={styles.indexContainer}
              style={{
                color: item.color,
              }}
            >
              {index < 7 && (
                <>
                  {selectedButton !== index && "/"}
                  <p
                    className={styles.catTitle}
                    style={{
                      color: selectedButton === index ? "#ffffff" : "#666666",
                    }}
                  >
                    {(index + 1).toString().padStart(2, 0)}
                  </p>
                </>
              )}
              {index >= 7 && (
                <p
                  className={styles.catTitle}
                  style={{
                    color: selectedButton === index ? "#ffffff" : "#222222",
                  }}
                >
                  VIEW ALL
                </p>
              )}
            </div>
            <p
            className={styles.categoryText}
              style={{
                color: selectedButton === index ? "#ffffff" : "#222222",
              }}
            >
              {item.category}
            </p>
            <Indicator
              color={selectedButton === index ? "#ffffff" : "#333333"}
              className={styles.indicator}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
