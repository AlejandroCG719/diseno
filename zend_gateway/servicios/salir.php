<?php
/**
* Clase Salir, para brindar funcionalidades para Acsesar a la Aplicacion.
* Sofware Escolaris
* @author  Ceron Guzman Alejandro.
* @copyright Derechos reservados, Mexico 2008-2016 Registros 03-2008-021510561000-01 03-2008-021510484100-01
* @version 3.3.6
* @package Escolaris* @final
*/
final Class Salir
{
	/**
	* Constructor
	* @access public
	* @return void
	*/
	public function __construct()
	{
		session_start();
	}
	/**
	* Termina la sesion del Empleado.
	* @access public
	* @return string Una cadena aleatoria de 40 caracteres.
	*/
	public function  terminarSesion()
	{
		//Nulificamos las VARIABLES de Sesion:
		$_SESSION["idUsuario"]= null;
		$_SESSION["ipUsuario"]= null;
		$_SESSION["tokenUsuario"]= null;
		$_SESSION["rolUsuario"]= null;
		//Borramos las VARIABLES de Sesion:
		unset($_SESSION["idUsuario"]);
		unset($_SESSION["ipUsuario"]);
		unset($_SESSION["tokenUsuario"]);
		unset($_SESSION["rolUsuario"]);
		//Destruimos las VARIABLES de la Sesion:
		session_unset();
		// Destruimos los archivos de la Sesion:
		session_destroy();
		//Retornamos una cadena aleatoria:
		return sha1(md5(microtime()));
	}
	/**
	* Manda a pantalla,cuando se invoca la Clase a cadena.
	* @access public
	* @return string
	*/
	public function __toString()
	{
		return '¿Que esperabas ver?';
	}
	/**
	* Evita clonar la Clase.
	* @access public
	* @throws Exception
	*/
	public function __clone()
	{
		throw new Exception("Hoy,solo hay Clones de Homero Simpson.");
	}
	/**
	* El Destructor de la  Clase Base.
	* @access public
	* @return void
	*/
	public function __destruct()
	{
		//Vacio por el momento.
	}
}
?>