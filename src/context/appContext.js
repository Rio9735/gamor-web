import React, { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../config/supabase";

// Crear un nuevo context
const AppContext = createContext();

// Crear un componente de proveedor de autenticación
export function AppProvider({ children }) {
  // valores admitidos: 'Dark' || 'Light'
  const [loading, setLoading] = useState(true); // Manejar el estado de carga
  const [error, setError] = useState(false); // Manejar error al cargar los datos
  const [theme, setTheme] = useState("Light");
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(6);

  // Actualizar el estado del tema con el valor guardado
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }

    // Escuchar los cambios en el estado de autenticación
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user);

      // Si el usuario está autenticado, recuperar la categoría del almacenamiento local
      if (session?.user) {
        const savedCategory = localStorage.getItem("selectedCategory");
        // Solo se recuperará la categoría si el valor almacenado corresponde con una posición válida del arreglo de categorías
        if (savedCategory && savedCategory >= 0 && savedCategory <= 7) {
          setSelectedCategory(JSON.parse(savedCategory));
        }
      }
    });
  }, []);

  // Manejar el cambio de tema y guardar el tema actual en el almacenamiento local
  const toggleTheme = () => {
    if (theme === "Light") {
      setTheme("Dark");
      window.localStorage.setItem("theme", "Dark");
    } else {
      setTheme("Light");
      window.localStorage.setItem("theme", "Light");
    }
  };

  // Funciones para obtener los datos de la bd
  async function fetchCategories() {
    setLoading(true);
    try {
      let { data: categories, error } = await supabase
        .from("category")
        .select("*");
      if (error) throw error;
      setCategories(categories);
      setError(false);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Obtener los datos de la tabla categories
    fetchCategories();

    // Configurar un intervalo para volver a cargar los datos cada 5 segundos si hay un error
    const interval = setInterval(() => {
      if (error) {
        fetchCategories();
      }
    }, 5000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [error]);

  return (
    <AppContext.Provider
      value={{
        loading,
        error,
        theme,
        user,
        categories,
        toggleTheme,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Crear un hook personalizado para usar el contexto de autenticación
export function useAppData() {
  return useContext(AppContext);
}
