<?
	try{
		require("funciones.php");
		require("../clases/class.sql.php");
		
		$idTipo = $_POST[idTipo];
		$nombre = $_POST[nombre];
		$fecInicio = $_POST[fecInicio];
		$fecFinalizacion = $_POST[fecFinalizacion];
		
		$sql = new SQLclass();
		
		$sql->consultarEtapaXNombre($idTipo, $nombre);
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		if($sql->obtenerCantidad() == 0){
			$sql->crearEtapas($idTipo, $nombre, $fecInicio, $fecFinalizacion);
			if(!$sql->getResult()){
				throw new Exception($sql->getError());
			}
			$idEtapa = $sql->obtenerUltimoId();
			$json = '{"estado":"OK", "idEtapa":"'.$idEtapa.'"}';
		}
		else{
			$json = '{"estado":"ERREXIST"}';
		}
	}
	catch(Exception $e){
		$json = '{"estado":"ERR",';
		$json .= '"msjErr":"'.$e->getMessage().'\nArchivo: '.formatString($e->getFile()).'\nEn linea: '.$e->getLine().'"}';
	}
	echo utf8_encode($json);
?>