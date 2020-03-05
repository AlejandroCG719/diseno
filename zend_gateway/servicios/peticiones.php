<?php
/**
 * interface para peticiones basicas de SQL (ABC o CRUD)
 * Software Escolaris©
 * @author Ceron Guzman Alejandro.
 * @copyright Derechos reservados, México 2008-2016 Registros 03-2008-021510561000-01 03-2008-021510484100-01
 * @version 3.3.6
 * @package Escolaris
 */

interface peticiones
{
	/**
	 * Funcion que podra listar Registros
	 * @access public
	 * @param int El tipo de devolucion: (puede ser un json, array, o resultset).
	 */
	public function listar($tipo);
	
	/**
	 * Funcion que podra buscar Registro
	 * @access public
	 * @param string Criterio de busqueda.
	 * @param string Columna(s) por las cuales se buscara.
	 * @param int El tipo de devolucion: (puede ser un json, array, o resultset).
	 */
	public function buscar($criterio, $columna, $tipo);
	
	/**
	 * Funcion que podra insertar Registro
	 * @access public
	 * @param object El registro a insertar.
	 */
	public function insertar($registro);
	
	/**
	 * Funcion que podra actualizar Registro
	 * @access public
	 * @param object El registro a actualizar
	 */
	public function actualizar($registro);
	
	/**
	 * Funcion que podra borrar Registro
	 * @access public
	 * @param object El registro a eliminar.
	 */
	public function borrar($registro);
	
}