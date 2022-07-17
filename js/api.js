import * as UI from "./interfaz.js"; //Importamos todas las variables como "UI" del archivo interfaz

//Creamos la clase API
class API{
    //Creamos el constructor con dos argumentos que recibira el valor de ambos campos del formulario
    constructor(artista,cancion){
        //Le decimos que este artista tomara el valor del parametro artista que pasamos en el archivo app(archivo principal) y lo mismo con la cancion
        this.artista = artista;
        this.cancion = cancion;

    };
    consultarAPI(){
        const url = `js/canciones.json`; //Le pasamos la api a una variable llamada url

        fetch(url) //Hacemos fetch y recibimos la respuesta en json y luego al resultado con el array con los objetos lo pasamos a otro metodo llamado buscar Cancion
            .then( respuesta => respuesta.json())
            .then( resultado => this.obtenerCancion(resultado));
    };

    obtenerCancion(resultado){
        //Filtramos el array
        let letraFiltro = resultado.filter( res =>{ 
            //Validamos y quitamos sensibilidad de mayuscula
            return res.artista.toLowerCase() == this.artista.toLowerCase() && res.cancion.toLowerCase() == this.cancion.toLowerCase();
        }
        );
        if( letraFiltro != ""){
            this.mostrarCancion(letraFiltro[0]);
        }else{
            UI.divMensajes.textContent = "Cancion no encontrada";
            UI.divMensajes.classList.add("error");
            UI.headingResultado.innerHTML = "";
            UI.divResultado.innerHTML = "";
            setTimeout(() =>{
                UI.divMensajes.textContent = "";
                UI.divMensajes.classList.remove("error");
            },3000)

        };
    };
    //Imprimimos en html
    mostrarCancion(resultado){
        let {artista,cancion,letra,video} = resultado;

        UI.divResultado.innerHTML = `
        <p class="margin-arriba-0">${letra}</p>
        <iframe width="460" height="415" src="${video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;

        UI.headingResultado.innerHTML = `${artista}: ${cancion}`;
    }
};

export default API;

//EXportamos toda la clase 