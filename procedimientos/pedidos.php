<?
	try{
		require("funciones.php");
		require("../clases/class.sql.php");
		require("../clases/producto.php");
		
		$accion = $_POST[accion];
		$idTipo = $_POST[tipo];
		$idEtapa = $_POST[etapa];
		$idPedido = $_POST[pedido];
		$idPedProd = $_POST[codigo];
		$comentario = $_POST[comentario];
		$valor = $_POST[valor];
		
		if($accion == "crear"){
			$json = crear($idTipo, $idEtapa, $idPedido);
		}
		else if($accion == "cargarMenues"){
			$json = cargarMenues();
		}
		else if($accion == "cancelar"){
			session_name("SessionListado");
			session_start();
			session_unset();
			session_destroy();
			$json = '{"estado":"OK"}';
		}
		else if($accion == "modificar"){
			$json = modificar($idPedProd, $comentario);
		}
		else if($accion == "pagado"){
			$json = checkPagado($idPedProd, $valor);
		}
		else if($accion == "eliminar"){
			$json = eliminar($idPedProd);
		}
		else if($accion == "realizar"){
			$json = realizar($idPedido);
		}
		else if($accion == "traerPedido"){
			$json = traerPedido($idPedProd);
		}
	}
	catch(Exception $e){
		$json = '{"estado":"ERR",
							"msjErr":"'.$e->getMessage().'\nArchivo: '.formatString($e->getFile()).'\nEn linea: '.$e->getLine().'"}';
	}
	echo $json;
	
	function crear($idTipo, $idEtapa, $idPedido){
		$sql = new SQLclass();
		
		session_name("SessionListado");
		session_start();
		
		if(isset($_SESSION["productos"])){
			$productos = $_SESSION["productos"];
		}
		else{
			throw new Exception("No hay productos agregados.");
		}
		
		if($idPedido == ""){
			$sql->consultarPedido($idEtapa);
			if(!$sql->getResult()){
				throw new Exception($sql->getError());
			}
			$cant = $sql->obtenerCantidad();
			
			if($idTipo == "N"){
				$nroPedido = $cant + 1;
				
				$sql->crearPedido($idEtapa, $nroPedido);
				if(!$sql->getResult()){
					throw new Exception($sql->getError());
				}
				$idPedido = $sql->obtenerUltimoId();
			}
			else if($idTipo == "A"){
				if($cant == 0){
					$sql->crearPedido($idEtapa, 1);
					if(!$sql->getResult()){
						throw new Exception($sql->getError());
					}
					$idPedido = $sql->obtenerUltimoId();
				}
				else if($cant > 0){
					$row = $sql->obtenerFila();
					$idPedido = $row[idCombo];
				}
			}
		}
		
		foreach($productos as $producto){
			$sql->buscarProducto($producto->getIdTipo(), $producto->getCodigo());
			if(!$sql->getResult()){
				throw new Exception($sql->getError());
			}
			$row = $sql->obtenerFila();
			
			$sql->crearPedidoProducto($idPedido, $row[idProducto], $producto->getPrecio(), $producto->getPrecioFinal(), $producto->getInfoExtra(), $producto->getCliente(), $producto->getComentario());
			if(!$sql->getResult()){
				throw new Exception($sql->getError());
			}
		}
		
		session_unset();
		session_destroy();
		$json = '{"estado":"OK"}';
		return $json;
	}
	
	function cargarMenues(){
		$sql = new SQLclass();
		
		$sql->cargarMenues();
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		$json = '{"estado":"OK",';
		$json .= '"menues":[';
		while($reg = $sql->obtenerFila()){
			$json .= '{"idCiclo":'.$reg[idEtapa].',"nomCiclo":"'.$reg[nomEtapa].'","idPedido":'.$reg[idPedido].',"nroPedido":"'.$reg[nroPedido].'"},';
		}
		$json = substr($json, 0, $json.length - 1);
		$json .= ']}';
		return $json;
	}
	
	function modificar($idPedProd, $comentario){
		$sql = new SQLclass();
		
		$sql->modificarPedido($idPedProd, $comentario);
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		$json = '{"estado":"OK"}';
		return $json;
	}
	
	function checkPagado($idPedProd, $valor){
		$sql = new SQLclass();
		
		$sql->checkPagado($idPedProd, $valor);
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		$sql->consultarPedidoXPedProd($idPedProd);
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		$row = $sql->obtenerFila();
		$idPed = $row[idPedido];
		
		$sql->totalPagado($idPed);
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		$row = $sql->obtenerFila();
		
		$total = 0;
		if($sql->obtenerCantidad() > 0){
			$total = $row[total];
		}
		$json = '{"estado":"OK", ';
		$json .= '"total":"'.$total.'"}';
		return $json;
	}
	
	function eliminar($idPedProd){
		$sql = new SQLclass();
		
		$sql->eliminarPedido($idPedProd);
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		$json = '{"estado":"OK"}';
		return $json;
	}
	
	function realizar($idPedido){
		$sql = new SQLclass();
		
		$sql->realizarPedido($idPedido);
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		$json =	'{"estado":"OK",';
		$json .= '"campos":["Descripci&oacute;n","C&oacute;digo","Cant."],';
		$jsonLis = '"datos":[ ';
		while($reg = $sql->obtenerFila()){
			$jsonLis .= '[ ';
			$jsonLis .= '{"valor":"'.$reg[desProducto].'", "alineacion":"left", "editable":false}, ';
			$jsonLis .= '{"valor":"'.$reg[codProducto].'", "alineacion":"center", "editable":false}, ';
			$jsonLis .= '{"valor":"'.$reg[cantidad].'", "alineacion":"center", "editable":false} ';
			$jsonLis .= '],';
		}
		$jsonLis = substr($jsonLis, 0, $jsonLis.length - 1);
		$jsonLis .= '] ';
		$json .= $jsonLis;
		$json .= '}';
		return $json;
	}
	
	function traerPedido($idPedProd){
		$sql = new SQLclass();
		
		$sql->traerPedidoXid($idPedProd);
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		$reg = $sql->obtenerFila();
		
		$json =	'{"estado":"OK",';
		$json .= '"pedido":';
		$json .= '{"codigo":"'.$reg[codProducto].'", ';
		$json .= ' "precio":"'.$reg[precioOriginal].'", ';
		$json .= ' "precioFinal":"'.$reg[precioFinal].'", ';
		$json .= ' "infoExtra":"'.$reg[infoExtra].'", ';
		$json .= ' "desComentario":"'.$reg[desComentario].'", ';
		$json .= ' "idCliente":"'.$reg[idCliente].'"} ';
		$json .= '}';
		return $json;
	}
	
	
?>