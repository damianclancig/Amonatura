<?
	function formatString($ruta){
		$ruta = str_replace("\\", "\\\\", $ruta);
		return $ruta;
	}
	
	function formatearFecha($fecha){
		$fec = explode("-", $fecha);
		return $fec[2]."/".$fec[1]."/".$fec[0];
	}
	
	function estado($est){
		if($est == "A"){
			return "Activo";
		}
		else if($est == "I"){
			return "Inactivo";
		}
	}
?>