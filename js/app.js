import * as UI from "./interfaz.js"; //Importamos todas las variables como "UI" del archivo interfaz
import API from "./api.js"; //Importamos la clase API del archivo api

UI.formularioBuscar.addEventListener("submit",buscarCancion); //Llamamos a la variable formulario como previamente habiamos definido UI, seguido de .formularioBuscar para acceder a la variable de formulario y le agregamos el evento de submit para que se ejecute la funcion buscarCancion cuando se envie el formulario.


function buscarCancion(e){
    e.preventDefault(); //<-- Quitamos el evento por defecto que se genera al enviar un formulario (el evento por defecto de un formulario es que se recarga la pagina al enviarlo)

    //Obtener datos del formulario
    const artista = document.querySelector("#artista").value;
    const cancion = document.querySelector("#cancion").value;
    
    if(artista === "" || cancion === ""){
        //EL usuario dejo al menos un campo vacío, mostrarError

        UI.divMensajes.textContent = "¡Error! Todos los campos son obligatorios";
        UI.divMensajes.classList.add("error");
        //Eliminamos el mensaje luego de 3 segundos
        setTimeout(() =>{
            UI.divMensajes.textContent = "";
            UI.divMensajes.classList.remove("error");
        },3000);
        //Detenemos la ejecucion del codigo con "return;"
        return;
    };

    //Consultar api
    const busqueda = new API(artista,cancion); //Pasamos las variables artista(contiene el valor del campo de artista) y cancion(contiene el valor del campo cancion)
    busqueda.consultarAPI();
    //Ejecutamos el metodo consultar Api de nuestra clase API
}
