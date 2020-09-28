console.info('javascript running');

/**
 * 
 * Detecta los cambios en el filtro y realiza una nueva llamda Ajax
 * para refescar la lista
 * 
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


// Evento para ejecutar nuestro codigo JS cuando este todo cragado
document.addEventListener('DOMContentLoaded', function() {
   
   console.info('DOM cargado');

   const endpoint = 'http://localhost:8080/perreraWS/service/perro?orderBy=asc&campo=nombre';
   console.debug('endpoint %s', endpoint);

   // haremos una llamada ajax una vez que este todo cargado  
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {

     console.debug( "readyState %s", this.readyState );      
     if (this.readyState == 4 && this.status == 200) {
      
      console.debug('response esta lita status %s texto %s', this.status, this.responseText );
      const perros = JSON.parse(this.responseText);
      populateList(perros);
      loaderShow(false);
     }

   };// onreadystatechange


   xhttp.open("GET", endpoint );
   //ATENCION: xhttp.send() hace la petición asincrona 
   // pero debemos programar la respuesta dentro del metodo "xhttp.onreadystatechange"
   xhttp.send();
   
 }); // DOMContentLoaded


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