import React, { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../config/supabase";

// Crear un nuevo context
const AppContext = createContext();

// Crear un componente de proveedor de autenticación
export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(6);
  // valores admitidos: 'dark' || 'light'
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const isDarkTheme = JSON.parse(localStorage.getItem("darkTheme"));
    if (isDarkTheme) {
      setDarkTheme(isDarkTheme);
    }

    // Escuchar los cambios en el estado de autenticación
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user);

      // Si el usuario está autenticado, recuperar la categoría del almacenamiento local
      if (session?.user) {
        const savedCategory = localStorage.getItem("selectedCategory");
        // Solo se recuperará la categoría si el valor almacenado corresponde con una posición valida del arreglo de categorías
        if (savedCategory && savedCategory >= 0 && savedCategory <= 7) {
          setSelectedCategory(JSON.parse(savedCategory));
        }
      }
    });
  }, []);

  // función para el cambio de tema
  const toggleTheme = () => {
    if (!darkTheme) {
      window.localStorage.setItem("darkTheme", JSON.stringify(true));
      setDarkTheme(true);
    } else {
      window.localStorage.setItem("darkTheme", JSON.stringify(false));
      setDarkTheme(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        darkTheme,
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
