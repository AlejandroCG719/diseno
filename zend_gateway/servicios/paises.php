<?php
require_once 'base.php';
require_once 'peticiones.php';

/**
 *Clase Paises, para brndar funcionalidades para la tabla paises
 *Software Escolaris?
 * @author Ceron Guzman Alejandro.
 *@copyright Derechos reservados, M?ico 2008-2016 Registros 03-2008-021510561000-01 03-2008-021510484100-01
 *@version 3.3.6
 *@package Escolaris
 *@final
 */

final Class Paises extends Base implements peticiones
{
	/**
	 *Atributo privado para el query de SQL.
	 *@access private
	 *@var string
	 */
	
	private $_sql;
	/**
	 *Atributo privado para el ID del Pais.
	 *@access private
	 *@var string
	 */
	private $_idPais;
	/**
	 * Atributo privado para el ID de la Pais
	 * @acces private
	 * @var int
	 */
	private $_nombre;
	/**
	 *Atributo privado para el ISO2 del Pais.
	 *@access private
	 *@var string
	 */
	
	private $_iso2;
	/**
	 *Atributo privado para el tipo de devolucion para el ResultSet.
	 *@access private
	 *@var int
	 */
	
	private $_tipo;
	/**
	 *Atributo privado para el Reporte PDF.
	 *@access private
	 *@var object
	 */
	
	private $_reportePDF;
	/**
	 *Atributo privado para el ResultSet de MySQL
	 *@access private
	 *@var object
	 */
	
	private $_resultSet;
	/**
	 *Atributo privado para un registro del ResultSet de MySQL.
	 *@access private
	 *@var object
	 */
	
	private $_registro;
	/**
	 *Atributo privado con el criterio, para las busquedas.
	 *@access private
	 *@var string
	 */
	
	private $_criterio;
	/**
	 *Atributo privado con el nombre de UNA columna, para las busquedas.
	 *@access private
	 *@var string
	 */
	
	private $_columna;
	/**
	 *Atributo privado para los nombres de TODAS las columnas.
	 *@access private
	 *@var string
	 */
	
	private $_columnas;
	/**
	 *Atributo privado para los ALIAS de TODAS las columnas.
	 *@access private
	 *@var string
	 */
	
	private $_aliasColumnas;

    /**
     *Constructor de la Clase Paises, para invocar el Constructor de la Clase heredada, y validar sesiones.
     * @access public
     * @return void
     * @throws Exception
     */
	
	public function __construct()
	{
		//Verificar si esta logeado:
		if(parent::validaSesion()){
			//Si es asi, mandamos a limpiar el constructor del padre:
			parent::__construct();
			//Inicializamos valores:
			$this->_columnas = array('', 'paises.id_pais','paises.nombre','paises.iso2');
			$this->_aliasColumnas = 'paises.id_pais AS a, paises.nombre AS b, paises.iso2 AS c';
		}else {
			//Caso contrario lo mandamos a la goma:
			throw new Exception("No tienes permisos");
			return;
		}
	}

    /**
     *Funcion para listar los Registros de la tabla paises.
     * @access public
     * @param int Se utiliza para establecer el tipo de devolucion.
     * @return object El Juego de Resultados (puede ser un json, array, o resultset).
     * @throws Exception
     */
	public function listar($tipo)
	{
		$this->_tipo = intval($tipo);
		$this->_sql = sprintf("SELECT %s FROM paises WHERE paises.id_pais>=1 ORDER BY paises.id_pais ASC;",
		$this->_aliasColumnas);
		return $this->sentenciaSQL($this->_sql, $this->_tipo);
	}

    /**
     *Funcion para buscar Registros en la tabla paises.
     * @access public
     *@ string El criterio a buscar en la tabla.
     * @param string En la columna se va a buscar en la tabla.
     * @param int Se utiliza para establecer el tipo de devolucion.
     * @return object El Juego de Resultados (puede ser un json, arry, o resultSet).
     * @throws Exception
     */
	public function buscar($criterio,$columna,$tipo)
	{
		//Esta funcion, solo sirve desde web, en el movil, la busqueda se hace directo en el dispositivo, si se usa jQueryMobile.
		
		$this->_tipo = intval($tipo);
		$columna = intval($columna);
		if($columna == 0) {
			$this->_idPais = $this->formatear($criterio, "CadenaBusqueda");
			$this->_nombre = $this->formatear($criterio, "CadenaBusqueda");
			$this->_iso2 = $this->formatear($criterio, "CadenaBusqueda");
			$this->sql = sprintf("SELECT %s FROM paises WHERE (paises.id_pais LIKE %s OR paises.nombre LIKE %s OR paises.iso2 LIKE %s) ORDER BY paises.id_pais ASC;",
			$this->_aliasColumnas, $this->_idPais, $this->_nombre, $this->_iso2);
		}else {
			$this->_columna = $this->_columnas[$columna];
			$this->_criterio = $this->formatear($criterio, "CadenaBusqueda");
			$this->_sql = sprintf("SELECT %s FROM paises
			WHERE %s LIKE %s ORDER BY paises.id_pais ASC;",
			$this->_aliasColumnas, $this->_columna, $this->_criterio);
		}
		return $this->sentenciaSQL($this->_sql, $this->_tipo);
	}

    /**
     *Funcion para insertar un Registro en la tabla paises.
     * @access public
     * @param object Es el registro que vamos a insertar.
     * @rerturn int El ID del Registro insertado.
     * @return int|object|string
     * @throws Exception
     */
	public function insertar($registro)
	{
		if(is_array($registro)){
			$registro = (object)$registro;
		}
		$this->_nombre = $this->formatear($registro->b, "Cadena");
		$this->_iso2 = $this->formatear($registro->c, "Cadena");
		$this->_sql = sprintf("INSERT INTO paises VALUES(NULL, %s, %s);",
				$this->_nombre, $this->_iso2);
		return $this->sentenciaSQL($this->_sql, 4);
	}

    /**
     *Funcion para actualizar un Registro en la tabla paises.
     * @access public
     * @param object El registro a actualizarce.
     * @return int El numero de Registros afectados.
     * @throws Exception
     */
	public function actualizar($registro)
	{
		if(is_array($registro)){
			$registro = (object)$registro;
		}
		$this->_idPais = $this->formatear($registro->a, "Entero");
		$this->_nombre = $this->formatear($registro->b, "Cadena");
		$this->_iso2 = $this->formatear($registro->c, "Cadena");
		$this->_sql = sprintf("UPDATE paises SET paises.nombre=%s, paises.iso2=%s WHERE paises.id_pais=%s LIMIT 1;",
		$this->_nombre, $this->_iso2, $this->_idPais);
		return $this->sentenciaSQL($this->_sql, 5);
	}

    /**
     *Funcion para eliminar un Registro en la tabla paises.
     * @access public
     * @param object El registro a eliminarse.
     * @return int El numero de Registros afectados.
     * @throws Exception
     */
	public function borrar($registro)
	{
		if(is_array($registro)){
			$registro = (object)$registro;
		}
		$this->_idPais = $this->formatear($registro->a, "Entero");
		$this->_sql = sprintf("DELETE FROM paises
		WHERE paises.id_pais=%s LIMIT 1;", $this->_idPais);
		return $this->sentenciaSQL($this->_sql, 5);
	}

    /**
     *Funcion para crear un Reporte PDF sencillo de la tabla paises.
     * @param El criterio de busqueda.
     * @param string $criterio
     * @param string $columna
     * @return string Nombre del Archivo PDF creado.
     * @throws Exception
     */
	public function reportePDF($tipo, $criterio='', $columna='')
	{
		throw new Exception('Los veran el siguiente Cuatrimestre');
	}
}