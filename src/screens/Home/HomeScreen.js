import CategoriesSection from "../../components/CategoriesSection/CategoriesSection";
import MainBoard from "../../components/MainBoard/MainBoard";
import styles from "./HomeScreen.module.css";

export default function HomeScreen() {
  return (
    <div>
      <MainBoard />
      <CategoriesSection />
    </div>
  );
}
