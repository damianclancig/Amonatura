<?php
	try{
		require("funciones.php");
		require("../clases/class.sql.php");
		
		$idTipo = $_POST['tipo'];
		$codigo = $_POST['codigo'];
		
		$sql = new SQLclass();
		$sql2 = new SQLclass();
		
		$sql->traerPedidosXidPedido($codigo);
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		
		$precioOrigTotal = 0;
		$precioFinalTotal = 0;
		$puntosTotal = 0;
		$totalPagado = 0;
		$idCliente = "";
		$json =	'{"estado":"OK",';
		$json .= '"campos":["Descripci&oacute;n","C&oacute;digo","Precio Orig.","Precio Final","Puntos","Comentario","Pagado"],';
		$jsonLis = '"datos":[ ';
		while($reg = $sql->obtenerFila()){
			if($idCliente != $reg[idCliente]){
				$sql2->traerSubtotalesXCliente($codigo, $reg[idCliente]);
				if(!$sql2->getResult()){
					throw new Exception($sql2->getError());
				}
				$reg2 = $sql2->obtenerFila();
				$jsonLis .= '[ {"valor":"'.$reg[nomCliente].'", "tipo":1, "subTotalMontoOrig":"$ '.number_format($reg2[pOriginal],2,".","").'", "subTotalMontoFinal":"$ '.number_format($reg2[pFinal],2,".","").'", "subTotalPuntos":"'.$reg2[puntos].'"} ],';
				$idCliente = $reg[idCliente];
			}
			$jsonLis .= '[ ';
			$jsonLis .= '{"valor":"'.$reg[desProducto].'", "alineacion":"left", "editable":false}, ';
			$jsonLis .= '{"valor":"'.$reg[codProducto].'", "alineacion":"center", "editable":false}, ';
			$jsonLis .= '{"valor":"$ '.number_format($reg[precioOriginal],2,".","").'", "alineacion":"right", "editable":false}, ';
			$jsonLis .= '{"valor":"$ '.number_format($reg[precioFinal],2,".","").'", "alineacion":"right", "editable":false}, ';
//			$jsonLis .= '{"valor":"'.$reg[nomCliente].'", "alineacion":"left", "editable":false}, ';
			$jsonLis .= '{"valor":"'.$reg[infoExtra].'", "alineacion":"center", "editable":false}, ';
			$jsonLis .= '{"valor":"'.$reg[desComentario].'", "alineacion":"center", "editable":true, "id":"'.$reg[idPedidoProducto].'"}, ';

			if($reg[indPagado] == "S"){
				$checked = " checked";
				$totalPagado += $reg[precioFinal];
			}
			else{
				$checked = "";
			}
			$jsonLis .= '{"valor":"<input type=\"checkbox\" id=\"'.$reg[idPedidoProducto].'\" onClick=\"checkPagado(this)\" '.$checked.'>", "alineacion":"center", "editable":false} ';
			//$jsonLis .= '{"valor":"<img src=\"imagenes/btnDelete.png\" alt=\"Borrar\" id=\"'.$reg[idPedidoProducto].'\" onClick=\"eliminarPedido(this)\">", "alineacion":"center", "editable":false} ';
			$jsonLis .= '],';
			$precioOrigTotal += $reg[precioOriginal];
			$precioFinalTotal += $reg[precioFinal];
			$puntosTotal += $reg[infoExtra];
		}
		$jsonLis = substr($jsonLis, 0, $jsonLis.length - 1);
		$jsonLis .= '], ';
		$json .= $jsonLis;
		
		$json .= '"camposPie":[ ';
		$json .= '{"valor":"", "alineacion":"left"}, ';
		$json .= '{"valor":"Totales", "alineacion":"left"}, ';
		$json .= '{"valor":"$ '.number_format($precioOrigTotal,2,".","").'", "alineacion":"right"}, ';
		$json .= '{"valor":"$ '.number_format($precioFinalTotal,2,".","").'", "alineacion":"right"}, ';
//		$json .= '{"valor":"Puntos Tot.", "alineacion":"left"}, ';
		$json .= '{"valor":"'.$puntosTotal.'", "alineacion":"center"}, ';
//		$json .= '{"valor":"Tot. Pagado", "alineacion":"left"}, ';
		$json .= '{"valor":"", "alineacion":"left"}, ';
		$json .= '{"valor":"$ '.$totalPagado.'", "alineacion":"right", "id":"totPagado"} ';
		$json .= '],';
		
		$json .= '"totalOriginal":"'.$precioOrigTotal.'", ';
		$json .= '"totalFinal":"'.$precioFinalTotal.'", ';
		$json .= '"ganancia":0.3, ';
		
		$sql->consultarEtapaXPedido($codigo);
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		$reg = $sql->obtenerFila();
		$json .= '"etapa":"'.$reg[nomEtapa].'", ';
		$json .= '"idPedido":"'.$codigo.'", ';
		$json .= '"nroPedido":"'.$reg[nroPedido].'", ';
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