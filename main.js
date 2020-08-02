const texto = document.getElementById('txt')
const button= document.getElementById('btn')
async function getUser() {
  try {
    const text = texto.value;
    const res = await fetch(`https://api.github.com/users/${text}`)
    const resp = await res.json()
    if (text.length == 0) {
      alert('error falta dados')
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


