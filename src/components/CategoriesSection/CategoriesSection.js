import { ReactComponent as Indicator } from "../../assets/svg/indicator.svg";
import { useAppData } from "../../context/appContext";
import { categories } from "../../appData/categories";
import styles from "./CategoriesSection.module.css";

export default function CategoriesSection() {
  const { theme } = useAppData();
  const { selectedCategory, setSelectedCategory } = useAppData();

  const handleCategorySelect = (index) => {
    // Actualizar el estado en el contexto
    setSelectedCategory(index);

    // Guardar la categoría en el almacenamiento local
    localStorage.setItem("selectedCategory", JSON.stringify(index));
  };

  return (
    <div className={styles.container}>
      <h3 className={styles[`title${theme}`]}>Trending Categories</h3>
      <div className={styles.grid}>
        {categories.map((item, index) => (
          <button
            key={index}
            className={`${styles.categoryContainer} ${
              styles[`categoryContainer${theme}`]
            }`}
            style={
              selectedCategory === index
                ? {
                    background: `linear-gradient(var(--color17), var(--color9)), url(${item.image})`,
                    backgroundSize: "cover",
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
                      selectedCategory === index || theme === "Dark"
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
                    selectedCategory === index || theme === "Dark"
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
                selectedCategory === index || theme === "Dark"
                  ? styles.categoryNameDark
                  : styles.categoryNameLight
              }`}
            >
              {item.category}
            </p>
            <Indicator
              className={`${styles.indicator} ${
                selectedCategory === index || theme === "Dark"
                  ? styles.indicatorDark
                  : styles.indicatorLight
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
