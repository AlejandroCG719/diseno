/**
* JS Salir, para brindar funcionalidades JSON desde / hacia el servidor.
* Software Escolaris©
* @author Ceron Guzman Alejandro.
* @copyright Derechos reservados, Mexico 2008-2016 Registros 03-2008-021510561000-01 03-2008-021510484100-01
* @version 3.3.7
* @packege js
* @final
*/

/**
* Variable publica para la Generacion de un TimeStamp para asegurarnos que es unico.
* Para ver si se esta actualizado el archivo JS, al hacer cambios o no..
* @var {String}
*/
var marcaTiempo = new Date().getTime();
/**
* Variable publica que contiene la respuesta del  servidor.
* @var {JSON}
*/
var jsonRespuesta = null;
/**
* Variable publica para crear la peticion JSON que se enviara al servidor.
* @var {JSON}
*/
var peticionJSON = null;
/**
* Constante publica con la url del Gateway que recibe las peticiones al servidor.
* (Si fuera desde un APK o similar, DEBERA incluir la ruta completa: http:://www.dominio.com/etc...)
* Si fuera desde Windows 8 Desktop,necesitan cambiar el const por var, ya que Windows 8 no soporta const
* @var {String}*/
const GATEWAY_SALIR ='../zend_gateway/index.php';
/**
* Constante publica que contiene el nombre de la Clase a invocar al servidor.
* Si fuera desde Windows 8 Desktop, necesitan cambiar el const por var, ya que windows 8 no soporta const
* @var {String}*/
const NOMBRE_CLASE = 'Salir';
/**
* Funcion para cerrar la Sesion Mediante AJAX  hacia el Servidor.
* @returns{void}
*/
function cerrarSesion()
{
	peticionJSON = JSON.stringify(
	{
		'Id' : generarID(),
		'method' : 'terminarSesion',
		'clase' : NOMBRE_CLASE
	});
	$.ajax({
		method : 'POST',
		timeout : 50000,
		data : peticionJSON,
		dataType : 'json',
		url : GATEWAY_SALIR,
		success: function(jsonRespuesta, estatusRespuesta,jqXHR)
		{
			exitoTerminarSesion(jsonRespuesta, estatusRespuesta, jqXHR);
		},
		error : function(jqXHR, estatusError, textoError)
		{
			mostrarErrorJSON(jqXHR, estatusError, textoError);
		}
	});
}
/**
* Funcion Listener para cerrar la Sesion mediante AJAX hacia el Servidor.
* @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recibida del Servidor
* @param {string} estatusRespuesta Cadena de texto, con el estatus de la respuesta(succes)
* @param {object} jqXHR Objeto XHR, con toda la traza del respuesta.
* @returs {void}*/
function exitoTerminarSesion(jsonRespuesta, estatusRespuesta, jqXHR)
{
	//Checamos si existio un error:
	if(jsonRespuesta.error){
		mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
		return;
	}
	//Si no existio un error, no es importante la respuesta, se sale:
	document.location.assign('adios.html');//SI Agrega  la pagina al Historial
}