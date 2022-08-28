import { pubsub } from './pubsub.js'

export const stats = {
  render: container => {
    let d = document.createElement('div')
    d.className = 'stats-container'
    container.appendChild(d)
    let pm = document.createElement('p')
    pm.className = 'movie-count'
    pm.innerHTML = `0 filmes na lista`
    d.appendChild(pm)

    // construir estatísticas para filmes
    pubsub.subscribe('moviesUpdated', stats.moviesUpdated)
    console.log('STATUS: ouvindo filmes atualizados')

    pubsub.subscribe('movieDeleted', stats.moviesUpdated)
  },
  moviesUpdated: list => {
    // a lista de filmes acabou de ser publicada como atualizada
    console.log(
      `STATUS: Ouvi dizer que a lista de itens agora tem ${list.length} título(s).`
    )
    document.querySelector(
      '.movie-count'
    ).innerText = `${list.length} filmes na lista`
  }
}
