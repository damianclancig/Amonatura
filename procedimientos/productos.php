<?
	try{
		require("funciones.php");
		require("../clases/class.sql.php");
		require("../clases/producto.php");
		
		$accion = $_POST[accion];
		$codigo = $_POST[codigo];
		$idTipo = $_POST[tipo];
		$descripcion = $_POST[descripcion];
		$precio = $_POST[precio];
		$precioFinal = $_POST[precioFinal];
		$puntos = $_POST[puntos];
		$pagina = $_POST[pagina];
		$cliente = $_POST[cliente];
		$comentario = $_POST[comentario];
		$id = $_POST[id];
		
		if($accion == "buscar"){
			$json = buscar($idTipo, $codigo);
		}
		else if($accion == "listado"){
			$json = listar($idTipo);
		}
		else if($accion == "crear"){
			$json = crear($idTipo, $codigo, $descripcion);
		}
		else if($accion == "agregar"){
			$json = agregar($idTipo, $codigo, $precio, $precioFinal, $puntos, $pagina, $cliente, $comentario);
		}
		else if($accion == "mostrar"){
			mostrar();
		}
		else if($accion == "eliminar"){
			$json = eliminar($idTipo, $codigo);
		}
		else if($accion == "modificar"){
			$json = modificar($idTipo, $codigo, $descripcion);
		}
		else if($accion == "listadoMisProd"){
			$json = listarMisProd();
		}
		else if($accion == "agregarMiProd"){
			$json = agregarMiProd($descripcion, $precio);
		}
		else if($accion == "eliminarMiProd"){
			$json = eliminarMiProd($codigo);
		}
		else if($accion == "traerProducto"){
			$json = traerProducto($id);
		}
		else if($accion == "actualizar"){
			$json = actualizarProducto($id, $codigo, $precio, $precioFinal, $puntos, $cliente, $comentario);
		}
	}
	catch(Exception $e){
		$json = '{"estado":"ERR",';
		$json .= '"msjErr":"'.$e->getMessage().'\nArchivo: '.formatString($e->getFile()).'\nEn linea: '.$e->getLine().'"}';
	}
	echo $json;
	
	function buscar($idTipo, $codigo){
		$sql = new SQLclass();
		$sql->buscarProducto($idTipo, $codigo);
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		if($sql->obtenerCantidad() == 0){
			$json = '{"estado":"NOEXISTE"}';
		}
		else{
			$row = $sql->obtenerFila();
			$json = '{"estado":"OK",';
			$json .= '"descripcion":"'.$row[desProducto].'"}';
		}
		return $json;
	}
	
	function listar($idTipo){
		$sql = new SQLclass();
		$sql->traerProductos($idTipo);
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		
		$json =	'{"estado":"OK",';
		$json .= '"campos":["C&oacute;digo","Descripci&oacute;n","Estado"],';
		$jsonLis = '"datos":[ ';
		while($reg = $sql->obtenerFila()){
			$jsonLis .= '[';
			$jsonLis .= '{"valor":"'.$reg[codProducto].'", "alineacion":"center", "editable":false},';
			$jsonLis .= '{"valor":"'.$reg[desProducto].'", "alineacion":"left", "editable":true, "id":"'.$reg[idProducto].'"},';
			$jsonLis .= '{"valor":"'.estado($reg[indEstado]).'", "alineacion":"center", "editable":false}';
			$jsonLis .= '],';
		}
		$jsonLis = substr($jsonLis, 0, $jsonLis.length - 1);
		$jsonLis .= ']';
		$json .= $jsonLis;
		$json .= "}";
		return $json;
	}
	
	function crear($idTipo, $codigo, $descripcion){
		$sql = new SQLclass();
		$sql->crearProducto($idTipo, $codigo, $descripcion);
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		$json = '{"estado":"OK"}';
		return $json;
	}
	
	function agregar($idTipo, $codigo, $precio, $precioFinal, $puntos, $pagina, $cliente, $comentario){
		if($idTipo == "N"){
			$infoExtra = $puntos;
		}
		else if($idTipo == "A"){
			$infoExtra = $pagina;
		}
		$producto = new producto($idTipo, $codigo, $precio, $precioFinal, $infoExtra, $cliente, $comentario);
		
		session_name("SessionListado");
		session_start();
		
		if(isset($_SESSION["productos"])){
			$productos = $_SESSION["productos"];
		}
		else{
			$productos = array();
		}
		array_push($productos, $producto);
		
		$_SESSION["productos"] = $productos;
		
		$json = '{"estado":"OK"}';
		return $json;
	}
	
	function mostrar(){
		session_name("SessionListado");
		session_start();
		
		if(isset($_SESSION["productos"])){
			$productos = $_SESSION["productos"];
		}
		else{
			echo '{"estado":"OK"}';
		}
		foreach($productos as $prod){
			echo $prod->getCodigo();
		}
	}
	
	function modificar($idTipo, $codigo, $descripcion){
		$sql = new SQLclass();
		$sql->modificarProducto($idTipo, $codigo, $descripcion);
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		$json = '{"estado":"OK"}';
		return $json;
	}
	
	function eliminar($idTipo, $codigo){
		$sql = new SQLclass();
		$sql->eliminarProducto($idTipo, $codigo);
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		$json = '{"estado":"OKDel"}';
		return $json;
	}
	
	function listarMisProd(){
		$sql = new SQLclass();
		$sql->traerMisProductos();
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		
		$json =	'{"estado":"OK",';
		$json .= '"campos":["Id","Descripci&oacute;n","Precio"],';
		$jsonLis = '"datos":[ ';
		while($reg = $sql->obtenerFila()){
			$jsonLis .= '[';
			$jsonLis .= '{"valor":"'.$reg[idProducto].'", "alineacion":"center", "editable":false},';
			$jsonLis .= '{"valor":"'.$reg[desProducto].'", "alineacion":"left", "editable":true, "id":"'.$reg[idProducto].'"},';
			$jsonLis .= '{"valor":"$ '.$reg[precio].'", "alineacion":"right", "editable":false}';
			$jsonLis .= '],';
		}
		$jsonLis = substr($jsonLis, 0, $jsonLis.length - 1);
		$jsonLis .= ']';
		$json .= $jsonLis;
		$json .= "}";
		return $json;
	}
	
	function agregarMiProd($descripcion, $precio){
		$sql = new SQLclass();
		$sql->crearMiProducto($descripcion, $precio);
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		$json = '{"estado":"OK"}';
		return $json;
	}
	
	function eliminarMiProd($codigo){
		$sql = new SQLclass();
		$sql->eliminarMiProducto($codigo);
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		$json = '{"estado":"OK"}';
		return $json;
	}
	
	function traerProducto($id){
		$sql = new SQLclass();
		$sql->traerProducto($id);
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		
		$json =	'{"estado":"OK",';
		$reg = $sql->obtenerFila();
		
		$jsonLis .= '[';
		$jsonLis .= '{"valor":"'.$reg[codProducto].'", "alineacion":"center", "editable":false},';
		$jsonLis .= '{"valor":"'.$reg[desProducto].'", "alineacion":"left", "editable":true, "id":"'.$reg[idProducto].'"},';
		$jsonLis .= '{"valor":"'.estado($reg[indEstado]).'", "alineacion":"center", "editable":false}';
		$jsonLis .= '],';

		$json .= $jsonLis;
		$json .= "}";
		return $json;
	}
	
	function actualizarProducto($id, $codigo, $precio, $precioFinal, $puntos, $idCliente, $comentario){
		$sql = new SQLclass();
		
		$sql->buscarProducto("N", $codigo);
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		$row = $sql->obtenerFila();
		
		$sql->actualizarProducto($id, $row[idProducto], $precio, $precioFinal, $puntos, $idCliente, $comentario);
		if(!$sql->getResult()){
			throw new Exception($sql->getError());
		}
		$json = '{"estado":"OK"}';
		return $json;
	}
	
?>