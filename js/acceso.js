/**
* JS Acceso, para brindar funcionalidades JSON desde / hacia el servidor.
* Sofware Escolaris©
* @author Ceron Guzman Alejandro
* @copyright Derechos reservados,Mexico 2017 Registros 03-2017-02151056100
* @version 3.3.7
* @package js
* @final
*/

/**
 * @var {string} Variable publica para Grenerar de un TimeStamp para asegurarnos que es unico.
 */
 var marcaTiempo = new Date().getTime();
 
 /**
 * @var {JSON} Variable publica que contiene la respuesta JSON del servidor.
 */
 var jsonRespuesta = null;
 /**
 * @var {JSON} Variable publica que contiene el usuario.
*/
 var usuario = null;
 /**
 * @var {JSON} Variable publica que contiene la contraseña.
*/
 var contrasena = null;
 /**
 * @var {JSON} Variable publica que contiene la validacion.
*/
 var validacion = null;
/**
 * @var {JSON} Variable publica para crear la peticion JSON que se enviara al servidor.
*/
 var peticionJSON = null;
 /**
 * @var {string} Constante publica con la url del GateWay que recibe las peticiones al servidor.
 * (Si fuera desde un APK o similar, DEBERA incluir la ruta completa: http://www.dominio.com/etc..)
 * Si fuera desde Windows 8 Desktop, necesitan cambiar el const por var, ya que Windows no soporta const
 */
  const GATEWAY_ACCESO = '../zend_gateway/index.php';
  
  /**
 * @var {string} Constante publica que contiene el nombre de la Clase a invocar al servidor.
 * Si fuera desde Windows 8 Desktop, necesitan cambiar el const por var, ya que Windows 8 no soporta const
 */
  const NOMBRE_CLASE ='Acceso';
  
  /*
  * cuando el documento esta listo,podemos invocar funciones.
  * Mandamos a llamar el metodo de validacion:
  */
  $(document).ready(
     function(){
	     traerValidacion();
    }
  );
  /**
  * @method generarValidacion Funcion para generar validaciones.
  * return {void}
  */
  function traerValidacion()
  {
  	  peticionJSON = JSON.stringify({
		 'Id' : generarID(),
		 'method' : 'traerValidacion',
		 'clase' : NOMBRE_CLASE
	  });
  	  $.ajax({
		 method : 'POST',
		 timeout : 30000,
		 data : peticionJSON,
		 dataType : 'json',
		 url : GATEWAY_ACCESO,
		 success : function (jsonRespuesta, estatusRespuesta, jqXHR)
		 {
			exitoTraerValidacion(jsonRespuesta, estatusRespuesta ,jqXHR);
		 },
		 error : function (jqXHR, estatusError, textoError)
		 {
			mostrarErrorJSON(jqXHR, estatusError, textoError);
		 }
	  });
  }
  
/**
* @method exitoGeneraValidacion Funcion Listener para traer caracteres de validacion mediante AJAX.
* @param {object} jsonRespuesta objeto de tipo JSON con la respuesta recibida del servidor
* @param {string} estatusRespuesta Cadena de texto, con el estatus de la respuesta (success)
* @param {object} jqXHR objeto XHR, con la traza del respuesta.
* @returns {void}
*/
function exitoTraerValidacion(jsonRespuesta, estatusRespuesta, jqXHR)
{
	//Checamos primero, si existio un error Personalizado:
	if(jsonRespuesta.error){
		mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
		return;
	}
	$('#labelValidacion').html( jsonRespuesta.result );
	$('#inputValidacion').val('');
}
/**
* @method verificarDatos Funcion para verificar los datos del Formulario
* @return {void}
*/
 function verificarDatos()
 {
	 usuario = $('#inputUsuario').val().toString().trim();
	 contrasena = $('#inputContrasena').val().toString().trim();
	 validacion = $('#inputValidacion').val().toString().trim();
	 if(usuario.length > 0 && contrasena.length && validacion.length == 4){
		 // Todo bien, enviamos la peticion:
		 verificar();
	 }else{
		 //Falta datos, avisamos:
		 mostrarVentanaModal('Revisa tus datos antes de enviar');
	 }
 }
 /**
 * @method  verificar Funcion para verificar el acceso mediante AJAX hacia el servidor.
 * @return {void}
 */
 function verificar()
 {
	 peticionJSON = JSON.stringify(
	 {
		  'Id' : generarID(),
		  'method': 'verificarAcceso',
		  'clase' : NOMBRE_CLASE,
		  'Params' : [usuario, contrasena, validacion]
	 });
	 $.ajax({
		  method : 'POST',
		  timeout: 30000,
		  data : peticionJSON,
		  dataType : 'json',
		  url: GATEWAY_ACCESO,
		  success : function(jsonRespuesta, estatusRespuesta, jqXHR)
		  {
			  exitoVerificarAcceso(jsonRespuesta, estatusRespuesta, jqXHR);
		  },
		  error : function(jqXHR, estatusError, textoError)
		  {
			mostrarErrorJSON(jqXHR, estatusError, textoError); 
          }
	  });
  }
  /**
* @method exitoVerificarAcceso Funcion Listener verificar  el acceso mediante AJAX hacia el servidor.
* @param {object} jsonRespuesta objeto de tipo JSON con la respuesta recibida del servidor
* @param {string} estatusRespuesta Cadena de texto, con el estatus de la respuesta (success)
* @param {object} jqXHR objeto XHR, con la traza del respuesta.
* @returns {void}
*/
function exitoVerificarAcceso(jsonRespuesta, estatusRespuesta, jqXHR)
{
	$('#inputUsuario').val('');
	$('#inputContrasena').val('');
    $('#inputValidacion').val('');
	//Checamos si existio un error:
	if(jsonRespuesta.error){
		traerValidacion();
		mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
		return;
	}
	if((jsonRespuesta.result).toString().length == 40){
		// Si se pudo logear, nos vamos al menu:
		document.location.assign('menu.html'); //Si Agrega la pagina al historial
		//document.location.replace('menu.html');// No Agrega la pagina al historial
		return;
	}else{
		//No recibimos lo que esperabamos...
		traerValidacion();
		mostrarVentanaModal('La respuesta no es de confianza.');
	}
}