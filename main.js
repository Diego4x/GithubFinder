const btn = document.getElementById('btn')
const text = document.getElementById('inpt')
const array = JSON.parse(localStorage.getItem('user')) || []


async function chamadaApi() {
  try {
    const texto = text.value
    const api = await fetch(`https://api.github.com/users/${texto}`)
    const res = await api.json()
    const ArrayData = {
      avatar: res.avatar_url,
      name: res.name,
      login: res.login
    }
    array.push(ArrayData)
    saveStorage()
    init()
  }
  catch (err) { console.log(err) }

}


function init() {
  const span = document.getElementById('seach')
  span.innerHTML = ''
  for (arr of array) {
    spanHTML(arr)
  }
}


function spanHTML(arg) {
  const pos = array.indexOf(arg)
  const span = document.getElementById('seach')
  span.innerHTML += `
    <li>
    <img src = "${arg.avatar}" class = "img"/>
    <span data-index-type = "${arg.login}" onclick = "info(this)">${arg.name}</span>
    <a class = "button" href = "#" onclick = "deleteAr(${pos})">x</a>
    </li>`
}


function deleteAr(pos) {
  array.splice(pos, 1)
  init()
  saveStorage()
}

btn.onclick = function() {
  if (text.value.length === 0) {
    console.log("repository not found");
  }
  else {
    chamadaApi()
  }

  text.value = ""
}

function saveStorage() {
  localStorage.setItem('user', JSON.stringify(array))
}

init()

async function info(arg) {

  const nome = arg.getAttribute("data-index-type")
  const res = await fetch(`https://api.github.com/users/${nome}`)
  const json = await res.json()

  const Html = document.querySelector(".textoModal")
  
  Html.innerHTML = `
  <img class = "image" src = "${json.avatar_url}"/>
  <p>${json.name}</p>
  <p>${json.bio}</p>
  <p>Seguidores: ${json.followers}</p>
  <p>Seguindo: ${json.following}</p>
  <p>Repositórios: ${json.public_repos}</p>`


  const modal = document.getElementById('myModal')

  modal.style.display = "block"


  const close = document.querySelector('.close')
  close.onclick = function() {
    modal.style.display = "none"
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}