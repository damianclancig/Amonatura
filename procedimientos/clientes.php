<?
	try{
		require("funciones.php");
		require("../clases/class.sql.php");
		require("../clases/producto.php");
		
		$accion = $_POST[accion];
		$codigo = $_POST[codigo];
		$nombre = $_POST[nombre];
		
		if($accion == "crear"){
			$json = crear($nombre);
		}
		else if($accion == "listado"){
			$json = listar();
		}
		else if($accion == "eliminar"){
			$json = eliminar($codigo);
		}
		else if($accion == "modificar"){
			$json = modificar($codigo, $nombre);
		}
	}
	catch(Exception $e){
		$json = '{"estado":"ERR",';
		$json .= '"msjErr":"'.$e->getMessage().'\nArchivo: '.formatString($e->getFile()).'\nEn linea: '.$e->getLine().'"}';
	}
	echo $json;
	
	function crear($nombre){
		$sql = new SQLclass();
		$sql->crearCliente($nombre);
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		$json = '{"estado":"OK"}';
		return $json;
	}
	
	function listar(){
		$sql = new SQLclass();
		$sql->traerClientes();
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		
		$json =	'{"estado":"OK",';
		$json .= '"campos":["C&oacute;digo","Nombre"],';
		$jsonLis = '"datos":[ ';
		while($reg = $sql->obtenerFila()){
			$jsonLis .= '[';
			$jsonLis .= '{"valor":"'.$reg[idCliente].'", "alineacion":"center", "editable":false},';
			$jsonLis .= '{"valor":"'.$reg[nomCliente].'", "alineacion":"left", "editable":true, "id":"'.$reg[idCliente].'"}';
			$jsonLis .= '],';
		}
		$jsonLis = substr($jsonLis, 0, $jsonLis.length - 1);
		$jsonLis .= ']';
		$json .= $jsonLis;
		$json .= "}";
		return $json;
	}
	
	function modificar($codigo, $nombre){
		$sql = new SQLclass();
		$sql->modificarCliente($codigo, $nombre);
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		$json = '{"estado":"OK"}';
		return $json;
	}
	
	function eliminar($codigo){
		$sql = new SQLclass();
		$sql->eliminarCliente($codigo);
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		$json = '{"estado":"OKDel"}';
		return $json;
	}
	
?>