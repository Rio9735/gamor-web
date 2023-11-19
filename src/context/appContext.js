import React, { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../config/supabase";

// Crear un nuevo context
const AppContext = createContext();

// Crear un componente de proveedor de autenticación
export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(6);
  // valores admitidos: 'Dark' || 'Light'
  const [theme, setTheme] = useState("Light");

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

  return (
    <AppContext.Provider
      value={{
        user,
        theme,
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
