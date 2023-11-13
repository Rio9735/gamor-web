import React, { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../config/supabase";

// Crear un nuevo context
const AppContext = createContext();

// Crear un componente de proveedor de autenticación
export function AppProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Escuchar los cambios en el estado de autenticación
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user);
    });
  }, []);

  // Pasar el estado del usuario
  return <AppContext.Provider value={{ user }}>{children}</AppContext.Provider>;
}

// Crear un hook personalizado para usar el contexto de autenticación
export function useAppData() {
  return useContext(AppContext);
}
