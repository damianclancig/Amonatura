<?php
	try{
		require("funciones.php");
		require("../clases/class.sql.php");
		
		$idTipo = $_POST['idTipo'];
		$combo = $_POST['combo'];
		$padre = $_POST['padre'];
		
		$sql = new SQLclass();
		
		if($combo == "Ciclo" || $combo == "CicloPedido" || $combo == "Campana"){
			$sql->consultarEtapas($idTipo);
		}
		else if($combo == "Cliente"){
			$sql->consultarClientes();
		}
		else if($combo == "Pedido"){
			$sql->consultarPedido($padre);
		}
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		$json = '{"estado":"OK",';
		$json .= '"idCombo":"'.$combo.'",';
		$json .= '"lista":[ ';
		while($row = $sql->obtenerFila()){
			$json .= '{"idCombo":"'.$row['idCombo'].'", "nombre":"'.$row['nombre'].'"},';
		}
		$json = substr($json, 0, strlen($json) - 1);
		$json .= ']}';
	}
	catch(Exception $e){
		$json = '{"estado":"ERR",';
		$json .= '"msjErr":"'.$e->getMessage().'\nArchivo: '.formatString($e->getFile()).'\nEn linea: '.$e->getLine().'"}';
	}
	echo $json;
?>