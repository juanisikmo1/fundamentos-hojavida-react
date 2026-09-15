import { useState } from "react";

import Header from "./components/Header";
import FormularioDatos from "./components/FormularioDatos";
import FormularioAcademico from "./components/FormularioAcademico";
import FormularioExperiencia from "./components/FormularioExperiencia";
import VistaPrevia from "./components/VistaPrevia.jsx";
import Footer from "./components/Footer";
import "./App.css";

function App() {

  const [paso, setPaso] = useState(1);
  const [datos, setDatos] = useState({});
  const [academico, setAcademico] = useState({});
  const [experiencia, setExperiencia] = useState([]);
  const [idHojaVida, setIdHojaVida] = useState(null);

  //conectar react con flask
  const guardarhojavida = async () => {
    
    try{

      const datosapi = {
        nombre:datos.nombre,
        edad:datos.edad,
        ciudad:datos.ciudad,
        correo:datos.correo,
        fotografia:datos.fotografia,
        programa:datos.programa,
        ficha:datos.ficha,
        jornada:datos.jornada
        /*nivel: datos.nivel,
        institucion: datos.institucion,
        titulo: datos.titulo,
        anio: datos.anio,
        cursos: datos.cursos,

        experiencias: datos.experiencias,*/
      };

      const respuesta = await fetch(
          "http://127.0.0.1:5000/api/registrohv",
        {
          method:"POST",
          headers:{
            "Content-type":"application/json"
          },

          body: JSON.stringify(datosapi),

        });
      if (!respuesta.ok) {
        const error = await respuesta.text();
        console.error("Error del servidor:", error);
        return;
      }

      const resultado = await respuesta.json();

      setidHojaVida(resultado.id)

      console.log("respuesta realizada", resultado);
      console.log("Id de la hoja de vida guardado", resultado.id);




    }catch (error){
      console.error(
        "error al conectar con flask",error
      );
    }
  };
  return (
    <div className="contenedor">

        <Header />

        {paso === 1 && (
          <FormularioDatos
            datos={datos}
            setDatos={setDatos}
            siguiente={() => setPaso(2)}
          />
        )}
        {paso === 2 && (
          <FormularioAcademico
            datos={academico}
            setDatos={setAcademico}
            anterior={()=> setPaso(1)}
            siguiente={() => setPaso(3)}
          />
        )}
        {paso === 3 && (
          <FormularioExperiencia
            datos={experiencia}
            setDatos={setExperiencia}
            anterior={()=> setPaso(2)}
            siguiente={() => setPaso(4)}
          />
        )}

        {paso === 4 && (
        <VistaPrevia
          datos={datos}
          academico={academico}
          experiencia={experiencia}
          anterior={() => setPaso(3)}
          guardarhojavida={guardarhojavida}
        />
      )}

        <Footer />

    </div>
  );
}

export default App;