<?php
date_default_timezone_set('America/Mexico_City');
define('PRODUCCION',false); //TRUE: no mostrara la "rajita de canela", FALSE:Si la mostrar !! o.O
define('HOY', date('Y')."-".date('m')."-".date('d'));
define('HORA', date('H').":".date('i').":".date('s'));

if(PRODUCCION){
	//Reservador para Produccion cambiar por los de lservido en la nube
    define('SERVIDOR', 'p:127.0.0.1');
	define('USUARIO', 'root');
	define('CONSTRASENA', '');
	define('BASE', 'diseno');
}else{
	//Reservador para Desarrollo cambiar por los de su LAPTOP,PC,etc.
    define('SERVIDOR', 'localhost');
    define('USUARIO', 'root');
    define('CONTRASENA', 'root');
	define('BASE', 'diseno');
}
define('RUTA_PDFS', '../pdfs/');
define('RUTA_IMAGENES', '../../imagenes/');
