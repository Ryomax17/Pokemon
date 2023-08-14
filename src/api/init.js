//dirección para obtener el listado en formato json:
const pokeapi_URL = "https://pokeapi.co/api/v2/";

//acá esta la url para tener la sección de ability
const ability_URL = "https://pokeapi.co/api/v2/ability/";

//acá esta la url para tener la sección de pokemon
const pokemon_URL = "https://pokeapi.co/api/v2/pokemon/";

//acá esta la url para tener la sección de region
const region_URL = "https://pokeapi.co/api/v2/region/";



//función para mostrar el spinner de carga:
function showSpinner(){
  document.getElementById("spinner-wrapper").style.display = "block"; 
}

//función para ocultar el spinner de carga:
function hideSpinner(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

//función que realiza el fetch() a la url recibida y devuelve un objeto con los datos y el estado de la respuesta:
function getJSONData(url){
    let result = {};
    showSpinner(); 
    return fetch(url) 
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner(); 
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner(); 
        return result;
    });
}