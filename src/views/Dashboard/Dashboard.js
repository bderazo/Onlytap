import React, {useEffect} from 'react'
import DashboardContent from "./Components/Nabvar";

const Dashboard = () => {

  useEffect(() => {
    // Verificar si el token existe en el almacenamiento local
    const token = localStorage.getItem('token');
    if (!token) { 
      // Redireccionar a la página de inicio de sesión
      window.location.href = '/';
    }
  }, []);

  return (
    <DashboardContent></DashboardContent>
  )
}

export default Dashboard