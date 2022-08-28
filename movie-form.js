import { pubsub } from './pubsub.js'

export const movieForm = {
  render: container => {
    // construir formulário para adicionar filme
    let template = document.getElementById('movieFormTemplate')
    // clono o conteudo
    let form = template.content.cloneNode(true)
    // adiciono evento ao botão
    form.querySelector('button').addEventListener('click', movieForm.add)
    // adiciono um filho ao container
    container.appendChild(form)
  },
  add: ev => {
    // chamo a função
    ev.preventDefault()
    let input = document.querySelector('.movie-form input')
    let title = input.value
    input.value = '' // limpar o formulário

    // dizer a quem estiver ouvindo que um filme foi adicionado
    console.log(`FORMULÁRIO DO FILME: apenas um filme adicionado "${title}"`)
    // publico filme
    pubsub.publish('movieAdded', title)
  }
}
