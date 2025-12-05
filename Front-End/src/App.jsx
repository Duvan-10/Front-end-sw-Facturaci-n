// Front-end/src/App.jsx

// 1. Importa el componente Login desde su nueva ubicación modular
import Login from './modules/Auth/Login'; 

function App() {
  // Nota: Más adelante aquí iría la lógica del enrutador (React Router)
  // y la verificación de si el usuario está autenticado.

  return (
    <>
      {/* Por ahora, solo renderizamos el componente Login */}
      <Login />
    </>
  );
}

export default App;