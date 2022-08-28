/**********
 *
 * pubsub.subscribe() on() add() listen() INSCREVER-SE
 * pubsub.unsubscribe() off() remove() unlisten() DESINSCREVER_SE
 * pubsub.publish() emit() announce() PUBLICAR
 *
 * */

export const pubsub = {
  events: {}, // pego nome do evento e realizo a função
  subscribe: function (evName, fn) {
    console.log(
      `PUBSUB: alguém acabou de se inscrever para saber sobre ${evName}`
    )
    // adicionar um evento com um nome como novo ou à lista existente
    this.events[evName] = this.events[evName] || []
    this.events[evName].push(fn)
  },
  unsubscribe: function (evName, fn) {
    console.log(`PUBSUB: alguém acabou de cancelar a inscrição ${evName}`)
    // remover uma função de evento pelo nome
    if (this.events[evName]) {
      this.events[evName] = this.events[evName].filter(f => f !== fn)
    }
  },
  publish: function (evName, data) {
    console.log(`PUBSUB: Fazendo uma transmissão sobre ${evName} com ${data}`)
    // emit|publish|announce o evento para quem está inscrito
    if (this.events[evName]) {
      this.events[evName].forEach(f => {
        f(data)
      })
    }
  }
}
