$(document).ready(function(){
	
	$("#cboCampana").change(function(){
		cargarPedidos("Amodil");
		$("#agregarProductoAmodil").show();
	});
	
	$("#nuevaCampana").click(function(){
		mostrarFondoTrans("NuevoPedido",$("#divNuevaEtapa").css("z-index"));
		mostrarVentana("#divNuevaEtapa");
		$("#btnCancelarEtapa").click(function(){
			$("#divNuevaEtapa").hide();
			limpiarCampos(["#txtNombreEtapa","#txtFecInicio","#txtFecFinalizacion"]);
			eliminarFondoTrans("NuevoPedido");
			$("#btnCancelarEtapa").unbind("click");
		});
	});

	$("#agregarProductoAmodil").click(function(){
		mostrarFondoTrans("NuevoPedido",$("#divAgregarProducto").css("z-index"));
		mostrarVentana("#divAgregarProducto");
		$("#divTxtPuntos").hide();
		$("#divTxtPagina").show();
		cargarCombo('Cliente');
		g_etapa_sel = $("#cboCampana").val();
		g_pedido_sel = "";
	});
});

