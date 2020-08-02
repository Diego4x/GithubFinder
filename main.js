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
       <img src="https://png2.kisspng.com/sh/4c52fbd2fdf3c698786800a3422a10be/L0KzQYm3VsI5N6pAhJH0aYP2gLBuTfdqfJl6ep98b3Pscb20jfVlcZIye9H2cIX3dcO0ifNwdqQyhNHwbz3kfrX5jBllNWZnS6YDNEmzcbO5UPYyNmY5UKs9MEa3QYa6UME3QGU7TKk5MT7zfri=/kisspng-github-social-media-computer-icons-logo-android-5b348490ab20f1.548940641530168464701.png" alt="error" />
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
