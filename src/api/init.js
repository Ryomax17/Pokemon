console.log("El archivo init.js se ha cargado correctamente.");

document.addEventListener("DOMContentLoaded", function () {
  const categorySelect = document.getElementById("categorySelect");
  const searchButton = document.getElementById("searchButton");
  const dataList = document.getElementById("dataList");
  const selectedCategoryTitle = document.getElementById("selectedCategoryTitle");
  const selectedCategorySection = document.getElementById("selectedCategorySection");

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
        dataList.innerHTML = ""; // Limpiar contenido anterior

        // Mostrar el título de la categoría seleccionada
        const selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;
        selectedCategoryTitle.textContent = selectedCategory;
        selectedCategorySection.classList.remove("d-none"); // Mostrar la sección del título

        // Iterar sobre los datos y agregar elementos de lista
        data.data.results.forEach(item => {
          const listItem = document.createElement("li");
          listItem.textContent = `${item.name}`;
          dataList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error("Error al obtener datos JSON:", error);
      });
  }

  searchButton.addEventListener("click", function () {
    const selectedValue = categorySelect.value;
    let categoryURL = "";
    if (selectedValue === "1") {
      categoryURL = pokemon_URL;
    } else if (selectedValue === "2") {
      categoryURL = ability_URL;
    } else if (selectedValue === "3") {
      categoryURL = region_URL;
    }
    displayJSONData(categoryURL);
  });

  // Llamar a la función cuando se carga la página
  displayJSONData();
});