// Import stylesheets
// import './style.css';

// Асинхронность, промисы и HTTP.  Домашняя работа

// Задание №1
// Создать программу - список покемонов.

// Пример:
// Bulbasaur
// Ivysaur
// Venusaur
// Charmander
// Charmeleon
// Charizard
// Squirtle
// … и т.п.

// При клике на имя покемона, показать рядом (в соседнем div-е) или во всплывающем
// окне информацию об этом покемоне, например:

// Имя: Charmeleon
// Тип: fire
// Рост: 11
// Вес: 190
// Изображение покемона (дополнительно)

// Указания:
// Список покемонов (первые 20 штук) получить через запрос к API:
// https://pokeapi.co/api/v2/pokemon
// Информацию о каждом покемоне получать через запрос к API:
// https://pokeapi.co/api/v2/pokemon/{id}/
// где {id} - номер покемона
// Подсказка об используемых ключах результата
// (предположим что полученный объект у вас лежит в переменной result)
// Изображение: result.sprites.front_default
// Имя: result.name
// Тип: массив result.types. Из каждого элемента массива можно взять только type.name
// Рост: result.height
// Вес: result.weight

// Дополнительно:
// Используя ссылку на следующую страницу в результате (ссылку на API следующих
// результатов) реализовать пагинацию (постраничный вывод) в программе, т.е.:
// На клик по ссылке “Next” делать запрос на следующие 20 штук, заменять текущий список.
// Реализовать “Previous” и “Next” - возможность возвращаться на страницу ранее



let main = document.querySelector("#app");
let modal = document.querySelector("#modal");
const API = "https://pokeapi.co/api/v2/pokemon";

async function getPokemons() {
  let res = await fetch(API);
  let data = await res.json();
  let results = data.results;
  main.innerHTML = "";
  results.forEach((element) => {
    const id = element.url.split("/")[6];
    main.innerHTML+= `<span onclick="getPokemonInfo(${id})">${element.name}</span> `;
  });
}

async function getPokemonInfo(id) {
  const url = `${API}/${id}`;
  let res = await fetch(url);
  let data = await res.json();
  console.log(modal);
  
  modal.innerHTML = "";
  modal.innerHTML += `
    <h2>${data.name}</h2>
    <img src="${data.sprites.front_default}" alt="Pokemon image">
    <p>Type: ${data.types.map(type => type.type.name).join(', ')}</p>
    <p>Height: ${data.height}</p>
    <p>Weight: ${data.weight}</p>
  `;
}

getPokemons();
