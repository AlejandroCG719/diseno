<?php
require_once 'base.php';
/**
 * Clase Acceso,para brindar fincionalidades para Accesar a la Aplicacion.
 * Sofware Escolaris
 * @author Ceron Guzman Alejandro.
 * @copyright Derechos reservados, Mexico 2017 Registros 03-2017-021510561000-01 03-2017-021510484100-01
 * @version 3.3.6
 * @package Escolaris
 * @final
 */

final Class Acceso extends Base
{
	/**
	 * Atributo privado para el query de SQL.
	 * @access private
	 * @var string
	 */
	
	private $_sql;
	
	/**
	 * Atributo privado para el Usuario.
	 * @access private
	 * @var string
	 */
	
	private $_usuario;
	
	/**
	 * Atributo privado para la Contraseña.
	 * @access private
	 * @var string
	 */
	
	private $_contrasena;
	
	/**
	 * Atributo privado para el id
	 * @access private
	 * @var integer
	 */
	private $_id;
	
	/**
	 * Atributo privado para un registro de una tabla de MySQL.
	 * @access private
	 * @var object
	 */
	
	private $_registro;
	
	/**
	 * Atributo privado para todos los caracteres de la validacion.
	 * @access private
	 * @var array
	 */
	
	private $_arrayCaracteres;
	
	/**
	 * Atributo privado para los caracteres usados en la validacion.
	 * @access private
	 * @var string
	 */
	
	private $_caracteres;
	
	//NO HAY CONTRUCTOR , por default, se invoca el padre...
	
	public function traerValidacion()
	{
		$this->_arrayCaracteres = array("b","c","d","f","g","h","j","k","m","n","p","q","r","s","t","v","w","x","y","z");
		shuffle($this->_arrayCaracteres);
		$this->_caracteres='';
		echo $this->_caracteres;
        /** @var TYPE_NAME $indice */
        for($indice=0; $indice<4; $indice++){
			$this->_caracteres .= $this->_arrayCaracteres[rand(0,count($this->_arrayCaracteres))];
        }
		$_SESSION['validacion'] = $this->_caracteres;
		return $_SESSION['validacion'];
	}

    /**
     * Verifica que el usuario exista, sea unico y este activo.
     * @access public
     * @param string El Usuario del Empleado.
     * @param string La Contraseña del Empleado.
     * @param string La Validacion.
     * @return string Una cadena aleatoria de 40 caracteres
     * @throws Exception
     */
	
	public function verificarAcceso($usuario, $contrasena, $validacion)
	{
		if(isset($_SESSION["idUsuario"])){
			throw new Exception("El Usuario ya tiene una sesion Abierta");
			return;
		}
		if($_SESSION['validacion'] !=trim($validacion)){
			throw new Exception("La Validacion, es Incorrecta.<br/>Se ha generado una nueva.");
		}
		$this->_id =0;
		$this->_usuario =$this->formatear($usuario,"Encriptalo");
		$this->_contrasena= $this->formatear($contrasena, "Encriptalo");
		$this->_sql = sprintf("SELECT clave FROM usuarios WHERE (nombre=%s AND contrasena=%s) LIMIT 1;",
				$this->_usuario,$this->_contrasena);
		$this->_registro = $this->sentenciaSQL($this->_sql, 7);
		$this->_id=$this->_registro['clave'];
		if($this->_id > 0) {
			// Si el ID es mayos que CERO, encontramos ese usuario y contraseña:
			$_SESSION["idUsuario"]= $this->_id;
			//$_SESSION["rolUsuario"]= $this->_registro['rol'];
			$_SESSION["ipUsuario"] = $_SERVER['REMOTE_ADDR'];
			$_SESSION["tokenUsuario"]= md5(sha1(session_id().$_SERVER['REMOTE_ADDR'] . $_SESSION["idUsuario"]));
			$_SESSION['validacion'] = null;
			unset($_SESSION['validacion']);
			return sha1(md5(microtime())); // Retornamos una cadena aleatoria de 40 caracteres
		}else{
			// EL ID no fue mayor que  CERO, estan incorrectos usuario y/o contraseña:
			if(PRODUCCION){
				throw new Exception("Error en sus Permisos del Servidor. ");
			}else{
				throw new Exception("Error en sus Permisos del Servidor: <br/>". $this->_sql);
			}
			return;
		}
	}
}