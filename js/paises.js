/**
*JS Paises, para brindar funcionalidades JSON desde / hacia el servidor,
*Software Escolaris©
*@author Ceron Guzman Alejandro.
*@copyright Derechos reservados, México 2008-2016 Registros 03-2008-021510561000-01 03-2008-021510484100-01
*@version 3.3.7
*@package js
*@final
*/
/**
*Variable publica para la Generacion de un TimeStamp para asegurarnos que es unico.
*Para ver si se esta actualizando el archivo JS, al hacer cambios o no...
*@var{String}
*/
var marcaTiempo = new Date().getTime();
/**
*Variable publica que contiene la respuesta del servidor.
*@var{JSON}
*/
var jsonRespuesta = null;

/**
*Variable publica para crear la peticion JSON que se enviara al servidor
*@var{JSON}
*/

var peticionJSON = null;
/**
*Variable publica para contener la peticion JSON que recibe del servidor.
*@var{JSON}
*/

var jsonPaises = null;
/**
*Variable publica que contiene un Objeto para enviar al servidor.
*@var{Object}
*/

var objetoPais = null;
/**
*Variable publica que contiene el nombre de la ultima accion realizada.
*@var{String}
*/

var accion = null;
/**
*Variable publica que contiene el numero de la columna para busquedas.
*@var{String}
*/

var columnaBusqueda = null;
/**
*Variable publica que contiene el criterio para las busquedas.
*@var{String}
*/

var criterioBusqueda = null;
/**
*Constante publica con la url del GateWay que recibe las peticiones al servidor.
*(Si fuera desde un APK o similar, DEBERA incluir la ruta completa: http:://www.dominio.com/etc...)
*Si fuera desde Windows & Desktop, necesitan cambiar el const por var, ya que Windows 8 no soporta const
*@var{String}
*/

const GATEWAY_PAISES = "../zend_gateway/index.php";
/**
*Constante publica que contiene el nombre de la Clase a invocar al servidor-
*Si fuera desde Windows 8 Desktop, necesitan cambiar el const por var, ya que Windows 8 no soporta const 
*@var{String}
*/

const CLASE_PAISES = 'Paises';
/**
*Cuando el documento esta listo, podemos invocar funciones.
*Si es mas de 1, deberan llevar ; al final, de otra manera, no.
¨Mandamos a llamar el metodo de la validacion:
*/
$(document).ready(
     listarPaises()
);

/**
*Crear chismoso para el tbody:
*/
$('#tbodyPaises').bind('click', function(event){
	if(event.traget != "[object HTMLButtonElement]"){
		if(event.target.parentElement == "[object HTMLButtonElement]"){
			seleccionoRegistro(event.target.parentElement.id);
		}
	}else{
		seleccionoRegistro(event.target.id);
	}
});

/**
* Función para listar los paises mediante AJAX.
* @returns {void}
*/

function listarPaises()
{
	peticionJSON = JSON.stringify(
	{
		'Id' : generarID(),
		'method' : 'listar',
		'clase' : CLASE_PAISES,
		'Params' : ['2']
	});
	accion = "listar";
	$.ajax({
		method : 'POST',
		timeout : 30000,
		data : peticionJSON,
		dataType : 'json',
		url :GATEWAY_PAISES,
		success : function(jsonRespuesta, estatusRespuesta, jqXHR)
		{
		   exitolistarPaises(jsonRespuesta, estatusRespuesta, jqXHR);
		},
		error : function(jqXHR, estatusError, textoError)
		{
			mostrarErrorJSON(jqXHR, estatusError, textoError);
		}
	});
}
/**
 * Funcion para mostrar la pantalla de Listado de Paises.
 * @returns {void}
*/
function mostrarListado() {
	$('#tabsMenu a[href="#divTabListaPaises"]').tab('show');
	listarPaises();
}
function mostrarBusqueda() {
	$('#tabsMenu a[href="#divTabBuscarPais"]').tab('show');
	$('#inputCriterio').val('');
	$('#selectColumna').val(0).attr('selected','selected');

}
/**
 * Funcion para buscar los paises mediante AJAX
 * @returns {void}
 */

function buscarPais() {
	columnaBusqueda = $('#selectColumna').val();
	criterioBusqueda = $('#inputCriterio').val().toString().trim();
	if(criterioBusqueda.length <= 0){
		mostrarVentanaModal('Falta el criterio de busqueda');
		return;
	}
	accion = 'buscar';
	peticionJSON = JSON.stringify(
		{
			'Id' : generarID(),
			'method' : 'buscar',
			'clase' : CLASE_PAISES,
			'Params' : [criterioBusqueda, columnaBusqueda, '2']
		});
	$.ajax({
		method : 'POST',
		timeout : 30000,
		data : peticionJSON,
		dataType : 'json',
		url : GATEWAY_PAISES,
		success : function(jsonRespuesta, estatusRespuesta, jqXHR)
		{
			exitolistarPaises(jsonRespuesta, estatusRespuesta, jqXHR);
		},
		error : function(jqXHR, estatusError, textoError)
		{
			mostrarErrorJSON(jqXHR, estatusError, textoError);
		}
	});
	$('#tabsMenu a[href="#divTabListaPaises"]').tab('show');
}
/**
* Función Listener para listar los paises mediante AJAX.
* @param {object} jsonRespuesta objeto del tipo JSON con la respuesta recibída del servidor
* @param {string} estatusRespuesta Cadena de texto, con el estatus de la respuesta (success)
* @param {object} jqXHR Objeto XHR, con toda la traza del respuesta.
*/
function exitolistarPaises(jsonRespuesta, estatusRespuesta, jqXHR)
{
	//Checamos primero, si existio un error Personalizado:
	if(jsonRespuesta.error){
		mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
		return;
	}
	indice = 0;
	jsonPaises = jsonRespuesta.result;
	$('#tbodyPaises > tr').remove();
	if(jsonPaises.length > 0) {
		htmlNuevo = '';
		for(indice=0; indice<jsonPaises.length; indice++) {
			objetoPais = jsonPaises[indice];
			htmlNuevo += '<tr>';
			  htmlNuevo += '<td>';
			    htmlNuevo += '<button id="button_editar_' + indice + '" type="button" style="margin: 5px;" aria-label="Editar" class="btn btn-sm btn-warning"><i class="fa fa-pencil" aria-hidden="true"></i></button>';
				htmlNuevo += '&nbsp;';
				htmlNuevo += '<button id="button_borrar_' + indice + '" type="button" style="margin: 5px;" aria-label="Borrar" class="btn btn-sm btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>';
				htmlNuevo += '</td>';
				htmlNuevo += '<td>' + objetoPais.a + '</td>';
				htmlNuevo += '<td>' + objetoPais.b + '</td>';
				htmlNuevo += '<td>' + objetoPais.c + '</td>';
			htmlNuevo += '</tr>';
		}
	$('#tbodyPaises').append( sanitizarHTML(htmlNuevo) );
	}else{
		mostrarVentanaModal('No hay paises');
	}
	switch(accion){
		case 'buscar':
		//Mostrar en boton de listar todos:
		$('#buttonListarTodos').show();
		break;
		case 'listar':
		//Ocultamos el boton de Listar todos:
		$('#buttonListarTodos').hide();
		break;
	}
}
/**
*Función para mostrar el pais escogido de la lista.
*@param {int} idBoton El ID del boton pulsado en el tbody
*param {void}
*/
function seleccionoRegistro(idBoton)
{
	//Partiendo de que llega: button_editar_1, button_editar_2, etc..., button_borrar_1, button_borrar_2, etc...
	var arraycitoIDS = idBoton.split('_');
	var queAccion = arraycitoIDS[1]; // es editar o borrar
	var queRegistro = Number(arraycitoIDS[2]); // Un numero desde CERO (posicion del array, no el ID del registro)...
	switch(queAccion){
		case 'editar':
		editarPais(queRegistro);
		break;
		case 'borrar':
		confirmarBorrado(queRegistro);
		break;
		default:
		mostrarVentanaModal('No hay accion seleccionada');
		break;
	}
}
/**
*funcion para mostrar el pais escogido de la lista y poder editarlo.
*@param {int} indiceEscogido el indice escogido de la lista de los paises
*@returns {void}
*/
function editarPais(indiceEscogido)
{
	console.log('click editarPais');
	objetoPais = jsonPaises[indiceEscogido];
	$('#tabsMenu a[href="#divTabFormularioPais"]').tab('show');
	$('#idPais').val(objetoPais.a);
	$('#nombre').val(objetoPais.b);
	$('#iso2').val(objetoPais.c);
	$('#h1TituloFormulario').html( sanitizarHTML('Editar un Pais') );
}
/**
*Funcion para mostrar el fromulario para un nuevo pais.
*@returns {void}
*/
function agregarPais()
{
	objetoPais = null;
	$('#tabsMenu a[href="#divTabFormularioPais"]').tab('show');
	$('#idPais').val(0);
	$('#nombre').val('');
	$('#iso2').val('');
	$('#h1TituloFormulario').html( sanitizarHTML('Crear un Pais'));
}
/**
*funcion para guardar el pais.
*@returns {void}
*/
function guardarPais()
{
	objetoPais = {
		a : $('#idPais').val(),
		b : $('#nombre').val().toString().trim(),
		c : $('#iso2').val().toString().trim()
	};
	if(objetoPais.a == 0){
		//Insertar Pais:
		accion = 'insertar';
	}else{
		//Actualizar Pais
		accion = 'actualizar';
	}
	if(objetoPais.b.length <= 0 || objetoPais.c.length <= 0){
		mostrarVentanaModal('Faltan Datos');
		return;
	}
	peticionJSON = JSON.stringify(
	{
		'Id' : generarID(),
		'method' : accion,
		'clase' : CLASE_PAISES,
		'Params' : [objetoPais]
	});
	$.ajax({
		method : 'POST',
		timeout : 30000,
		data : peticionJSON,
		dataType : 'json',
		url : GATEWAY_PAISES,
		success : function(jsonRespuesta, estatusRespuesta, jqXHR)
		{
			exitoGuardadoPais(jsonRespuesta, estatusRespuesta, jqXHR);
		},
		error : function(jqXHR, estatusError, textoError)
		{
			mostrarErrorJSON(jqXHR, estatusError, textoError);
		}
	});
}
		/**
	*Funcion Listener para checar si se guardo  o inserto el Pais.
	*@param {object} jsonRespuesta objeto del tipo JSON con la respuesta recibida del Servidor 
	*@param {string} estatusRespuesta Cadena de texto, con el estatus de la respuesta (succes)
	*@param {object} jqXHR Object XHR, con toda la traza del respuesta.
	*@returns {void}
	*/
	function exitoGuardadoPais(jsonRespuesta, estatusRespuesta, jqXHR)
	{
		//Checamos si existio un error:
		if(jsonRespuesta.error){
			mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
			return;
		}
		switch(accion){
			case 'insertar':
			if(jsonRespuesta.result > 0){
				//Si se inserto
			mostrarVentanaModal('Prenda Insertado con el ID ' + jsonRespuesta.result);
			}else{
			//No se inserto:
			mostrarVentanaModal('No se puede insertar la Prenda');
			}
			break;
			case 'actualizar':
			if (jsonRespuesta.result == 1){
			//Si se actualizo:
			mostrarVentanaModal('Prenda' + objetoPais.a + 'Actualizado');
			}else{
			//No se actualizo:
			mostrarVentanaModal('No se pudo actualizar la Prenda');
			}
			break;
			default:
			//No se que paso:
			mostrarVentanaModal('Tipo de respuesta no definido');
			break;
			}
			mostrarListado();
}

/**
* Funcion para solicitar confirmar el borrado del pais.
* @param {int} indiceEscogido Indice escogido del array de paises.
* @returns {void}
*/
function confirmarBorrado(indiceEscogido)
{
	$('#tabsMenu a[href="#divTabBorrarPais"]').tab('show');
	objetoPais = jsonPaises[indiceEscogido];
	htmlNuevo = 'ID: <strong>' + objetoPais.a + '</strong><br />Nombr: <strong>' + objetoPais.b + '</strong><br />ISO 2: <strong>' +objetoPais.c + '</strong>';
	$('#pDatosPais').html(sanitizarHTML(htmlNuevo) );
}

/**
* Funcion para borrar el pais mediante AJAX.
* @returns {void}
*/
function borrarPais()
{
	objetoPais = { a:objetoPais.a};//Quito el nombre e iso del pais, pues para borrar, no los necesito.
	peticionJSON = JSON.stringify(
	{
		'Id' : generarID(),
		'method' : 'borrar',
		'clase' : CLASE_PAISES,
		'Params' : [objetoPais]
		});
		$.ajax({
		method : 'POST',
		timeout : 30000,
		data : peticionJSON,
		dataType : 'json',
		url : GATEWAY_PAISES,
		succes : function(jsonRespuesta, estatusRespuesta, jqXHR)
		{
		exitoBorradoPais(jsonRespuesta, estatusRespuesta, jqXHR);
		},
		error : function(jqXHR, estatusError, textoError)
		{
		mostrarErrorJSON(jqXHR, estatusError, textoError);
		}
	});
}

/**
* Funcion Listener para checar si se borro o no el Pais.
* @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recibida del Servidor
* @param {string} estatusRespuesta Cadena de texto, con el estatus de la respuesta (succes)
* @param {object} jqXHR Objeto XHR, con toda la traza del respuesta.
* @returns {void}
*/ 
function exitoBorradoPais(jsonRespuesta, estatusRespuesta, jqXHR){
{
	//Checamos si existio un error:
	if(jsonRespuesta.error){
	mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
	return;
	}
	if(jsonRespuesta.result == 1){
	//Si se borro:
	mostrarVentanaModal('Prenda ' + objetoPais.a + 'Borrador<br/ >(Recuerde: Este borrado no se puede deshacer).');
	}else{
	//No se borro:
	mostrarVentanaModal('La Prenda ' + objetoPais.a + 'No pudo ser borrado.');
	}
	mostrarListado();
}
	/**
	* Funcion para mostrar la pantalla de Busquedas.
	* @returns {void}
	*/




/**
* Funcion para mandar a crear los PDFs, mediante AJAX.
* @returns {void}
*/
function crearPDF()
{
	peticionJSON = JSON.stringify(
	{
		'Id' : generarID(),
		'method' : 'reportePDF',
		'clase' : CLASE_PAISES,
		'Params' : [accion, criterioBusqueda, columnaBusqueda]
		});
		$.ajax({
		method : 'POST',
		timeout : 30000,
		data : peticionJSON,
		dataType : 'json',
		url : GATEWAY_PAISES, 
		success : function(jsonRespuesta, estatusRespuesta, jqXHR)
		{
			exitoCrearPDF(jsonRespuesta, estatusRespuesta, jqXHR);
		},
			error : function(jqXHR, estatusError, textoError)
		{
			mostrarErrorJSON(jqXHR, estatusError, textoError);
		}
	});
}
/**
* Funcion Listener para checar si se hizo el PDF solicitado o no.
* @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recibida del Servidor* 
* @param {string} estatusRespuesta Cadena de texto, con el estatus de la respuesta (succes)
* @param {object} jqXHR Objeto XHR, con toda la traza del respuesta.
* @returns {void}
*/
function exitoCrearPDF(jsonRespuesta, estatusRespuesta, jqXHR)
{
	//Checamos si existio un error:
	if(jsonRespuesta.error){
		mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
		return;
	}
	if(jsonRespuesta.result != '' && (jsonRespuesta.result.substr(jsonRespuesta.result.length - 4 )== '.pdf')){
		var urlPDF = '../pdfs/' + jsonRespuesta.result;
	  if(window.toStaticHTML){
			//Revisar... pendiente en Windows 8 Desktop...
	  }else{
		//Estamos en un navegador web, de escritorio o movil:
		window.open(urlPDF, '_blank');
	  }
   }else{
		//No se pudo crear el pdf:
		mostrarVentanaModal('El PdF, no pudo ser creado.');
	
	}
  }
}