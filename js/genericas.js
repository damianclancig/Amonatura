/***********************************/
/******* Variable Globales *********/
/***********************************/
var g_fila = true;
var g_tipo = "";
var g_lista = "";
var g_etapa_sel = "";
var g_pedido_sel = "";
var g_cantProc = 0;
var g_idInterval;

var g_cont = 0;
var g_prod_ok = false;

/***********************************/
/********** Mover Capas ************/
/***********************************/
function Browser() {
	var ua, s, i;
	this.isIE    = false;
	this.isNS    = false;
	this.version = null;
	ua = navigator.userAgent;
	s = "MSIE";
	if ((i = ua.indexOf(s)) >= 0) {
		this.isIE = true;
		this.version = parseFloat(ua.substr(i + s.length));
		return;
	}
	s = "Netscape6/";
	if ((i = ua.indexOf(s)) >= 0) {
		this.isNS = true;
		this.version = parseFloat(ua.substr(i + s.length));
		return;
	}
	// Treat any other "Gecko" browser as NS 6.1.
	s = "Gecko";
	if ((i = ua.indexOf(s)) >= 0) {
		this.isNS = true;
		this.version = 6.1;
		return;
	}
}

var browser = new Browser();
var dragObj = new Object();
dragObj.zIndex = 100;

function dragStart(event, id) {
	var el;
	var x, y;
	// If an element id was given, find it. Otherwise use the element being
	// clicked on.
	if (id)
		dragObj.elNode = document.getElementById(id);
	else {
		if (browser.isIE)
			dragObj.elNode = window.event.srcElement;
		if (browser.isNS)
			dragObj.elNode = event.target;
		// If this is a text node, use its parent element.
		if (dragObj.elNode.nodeType == 3)
			dragObj.elNode = dragObj.elNode.parentNode;
	}
	// Get cursor position with respect to the page.
	if (browser.isIE) {
		x = window.event.clientX + document.documentElement.scrollLeft
			+ document.body.scrollLeft;
		y = window.event.clientY + document.documentElement.scrollTop
			+ document.body.scrollTop;
	}
	if (browser.isNS) {
		x = event.clientX + window.scrollX;
		y = event.clientY + window.scrollY;
	}
	// Save starting positions of cursor and element.
	dragObj.cursorStartX = x;
	dragObj.cursorStartY = y;
	dragObj.elStartLeft  = parseInt(dragObj.elNode.style.left, 10);
	dragObj.elStartTop   = parseInt(dragObj.elNode.style.top,  10);
	if (isNaN(dragObj.elStartLeft)) dragObj.elStartLeft = 0;
	if (isNaN(dragObj.elStartTop))  dragObj.elStartTop  = 0;
	// Update element's z-index.
	dragObj.elNode.style.zIndex = ++dragObj.zIndex;
	// Capture mousemove and mouseup events on the page.
	if (browser.isIE) {
		document.attachEvent("onmousemove", dragGo);
		document.attachEvent("onmouseup",	dragStop);
		window.event.cancelBubble = true;
		window.event.returnValue = false;
	}
	if (browser.isNS) {
		document.addEventListener("mousemove", dragGo,   true);
		document.addEventListener("mouseup",   dragStop, true);
		event.preventDefault();
	}
}

function dragGo(event) {
	var x, y;
	// Get cursor position with respect to the page.
	if (browser.isIE) {
		x = window.event.clientX + document.documentElement.scrollLeft
			+ document.body.scrollLeft;
		y = window.event.clientY + document.documentElement.scrollTop
			+ document.body.scrollTop;
	}
	if (browser.isNS) {
		x = event.clientX + window.scrollX;
		y = event.clientY + window.scrollY;
	}
	// Move drag element by the same amount the cursor has moved.
	dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
	dragObj.elNode.style.top  = (dragObj.elStartTop  + y - dragObj.cursorStartY) + "px";
	if (browser.isIE) {
		window.event.cancelBubble = true;
		window.event.returnValue = false;
	}
	if (browser.isNS)
		event.preventDefault();
}

function dragStop(event) {
	// Stop capturing mousemove and mouseup events.
	if (browser.isIE) {
		document.detachEvent("onmousemove", dragGo);
		document.detachEvent("onmouseup",	dragStop);
	}
	if (browser.isNS) {
		document.removeEventListener("mousemove", dragGo,	true);
		document.removeEventListener("mouseup",   dragStop, true);
	}
}
/****** Tipos de text *******/
function soloAlfaNumerico(e){
	var strCheck = '0123456789QWERTYUIOPASDFGHJKLÑZXCVBNMqwertyuiopasdfghjklñzxcvbnmÁÉÍÓÚáéíóú "$(),.&_-+*/';
	var whichCode = (window.Event) ? e.which : e.keyCode;
	if(whichCode == 13 || e.keyCode >= 35 && e.keyCode <= 40 || e.keyCode == 46 || e.keyCode == 8 || e.keyCode == 9) return true;
	key = String.fromCharCode(whichCode); // Get key value from key code
	if(strCheck.indexOf(key) == -1) return false; // Not a valid key
	return true;
}

function soloTexto(e){
	var strCheck = 'QWERTYUIOPASDFGHJKLÑZXCVBNMqwertyuiopasdfghjklñzxcvbnmÁÉÍÓÚáéíóú "$(),.&_-+*/';
	var whichCode = (window.Event) ? e.which : e.keyCode; 
	if(whichCode == 13 || e.keyCode >= 35 && e.keyCode <= 40 || e.keyCode == 46 || e.keyCode == 8 || e.keyCode == 9) return true;
	key = String.fromCharCode(whichCode); // Get key value from key code
	if(strCheck.indexOf(key) == -1) return false; // Not a valid key
	return true;
}

function soloNumerico(e){
	var strCheck = '0123456789.';
	var whichCode = (window.Event) ? e.which : e.keyCode; 
	if(whichCode == 13 || e.keyCode >= 35 && e.keyCode <= 40 || e.keyCode == 46 || e.keyCode == 8 || e.keyCode == 9) return true;
	key = String.fromCharCode(whichCode); // Get key value from key code
	if(strCheck.indexOf(key) == -1) return false; // Not a valid key
	return true;
}
/****** FIN Tipos de text *******/

/***********************************/
/******** Fondo Tranlucido *********/
/***********************************/
function mostrarFondoTrans(zindex){
	$("#fondTrans").css({'z-index': zindex - 1});
	$("#fondTrans").fadeIn();
}

function ajustarFondoTrans(){
	$("#fondTrans").width($(document.body).innerWidth());
	$("#fondTrans").height($(document.body).innerHeight());
}

function ocultarFondoTrans(){
	$("#fondTrans").fadeOut();
}

function mostrarVentana(idVent){
		centrarCuadro(idVent);
		$(idVent).fadeIn();
}

function centrarCuadro(id){
	$(id).css({"left" : ($(document.body).width() - $(id).width()) / 2 + "px"});
	$(id).css({"top":($(document.body).height() - $(id).height()) / 2 + "px"});
}

function notificacionProceso(){
	g_cantProc += 1;
	g_idInterval = setInterval('intervaloProceso()',500);
}

function intervaloProceso(){
	if(g_cantProc == 0){
		clearInterval(g_idInterval);
		$("#divCantProc").html(g_cantProc);
		$("#proceso").hide();
	}
	else if(g_cantProc > 0){
		$("#divCantProc").html(g_cantProc);
		$("#proceso").show();
		configurarLista('#proceso');
	}
}

function cargarCombo(idCombo, idPadre){
	if($("#cbo" + idPadre).val() != -1){
		var peticion = $.ajax({
		url: "procedimientos/cargarCombos.php",
		data: {
						idTipo:g_tipo,
						combo:idCombo,
						padre:$("#cbo" + idPadre).val()
					},
		type: "POST",
		dataType: "json",
		beforeSend: notificacionProceso,
		success: procesarCombo,
		error: function() { alert("Se ha producido un error al consultar.\nConsulte con el administrador."); }
		});
	}
	else{
		$("#cbo" + idCombo).html("");
		$("#cbo" + idCombo).append("<option value='-1'>Seleccione " + idPadre + "...</option>");
	}
}

function procesarCombo(resp){
	$("#cbo" + resp.idCombo).html("");
	if(resp.estado == "ERR"){
		alert("Ocurrió un error al consultar la Base de Datos.\nConsutle con el administrador.\n\nMensaje Error:\n" + resp.msjErr);
	}
	else if(resp.estado == "OK"){
		if(resp.lista.length == 0){
			$("#cbo" + resp.idCombo).append("<option value='-1'>No hay datos</option>");
		}
		else{
			$("#cbo" + resp.idCombo).append("<option value='-1'>Seleccione...</option>");
			for(var i = 0; i < resp.lista.length; i++){
				$("#cbo" + resp.idCombo).append("<option value='"+ resp.lista[i].idCombo +"'>"+ resp.lista[i].nombre +"</option>");
			}
		}
	}
	g_cantProc -= 1;
}

function crearCuadro(divPadre){
	$(divPadre).html("").width("");
	var borSupIzq = $("<div></div>").addClass("borSupIzq");
	var borSup 		= $("<div></div>").addClass("borSup");
	var borSupDer = $("<div></div>").addClass("borSupDer");
	var borIzq 		= $("<div></div>").addClass("borIzq");
	var borCentro = $("<div></div>").addClass("borCentro");
	var borDer 		= $("<div></div>").addClass("borDer");
	var borInfIzq = $("<div></div>").addClass("borInfIzq");
	var borInf 		= $("<div></div>").addClass("borInf");
	var borInfDer = $("<div></div>").addClass("borInfDer");
	
	borSupIzq.appendTo(divPadre);
	borSup.appendTo(divPadre);
	borSupDer.appendTo(divPadre);
	borIzq.appendTo(divPadre);
	borCentro.appendTo(divPadre);
	borDer.appendTo(divPadre);
	borInfIzq.appendTo(divPadre);
	borInf.appendTo(divPadre);
	borInfDer.appendTo(divPadre);
}

function configurarLista(cont){
	$(cont + " .borSup").width($(cont + " .borCentro").width());
	$(cont + " .borInf").width($(cont + " .borCentro").width());
	
	$(cont + " .borIzq").height($(cont + " .borCentro").height());
	$(cont + " .borDer").height($(cont + " .borCentro").height());
	
	if(jQuery.browser.msie){
		$(cont).width($(cont + " .borCentro").width() + 22);
	}
}

function crearListado(divPadre, nomTabla, campos){
	crearCuadro(divPadre);
	var tabla = $("<table></table>").attr({"id":nomTabla,"border":"0", "cellspacing":"0", "cellpadding":"0"});
	
	$(divPadre + " .borCentro").html(tabla);
	agregarFila(nomTabla, campos, "trCabecera");
	g_fila = true;
}

function agregarFila(nomTabla, datos, clase){
		var trTabla = $("<tr></tr>");
		if(!clase){
			if(g_fila){
				trTabla.addClass("trListado");
				g_fila = false;
			}
			else{
				trTabla.addClass("trListadoRes");
				g_fila = true;
			}
		}
		else{
			trTabla.addClass(clase);
		}
		for(var i = 0; i < datos.length; i++){
			var tdTabla = $("<td></td>").addClass("tdCampos").html(datos[i]);
			tdTabla.appendTo(trTabla);
			if(i != datos.length - 1){
				var tdSep = $("<td></td>").addClass("tdSep");
				tdSep.appendTo(trTabla);
			}
		}
		trTabla.appendTo("#" + nomTabla);
}

function agregarFila2(nomTabla, datos, clase){
		var trTabla = $("<tr></tr>");
		if(!clase){
			if(g_fila){
				trTabla.addClass("trListado");
				g_fila = false;
			}
			else{
				trTabla.addClass("trListadoRes");
				g_fila = true;
			}
		}
		else{
			trTabla.addClass(clase);
		}
		for(var i = 0; i < datos.length; i++){
			if(datos[i].tipo == 1){
				trTabla.removeClass();
				trTabla.addClass("trCatListado");
				
				var tdTabla = $("<td></td>").addClass("tdCatCampos").html(datos[i].valor);
				tdTabla.appendTo(trTabla);
				agregarSeparador(trTabla);
				var tdTabla = $("<td></td>").addClass("tdCatCampos").html("SubTotal");
				tdTabla.appendTo(trTabla);
				agregarSeparador(trTabla);
				var tdTabla = $("<td></td>").css("text-align","center").addClass("tdCatCampos").html(datos[i].subTotalMontoOrig);
				tdTabla.appendTo(trTabla);
				agregarSeparador(trTabla);
				var tdTabla = $("<td></td>").css("text-align","center").addClass("tdCatCampos").html(datos[i].subTotalMontoFinal);
				tdTabla.appendTo(trTabla);
				agregarSeparador(trTabla);
				var tdTabla = $("<td></td>").css("text-align","center").addClass("tdCatCampos").html(datos[i].subTotalPuntos);
				tdTabla.appendTo(trTabla);
				agregarSeparador(trTabla);
				var tdTabla = $("<td></td>").attr("colspan",5).addClass("tdCatCampos");
				tdTabla.appendTo(trTabla);
				g_fila = true;
			}
			else{
				var tdTabla = $("<td></td>").addClass("tdCampos").css({"text-align":datos[i].alineacion}).html(datos[i].valor);
				if(datos[i].id){
					tdTabla.attr("id","td_" + datos[i].id);
					trTabla.attr("id","tr_" + datos[i].id);
				}
				if(datos[i].editable){
					tdTabla.one("dblclick",cambiarTextbox);
				}
				tdTabla.appendTo(trTabla);
				if(i != datos.length - 1){
					agregarSeparador(trTabla);
				}
			}
		}
		trTabla.appendTo("#" + nomTabla);
}

function agregarSeparador(destino){
	var tdSep = $("<td></td>").addClass("tdSep");
	tdSep.appendTo(destino);
}

function cambiarTextbox(){
	$(this).html("<input type='text' id='txt_" + this.id + "' value='" + $(this).html() + "' size='50'>");
	$("#txt_" + this.id).focus();
	if(g_lista != "pedidos"){
		configurarLista("#divLista");
	}
	else{
		$("#divListadoPedido").width("");
		configurarLista("#divListadoPedido");
		$("#infoGeneral").hide();
	}
	$("#txt_" + this.id).blur(function(){
		if(g_lista == "productos"){
			modificarProducto(this.id.substr(7), $(this).val());
		}
		else if(g_lista == "clientes"){
			modificarCliente(this.id.substr(7), $(this).val());
		}
		else if(g_lista == "pedidos"){
			modificarPedido(this.id.substr(7), $(this).val());
		}
		$("#" + this.id.substr(4)).html($(this).val());
		if(g_lista != "pedidos"){
			configurarLista("#divLista");
		}
		else{
			$("#divListadoPedido").width("");
			configurarLista("#divListadoPedido");
			$("#infoGeneral").css("left",$("#divListadoPedido").width() + 10);
		}
		$("#" + this.id.substr(4)).one("dblclick", cambiarTextbox);
	});
}

function limpiarCampos(campos){
	for(var i = 0; i < campos.length; i++){
		$(campos[i]).val("");
	}
}

function validarCampos(campos){
	var valido = true;
	var camposInvalidos = "[";
	for(var i = 0; i < campos.length; i++){
		$("#err_" + campos[i]).hide();
		if($("#" + campos[i]).val() == "" || $("#" + campos[i]).val() == "-1"){
			$("#err_" + campos[i]).fadeIn(200);
			valido = false;
		}
	}
	return valido;
}

function alertar(msj){
	$(".msjNotificacion").html(msj).show().fadeOut(4000);
}

function crearMenuContextual(){
	$(".trListado,.trListadoRes").contextMenu('menuContextual', {
		bindings: {
			'edit': function(t) {
//				alert('Trigger was '+t.id+'\nAction was Open');
				levantarProducto(t.id.substr(3));
			},
			'delete': function(t) {
				var id = t.id.substr(3);
				eliminarPedido(id);
			}
		}
	});
}

function crearMenuContextual2(){
	$(".trListado,.trListadoRes").contextMenu('menuContextual', {
		bindings: {
			'edit': function(t) {
				alert('Trigger was '+t.id+'\nAction was Open');
			},
			'delete': function(t) {
				var id = t.id.substr(3);
				eliminarMiProducto(id);
			}
		}
	});
}

