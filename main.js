/**
 * construir a interface e decidir quais módulos exibir
 * na página
 **/

import { movies } from './movies.js'

import { movieForm } from './movie-form.js'

import { stats } from './stats.js'

document.addEventListener('DOMContentLoaded', () => {
  let main = document.querySelector('main')
  let aside = document.querySelector('aside')

  // adicionar um módulo de filmes
  movies.render(main)

  // adicionar um formulário para adicionar filmes
  movieForm.render(aside)

  // adicionar um módulo de estatísticas
  stats.render(aside)
})
