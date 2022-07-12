class RegisteredUser {
  constructor(services = []) {
    this.services = services;
  }

  getTotal() {
    let total = 0;
    this.services.map((service) => {
      let multimediaContent = service?.getMultimediaContent();

      if (!multimediaContent) throw 'There was an error with multimedia content';

      if (typeof service == StreamingService) {
        total += multimediaContent.streamingPrice;
      } else if (typeof service == DownloadService) {
        total += multimediaContent.downloadPrice;
      }

      if (typeof multimediaContent == PremiumContent) {
        total += multimediaContent.additionalFee;
      }
    });

    return total;
  }
}

/* 
La solucion propuesta no tiene ninguna validacion para el caso en el que el
servicio falle o no exista, tampoco su contenido. Es importante tener dichas
validaciones porque le agregan robustez y fiabilidad a la aplicacion. En mi
propuesta utilizo el enfoque del earlyreturn, el cual se verifica aquello que
es susceptible de fallar y se corta la ejecucion desde esa misma linea, justo
antes de hacer cualquier operacion con dicha informacion
 */

/*
La solucion propuesta es valida para un sistema monolitico el cual concentre
todos los posibles servicios, datos y operaciones a realizar. Esto en una
plataforma de streaming no es conveninete por su mala escalabilidad.

Normalmente el contenido via streaming (y para descargar) se encuentran
alojados en una unidad de almacenamiento dentro del backend y el desarrollador
frontend es el encargado de traer esa informacion al front para su correcta 
representacion y posible modificacion. Esto se logra con el uso de peticiones
http y una correcta implementacion de la API para poder hacer las peticiones y
recibir dicha informacion. A esta forma de estructurar se le conoce como
arquitectura de microservicios y su principal ventaja es que permite una
organizacion mas clara y sencilla, con grean escalabilidad y con servicios
independientes los cuales pueden recibir mantenimiento sin necesariamente
afectar a los demas y que son facilmente reemplazables.

En esta ejemplo getMultimediaContent() es un funcion que nos regresa una promesa,
pero para acceder a su informacion contenida hay que tratar la promesa con then(),
catch(), y opcionalmente con finally() para indicar la terminacion de la peticion.
Como cada servicio solo provee un contenido multimedia, no se usa ningun id.
Una mejor manera de acceder dicho servicio podria ser tener un identificador ya
generado desde el propio backend o usar el mismo timestamp.

*/
