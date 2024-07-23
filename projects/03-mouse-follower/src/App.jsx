import { useState, useEffect } from "react";
import "./App.css";

const FollowMouse = () => {
  const [followEnabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Pointer Move
  useEffect(() => {
    console.log("efecto: ", followEnabled);

    // Esta funcion va a manejar que pasa cada vez que se mueve el puntero
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
    };

    // Puede ser que el usuario desactive el seguimiento del puntero,
    // para eso existe followEnabled, y por lo tanto este if.
    if (followEnabled) {
      window.addEventListener("pointermove", handleMove);
    }

    // Este es el cleanup
    // Se ejecuta cada vez que se desmonta el componente (deje de aparecer el componente),
    // y cada vez que cambie la dependencia (followEnabled en este caso)
    return () => {
      window.removeEventListener("pointermove", handleMove);
      console.log("Cleanup of FollowMouse!");
    };
  }, [followEnabled]);

  // Change body className for hiding cursor
  useEffect(() => {
    // Basically, adds or removes no-cursor based on the value of followEnabled
    document.body.classList.toggle("no-cursor", followEnabled);

    // esto existe para el caso en el que se desmonte FollowMouse mientras este oculto el cursor.
    return () => {
      document.body.classList.remove("no-cursor");
    };
  }, [followEnabled]);
  return (
    <>
      <div
        style={{
          position: "absolute",
          backgroundColor: "#09f",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          left: -20,
          top: -20,
          width: 40,
          height: 40,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      ></div>
      <button
        onClick={() => {
          setEnabled(!followEnabled);
        }}
      >
        {followEnabled ? "Desactivar" : "Activar"} seguir puntero
      </button>
    </>
  );
};

function App() {
  const [mounted, setMounted] = useState(true);

  return (
    <main>
      {mounted && <FollowMouse />}
      <button
        onClick={() => {
          setMounted(!mounted);
        }}
      >
        Toggle mounted
      </button>
    </main>
  );
}

export default App;
