<?
	try{
		require("funciones.php");
		require("../clases/class.sql.php");
		
		$idTipo = $_POST[tipo];
		$codigo = $_POST[codigo];
		
		$sql = new SQLclass();
		$sql->traerPedidosXidEtapa($codigo);
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		
		$precioTotal = 0;
		$puntosTotal = 0;
		$totalPagado = 0;
		$json =	'{"estado":"OK",';
		$json .= '"campos":["Descripci&oacute;n","C&oacute;digo","Precio","Cliente","P&aacute;gina","Comentario","Pagado","Borrar?"],';
		$jsonLis = '"datos":[ ';
		while($reg = $sql->obtenerFila()){
			$jsonLis .= '[ ';
			$jsonLis .= '{"valor":"'.$reg[desProducto].'", "alineacion":"left", "editable":false}, ';
			$jsonLis .= '{"valor":"'.$reg[codProducto].'", "alineacion":"center", "editable":false}, ';
			$jsonLis .= '{"valor":"$ '.number_format($reg[precio],2,".","").'", "alineacion":"right", "editable":false}, ';
			$jsonLis .= '{"valor":"'.$reg[nomCliente].'", "alineacion":"left", "editable":false}, ';
			$jsonLis .= '{"valor":"'.$reg[infoExtra].'", "alineacion":"center", "editable":false}, ';
			$jsonLis .= '{"valor":"'.$reg[desComentario].'", "alineacion":"left", "editable":true, "id":"'.$reg[idPedidoProducto].'"}, ';
			if($reg[indPagado] == "S"){
				$checked = " checked";
				$totalPagado += $reg[precio];
			}
			else{
				$checked = "";
			}
			$jsonLis .= '{"valor":"<input type=\"checkbox\" id=\"'.$reg[idPedidoProducto].'\" onClick=\"checkPagado(this)\" '.$checked.'>", "alineacion":"center", "editable":false}, ';
			$jsonLis .= '{"valor":"<img src=\"imagenes/btnDelete.png\" alt=\"Borrar\" id=\"'.$reg[idPedidoProducto].'\" onClick=\"eliminarPedido(this)\">", "alineacion":"center", "editable":false} ';
			$jsonLis .= '],';
			$precioTotal += $reg[precio];
			$puntosTotal += $reg[infoExtra];
		}
		$jsonLis = substr($jsonLis, 0, $jsonLis.length - 1);
		$jsonLis .= '], ';
		$json .= $jsonLis;
		
		$json .= '"camposPie":[ ';
		$json .= '{"valor":"", "alineacion":"left"}, ';
		$json .= '{"valor":"Total", "alineacion":"left"}, ';
		$json .= '{"valor":"$ '.number_format($precioTotal,2,".","").'", "alineacion":"right"}, ';
		$json .= '{"valor":"", "alineacion":"left"}, ';
		$json .= '{"valor":"", "alineacion":"left"}, ';
		$json .= '{"valor":"Tot. Pagado", "alineacion":"left"}, ';
		$json .= '{"valor":"$ '.number_format($totalPagado,2,".","").'", "alineacion":"right", "id":"totPagado"}, ';
		$json .= '{"valor":"", "alineacion":"left"} ';
		$json .= '],';
		
		$json .= '"total":"'.$precioTotal.'", ';
		$json .= '"ganancia":0.22, ';
		
		$sql->consultarEtapa($codigo);
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		$reg = $sql->obtenerFila();
		$json .= '"etapa":"'.$reg[nomEtapa].'", ';
		$json .= '"nroPedido":"1", ';
		$json .= '"fecComienzo":"'.formatearFecha($reg[fecComienzo]).'", ';
		$json .= '"fecFinalizacion":"'.formatearFecha($reg[fecFinalizacion]).'" ';
		$json .= "}";
	}
	catch(Exception $e){
		$json = '{"estado":"ERR",';
		$json .= '"msjErr":"'.$e->getMessage().'\nArchivo: '.formatString($e->getFile()).'\nEn linea: '.$e->getLine().'"}';
	}
	echo $json;
?>