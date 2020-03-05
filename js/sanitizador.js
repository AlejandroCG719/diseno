/**
	*JS Sanitizador ,para limpiar el codigo HTML de sentencias incrustadas de JS malas o dudosas (Solo en Windows 8 metro).
	*Software Escolaris©
	*@author Ceron Guzman Alejandro.
	*@copyright Derechos reservados , Mexico 2017 
	*@version 3.3.7
	*@package js
	*@final 
	*/
	
	/**
	*@var {String} Variable publica para alojar htmlNuevo que sera insertado dinamicamente en la pagina.
	*/
	
	var htmlNuevo = null;
	
	/**
	*@var {String} Variable publica para alojar htmlNuevo ya sanitizado, que sera insertado dinamicamente en la pagina.
	*/
	
	var htmlSanitizado = null;
	
	/**
	*@var {Number} Variable publica para recorrer bucles FOR , mediante un indice.
	*/
	
	var indice = null;
	
	/**
	*@method sanitizarHTML Funcion para genera sanitizar un codigo HTML nuevo (es para Windows 8 Desktop).
	*@param {String} El codigo HTML a sanitizar.
	*@returns {String}
	*/
	
	function sanitizarHTML(codigoHTML)
	{
	htmlSanitizado = codigoHTML;
	if(window.toStaticHTML){
		//Estamos en Windows 8 Desktop, hay que sanitizar el HTML:
		htmlSanitizado = window.toStaticHTML(htmlSanitizado);
	}
	return htmlSanitizado;
	}