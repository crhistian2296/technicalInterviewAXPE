class RegisteredUser {
  constructor(services = []) {
    this.services = services;
  }

  getTotal() {
    let total = 0;
    this.services.forEach((service) => {
      service
        .getMultimediaContent()
        .then((resp) => {
          if (typeof service == StremingService) {
            total += resp.stremingPrice;
          } else if (typeof service == DownloadService) {
            total += resp.downloadPrice;
          }

          if (typeof service == PremiumContent) {
            total += resp.additionalFee;
          }
        })
        .catch((err) => console.log(err));
      // .finally(console.log('finish'));
    });

    return total;
  }
}

/*
La solucion propuesta es valida para un sistema monolitico el cual concentre
todos los posibles servicios y operaciones a realizar. Esto en una plataforma de
straming no es conveninete por su mala escalabilidad.

Normalmente el contenido via streaming (y para descargar) se encuentran
alojados en una unidad de almacenamiento dentro del backend y el desarrollador
frontend es el encargado de traer esa informacion al front para su correcta 
representacion y posible modificacion. Esto se logra con el uso de promesas y
una correcta implementacion de la API para poder hacer las peticiones y recibir
dicha informacion. A esta forma de estructurar se le conoce como arquitectura de
microservicios y su principal ventaja es que permite una organizacion mas clara
y sencilla, con grean escalabilidad y con servicios independientes los cuales
pueden recibir mantenimiento sin necesariamente afectar a los demas y que son
facilmente reemplazables.

En esta ejemplo getMultimediaContent() es un funcion que nos regresa una promesa,
pero para acceder a su informacion contenida hay que tratar la promesa con then(),
catch(), y opcionalmente con finally() para indicar la terminacion de la peticion.
Como cada servicio solo provee un contenido multimedia, no se usa ningun id.
Una mejor manera de acceder dicho servicio podria ser tener un identificador ya
generado desde el propio backend o usar el mismo timestamp.

*/
