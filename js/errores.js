/**
 * JS Errores, para mostrar y dar tratamiento a errores.
 * Software Escolaris©
 * @author Ceron Guzman Alejandro.
 * @copyright Derechos reservados, Mexico 2008-2016 Registros 03-2008-021510561000-01 03-2008-021510484100-01
 * @version 3.3.7
 * @package js
 * @final
 */

/**
 * @var {string} variable publica que contiene el mensaje de error de la respuesta JSON recibida del servidor
 */
var mensajeError = null;
/**
 * @method mostrarVentanaModal Funcion para mostrar la ventana Modal
 * @param {string} El codigo HTML a mostrar en el mensaje
 * @returns {void} 
 */

function mostrarVentanaModal(codigoHTML)
{
 $('#divAvisos').html(sanitizarHTML(codigoHTML));
 $('#divModalAvisos').modal('show');
}
/**
 * @method mostrarError Funcion para mostrar los Errores Personalizados.
 * @param {object} elError Objeto del tipo JSON con el error recibido del Servidor
 * @param {object} estatusRespuesta Objeto del tipo JSON con el estatus recibido del Servidor
 * @param {object} jqXHR Objeto del tipo JSON con el error recibido del Servidor
 * @returns {void}    
 */
function mostrarError (elError, estatusRespuesta, jqXHR)
{
    mensajeError = '<strong>Traza del Error '+idLlamada+'</strong><br /><br />';
    mensajeError += '<strong> Codigo de Apache:</strong>'+jqXHR.status+' '+jqXHR.statusText+'<br />';
    estatusPeticion(jqXHR);
    switch(elError.code){
        case -32000:
            mensajeError += elError.message;
            break;
        case -32600:
            mensajeError += 'Peticion invalida.';
            break;
        case -32601:
            mensajeError += 'El metodo en el servicio web: <br />No se encontro.'
            break;
        case -32602:
            mensajeError += 'Parametros invalidos.';
            break;
        case -32603:
            mensajeError += 'Error Interno';
            break;
        case -32700:
            mensajeError += 'Error de sintaxis';
            break;
        default:
            mensajeError += 'Error '+ elError.code+':<br />'+ elError.message;
            break;
    }
    console.log(jqXHR.responseJSON.error.message);
    mostrarVentanaModal(mensajeError);
}

/**
 * @method mostrarErrorJSON Funcion para mostrar los Errores de la peticion JSON
 * @param {object} jqXHR Objeto del tipo JSON con el error recibido del Servidor
 * @param {object} estatusError Objeto del tipo JSON con el error recibido del Servidor
 * @param {object} textoError Objeto del tipo JSON con el error recibido del Servidor
 * @returns {void}    
 */
function mostrarErrorJSON(jqXHR, estatusError, textoError)
{
    mensajeError = '<strong>Traza del Error '+idLlamada+'</strong><br /><br />';
    mensajeError += '<strong>Codigo de Apache:</strong>'+jqXHR.status+' '+jqXHR.statusText+'<br />';
    estatusPeticion(jqXHR);
    switch($.trim(estatusError)){
        case 'timeout':
            mensajeError += 'El tiempo de Espera, se agoto.<br />Probablemente, existen intermitencias en su conexion a Internet.';
            break;
        case 'error':
            mensajeError += 'Se recbio una respuesta.<br />Pero esta fue el siguiente error:<br />'+textoError;
            break;
        case 'abort':
            mensajeError += 'Su navegador aborto la conexion al Servidor.<br /> Por razones desconocidas.';
            break;
        case 'parsererror':
            mensajeError += 'Se recibio una respuesta.<br />Pero esta corrupta la misma, o incompleta.';
            break;
        default:
            mensajeError += 'Error desconocido: '+$.trim(estatusError)+':<br />'+textoError;
            break;
    }
    console.log(jqXHR.responseText);
    mostrarVentanaModal(mensajeError);
}
/**
 * @method estatusPeticion Funcion para mostrar el Estatus al procesar la peticion JSON
 * @param {object} jqXHR Objeto del tipo JSON con el error recibido del Servidor
 * @returns {void} 
 */
function estatusPeticion(jqXHR)
{
    switch( jqXHR.readyState ){
        case 0:
            mensajeError += '<strong> Estado:</strong> Peticion no completada (readyState:0)<br />';
            break;
        case 1:
            mensajeError += '<strong> Estado:</strong> Conexion si se establecio (readyState:1)<br />';
            break;
        case 2:
            mensajeError += '<strong> Estado:</strong> Peticion si se recibio (readyState:2)<br />';
            break;
        case 3:
            mensajeError += '<strong> Estado:</strong> Peticion en procesamiento (readyState:3)<br />';
            break;
        case 4:
            mensajeError += '<strong> Estado:</strong> Peticion finalizada y con respuesta (readyState:4)<br />';
            break;
        default:
            mensajeError += '<strong> Estado:</strong> Desconocido (readyState:'+jqXHR.readyState+')<br />';
            break;
    }
    mensajeError += '<br />';
}