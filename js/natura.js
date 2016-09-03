$(document).ready(function(){
	
/*	$("#cboCiclo").change(function(){
		cargarCombo("Pedido", "Ciclo");
	});
	
	$("#cboPedido").change(function(){
		cargarPedidos("Natura");
		$(".btnAgregarProducto").show();
	});
*/	
	$("#menuNue").click(function(){
		ocultarMenues();
		mostrarFondoTrans($("#divNuevoPedido").css("z-index"));
		mostrarVentana("#divNuevoPedido");
		cargarCombo('CicloPedido');
		g_pedido_sel = "";
		$("#divListadoPedido").hide();
		$("#infoGeneral").hide();
	});

	$("#btnSiguientePedido").click(function(){
		var campos = ["cboCicloPedido"];
		if(validarCampos(campos)){
			$("#divNuevoPedido").hide();
			mostrarVentana("#divAgregarProducto");
			$(".divBotonesEdit").hide();
			$("#divTxtPuntos").show();
			$(".divBotones").show();
			$(".divBotonesEdit").hide();
			cargarCombo('Cliente');
			g_etapa_sel = $("#cboCicloPedido").val();
		}
	});
	$("#btnCancelarPedido").click(function(){
		ocultarFondoTrans();
		$("#divNuevoPedido").hide();
		g_etapa_sel = "";
	});
	
	$("#btnModifProducto").click(function(){
		modifProducto();
	});
	$("#btnCancelarModif").click(function(){
		var campos = ["#txtCodigo","#txtPrecio","#txtPrecioFinal","#cboCliente","#txtPuntos","#txtComentario"];
		limpiarCampos(campos);
		ocultarFondoTrans();
		$("#divAgregarProducto").hide();
	});
	
	$("#btnAgregarEtapa").click(function(){
		$("#divNuevoPedido").hide();
		mostrarVentana("#divNuevaEtapa");
		$("#btnCancelarEtapa").click(function(){
			$("#divNuevaEtapa").hide();
			limpiarCampos(["#txtNombreEtapa","#txtFecInicio","#txtFecFinalizacion"]);
			mostrarVentana("#divNuevoPedido");
			cargarCombo('CicloPedido');
			$("#btnCancelarEtapa").unbind("click");
		});
	});
	
	$("#menuAgr").click(function(){
		if(g_pedido_sel != ""){
			mostrarFondoTrans($("#divAgregarProducto").css("z-index"));
			mostrarVentana("#divAgregarProducto");
			$("#divTxtPuntos").show();
			$(".divBotones").show();
			$(".divBotonesEdit").hide();
			cargarCombo('Cliente');
			//g_etapa_sel = $("#cboCiclo").val();
			//g_pedido_sel = $("#cboPedido").val();
		}
		else{
			alert("Debe seleccionar un pedido desde el menu.");
		}
	});
});

