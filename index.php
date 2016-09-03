<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
		<link rel="stylesheet" type="text/css" href="estilos/cssEstructura.css">
		<link rel="stylesheet" type="text/css" href="estilos/cssListado.css">
		<link rel="stylesheet" type="text/css" href="estilos/cssGeneral.css">
		<link rel="stylesheet" type="text/css" href="estilos/cssNatura.css">
		
		<link rel="stylesheet" type="text/css" href="estilos/sunny/jquery-ui-1.7.2.custom.css">
		
		<script language="javascript" type="text/javascript" src="js/jquery.min.js"></script>
		
		<script language="javascript" type="text/javascript" src="js/jquery-ui.min.js"></script>
		<script language="javascript" type="text/javascript" src="js/jquery-ui.core.js"></script>
		<script language="javascript" type="text/javascript" src="js/jquery-ui.datepicker.js"></script>
		<script language="javascript" type="text/javascript" src="js/jquery.contextmenu.r2.packed.js"></script>
		
		<script language="javascript" type="text/javascript" src="js/genericas.js"></script>
		<script language="javascript" type="text/javascript" src="js/funciones.js"></script>
		<script language="javascript" type="text/javascript" src="js/natura.js"></script>
		<script language="javascript" type="text/javascript" src="js/amodil.js"></script>
		
		<title>Sistema de Administradci&oacute;n de pedidos de Natura</title>
	</head>
	<body>
		<div class="fondo"></div>
		<div class="barraMenu">
			<div class="menus" id="btnNatura">
				<div class="menuIzq"></div>
				<div class="menuMed">
					<div class="texto">PEDIDOS</div>
				</div>
				<div class="menuDer"></div>
			</div>
			<div class="menus" id="btnClientes">
				<div class="menuIzq"></div>
				<div class="menuMed">
					<div class="texto">CLIENTES</div>
				</div>
				<div class="menuDer"></div>
			</div>
				<div class="menus" id="btnProductos">
				<div class="menuIzq"></div>
				<div class="menuMed">
					<div class="texto">PRODUCTOS</div>
				</div>
				<div class="menuDer"></div>
			</div>
			<div class="menus" id="btnMisProductos">
				<div class="menuIzq"></div>
				<div class="menuMed">
					<div class="texto">MIS PRODUCTOS</div>
				</div>
				<div class="menuDer"></div>
			</div>
			<div class="msjNotificacion"></div>
		</div>
		
		<div class="divMenus">
			<div class="menu" id="menuAct">Actuales</div>
			<div class="menu" id="menuAnt">Anteriores</div>
			<div class="menu" id="menuNue">Nuevo Pedido</div>
			<div class="menu" id="menuAgr">Agregar Productos</div>
		</div>
		
		<div class="divMenusCic">
			<div class="divMenusAct"></div>
			<div class="divMenusAnt">
				<div class="menu" id="btnSubir">Subir</div>
				<div id="divCiclos"></div>
				<div class="menu" id="btnBajar">Bajar</div>
			</div>
		</div>
		
		<div class="divMenusPed"></div>
		
		<div class="contenedor">
			
			<div id="divNuevaEtapa">
				<div class="campo">
					<div class="label">Nombre</div>
					<input type="text" class="text" id="txtNombreEtapa">
					<div class="msjErr" id="err_txtNombreEtapa">Debe ingresar el nombre</div>
				</div>
				<div class="campo">
					<div class="label">Fecha Inicio</div>
					<input type="text" class="text" id="txtFecInicio">
					<div class="msjErr" id="err_txtFecInicio">Debe ingresar la fecha</div>
				</div>
				<div class="campo">
					<div class="label">Fecha Finalizaci&oacute;n</div>
					<input type="text" class="text" id="txtFecFinalizacion">
					<div class="msjErr" id="err_txtFecFinalizacion">Debe ingresar la fecha</div>
				</div>
				<div class="boton">
					<input type="button" id="btnNuevaEtapa" value="Crear">
				</div>
				<div class="boton">
					<input type="button" id="btnCancelarEtapa" value="Cancelar">
				</div>
			</div>
			
			<div id="divNuevoCliente">
				<div class="campo">
					<div class="label">Nombre</div>
					<input type="text" class="text" id="txtNombreCliente">
					<div class="msjErr" id="err_txtNombreCliente">Debe ingresar el nombre</div>
				</div>
				<div class="boton">
					<input type="button" id="btnNuevoCliente" value="Agregar">
				</div>
				<div class="boton">
					<input type="button" id="btnCancelarCliente" value="Cancelar">
				</div>
			</div>
			
			<div id="divNuevoProducto">
				<div class="campo">
					<div class="label">C&oacute;digo</div>
					<input type="text" class="text" id="txtCodProducto" disabled="disabled">
				</div>
				<div class="campo">
					<div class="label">Descripci&oacute;n</div>
					<input type="text" class="text" id="txtDesProducto">
					<div class="msjErr" id="err_txtDesProducto">Debe ingresar la descripci&oacute;n</div>
				</div>
				<div class="boton">
					<input type="button" id="btnNuevoProducto" value="Agregar">
				</div>
				<div class="boton">
					<input type="button" id="btnCancelarProducto" value="Cancelar">
				</div>
			</div>
			
			<div id="divNuevoMiProducto">
				<div class="campo">
					<div class="label">Descripci&oacute;n</div>
					<input type="text" class="text" id="txtMiProdDescripcion">
					<div class="msjErr" id="err_txtMiProdDescripcion">Debe ingresar la descripci&oacute;n</div>
				</div>
				<div class="campo">
					<div class="label">Precio</div>
					<input type="text" class="text" id="txtMiProdPrecio">
					<div class="msjErr" id="err_txtMiProdPrecio">Debe ingresar el precio</div>
				</div>
				<div class="boton">
					<input type="button" id="btnNuevoMiProducto" value="Agregar">
				</div>
				<div class="boton">
					<input type="button" id="btnCancelarMiProducto" value="Cancelar">
				</div>
			</div>
			
			<div id="divNuevoPedido">
				<div class="campo">
					<div class="label">Ciclo</div>
					<select class="combo" id="cboCicloPedido"></select>
					<div class="miniBoton" id="btnAgregarEtapa"></div>
					<div class="msjErr" id="err_cboCicloPedido">Debe seleccionar una opci&oacute;n</div>
				</div>
				<div class="boton">
					<input type="button" id="btnSiguientePedido" value="Siguiente">
				</div>
				<div class="boton">
					<input type="button" id="btnCancelarPedido" value="Cancelar">
				</div>
			</div>
			
			<div id="divAgregarProducto">
				<div class="divCampos">
					<div class="campo">
						<div class="label">C&oacute;digo</div>
						<input type="text" class="text" id="txtCodigo">
						<div class="msjErr" id="err_txtCodigo">Debe ingresar el c&oacute;digo</div>
					</div>
					<div class="campo" id="divDesProducto">
						<div class="label">Producto</div>
						<div id="desProducto">-</div>
					</div>
					<div class="campo">
						<div class="label">Precio</div>
						<input type="text" class="text" id="txtPrecio">
						<div class="msjErr" id="err_txtPrecio">Debe ingresar el precio</div>
					</div>
					<div class="campo">
						<div class="label">Precio Final</div>
						<input type="text" class="text" id="txtPrecioFinal">
						<select class="text" id="cboDescuento"></select>
						<div class="msjErr" id="err_txtPrecioFinal">Debe ingresar el precio</div>
					</div>
					<div class="campo" id="divTxtPuntos">
						<div class="label">Puntos</div>
						<input type="text" class="text" id="txtPuntos">
						<div class="msjErr" id="err_txtPuntos">Debe ingresar los puntos</div>
					</div>
					<div class="campo">
						<div class="label">Cliente</div>
						<select class="combo" id="cboCliente"></select>
						<div class="miniBoton" id="agregarCliente"></div>
						<div class="msjErr" id="err_cboCliente">Debe seleccionar el Cliente</div>
					</div>
					<div class="campo">
						<div class="label">Comentario</div>
						<input type="text" class="text" id="txtComentario">
					</div>
				</div>
				<div class="divBotones">
					<div class="boton">
						<input type="button" id="btnFinalizarPedido" value="Finalizar">
					</div>
					<div class="boton">
						<input type="button" id="btnAgregarProducto" value="Agregar">
					</div>
					<div class="boton">
						<input type="button" id="btnCancelarPedido2" value="Cancelar">
					</div>
				</div>
				<div class="divBotonesEdit">
					<div class="boton">
						<input type="button" id="btnModifProducto" value="Actualizar">
					</div>
					<div class="boton">
						<input type="button" id="btnCancelarModif" value="Cancelar">
					</div>
					<input type="hidden" id="hdnId">
				</div>
			</div>
			
			<div id="divListadoProductos"></div>
			<div id="divListadoPedido"></div>
			<div id="infoGeneral"></div>
			<div id="realizarPedido"></div>
			<div id="menuContextual" style="display:none">
				<ul>
					<li id="edit"><img src="imagenes/btnEdit.png" /> Editar</li>
					<li id="delete"><img src="imagenes/btnDelete.png" /> Eliminar</li>
				</ul>
			</div>
			
			<div id="divCboTipo">
				<select class="combo" id="cmbTipo" onChange="cargarListaProductos(this.value)">
					<option value="N">Natura</option>
					<option value="A">Amodil</option>
				</select>
			</div>
			<div id="divBtnAgregarMiProd">
				<div class="btnAgregarMiProducto" id="agregarMiProducto"></div>
			</div>
			<div id="divLista"></div>
			
			<div id="proceso"></div>
		</div>
		
		<div class="pie">
			<div class="pie_izq">
				<div class="pieTextoIzq"></div>
			</div>
			<div class="pie_der">
				<div class="pieTextoDer"></div>
			</div>
		</div>
	</body>
</html>
