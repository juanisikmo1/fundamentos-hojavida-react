import { useState } from "react";

function FormularioAcademico({
  datos,
  setDatos,
  siguiente,
  anterior
}) {

  const [nuevoCurso, setNuevoCurso] = useState("");

  const actualizar = (campo, valor) => {
    setDatos((anterior) => ({
      ...anterior,
      [campo]: valor
    }));
  };

  const agregarCurso = () => {

    if (!nuevoCurso.trim()) {
      alert("Debe ingresar el nombre del curso.");
      return;
    }

    setDatos((anterior) => ({
      ...anterior,
      cursos: [
        ...(anterior.cursos || []),
        nuevoCurso.trim()
      ]
    }));  

    setNuevoCurso("");

  };
  const eliminarCurso = (indice) => {
    setDatos((anterior) => ({
      ...anterior,
      cursos: anterior.cursos.filter(
        (_, i) => i !== indice
      )
    }));
  };

  const continuar = (e) => {

    e.preventDefault();

    if (!datos.nivel) {
      alert("Debe seleccionar el nivel de formación.");
      return;
    }

    if (!datos.titulo || !datos.titulo.trim()) {
      alert("Debe ingresar el título obtenido.");
      return;
    }

    if (!datos.cursos || datos.cursos.length === 0) {
      alert("Debe agregar al menos un curso realizado.");
      return;
    }

    if (
      !datos.institucion ||
      !datos.institucion.trim()
    ) {
      alert("Debe ingresar la institución educativa.");
      return;
    }

    if (!datos.graduacion) {
      alert("Debe ingresar el año de graduación.");
      return;
    }

    const año = Number(datos.graduacion);

    if (año < 1950 || año > 2026) {
      alert(
        "El año de graduación debe estar entre 1950 y 2026."
      );
      return;
    }

    alert("Información académica guardada correctamente.");

    siguiente();
  };

  return (
    <div className="formulario">

      <h2>Información Académica</h2>

      <form onSubmit={continuar}>
        <div className="grupo">

          <label>Nivel de Formación</label>

          <select
            value={datos.nivel || ""}
            onChange={(e) =>
              actualizar("nivel", e.target.value)
            }
          >
            <option value="">
              Seleccione un nivel
            </option>

            <option value="Técnico">
              Técnico
            </option>

            <option value="Tecnólogo">
              Tecnólogo
            </option>

            <option value="Profesional">
              Profesional
            </option>

          </select>
        </div>

        <div className="grupo">
          <label>Título Obtenido</label>

          <input
            type="text"
            placeholder="Ingrese el título"
            value={datos.titulo || ""}
            onChange={(e) =>
              actualizar(
                "titulo",
                e.target.value
              )
            }
          />

        </div>

        <div className="grupo">

          <label>Cursos Realizados</label>

          <div className="agregar-curso">

            <input
              type="text"
              placeholder="Ingrese un curso"
              value={nuevoCurso}
              onChange={(e) =>
                setNuevoCurso(e.target.value)
              }
            />

            <button
              type="button"
              onClick={agregarCurso}
            >
              + Agregar
            </button>

          </div>

          <div className="lista-cursos">

            {(datos.cursos || []).map(
              (curso, indice) => (

                <div
                  className="curso-item"
                  key={indice}
                >

                  <span>
                    ✓ {curso}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      eliminarCurso(indice)
                    }
                  >
                    Eliminar
                  </button>

                </div>

              )
            )}

          </div>

        </div>

        <div className="grupo">
          <label>Institución Educativa</label>

          <input
            type="text"
            placeholder="Ingrese la institución"
            value={datos.institucion || ""}
            onChange={(e) =>
              actualizar(
                "institucion",
                e.target.value
              )
            }
          />

        </div>

        <div className="grupo">
          <label>Año de Graduación</label>

          <input
            type="number"
            min="1950"
            max="2026"
            placeholder="Ejemplo: 2026"
            value={datos.graduacion || ""}
            onChange={(e) =>
              actualizar(
                "graduacion",
                e.target.value
              )
            }
          />

        </div>

        <button
          type="button"
          onClick={anterior}
        >
          Anterior
        </button>

        <button type="submit">
          Siguiente
        </button>

      </form>

    </div>
  );
}

export default FormularioAcademico;