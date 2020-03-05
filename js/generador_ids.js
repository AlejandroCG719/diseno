/**
* JS IDgenerador, para crear un numero entero, para crear las peticiones
* Software Escolaris©
* @author Ceron Guzman Alejandro.
* @copyright Derechos Reservados, Mexico 2008-2016 Registro de 03-2008-021510561000-01 03-2008-021510484100-01
*@version 3.3.7
*@package js
*@final
*/

/**
* @var {String} Variable publica para la generacion de un ID unico para cada peticion al servidor.
*/
var idLlamada = null;

/**
* @method generarID funcion para generar un ID aleatorio.
* @returns {String}
*/

function generarID()
{
    idLlamada = (''+Math.random()).substring(2);
    return idLlamada;
}