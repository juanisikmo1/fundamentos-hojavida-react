//direccion de backend
const API_URL = "http://127.0.0.1:5000";
export const obtenerToken = () => {
    return localStorage.getItem("token");
};
export const apiRequest = async (endpoint, opciones = {}) => {
    token = obtenerToken();
    //crear los encabezados enviar la informacion al sevidor

    const heards = {
        ...opciones.heards
    };
    if (opciones.body) {
        heards["Content-Type"] = "application/json";
    }
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    //peticion fetch a flask
    const respuesta = await fetch(`${API_URL}${endpoint}`, {
        ...opciones,
        headers
    });

    //verificar los errores en la conexion
    const datos = await respuesta.json();
    if (!respuesta.ok){
        throw new Error(datos.mensaje || "error en la peticion");
    };
    return datos;
};


//Registro de usuario
export const registro_usuario = (datos) => {
    return apiRequest("/api/registro-usuario", {
        method: "POST",
        body: JSON.stringify(datos)
    });
};



//inicio sesion
export const iniciarSesion = async (datos) => {
    return apiRequest("/api/login", {
        method: "POST",
        body: JSON.stringify(datos)
    });
    localStorage.setItem("token",respuesta.token);
    localStorage.setItem("usuario"),JSON.stringify(respuesta.usuario);

    return respuesta;
};

//cerrar sesion
export const cerrarSesion = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("usuario")
    
};
