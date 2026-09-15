function FormularioDatos({ datos, setDatos, siguiente }) {

  const actualizar = (campo, valor) => {
    setDatos((anterior) => ({
      ...anterior,
      [campo]: valor
    }));
  };

  const continuar = (e) => {
    e.preventDefault();

    if (!datos.nombre || !datos.nombre.trim()) {
      alert("Debe ingresar su nombre completo.");
      return;
    }

    if (datos.edad === "" || datos.edad === undefined) {
      alert("Debe ingresar su edad.");
      return;
    }

    if (Number(datos.edad) < 0 || Number(datos.edad) > 100) {
      alert("La edad debe estar entre 0 y 100 años.");
      return;
    }

    if (!datos.ciudad || !datos.ciudad.trim()) {
      alert("Debe ingresar su ciudad.");
      return;
    }

    if (!datos.programa || !datos.programa.trim()) {
      alert("Debe ingresar el programa de formación.");
      return;
    }

    if (!datos.correo || !datos.correo.trim()) {
      alert("Debe ingresar su correo electrónico.");
      return;
    }

    if (datos.correo.length > 50) {
      alert("El correo no puede superar los 50 caracteres.");
      return;
    }

    const correoValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo);

    if (!correoValido) {
      alert("Ingrese un correo electrónico válido.");
      return;
    }

    if (!datos.ficha || !datos.ficha.trim()) {
      alert("Debe ingresar el número de ficha.");
      return;
    }

    if (!datos.jornada) {
      alert("Debe seleccionar una jornada.");
      return;
    }

    siguiente();
  };

  return (
    <div className="formulario">

      <h2>Registro de Aprendices</h2>

      <form onSubmit={continuar}>

        <div className="grupo">
          <label>Fotografía</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const archivo = e.target.files?.[0];

              if (archivo) {
                const imagenURL =
                  URL.createObjectURL(archivo);

                actualizar("foto", imagenURL);
              }
            }}
          />
        </div>

        <div className="grupo">
          <label>Nombre Completo</label>

          <input
            type="text"
            placeholder="Ingrese su nombre"
            value={datos.nombre || ""}
            onChange={(e) =>
              actualizar("nombre", e.target.value)
            }
          />
        </div>

        <div className="grupo">
          <label>Edad</label>

          <input
            type="number"
            min="0"
            max="100"
            placeholder="Ingrese su edad"
            value={datos.edad || ""}
            onChange={(e) =>
              actualizar("edad", e.target.value)
            }
          />
        </div>

        <div className="grupo">
          <label>Ciudad</label>

          <input
            type="text"
            placeholder="Ingrese su ciudad"
            value={datos.ciudad || ""}
            onChange={(e) =>
              actualizar("ciudad", e.target.value)
            }
          />
        </div>

        <div className="grupo">
          <label>Programa de formación</label>

          <input
            type="text"
            placeholder="Ejemplo: ADSO"
            value={datos.programa || ""}
            onChange={(e) =>
              actualizar("programa", e.target.value)
            }
          />
        </div>

        <div className="grupo">
          <label>Correo Electrónico</label>

          <input
            type="email"
            maxLength="50"
            placeholder="correo@sena.edu.co"
            value={datos.correo || ""}
            onChange={(e) =>
              actualizar("correo", e.target.value)
            }
          />
        </div>

        <div className="grupo">
          <label>Número de Ficha</label>

          <input
            type="number"
            min="1"
            placeholder="Ingrese la ficha"
            value={datos.ficha || ""}
            onChange={(e) =>
              actualizar("ficha", e.target.value)
            }
          />
        </div>

        <div className="grupo">
          <label>Jornada</label>

          <select
            value={datos.jornada || ""}
            onChange={(e) =>
              actualizar("jornada", e.target.value)
            }
          >
            <option value="">
              Seleccione una jornada
            </option>

            <option>Mañana</option>
            <option>Tarde</option>
            <option>Noche</option>
            <option>Mixta</option>
          </select>
        </div>

        <button type="submit">
          Continuar Registro
        </button>

      </form>

    </div>
  );
}

export default FormularioDatos;