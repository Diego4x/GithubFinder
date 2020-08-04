const texto = document.getElementById('txt')
const button= document.getElementById('btn')
const err = document.getElementById('error')
async function getUser() {
  try {
    const text = texto.value;
    const res = await fetch(`https://api.github.com/users/${text}`)
    const resp = await res.json()
    if (text.length == 0) {
      err.innerHTML = `
       <img src="http://i.stack.imgur.com/SBv4T.gif" alt="this slowpoke moves" style=" max-width: 50%"/>
       <h1>Para visualizar um perfil digite um usuário por favor</h1>
      `
    } else {
      console.log(resp);
      mostrar(resp)
    }
  }
  catch (err) { console.log(err) }
}
function mostrar(resposta){
  const li = document.getElementById('list')
  li.innerHTML +=`
    <img src=${resposta.avatar_url} alt="avatar" />
    <div class = "container">
      <p>
       Name: ${resposta.name}
      </p>
      <p>
        Biografia: ${resposta.bio}
      </p>
      <p>
        Compania: ${resposta.company}
      </p>
      <p>
        Seguindo: ${resposta.following}
      </p>
      <p>
       Seguidores: ${resposta.followers}
      </p>
      <p>
        Repositórios: ${resposta.public_repos}
      </p>
      
    </div>
  `
}
button.onclick = getUser
