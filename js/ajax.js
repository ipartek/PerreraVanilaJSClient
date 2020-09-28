/** 
*   Libreria para realizar llamadas AJAX XMLHttpRequest en vanilla JavaScript.
*   response-type == 'text', no funciona para 'xml'
*
*   @method: 'GET','POST','PUT','DELETE', etc
*   @url: url donde escucha el servicio Rest
*   @data: formato 'application/json', valor por defecto null
*   @return: Promise
*/

function ajax( metodo, url, datos = null ){
    
    return new Promise( (resolve, reject ) => {

        console.debug(`promesa ajax metodo ${metodo} - ${url}` );
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            
            if (this.readyState == 4 ) {

                if ( this.status == 200 || this.status == 201 ){
                    
                    // funciona promesa, then
                    if( this.responseText ){
                        const jsonData = JSON.parse(this.responseText);    
                        console.debug( jsonData );
                        resolve(jsonData);
                    }else{
                        resolve();
                    }                        
                    
                }else{
                    // falla promesa, catch
                    //reject( Error( JSON.parse(this.responseText) ));
                    if( this.responseText ){
                        reject( JSON.parse(this.responseText) );
                    }else{
                        reject( this.status );
                    }
                }               
            }// readyState == 4

        };// onreadystatechange

        xhttp.open( metodo , url , true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        
        if( datos){
        	xhttp.send( JSON.stringify(datos) );	
        }else{
        	xhttp.send();
        }
        
    });
}