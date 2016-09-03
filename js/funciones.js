// JavaScript Document
$(document).ready(function(){
	
	/**Creo el Fondo Translucido.**/
	var divTrans = $("<div></div>").attr("id","fondTrans").css({'display':'none'});
	divTrans.appendTo($(document.body));
	$("#fondTrans").css({'background':'url(imagenes/fondoTranslucido1.png)', 'position':'absolute', 'top':'0px', 'left':'0px', 'opacity':'0.6'});
	setTimeout("ajustarFondoTrans('fondTrans')", 500);
	$(window).resize(function(){
		ajustarFondoTrans();
	});
	/****/
	
	$("#txtFecInicio").datepicker({ dateFormat: 'yy-mm-dd', showButtonPanel: true, closeText: 'Cerrar', currentText: 'Ahora', prevText: 'Anterior', nextText: 'Siguiente', showOn: 'button', buttonImage: 'imagenes/calendar.gif', buttonImageOnly: true });
	$("#txtFecInicio").datepicker('option', 'dayNames', ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'] );
	$("#txtFecInicio").datepicker('option', 'dayNamesMin', ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'] );
	$("#txtFecInicio").datepicker('option', 'monthNames', ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'] );
	
	$("#txtFecFinalizacion").datepicker({ dateFormat: 'yy-mm-dd', showButtonPanel: true, closeText: 'Cerrar', currentText: 'Ahora', prevText: 'Anterior', nextText: 'Siguiente', showOn: 'button', buttonImage: 'imagenes/calendar.gif', buttonImageOnly: true });
	$("#txtFecFinalizacion").datepicker('option', 'dayNames', ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'] );
	$("#txtFecFinalizacion").datepicker('option', 'dayNamesMin', ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'] );
	$("#txtFecFinalizacion").datepicker('option', 'monthNames', ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'] );
	
	for(var i = 0; i <= 100; i++){
		$("#cboDescuento").append("<option id='" + i + "'>" + i + "%</option>");
	}
	
	$("#txtPrecio").blur(aplicarDescuento);
	$("#cboDescuento").change(aplicarDescuento);
	
	setTimeout("carga();configurarLista('#proceso');$('#proceso').hide();", 500);
	crearCuadro("#proceso");
	$("#proceso .borCentro").css("width","220px").html("<img src='imagenes/ajax-load.gif' style='vertical-align: middle;'> TRABAJANDO <span id='divCantProc'></span> TAREAs");
	$(window).resize(function(){
		carga();
	});
	
	$("#divBtnAgregarMiProd").hide();
	
	restringirTextBoxs();
	
	$("#btnNatura").click(function(){
		cambiarBoton("Natura");
		g_tipo = "N";
		$("#divLista").hide();
		$("#divCboTipo").hide();
		$("#divBtnAgregarMiProd").hide();
		
		$(".divMenus").css("left", $("#btnNatura").position().left);
		$(".divMenus").fadeIn();
		$(".contenedor").one("click",ocultarMenues);
		carga();
	});
	
	$("#btnClientes").click(function(){
		g_pedido_sel = "";
		cambiarBoton("Clientes");
		$("#divListadoPedido").hide();
		$("#infoGeneral").hide();
		$("#divCboTipo").hide();
		$("#divBtnAgregarMiProd").hide();
		cargarListaClientes();
		carga();
		ocultarMenues();
	});
	
	$("#btnProductos").click(function(){
		g_pedido_sel = "";
		cambiarBoton("Productos");
		$(".divHerramientas").hide();
		$("#divFiltrosAmodil").hide();
		$("#divFiltrosNatura").hide();
		$("#divListadoPedido").hide();
		$("#infoGeneral").hide();
		$("#divCboTipo").show();
		$("#divBtnAgregarMiProd").hide();
		cargarListaProductos($("#cmbTipo").val());
		carga();
		ocultarMenues();
	});
	
	$("#btnMisProductos").click(function(){
		g_pedido_sel = "";
		cambiarBoton("MisProductos");
		$(".divHerramientas").hide();
		$("#divFiltrosAmodil").hide();
		$("#divFiltrosNatura").hide();
		$("#divListadoPedido").hide();
		$("#infoGeneral").hide();
		$("#divCboTipo").hide();
		$("#divBtnAgregarMiProd").show();
		cargarListaMisProductos();
		carga();
		ocultarMenues();
	});
	
	$("#menuAct").click(function(){
		$(".divMenusCic").show();
		$(".divMenusPed").hide();
		$(".divMenusAnt").hide();
		$(".divMenusAct").fadeIn();
		$(".divMenusCic").css("left", $(".divMenus").position().left + $(".divMenus").width());
		$(".divMenusCic").css("top", $(".barraMenu").height());
	});
	
	$("#menuAnt").click(function(){
		$(".divMenusCic").show();
		$(".divMenusPed").hide();
		$(".divMenusAct").hide();
		$(".divMenusAnt").fadeIn();
		$(".divMenusCic").css("left", $(".divMenus").position().left + $(".divMenus").width());
		$(".divMenusCic").css("top", $(".barraMenu").height() + $("#menuAnt").position().top);
	});
	
	$("#btnSubir").mouseover(function(){
		$(".divMenusPed").hide();
		g_idInterval = setInterval("subir()",50);
	}).mouseout(function(){
		clearInterval(g_idInterval);
	});
	
	$("#btnBajar").mouseover(function(){
		$(".divMenusPed").hide();
		g_idInterval = setInterval("bajar()",50);
	}).mouseout(function(){
		clearInterval(g_idInterval);
	});
	
	cargarMenues();
	
	$("#txtCodigo").blur(buscarProducto);
	
	$("#btnNuevoProducto").click(crearProducto);
	$("#btnCancelarProducto").click(function(){
		limpiarCampos(["#txtDesProducto"]);
		$("#divNuevoProducto").hide();
		$("#txtCodigo").val("").focus();
		mostrarVentana("#divAgregarProducto");

	});
	
	$("#agregarCliente").click(function(){
		$("#divAgregarProducto").hide();
		mostrarVentana("#divNuevoCliente");
	});
	
	$("#btnNuevoCliente").click(crearCliente);
	$("#btnCancelarCliente").click(function(){
		limpiarCampos(["#txtNombreCliente"]);
		$("#divNuevoCliente").hide();
		mostrarVentana("#divAgregarProducto");
		$(".divBotonesEdit").hide();
		cargarCombo('Cliente');
	});
	
	$("#btnNuevaEtapa").click(crearEtapa);
	
	$("#btnAgregarProducto").click(agregarProducto);
	$("#btnCancelarPedido2").click(function(){
		if(confirm("Si cancela, pierde toda la carga de productos de este pedido\n¿Estás seguro de continuar?")){
			cancelarPedido();
		}
	});
	$("#btnFinalizarPedido").click(function(){
		$("#divAgregarProducto").hide();
		ocultarFondoTrans();
		crearPedido();
	});
	
	$("#agregarMiProducto").click(nuevoMiProducto);
	$("#btnNuevoMiProducto").click(agregarMiProducto);
	$("#btnCancelarMiProducto").click(function(){
		ocultarFondoTrans();
		$("#divNuevoMiProducto").hide();
	});
});

function cargarMenues(){
	$(".divMenusAct").html("");
	$(".divMenusAnt #divCiclos").html("");
	$(".divMenusPed").html("");
	$.ajax({
		url: "procedimientos/pedidos.php",
		data: {
					accion:"cargarMenues"
				},
		type: "POST",
		dataType: "json",
		beforeSend: notificacionProceso,
		success: procesarCargarMenues,
		error: function() { alert("Se ha producido un error.\nConsulte con el administrador."); }
	});
}

function procesarCargarMenues(resp){
	if(resp.estado == "ERR"){
		alert("Ocurrió un error al consultar la Base de Datos.\nConsutle con el administrador.\n\nMensaje Error:\n" + resp.msjErr);
	}
	else if(resp.estado == "OK"){
		var cont = 0;
		var ciclo = "";
		var divMenus = ".divMenusAct";
		var divCiclo = "";
		for(var i = 0; i < resp.menues.length; i++){
			if(cont == 4){
				divMenus = ".divMenusAnt #divCiclos";
			}
			if(ciclo != resp.menues[i].idCiclo){
				var div = $("<div></div>").addClass("menu").attr("id","ciclo_" + resp.menues[i].idCiclo).html(resp.menues[i].nomCiclo);
				div.appendTo(divMenus);
				
				divCiclo = $("<div></div>").addClass("pedidos").attr("id","ped_ciclo_" + resp.menues[i].idCiclo);
				divCiclo.appendTo(".divMenusPed");
				
				cont++;
				ciclo = resp.menues[i].idCiclo;
			}
			
			var divPedido = $("<div></div>").addClass("menu").attr({"id":"ped_" + resp.menues[i].idPedido}).html("Pedido " + resp.menues[i].nroPedido);
			divPedido.appendTo(divCiclo);
		}
	}

	$(".divMenusCic DIV .menu").click(function(){
		$(".divMenusPed").css("left", $(".divMenusCic").position().left + $("#" + this.id).outerWidth());
		$(".pedidos").hide();
		$(".divMenusPed").show();
		$(".divMenusPed").css("top", $("#" + this.id).position().top + $(".divMenusCic").position().top);
		$("#ped_" + this.id).fadeIn();
	});

	$(".divMenusPed .pedidos .menu").click(function(){
		g_pedido_sel = this.id.substr(4);
		cargarPedidos(g_pedido_sel);
		ocultarMenues();
	});
	g_cantProc -= 1;
}

function ocultarMenues(){
	$(".divMenus").hide();
	$(".divMenusCic").hide();
	$(".divMenusPed").hide();
	cambiarBoton("");
}

function subir(){
	if(g_cont >= 0){
		g_cont -= 2;
		$(".divMenusAnt #divCiclos").scrollTop(g_cont);
	}
}

function bajar(){
	if(g_cont <= ($(".divMenusAnt #divCiclos").height() + 15)){
		g_cont += 2;
		$(".divMenusAnt #divCiclos").scrollTop(g_cont);
	}
}

function carga(){
	$(".contenedor").width($(screen.availWidth));
	$(".contenedor").height($(document.body).height() - $(".pie").height() - $(".barraMenu").height() - 10);
	$(".pie").css({"width" : $(document.body).width()});
}

function restringirTextBoxs(){
	$("#txtNombreEtapa").keypress(soloAlfaNumerico);
	$("#txtNombreCliente").keypress(soloTexto);
	$("#txtCodProducto").keypress(soloAlfaNumerico);
	$("#txtDesProducto").keypress(soloAlfaNumerico);
	$("#txtCodigo").keypress(soloAlfaNumerico);
	$("#txtPrecio").keypress(soloNumerico);
	$("#divTxtPuntos").keypress(soloNumerico);
	$("#txtComentario").keypress(soloAlfaNumerico);
	$("#txtNombreEtapa").keypress(soloAlfaNumerico);
}

function cambiarBoton(boton){
	$(".menuIzqInf").attr("class", "menuIzq");
	$(".menuMedInf").attr("class", "menuMed");
	$(".menuDerInf").attr("class", "menuDer");
	
	$("#btn" + boton + " .menuIzq").attr("class", "menuIzqInf");
	$("#btn" + boton + " .menuMed").attr("class", "menuMedInf");
	$("#btn" + boton + " .menuDer").attr("class", "menuDerInf");
}

function aplicarDescuento(){
	if($("#txtPrecio").val() != ""){
		var num = $("#txtPrecio").val();
		var desc = $("#cboDescuento").val();
		var res = parseFloat(num) - parseFloat(num) * parseFloat(desc) / 100;
		$("#txtPrecioFinal").val(res);
	}
}

function cargarPedidos(id){
	var divCarga = $("<div></div>").addClass("cargando");
	$("#divListadoPedido .borCentro").html(divCarga);
	$("#pedidos").show();
	configurarLista("#divListadoPedido");
	configurarLista("#infoGeneral");
	
	$.ajax({
		url: "procedimientos/listadoNatura.php",
		data: {
					tipo:"N",
					codigo:id
				},
		type: "POST",
		dataType: "json",
		beforeSend: notificacionProceso,
		success: procesarPedidos,
		error: function() { alert("Se ha producido un error.\nConsulte con el administrador."); }
	});
}

function procesarPedidos(resp){
	if(resp.estado == "ERR"){
		alert("Ocurrió un error al consultar la Base de Datos.\nConsutle con el administrador.\n\nMensaje Error:\n" + resp.msjErr);
	}
	else if(resp.estado == "OK"){
		if(resp.datos.length == 0){
			crearCuadro("#divListadoPedido");
			$("#divListadoPedido .borCentro").html("No hay productos.");
			$("#divListadoPedido").show();
			configurarLista("#divListadoPedido");
			$("#infoGeneral").hide();
		}
		else{
			g_lista = "pedidos";
			$("#divListadoPedido").html("");
			crearListado("#divListadoPedido", "listaPedido", resp.campos);
			$("#divListadoPedido").show();
			for(var i = 0; i < resp.datos.length; i++){
				agregarFila2("listaPedido", resp.datos[i]);
			}
			agregarFila2("listaPedido", resp.camposPie, "trCabecera");
			
			configurarLista("#divListadoPedido");
			mostrarCuadroInfo(resp);
			crearMenuContextual();
		}
	}
	g_cantProc -= 1;
}

function mostrarCuadroInfo(resp){
	$("#infoGeneral").html("");
	crearCuadro("#infoGeneral");
	
	var taInfo = $("<table></table>").attr({"border":"0", "cellspacing":"0", "cellpadding":"0"});
	
	var tdCol1 = $("<td></td>").addClass("tdCampos").attr("colSpan", 5).html("Informaci&oacute;n General");
	var trFilaTit = $("<tr></tr>").addClass("trCabecera");
	tdCol1.appendTo(trFilaTit);
	
	var tdCol1 = $("<td></td>").addClass("tdCampos").html("<b>Ciclo:</b> " + resp.etapa);
	var tdSep1 = $("<td></td>").addClass("tdSep");
	var tdCol2 = $("<td></td>").addClass("tdCampos").html("<b>Fecha de Comienzo</b>");
	var tdSep2 = $("<td></td>").addClass("tdSep");
	var tdCol3 = $("<td></td>").addClass("tdCampos").html("<b>Fecha Finalizaci&oacute;n</b>");
	var trFila1 = $("<tr></tr>");
	tdCol1.appendTo(trFila1);
	tdSep1.appendTo(trFila1);
	tdCol2.appendTo(trFila1);
	tdSep2.appendTo(trFila1);
	tdCol3.appendTo(trFila1);
	
	var tdCol1 = $("<td></td>").addClass("tdCampos").html("<b>Pedido:</b> Nº " + resp.nroPedido);
	var tdSep1 = $("<td></td>").addClass("tdSep");
	var tdCol2 = $("<td></td>").addClass("tdCampos").html(resp.fecComienzo);
	var tdSep2 = $("<td></td>").addClass("tdSep");
	var tdCol3 = $("<td></td>").addClass("tdCampos").html(resp.fecFinalizacion);
	var trFila2 = $("<tr></tr>");
	tdCol1.appendTo(trFila2);
	tdSep1.appendTo(trFila2);
	tdCol2.appendTo(trFila2);
	tdSep2.appendTo(trFila2);
	tdCol3.appendTo(trFila2);
	
	var tdCol1 = $("<td></td>").addClass("tdCampos").attr("colSpan", 5).html("Montos");
	var trFila3 = $("<tr></tr>").addClass("trCabecera");
	tdCol1.appendTo(trFila3);
	
	var tdCol1 = $("<td></td>").addClass("tdCampos").html("<b>Total</b>");
	var tdSep1 = $("<td></td>").addClass("tdSep");
	var tdCol2 = $("<td></td>").addClass("tdCampos").html("<b>A Pagar</b>");
	var tdSep2 = $("<td></td>").addClass("tdSep");
	var tdCol3 = $("<td></td>").addClass("tdCampos").html("<b>Ganancia</b>");
	var trFila4 = $("<tr></tr>");
	tdCol1.appendTo(trFila4);
	tdSep1.appendTo(trFila4);
	tdCol2.appendTo(trFila4);
	tdSep2.appendTo(trFila4);
	tdCol3.appendTo(trFila4);
	
	var tdCol1 = $("<td></td>").addClass("tdCampos").html("$ " + resp.totalFinal);
	var tdSep1 = $("<td></td>").addClass("tdSep");
	var tdCol2 = $("<td></td>").addClass("tdCampos").html("$ " + (resp.totalOriginal*(1-resp.ganancia)).toFixed(2));
	var tdSep2 = $("<td></td>").addClass("tdSep");
	var tdCol3 = $("<td></td>").addClass("tdCampos").html("$ " + (resp.totalFinal-resp.totalOriginal*(1-resp.ganancia)).toFixed(2));
	var trFila5 = $("<tr></tr>");
	tdCol1.appendTo(trFila5);
	tdSep1.appendTo(trFila5);
	tdCol2.appendTo(trFila5);
	tdSep2.appendTo(trFila5);
	tdCol3.appendTo(trFila5);
	
	trFilaTit.appendTo(taInfo);
	trFila1.appendTo(taInfo);
	trFila2.appendTo(taInfo);
	trFila3.appendTo(taInfo);
	trFila4.appendTo(taInfo);
	trFila5.appendTo(taInfo);
	
	var tdColPedido = $("<td></td>").css("text-align","right").attr({"colSpan": 5, "id":resp.idPedido}).html("Realizar Pedido").click(realizarPedido);
	var trFilaPedido = $("<tr></tr>").addClass("trCabecera");
	tdColPedido.appendTo(trFilaPedido);
	trFilaPedido.appendTo(taInfo);
	
	$("#infoGeneral .borCentro").append(taInfo);
	$("#infoGeneral").show();
	configurarLista("#infoGeneral");
	$("#infoGeneral").css("left",$("#divListadoPedido .borCentro").width() + 30);
	$("#infoGeneral").css("top",$("#divListadoPedido").position().top);
}

function realizarPedido(){
	$.ajax({
		url: "procedimientos/pedidos.php",
		data: {
					accion:"realizar",
					pedido:this.id
				},
		type: "POST",
		dataType: "json",
		beforeSend: notificacionProceso,
		success: procesarRealizarPedido,
		error: function() { alert("Se ha producido un error.\nConsulte con el administrador."); }
	});
}

function procesarRealizarPedido(resp){
	if(resp.estado == "ERR"){
		alert("Ocurrió un error al consultar la Base de Datos.\nConsutle con el administrador.\n\nMensaje Error:\n" + resp.msjErr);
	}
	else if(resp.estado == "OK"){
		mostrarFondoTrans($("#realizarPedido").css("z-index"));
		$("#realizarPedido").html("");
		crearListado("#realizarPedido", "realizarListaPedido", resp.campos);
		for(var i = 0; i < resp.datos.length; i++){
			agregarFila2("realizarListaPedido", resp.datos[i]);
		}
		
		$boton = $("<div></div>").html('<input type="button" id="btnVolver" value="Volver">');
		$boton.appendTo("#realizarListaPedido");
		$("#btnVolver").click(volverListado);
		mostrarVentana("#realizarPedido");
		configurarLista("#realizarPedido");
	}
	g_cantProc -= 1;
}

function volverListado(){
	ocultarFondoTrans();
	$("#realizarPedido").hide();
}

function modificarPedido(id, valor){
	var data = null;
	data =	{
						accion:"modificar",
						codigo:id,
						comentario:valor
					};
	$.ajax({
		url: "procedimientos/pedidos.php",
		type: "POST",
		data: data,
		dataType: "json",
		beforeSend: notificacionProceso,
		success: procesarModificarPedido,
		error: function() { alert("Se ha producido un error.\nConsulte con el administrador."); }
	});
}

function procesarModificarPedido(resp){
	if(resp.estado == "ERR"){
		alert("Ocurrió un error al consultar la Base de Datos.\nConsutle con el administrador.\n\nMensaje Error:\n" + resp.msjErr);
	}
	else if(resp.estado == "OK"){
		alertar("El pedido se modificó correctamente");
		$("#infoGeneral").show();
		configurarLista("#infoGeneral");
		$("#infoGeneral").css("left",$("#divListadoPedido .borCentro").width() + 30);
		$("#infoGeneral").css("top",$("#divListadoPedido").position().top);
	}
	g_cantProc -= 1;
}

function checkPagado(obj){
	var valor = "N";
	if(obj.checked){
		valor = "S";
	}
	$.ajax({
		url: "procedimientos/pedidos.php",
		type: "POST",
		data: {
						accion:"pagado",
						codigo:obj.id,
						valor:valor
					},
		dataType: "json",
		beforeSend: notificacionProceso,
		success: procesarCheckPagado,
		error: function() { alert("Se ha producido un error.\nConsulte con el administrador."); }
	});
}

function procesarCheckPagado(resp){
	if(resp.estado == "ERR"){
		alert("Ocurrió un error al consultar la Base de Datos.\nConsutle con el administrador.\n\nMensaje Error:\n" + resp.msjErr);
	}
	else if(resp.estado == "OK"){
		alertar("El pedido se modificó correctamente");
		$("#td_totPagado").html("$ " + resp.total);
	}
	g_cantProc -= 1;
}

function eliminarPedido(id){
	if(confirm("¿Está seguro que desea eliminar el pedido?")){
		$.ajax({
			url: "procedimientos/pedidos.php",
			type: "POST",
			data: {
							accion:"eliminar",
							codigo:id
						},
			dataType: "json",
			beforeSend: notificacionProceso,
			success: procesarEliminarPedido,
			error: function() { alert("Se ha producido un error.\nConsulte con el administrador."); }
		});
	}
}

function procesarEliminarPedido(resp){
	if(resp.estado == "ERR"){
		alert("Ocurrió un error al consultar la Base de Datos.\nConsutle con el administrador.\n\nMensaje Error:\n" + resp.msjErr);
	}
	else if(resp.estado == "OK"){
		alertar("El pedido se eliminó correctamente");
		if(g_tipo == "N"){
			cargarPedidos(g_pedido_sel);
		}
	}
	g_cantProc -= 1;
}

function crearEtapa(){
	var campos = ["txtNombreEtapa", "txtFecInicio", "txtFecFinalizacion"];
	if(validarCampos(campos)){
		$.ajax({
			url: "procedimientos/crearEtapa.php",
			data: {
							idTipo:g_tipo,
							nombre:$("#txtNombreEtapa").val(),
							fecInicio:$("#txtFecInicio").val(),
							fecFinalizacion:$("#txtFecFinalizacion").val()
						},
			type: "POST",
			dataType: "json",
			beforeSend: notificacionProceso,
			success: procesarEtapaNueva,
			error: function() { alert("Se ha producido un error.\nConsulte con el administrador."); }
		});
	}
}

function procesarEtapaNueva(resp){
	if(resp.estado == "ERR"){
		alert("Ocurrió un error al consultar la Base de Datos.\nConsutle con el administrador.\n\nMensaje Error:\n" + resp.msjErr);
	}
	else if(resp.estado == "ERREXIST"){
		alert("El nombre ya existe");
	}
	else if(resp.estado == "OK"){
		alertar("Se creó correctamente.");
		if(g_tipo == "N"){
			$("#btnCancelarEtapa").click();
		}
	}
	g_cantProc -= 1;
}

function buscarProducto(){
	var campos = ["txtCodigo"];
	if(validarCampos(campos)){
		$("#desProducto").html("-");
		$.ajax({
			url: "procedimientos/productos.php",
			data: {
							accion:"buscar",
							tipo: g_tipo,
							codigo:$("#txtCodigo").val()
						},
			type: "POST",
			dataType: "json",
			beforeSend: notificacionProceso,
			success: procesarProducto,
			error: function() { alert("Se ha producido un error.\nConsulte con el administrador."); }
		});
	}
}

function procesarProducto(resp){
	if(resp.estado == "ERR"){
		alert("Ocurrió un error al consultar la Base de Datos.\nConsutle con el administrador.\n\nMensaje Error:\n" + resp.msjErr);
	}
	else if(resp.estado == "OK"){
		$("#desProducto").html(resp.descripcion);
		$("#txtPrecio").focus();
		g_prod_ok = true;
	}
	else if(resp.estado == "NOEXISTE"){
		$("#divAgregarProducto").hide();
		mostrarVentana("#divNuevoProducto");
		$("#txtCodProducto").val($("#txtCodigo").val());
		$("#txtDesProducto").val("").focus();
		g_prod_ok = false;
	}
	g_cantProc -= 1;
}

function crearProducto(){
	var campos = ["txtDesProducto"];
	if(validarCampos(campos)){
		$.ajax({
			url: "procedimientos/productos.php",
			data: {
						accion:"crear",
						tipo: g_tipo,
						codigo:$("#txtCodProducto").val(),
						descripcion:$("#txtDesProducto").val()
					},
			type: "POST",
			dataType: "json",
			beforeSend: notificacionProceso,
			success: procesarProdNuevo,
			error: function() { alert("Se ha producido un error.\nConsulte con el administrador."); }
		});
	}
}

function procesarProdNuevo(resp){
	if(resp.estado == "ERR"){
		alert("Ocurrió un error al consultar la Base de Datos.\nConsutle con el administrador.\n\nMensaje Error:\n" + resp.msjErr);
	}
	else if(resp.estado == "OK"){
		alertar("El Producto se ha creado correctamente.");
		buscarProducto();
		$("#divNuevoProducto").hide();
		mostrarVentana("#divAgregarProducto");
	}
	g_cantProc -= 1;
}

function crearCliente(){
	var campos = ["txtNombreCliente"];
	if(validarCampos(campos)){
		$.ajax({
			url: "procedimientos/clientes.php",
			data: {
						accion:"crear",
						nombre:$("#txtNombreCliente").val()
					},
			type: "POST",
			dataType: "json",
			beforeSend: notificacionProceso,
			success: procesarCliente,
			error: function() { alert("Se ha producido un error.\nConsulte con el administrador."); }
		});
	}
}

function procesarCliente(resp){
	if(resp.estado == "ERR"){
		alert("Ocurrió un error al consultar la Base de Datos.\nConsutle con el administrador.\n\nMensaje Error:\n" + resp.msjErr);
	}
	else if(resp.estado == "OK"){
		alertar("El Cliente se ha creado correctamente.");
		$("#btnCancelarCliente").click();
	}
	g_cantProc -= 1;
}

function agregarProducto(){
	var campos = ["txtCodigo", "txtPrecio", "txtPrecioFinal", "cboCliente", "txtPuntos"];
	if(validarCampos(campos) && g_prod_ok){
		$.ajax({
			url: "procedimientos/productos.php",
			data: {
						accion:"agregar",
						tipo:g_tipo,
						codigo:$("#txtCodigo").val(),
						precio:$("#txtPrecio").val(),
						precioFinal:$("#txtPrecioFinal").val(),
						puntos:$("#txtPuntos").val(),
						cliente:$("#cboCliente").val(),
						comentario:$("#txtComentario").val()
					},
			type: "POST",
			dataType: "json",
			beforeSend: notificacionProceso,
			success: procesarAgregarListaProd,
			error: function() { alert("Se ha producido un error.\nConsulte con el administrador."); }
		});
	}
}

function procesarAgregarListaProd(resp){
	if(resp.estado == "ERR"){
		alert("Ocurrió un error al consultar la Base de Datos.\nConsutle con el administrador.\n\nMensaje Error:\n" + resp.msjErr);
	}
	else if(resp.estado == "OK"){
		var infoExtra;
		if(g_tipo == "N"){
			infoExtra = "Puntos";
			infoExtraVal = $("#txtPuntos").val();
		}
		if(!$("#listaProductos").length){
			var campos = ["Descripci&oacute;n","C&oacute;digo","Precio","Precio Final","Cliente",infoExtra,"Comentario"];
			crearListado("#divListadoProductos", "listaProductos", campos);
			$("#divListadoProductos").show();
		}
		var datos = [$("#desProducto").html(),$("#txtCodigo").val(),$("#txtPrecio").val(),$("#txtPrecioFinal").val(),$("#cboCliente :selected").text(),infoExtraVal,$("#txtComentario").val()];
		agregarFila("listaProductos", datos);
		configurarLista("#divListadoProductos");
		
		$("#desProducto").html("-");
		var campos = ["#txtCodigo","#txtPrecio","#txtPrecioFinal","#cboCliente","#txtPuntos","#txtComentario"];
		limpiarCampos(campos);
		g_prod_ok = false;
		$("#txtCodigo").focus();
	}
	g_cantProc -= 1;
}

function crearPedido(){
	var peticion = $.ajax({
		url: "procedimientos/pedidos.php",
		data: {
					accion:"crear",
					tipo:g_tipo,
					etapa:g_etapa_sel,
					pedido:g_pedido_sel
				},
		type: "POST",
		dataType: "json",
		beforeSend: notificacionProceso,
		success: procesarCrearPedido,
		error: function() { alert("Se ha producido un error.\nConsulte con el administrador."); }
	});
}

function procesarCrearPedido(resp){
	if(resp.estado == "ERR"){
		alert("Ocurrió un error al consultar la Base de Datos.\nConsutle con el administrador.\n\nMensaje Error:\n" + resp.msjErr);
		cancelarPedido();
	}
	else if(resp.estado == "OK"){
		alertar("El pedido se ha creado correctamente.");
		cancelarPedido();
		cargarMenues();
		if(g_pedido_sel != ""){
			cargarPedidos(g_pedido_sel);
		}
	}
	g_cantProc -= 1;
}

function cancelarPedido(){
	var campos = ["#txtCodigo","#txtPrecio","#txtPrecioFinal","#cboCliente","#txtPuntos","#txtComentario"];
	limpiarCampos(campos);
	var peticion = $.ajax({
		url: "procedimientos/pedidos.php",
		data: {
					accion:"cancelar"
				},
		type: "POST",
		dataType: "json",
		beforeSend: notificacionProceso,
		success: procesarCancelarPedido,
		error: function() { alert("Se ha producido un error.\nConsulte con el administrador."); }
	});
}

function procesarCancelarPedido(resp){
	if(resp.estado == "ERR"){
		alert("Ocurrió un error al consultar la Base de Datos.\nConsutle con el administrador.\n\nMensaje Error:\n" + resp.msjErr);
	}
	else if(resp.estado == "OK"){
		$("#divAgregarProducto").hide();
		ocultarFondoTrans();
		$("#divListadoProductos").html("").hide();
	}
	g_cantProc -= 1;
}

function cargarListaProductos(tipo){
	g_lista = "productos";
	crearCuadro("#divLista");
	var divCarga = $("<div></div>").addClass("cargando");
	$("#divLista .borCentro").html(divCarga);
	$("#divLista").show();
	configurarLista("#divLista");
	$.ajax({
		url: "procedimientos/productos.php",
		type: "POST",
		data: {
					accion: "listado",
					tipo: tipo
				},
		dataType: "json",
		beforeSend: notificacionProceso,
		success: procesarListaProductos,
		error: function() { alert("Se ha producido un error.\nConsulte con el administrador."); }
	});
}

function procesarListaProductos(resp){
	if(resp.estado == "ERR"){
		alert("Ocurrió un error al consultar la Base de Datos.\nConsutle con el administrador.\n\nMensaje Error:\n" + resp.msjErr);
	}
	else if(resp.estado == "OK"){
		if(resp.datos.length == 0){
			$("#divLista .borCentro").html("No hay productos.");
		}
		else{
			$("#divLista").html("");
			crearListado("#divLista", "listaProductos", resp.campos);
			for(var i = 0; i < resp.datos.length; i++){
				agregarFila2("listaProductos", resp.datos[i]);
			}
			$("#divLista").show();
		}
		configurarLista("#divLista");
	}
	g_cantProc -= 1;
}

function modificarProducto(id, valor){
	var data = null;
	if(valor == null || valor == ""){
		if(!confirm("Vas a eliminar este producto, ¿Estás seguro?")){
			cargarListaProductos();
			return false;
		}
		data =	{
						accion: "eliminar",
						tipo: $("#cmbTipo").val(),
						codigo: id
					};
	}
	else{
		data =	{
						accion:"modificar",
						tipo: $("#cmbTipo").val(),
						codigo:id,
						descripcion:valor
					};
	}
	$.ajax({
		url: "procedimientos/productos.php",
		type: "POST",
		data: data,
		dataType: "json",
		beforeSend: notificacionProceso,
		success: procesarModificarProducto,
		error: function() { alert("Se ha producido un error.\nConsulte con el administrador."); }
	});
	return true;
}

function procesarModificarProducto(resp){
	if(resp.estado == "ERR"){
		alert("Ocurrió un error al consultar la Base de Datos.\nConsutle con el administrador.\n\nMensaje Error:\n" + resp.msjErr);
	}
	else if(resp.estado == "OK"){
		alertar("El producto se modificó correctamente");
	}
	else if(resp.estado == "OKDel"){
		cargarListaProductos($("#cmbTipo").val());
		alertar("El producto se eliminó correctamente");
	}
	g_cantProc -= 1;
}

function cargarListaClientes(){
	g_lista = "clientes";
	crearCuadro("#divLista");
	var divCarga = $("<div></div>").addClass("cargando");
	$("#divLista .borCentro").html(divCarga);
	$("#divLista").show();
	configurarLista("#divLista");
	$.ajax({
		url: "procedimientos/clientes.php",
		type: "POST",
		data: {
					accion: "listado"
				},
		dataType: "json",
		beforeSend: notificacionProceso,
		success: procesarListaClientes,
		error: function() { alert("Se ha producido un error.\nConsulte con el administrador."); }
	});
}

function procesarListaClientes(resp){
	if(resp.estado == "ERR"){
		alert("Ocurrió un error al consultar la Base de Datos.\nConsutle con el administrador.\n\nMensaje Error:\n" + resp.msjErr);
	}
	else if(resp.estado == "OK"){
		if(resp.datos.length == 0){
			$("#divLista .borCentro").html("No hay Clientes.");
		}
		else{
			$("#divLista").html("");
			crearListado("#divLista", "listaClientes", resp.campos);
			for(var i = 0; i < resp.datos.length; i++){
				agregarFila2("listaClientes", resp.datos[i]);
			}
			$("#divLista").show();
			configurarLista("#divLista");
		}
	}
	g_cantProc -= 1;
}

function modificarCliente(id, valor){
	var data = null;
	if(valor == null || valor == ""){
		alertar("El nombre del cliente no debe ser vacio.");
		cargarListaClientes();
		return false;
	}
	else{
		data =	{
						accion:"modificar",
						codigo:id,
						nombre:valor
					};
	}
	$.ajax({
		url: "procedimientos/clientes.php",
		type: "POST",
		data: data,
		dataType: "json",
		beforeSend: notificacionProceso,
		success: procesarModificarCliente,
		error: function() { alert("Se ha producido un error.\nConsulte con el administrador."); }
	});
	return true;
}

function procesarModificarCliente(resp){
	if(resp.estado == "ERR"){
		alert("Ocurrió un error al consultar la Base de Datos.\nConsutle con el administrador.\n\nMensaje Error:\n" + resp.msjErr);
	}
	else if(resp.estado == "OK"){
		alertar("El cliente se modificó correctamente");
	}
	else if(resp.estado == "OKDel"){
		cargarListaClientes();
		alertar("El cliente se eliminó correctamente");
	}
	g_cantProc -= 1;
}

function cargarListaMisProductos(){
	g_lista = "mis_productos";
	crearCuadro("#divLista");
	var divCarga = $("<div></div>").addClass("cargando");
	$("#divLista .borCentro").html(divCarga);
	$("#divLista").show();
	configurarLista("#divLista");
	$.ajax({
		url: "procedimientos/productos.php",
		type: "POST",
		data: {
					accion: "listadoMisProd"
				},
		dataType: "json",
		beforeSend: notificacionProceso,
		success: procesarListaMisProductos,
		error: function() { alert("Se ha producido un error.\nConsulte con el administrador."); }
	});
}

function procesarListaMisProductos(resp){
	if(resp.estado == "ERR"){
		alert("Ocurrió un error al consultar la Base de Datos.\nConsutle con el administrador.\n\nMensaje Error:\n" + resp.msjErr);
	}
	else if(resp.estado == "OK"){
		if(resp.datos.length == 0){
			$("#divLista .borCentro").html("No hay productos.");
		}
		else{
			$("#divLista").html("");
			crearListado("#divLista", "listaMisProductos", resp.campos);
			for(var i = 0; i < resp.datos.length; i++){
				agregarFila2("listaMisProductos", resp.datos[i]);
			}
			$("#divLista").show();
		}
		configurarLista("#divLista");
	}
	crearMenuContextual2();
	g_cantProc -= 1;
}

function nuevoMiProducto(){
	mostrarFondoTrans($("#divNuevoMiProducto").css("z-index"));
	mostrarVentana("#divNuevoMiProducto");
	$("#txtMiProdDescripcion").val("").focus();
	$("#txtMiProdPrecio").val("");
}

function agregarMiProducto(){
	var campos = ["txtMiProdDescripcion", "txtMiProdPrecio"];
	if(validarCampos(campos)){
		$.ajax({
			url: "procedimientos/productos.php",
			data: {
						accion:"agregarMiProd",
						descripcion:$("#txtMiProdDescripcion").val(),
						precio:$("#txtMiProdPrecio").val()
					},
			type: "POST",
			dataType: "json",
			beforeSend: notificacionProceso,
			success: procesarAgregarMiProd,
			error: function() { alert("Se ha producido un error.\nConsulte con el administrador."); }
		});
	}
}

function procesarAgregarMiProd(resp){
	if(resp.estado == "ERR"){
		alert("Ocurrió un error al consultar la Base de Datos.\nConsutle con el administrador.\n\nMensaje Error:\n" + resp.msjErr);
	}
	else if (resp.estado == "OK"){
		alertar("El producto se creó correctamente");
		$("#btnCancelarMiProducto").click();
		cargarListaMisProductos();
	}
	g_cantProc -= 1;
}

function eliminarMiProducto(id){
	$.ajax({
		url: "procedimientos/productos.php",
		data: {
					accion:"eliminarMiProd",
					codigo:id
				},
		type: "POST",
		dataType: "json",
		beforeSend: notificacionProceso,
		success: procesarEliminarMiProd,
		error: function() { alert("Se ha producido un error.\nConsulte con el administrador."); }
	});
}

function procesarEliminarMiProd(resp){
	if(resp.estado == "ERR"){
		alert("Ocurrió un error al consultar la Base de Datos.\nConsutle con el administrador.\n\nMensaje Error:\n" + resp.msjErr);
	}
	else if (resp.estado == "OK"){
		alertar("El producto se eliminó correctamente");
		cargarListaMisProductos();
	}
	g_cantProc -= 1;
}

function levantarProducto(id){
	mostrarFondoTrans($("#divAgregarProducto").css("z-index"));
	mostrarVentana("#divAgregarProducto");
	$(".divBotones").hide();
	$(".divBotonesEdit").show();
	$("#hdnId").val(id);
	cargarCombo('Cliente');
	
	$.ajax({
		url: "procedimientos/pedidos.php",
		data: {
					accion:"traerPedido",
					codigo:id
				},
		type: "POST",
		dataType: "json",
		beforeSend: notificacionProceso,
		success: procesarLeventarProducto,
		error: function() { alert("Se ha producido un error.\nConsulte con el administrador."); }
	});
}

function procesarLeventarProducto(resp){
	if(resp.estado == "ERR"){
		alert("Ocurrió un error al consultar la Base de Datos.\nConsutle con el administrador.\n\nMensaje Error:\n" + resp.msjErr);
	}
	else if (resp.estado == "OK"){
		$("#txtCodigo").val(resp.pedido.codigo);
		$("#txtCodigo").blur();
		$("#txtPrecio").val(resp.pedido.precio);
		$("#txtPrecioFinal").val(resp.pedido.precioFinal);
		$("#txtPuntos").val(resp.pedido.infoExtra);
		setTimeout("$(\"#cboCliente\").val(" + resp.pedido.idCliente + ");", 500);
		$("#txtComentario").val(resp.pedido.desComentario);
	}
	g_cantProc -= 1;
}

function modifProducto(){
	var campos = ["txtCodigo", "txtPrecio", "txtPrecioFinal", "cboCliente", "txtPuntos"];
	if(validarCampos(campos)){
		$.ajax({
			url: "procedimientos/productos.php",
			data: {
						accion:"actualizar",
						tipo:g_tipo,
						id:$("#hdnId").val(),
						codigo:$("#txtCodigo").val(),
						precio:$("#txtPrecio").val(),
						precioFinal:$("#txtPrecioFinal").val(),
						puntos:$("#txtPuntos").val(),
						cliente:$("#cboCliente").val(),
						comentario:$("#txtComentario").val()
					},
			type: "POST",
			dataType: "json",
			beforeSend: notificacionProceso,
			success: procesarModifProducto,
			error: function() { alert("Se ha producido un error.\nConsulte con el administrador."); }
		});
	}
}

function procesarModifProducto(resp){
	if(resp.estado == "ERR"){
		alert("Ocurrió un error al consultar la Base de Datos.\nConsutle con el administrador.\n\nMensaje Error:\n" + resp.msjErr);
	}
	else if (resp.estado == "OK"){
		alertar("El producto se modificó correctamente");
		cargarPedidos(g_pedido_sel);
		$("#btnCancelarModif").click();
	}
	g_cantProc -= 1;
}