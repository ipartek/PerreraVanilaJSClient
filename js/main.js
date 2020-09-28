console.info('javascript running');

document.addEventListener('DOMContentLoaded', init() );

/**
 * Iniclaización de todo lo necsario para la App cuando Arranca
 * 1. Inicializa Materiale Framework
 * 2. llamada Ajax para perros
 * 
 */
function init() {

   console.trace('init');
   // 1  Inicializa Materiale Framework
   M.AutoInit();
   console.debug('Inicializado Material Framework');
 
   // 2 llamada Ajax para perros
   const endpoint = 'http://localhost:8080/perreraWS/service/perro?orderBy=asc&campo=nombre';
   console.debug('endpoint %s', endpoint);

   var xhttp = new XMLHttpRequest();
   xhttp.open("GET", endpoint );   
   xhttp.send();
   xhttp.onreadystatechange = function() {     
     if (this.readyState == 4 && this.status == 200) {            
      const perros = JSON.parse(this.responseText);
      populateList(perros);
      loaderShow(false);
     }
   };// onreadystatechange

}
//init

/**
 * Detecta los cambios en el filtro y realiza una nueva llamda Ajax
 * para refescar la lista con la ordenacion deseada
 */
function refresh() {
   
   const order = ( document.getElementById('order').checked ) ? 'desc' : 'asc';
   const campo = document.getElementById('campo').value;
   console.debug('cambio filtro order=%s campo=%s', order, campo );

   const url = `http://localhost:8080/perreraWS/service/perro?orderBy=${order}&campo=${campo}`;
   console.debug(url);

   //llamada Ajax
   var xhr = new XMLHttpRequest();
   xhr.open("GET", url );
   xhr.send();
   xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         const perros = JSON.parse(this.responseText);
         populateList(perros);
      }   
   };//onreadystatechange

}// refresh





 /**
  * Muestra y Oculta el Loader
  * @param {*} isVisible 
  */
function loaderShow( isVisible = true ){
   let elLoader = document.getElementById('loader');
   if ( isVisible ){
      elLoader.style.display = 'block';
   }else{
      elLoader.style.display = 'none';
   }
}
//loaderShow



/**
 * rellena la lista con datos de perros
 * @param {*} data @see perrosMock para saber el formato json
 */
function populateList( data ){

   let elLista = document.getElementById('lista');
   elLista.innerHTML = '';
   console.debug('vaciada lista');

   data.forEach( perro => {
       
      elLista.innerHTML += `<li class="collection-item avatar">
                               <img src="${perro.imagen}" alt="" class="circle">
                               <span class="title">${perro.id} <b>${perro.nombre}</b></span>
                               <p>${perro.raza}</p>          
                            </li> `;

      console.trace('lista cargada con perros json' );
  }); // forEach

}
//populateList