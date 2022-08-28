import { pubsub } from './pubsub.js'

export const movieForm = {
  render: container => {
    // construir formulário para adicionar filme
    let template = document.getElementById('movieFormTemplate')
    let form = template.content.cloneNode(true)
    form.querySelector('button').addEventListener('click', movieForm.add)
    container.appendChild(form)
  },
  add: ev => {
    ev.preventDefault()
    let input = document.querySelector('.movie-form input')
    let title = input.value
    input.value = '' // limpar o formulário

    // dizer a quem estiver ouvindo que um filme foi adicionado
    console.log(`FORMULÁRIO DO FILME: apenas um filme adicionado "${title}"`)
    pubsub.publish('movieAdded', title)
  }
}
