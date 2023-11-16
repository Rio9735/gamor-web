import { ReactComponent as Indicator } from "../../assets/svg/indicator.svg";
import { useAppData } from "../../context/appContext";
import { categories } from "../../appData/categories";
import styles from "./CategoriesSection.module.css";

export default function CategoriesSection() {
  const { darkTheme } = useAppData();
  const { selectedCategory, setSelectedCategory } = useAppData();

  const handleCategorySelect = (index) => {
    // Actualizar el estado en el contexto
    setSelectedCategory(index);

    // Guardar la categoría en el almacenamiento local
    localStorage.setItem("selectedCategory", JSON.stringify(index));
  };

  return (
    <div className={styles.container}>
      <h3 className={darkTheme ? styles.titleDark : styles.titleLight}>
        Trending Categories
      </h3>
      <div className={styles.grid}>
        {categories.map((item, index) => (
          <button
            key={index}
            className={`${styles.categoryContainer} ${
              darkTheme
                ? styles.categoryContainerDark
                : styles.categoryContainerLight
            }`}
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
                    className={`${styles.categoryTitle} ${
                      selectedCategory === index || darkTheme
                        ? styles.categoryTitleDark
                        : styles.categoryTitleLight
                    }`}
                  >
                    {(index + 1).toString().padStart(2, 0)}
                  </p>
                </>
              )}
              {index >= 7 && (
                <p
                  className={`${styles.categoryTitle} ${
                    selectedCategory === index || darkTheme
                      ? styles.categoryTitleDark
                      : styles.categoryTitleLight
                  } `}
                >
                  VIEW ALL
                </p>
              )}
            </div>
            <p
              className={`${styles.text} ${
                selectedCategory === index || darkTheme
                  ? styles.categoryNameDark
                  : styles.categoryNameLight
              }`}
            >
              {item.category}
            </p>
            <Indicator
              color={
                selectedCategory === index || darkTheme ? "#ffffff" : "#333333"
              }
              className={styles.indicator}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
