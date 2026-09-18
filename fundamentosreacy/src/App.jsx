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

  try {

    const datosapi = {
      nombre: datos.nombre,
      edad: datos.edad,
      ciudad: datos.ciudad,
      correo: datos.correo,
      fotografia: datos.fotografia,
      programa: datos.programa,
      ficha: datos.ficha,
      jornada: datos.jornada
    };

    const respuesta = await fetch(
      "http://127.0.0.1:5000/api/registrohv",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datosapi)
      }
    );

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      alert(resultado.mensaje || "Error al guardar la hoja de vida");
      return;
    }

    const id = resultado.id;

    setIdHojaVida(id);

    console.log("Hoja de vida creada:", id);

    const estudio = {
      nivel: academico.nivel,
      institucion: academico.institucion,
      titulo: academico.titulo,
      anio_graduacion: Number(academico.graduacion)
    };

    const respuestaEstudio = await fetch(
      `http://127.0.0.1:5000/api/hojas-vida/${id}/estudios`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(estudio)
      }
    );

    const resultadoEstudio = await respuestaEstudio.json();

    if (!respuestaEstudio.ok) {
      alert(
        resultadoEstudio.mensaje ||
        "Error al guardar el estudio"
      );
      return;
    }

    console.log("Estudio guardado:", resultadoEstudio);


    if (academico.cursos && academico.cursos.length > 0) {

      for (const curso of academico.cursos) {

        const respuestaCurso = await fetch(
          `http://127.0.0.1:5000/api/hojas-vida/${id}/cursos`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              nombre: curso
            })
          }
        );

        const resultadoCurso = await respuestaCurso.json();

        if (!respuestaCurso.ok) {
          alert(
            resultadoCurso.mensaje ||
            "Error al guardar un curso"
          );
          return;
        }

        console.log("Curso guardado:", resultadoCurso);
      }
    }


    if (experiencia && experiencia.length > 0) {

      for (const exp of experiencia) {

        const datosExperiencia = {
          empresa: exp.empresa,
          cargo: exp.cargo,
          tiempo: exp.tiempo,
          funciones: exp.funciones
        };

        const respuestaExperiencia = await fetch(
          `http://127.0.0.1:5000/api/hojas-vida/${id}/experiencias`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(datosExperiencia)
          }
        );

        const resultadoExperiencia =
          await respuestaExperiencia.json();

        if (!respuestaExperiencia.ok) {
          alert(
            resultadoExperiencia.mensaje ||
            "Error al guardar la experiencia"
          );
          return;
        }

        console.log(
          "Experiencia guardada:",
          resultadoExperiencia
        );

        const idExperiencia =
          resultadoExperiencia.id;

        if (exp.habilidades && exp.habilidades.trim()) {

          const habilidades = exp.habilidades
            .split(",")
            .map((habilidad) => habilidad.trim())
            .filter((habilidad) => habilidad !== "");

          for (const habilidad of habilidades) {

            const respuestaHabilidad = await fetch(
              `http://127.0.0.1:5000/api/experiencias/${idExperiencia}/habilidades`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  nombre: habilidad
                })
              }
            );

            const resultadoHabilidad =
              await respuestaHabilidad.json();

            if (!respuestaHabilidad.ok) {
              alert(
                resultadoHabilidad.mensaje ||
                "Error al guardar una habilidad"
              );
              return;
            }

            console.log(
              "Habilidad guardada:",
              resultadoHabilidad
            );
          }
        }
      }
    }

    console.log("Hoja de vida guardada completamente");

    alert(
      "Hoja de vida guardada correctamente"
    );

  } catch (error) {

    console.error(
      "Error al conectar React con Flask:",
      error
    );

    alert(
      "No se pudo conectar con el servidor"
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