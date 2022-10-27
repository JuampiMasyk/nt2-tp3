new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true;
            this.saludJugador = 100;
            this.saludMonstruo = 100;
            this.turnos = [];
        },
        atacar: function () {
            let daño = this.calcularHeridas(3, 10);
            this.saludMonstruo -= daño;
            this.turnos.unshift({
              esJugador: true,
              text: 'El jugador golpea al monstruo por ' + daño
            });
      
            if (this.verificarGanador()) {
              return;
            }
            this.ataqueDelMonstruo();
        },

        ataqueEspecial: function () {
            let daño = this.calcularHeridas(10, 20);
            this.saludMonstruo -= daño;
            this.turnos.unshift({
                esJugador: true,
                text: 'Jugador golpea fuerte al monstruo por '+ daño
            })
            if(this.verificarGanador()) {
                return;
            }

            this.ataqueDelMonstruo();
        },

        curar: function () {
            if (this.saludJugador <= 90){
                this.saludJugador += 10;
            }else{
                this.saludJugador = 100;
            }
            this.turnos.unshift({
                esJugador: true,
                text: 'Jugador se cura por 10'
              });
            this.ataqueDelMonstruo();
        },

        registrarEvento(evento) {
            this.turnos.push(evento);
        },

        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false;
        },

        ataqueDelMonstruo: function () {
            let daño = this.calcularHeridas(3, 10);
            this.saludJugador -= daño;
            this.turnos.unshift({
              esJugador: false,
              text: 'El monstruo golpea al jugador por '+ daño
            });
            this.verificarGanador();
        },

        calcularHeridas: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)

        },
        verificarGanador: function () {
            if(this.saludMonstruo <= 0){
                if(confirm('Ganaste! Jugar de nuevo?')){
                    this.empezarPartida();
                }else{
                    this.hayUnaPartidaEnJuego = false;
                }
                return true;
            } else if (this.saludJugador <= 0){
                if(confirm('Perdiste! Jugar de nuevo?')){
                    this.empezarPartida();
                }else{
                    this.hayUnaPartidaEnJuego = false;
                }
                return true;
            }
            return false;
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});