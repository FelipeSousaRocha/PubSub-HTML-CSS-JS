import { pubsub } from './pubsub.js'

export const movies = {
  list: [],
  render: container => {
    let template = document.getElementById('movieListTemplate')
    let div = template.content.cloneNode(true)
    container.appendChild(div)
    let ul = document.querySelector('.movie-container ul')
    ul.addEventListener('click', movies.deleted)

    // ouvir filmes adicionados
    console.log('FILMES: quero saber se um filme foi adicionado')
    pubsub.subscribe('movieAdded', movies.movieAdded)
  },
  deleted: ev => {
    let item = ev.target.closest('li')
    let name = item.textContent
    movies.list = movies.list.filter(nm => nm !== name)
    pubsub.publish('movieDeleted', movies.list)
    item.parentElement.removeChild(item)
  },
  movieAdded: title => {
    // use Set para evitar duplicidade
    console.log(`FILMES: Ouvi dizer que ${title} foi adicionado`)
    let list = new Set(movies.list)
    list.add(title)
    movies.list = Array.from(list).sort()

    // diga a quem estiver ouvindo que a lista de filmes foi atualizada
    console.log(`FILMES: apenas filmes atualizados na lista`)
    pubsub.publish('moviesUpdated', movies.list)

    // em seguida, atualize a interface do usuário com a nova lista
    let ul = document.querySelector('.movie-container ul')
    ul.innerHTML = ''
    let df = document.createDocumentFragment()
    movies.list.forEach(title => {
      let li = document.createElement('li')
      li.innerText = title
      df.appendChild(li)
    })
    ul.appendChild(df)
  }
}
