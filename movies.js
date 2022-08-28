import { pubsub } from './pubsub.js'

export const movies = {
  list: [], // Criar Array
  render: container => {
    // Crio uma copia do container
    let template = document.getElementById('movieListTemplate')
    let div = template.content.cloneNode(true)
    container.appendChild(div)
    // Adiciono um evento para deletar
    let ul = document.querySelector('.movie-container ul')
    ul.addEventListener('click', movies.deleted)

    // ouvir filmes adicionados
    console.log('FILMES: quero saber se um filme foi adicionado')
    // se inscrever
    pubsub.subscribe('movieAdded', movies.movieAdded)
  },
  deleted: ev => {
    // pegar filme (li) da lista e excluir ao clicar
    let item = ev.target.closest('li')
    let name = item.textContent
    movies.list = movies.list.filter(nm => nm !== name)
    // publicar mudança
    pubsub.publish('movieDeleted', movies.list)
    item.parentElement.removeChild(item)
  },
  movieAdded: title => {
    // use Set para evitar duplicidade
    console.log(`FILMES: Ouvi dizer que ${title} foi adicionado`)
    // Instancio uma variavel com uma lista de filmes
    let list = new Set(movies.list)
    // Adiciono o filme na lista
    list.add(title)
    // Ordeno os filmes
    movies.list = Array.from(list).sort()

    // diga a quem estiver ouvindo que a lista de filmes foi atualizada
    console.log(`FILMES: apenas filmes atualizados na lista`)
    // Publico a alterção na lista
    pubsub.publish('moviesUpdated', movies.list)

    // em seguida, atualize a interface do usuário com a nova lista
    let ul = document.querySelector('.movie-container ul')
    ul.innerHTML = ''
    // mostrar lista nova, fazendo um laço para percorrela e criar um html (li)
    // no container
    let df = document.createDocumentFragment()
    movies.list.forEach(title => {
      let li = document.createElement('li')
      li.innerText = title
      df.appendChild(li)
    })
    ul.appendChild(df)
  }
}
