console.log("El archivo init.js se ha cargado correctamente.");

//dirección para obtener el listado en formato json:
const pokeapi_URL = "https://pokeapi.co/api/v2/";
const ability_URL = "https://pokeapi.co/api/v2/ability/";
const pokemon_URL = "https://pokeapi.co/api/v2/pokemon/";
const region_URL = "https://pokeapi.co/api/v2/region/";

function getJSONData(url) {
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(data => {
      return { status: 'ok', data: data };
    })
    .catch(error => {
      return { status: 'error', data: error };
    });
}

function displayJSONData(url) {
  getJSONData(url)
    .then(data => {
      const list = document.getElementById("dataList"); // Obtener el elemento de lista
      list.innerHTML = ""; // Limpiar contenido anterior

      // Iterar sobre los datos y agregar elementos de lista
      data.data.results.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name}`;
        list.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error("Error al obtener datos JSON:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("searchButton"); // Obtener el botón "Search"
  const selectCategory = document.querySelector(".form-select"); // Obtener el select

  // Agregar evento de clic al botón "Search"
  searchButton.addEventListener("click", function () {
    // Obtener el valor seleccionado del select
    const selectedValue = selectCategory.value;

    // Según la opción seleccionada, obtener la URL correspondiente
    let categoryURL = "";
    if (selectedValue === "1") {
      categoryURL = pokemon_URL;
    } else if (selectedValue === "2") {
      categoryURL = ability_URL;
    } else if (selectedValue === "3") {
      categoryURL = region_URL;
    }

    // Llamar a la función para mostrar los datos
    displayJSONData(categoryURL);
  });

  // Llamar a la función cuando se carga la página
  displayJSONData();
});