import { ReactComponent as Indicator } from "../../assets/svg/indicator.svg";
import { categories } from "../../appData/categories";
import styles from "./CategoriesSection.module.css";
import { useAppData } from "../../context/appContext";

export default function CategoriesSection() {
  const { selectedCategory, setSelectedCategory } = useAppData();

  const handleCategorySelect = (index) => {
    // Actualizar el estado en el contexto
    setSelectedCategory(index);

    // Guardar la categoría en el almacenamiento local
    localStorage.setItem("selectedCategory", JSON.stringify(index));
  };

  return (
    <div className={styles.container}>
      <h3>Trending Categories</h3>
      <div className={styles.categoriesGrid}>
        {categories.map((item, index) => (
          <button
            key={index}
            className={styles.categoryContainer}
            style={
              selectedCategory === index
                ? {
                    background: `linear-gradient(rgba(118, 68, 160, 0.5), rgb(118, 68, 160)), url(${item.image})`,
                    backgroundSize: "cover",
                    color: "#ffffff",
                  }
                : {}
            }
            onClick={() => handleCategorySelect(index)}
          >
            <div
              className={styles.indexContainer}
              style={{
                color: item.color,
              }}
            >
              {index < 7 && (
                <>
                  {selectedCategory !== index && "/"}
                  <p
                    className={styles.catTitle}
                    style={{
                      color: selectedCategory === index ? "#ffffff" : "#666666",
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
                    color: selectedCategory === index ? "#ffffff" : "#222222",
                  }}
                >
                  VIEW ALL
                </p>
              )}
            </div>
            <p
              className={styles.categoryText}
              style={{
                color: selectedCategory === index ? "#ffffff" : "#222222",
              }}
            >
              {item.category}
            </p>
            <Indicator
              color={selectedCategory === index ? "#ffffff" : "#333333"}
              className={styles.indicator}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
