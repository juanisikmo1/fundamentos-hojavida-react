function VistaPrevia({
  datos = {},
  academico = {},
  experiencia = {},
  guardarhojavida,
  anterior
}) {
  const campo = (etiqueta, valor) => (
    <p>
      <strong>{etiqueta}:</strong> {valor || "No registrado"}
    </p>
  );

  return (
    <div className="formulario vista-previa">

      <h2>Vista Previa de la Hoja de Vida</h2>

      <div className="preview-seccion">
        <h3>Datos personales</h3>

        {datos.foto && (
          <div className="foto-preview">
            <img
              src={datos.foto}
              alt="Fotografía del aprendiz"
            />
          </div>
        )}
        {campo("Nombre", datos.nombre)}
        {campo("Edad", datos.edad)}
        {campo("Ciudad", datos.ciudad)}
        {campo("Correo", datos.correo)}
        {campo("Programa", datos.programa)}
        {campo("Ficha", datos.ficha)}
        {campo("Jornada", datos.jornada)}
      </div>

      <div className="preview-seccion">
        <h3>Información académica</h3>

        {campo("Nivel", academico.nivel)}
        {campo("Título", academico.titulo)}
        {campo("Institución", academico.institucion)}
        {campo("Año de graduación", academico.graduacion)}

        <p>
          <strong>Cursos realizados:</strong>
        </p>

        <div className="cursos-preview">
          {(academico.cursos || []).map((curso, indice) => (
            <div className="curso-preview" key={indice}>
              {curso}
            </div>
          ))}
        </div>
      </div>
      <div className="preview-seccion">
        <h3>Experiencia laboral</h3>

        {experiencia.length === 0 ? (
    <p>No hay experiencias registradas.</p>
  ) : (
    experiencia.map((exp, indice) => (

        <div
          className="experiencia-preview"
          key={indice}
        >

          <h4>
            Experiencia {indice + 1}
          </h4>

          {campo("Empresa", exp.empresa)}
          {campo("Cargo", exp.cargo)}
          {campo("Tiempo de experiencia", exp.tiempo)}
          {campo("Funciones", exp.funciones)}
          {campo("Habilidades", exp.habilidades)}

        </div>
        ))
      )}
      </div>

      <button
        type="button"
        onClick={anterior}
      >
        Anterior
      </button>
      <button 
      type="button"
      onClick={guardarhojavida}
      >
        Guardar hoja de vida
      </button>

    </div>
  );
}

export default VistaPrevia;