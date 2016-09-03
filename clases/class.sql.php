<?php
	class SQLclass{
		private $enlace;
		private $base;
		private $query;
		private $result;
		private $error;
		
		function __construct(){
			$this->enlace = mysqli_connect("localhost", "administrador", "techadministrator");
			$this->base = "amonatura";
			mysqli_select_db($this->enlace, $this->base);
		}
		
		function cargarMenues(){
			$this->query = "SELECT e.idEtapa, e.nomEtapa, p.idPedido, p.nroPedido
									FROM Etapas e, Pedidos p
								  WHERE e.idTipo = 'N'
									 AND e.idEtapa = p.idEtapa
							  ORDER BY idEtapa DESC, nroPedido ASC";
			$this->ejecutar();
		}
		
		function traerPedidosXidPedido($idPedido){
			$this->query = "SELECT pedProd.idPedidoProducto,
										  prod.desProducto,
										  prod.codProducto,
										  pedProd.precioOriginal,
										  pedProd.precioFinal,
										  c.idCliente,
										  c.nomCliente,
										  pedProd.infoExtra,
										  pedProd.desComentario,
										  pedProd.indPagado
									FROM pedidos_productos pedProd,
										  productos prod,
										  clientes c
								  WHERE pedProd.idPedido = ".$idPedido."
									 AND pedProd.idCliente = c.idCliente
									 AND pedProd.idProducto = prod.idProducto
							  ORDER BY c.idCliente";
			$this->ejecutar();
		}
		
		function traerSubtotalesXCliente($idPedido, $idCliente){
			$this->query = "SELECT SUM(pedProd.precioOriginal) pOriginal,
										  SUM(pedProd.precioFinal) pFinal,
										  SUM(pedProd.infoExtra) puntos
									FROM pedidos_productos pedProd
								  WHERE pedProd.idPedido = ".$idPedido."
									 AND pedProd.idCliente = ".$idCliente."
							  GROUP BY pedProd.idCliente";
			$this->ejecutar();
		}
		
		function traerPedidosXidEtapa($idEtapa){
			$this->query = " SELECT pedProd.idPedidoProducto,
											prod.desProducto,
											prod.codProducto,
											pedProd.precioOriginal,
											c.nomCliente,
											pedProd.infoExtra,
											pedProd.desComentario,
											pedProd.indPagado
									 FROM pedidos p,
											pedidos_productos pedProd,
											productos prod,
											clientes c
									WHERE	p.idEtapa = ".$idEtapa."
									  AND pedProd.idPedido = p.idPedido
									  AND pedProd.idCliente = c.idCliente
									  AND	pedProd.idProducto = prod.idProducto";
			$this->ejecutar();
		}
		
		function traerProductos($idTipo){
			$this->query = " SELECT p.idProducto,
											p.codProducto,
											p.desProducto,
											p.indEstado
									 FROM	productos p
									WHERE p.idTipo = '".$idTipo."'
								ORDER BY p.codProducto";
			$this->ejecutar();
		}
		
		function traerMisProductos(){
			$this->query = "SELECT 	p.idProducto,
											p.desProducto,
											p.precio
									FROM	mis_productos p
									ORDER BY p.desProducto";
			$this->ejecutar();
		}
		
		function traerClientes(){
			$this->query = "SELECT 	c.idCliente,
											c.nomCliente
									FROM	clientes c
									ORDER BY c.nomCliente";
			$this->ejecutar();
		}
		
		function consultarEtapaXPedido($idPedido){
			$this->query = "SELECT 	p.nroPedido,
											e.nomEtapa,
											e.fecComienzo,
											e.fecFinalizacion
									FROM	pedidos p,
											etapas e
									WHERE	p.idPedido = ".$idPedido."
									AND	p.idEtapa = e.idEtapa";
			$this->ejecutar();
		}
		
		function consultarEtapa($idEtapa){
			$this->query = "SELECT 	e.nomEtapa,
											e.fecComienzo,
											e.fecFinalizacion
									FROM	etapas e
									WHERE	e.idEtapa = ".$idEtapa."";
			$this->ejecutar();
		}
		
		function consultarEtapaXNombre($idTipo, $nombre){
			$this->query = "SELECT 	e.nomEtapa
									FROM	etapas e
								  WHERE	e.idTipo = '".$idTipo."'
									 AND	e.nomEtapa = '".$nombre."'";
			$this->ejecutar();
		}
		
		function crearEtapas($idTipo, $nombre, $fecInicio, $fecFinalizacion){
			$this->query = "INSERT INTO etapas
													(idEtapa, idTipo, nomEtapa, fecComienzo, fecFinalizacion)
											VALUES
													('', '".$idTipo."', '".$nombre."', '".$fecInicio."', '".$fecFinalizacion."')";
			$this->ejecutar();
		}
		
		function crearProducto($idTipo, $codigo, $descripcion){
			$this->query = "INSERT INTO productos
													(idProducto, idTipo, codProducto, desProducto)
											VALUES
													('', '".$idTipo."', '".$codigo."', '".$descripcion."')";
			$this->ejecutar();
		}
		
		function crearMiProducto($descripcion, $precio){
			$this->query = "INSERT INTO mis_productos
													(idProducto, desProducto, precio)
											VALUES
													('', '".$descripcion."', '".$precio."')";
			$this->ejecutar();
		}
		
		function crearCliente($nombre){
			$this->query = "INSERT INTO clientes
													(nomCliente)
											VALUES
													('".$nombre."')";
			$this->ejecutar();
		}
		
		function crearPedido($idEtapa, $nroPedido){
			$this->query = "INSERT INTO pedidos
													(idPedido, idEtapa, nroPedido)
											VALUES
													('', ".$idEtapa.", ".$nroPedido.")";
			$this->ejecutar();
		}
		
		function crearPedidoProducto($idPedido, $idProducto, $precio, $precioFinal, $infoExtra, $idCliente, $desComentario){
			$this->query = "INSERT INTO pedidos_productos
													(idPedidoProducto, idPedido, idProducto, precioOriginal, precioFinal, infoExtra, idCliente, desComentario)
											VALUES
													('', ".$idPedido.", ".$idProducto.", ".$precio.", ".$precioFinal.", '".$infoExtra."', ".$idCliente.", '".$desComentario."')";
			$this->ejecutar();
		}
		
		function consultarEtapas($idTipo){
			$this->query = "SELECT 	e.idEtapa idCombo, e.nomEtapa nombre
									 FROM etapas e
									WHERE e.idTipo = '". $idTipo ."'
								ORDER BY nombre";
			$this->ejecutar();
		}
		
		function consultarClientes(){
			$this->query = "SELECT 	c.idCliente idCombo, c.nomCliente nombre
									 FROM clientes c
								ORDER BY nombre";
			$this->ejecutar();
		}
		
		function consultarPedido($idEtapa){
			$this->query = "SELECT 	p.idPedido idCombo, p.nroPedido nombre
									 FROM pedidos p
									WHERE p.idEtapa = '".$idEtapa."'";
			$this->ejecutar();
		}
		
		function buscarProducto($idTipo, $codigo){
			$this->query = " SELECT p.idProducto, p.codProducto, p.desProducto
									 FROM productos p
									WHERE p.idTipo = '".$idTipo."'
									  AND p.codProducto = '".$codigo."'
									  AND p.indEstado = 'A'";
			$this->ejecutar();
		}
		
		function modificarProducto($idTipo, $codigo, $descripcion){
			$this->query = "UPDATE productos p
									 SET p.desProducto = '".$descripcion."'
								  WHERE p.idTipo = '".$idTipo."'
									 AND p.idProducto = ".$codigo."";
			$this->ejecutar();
		}
		
		function eliminarProducto($idTipo, $codigo){
			$this->query = "UPDATE productos p
									 SET p.indEstado = 'I'
								  WHERE p.idTipo = '".$idTipo."'
									 AND p.idProducto = '".$codigo."'";
			$this->ejecutar();
		}
		
		function eliminarMiProducto($codigo){
			$this->query = "DELETE
									FROM mis_productos
								  WHERE idProducto = '".$codigo."'";
			$this->ejecutar();
		}
		
		function modificarCliente($codigo, $nombre){
			$this->query = "UPDATE clientes c
									 SET c.nomCliente = '".$nombre."'
								  WHERE c.idCliente = '".$codigo."'";
			$this->ejecutar();
		}
		
		function eliminarCliente($codigo){
			$this->query = "DELETE FROM clientes
										 WHERE idCliente = '".$codigo."'";
			$this->ejecutar();
		}
		
		function modificarPedido($codigo, $comentario){
			$this->query = "UPDATE pedidos_productos pedProd
									 SET pedProd.desComentario = '".$comentario."'
								  WHERE pedProd.idPedidoProducto = '".$codigo."'";
			$this->ejecutar();
		}
		
		function checkPagado($codigo, $valor){
			$this->query = "UPDATE pedidos_productos pedProd
									 SET pedProd.indPagado = '".$valor."'
								  WHERE pedProd.idPedidoProducto = '".$codigo."'";
			$this->ejecutar();
		}
		
		function consultarPedidoXPedProd($codigo){
			$this->query = "SELECT pedProd.idPedido
									FROM pedidos_productos pedProd
								  WHERE pedProd.idPedidoProducto = '".$codigo."'";
			$this->ejecutar();
		}
		
		function totalPagado($codigo){
			$this->query = "SELECT SUM(pedProd.precioFinal) total
									FROM pedidos_productos pedProd
								  WHERE pedProd.idPedido = '".$codigo."'
									 AND pedProd.indPagado LIKE 'S'
							  GROUP BY pedProd.idPedido";
			$this->ejecutar();
		}
		
		function eliminarPedido($codigo){
			$this->query = "DELETE FROM pedidos_productos
										 WHERE idPedidoProducto = ".$codigo;
			$this->ejecutar();
		}
		
		function realizarPedido($codigo){
			$this->query = "SELECT prod.desProducto,
										  prod.codProducto,
										  COUNT(*) cantidad
									FROM pedidos_productos pp,
										  productos prod
								  WHERE pp.idPedido = ".$codigo."
									 AND pp.idProducto = prod.idProducto
							  GROUP BY prod.codProducto";
			$this->ejecutar();
		}
		
		function traerPedidoXid($codigo){
			$this->query = "SELECT p.codProducto,
										  pp.precioOriginal,
										  pp.precioFinal,
										  pp.infoExtra,
										  pp.desComentario,
										  pp.idCliente
									FROM pedidos_productos pp,
										  productos p
								  WHERE pp.idPedidoProducto = ".$codigo."
								    AND pp.idProducto = p.idProducto";
			$this->ejecutar();
		}
		
		function actualizarProducto($id, $idProducto, $precio, $precioFinal, $infoExtra, $idCliente, $comentario){
			$this->query = "UPDATE pedidos_productos
									 SET idProducto = ".$idProducto.", precioOriginal = '".$precio."', precioFinal = '".$precioFinal."', infoExtra = '".$infoExtra."', idCliente = '".$idCliente."', desComentario = '".$comentario."'
								  WHERE idPedidoProducto = ".$id;
			$this->ejecutar();
		}
		
		function ejecutar(){
			$this->result = mysqli_query($this->enlace, $this->query);
			if(mysql_errno()){
				$this->error = mysql_error();
				$this->result = false;
			}
		}
		
		function obtenerCantidad(){
			return mysqli_num_rows($this->result);
		}
		
		function obtenerUltimoId(){
			return mysqli_insert_id($this->enlace);
		}
		
		function obtenerFila(){
			return mysqli_fetch_assoc($this->result);
		}
		
		function getError(){
			return $this->error;
		}
		
		function getResult(){
			return $this->result;
		}
	}
?>