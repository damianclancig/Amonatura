<?php
	class producto{
		private $idTipo;
		private $codigo;
		private $precio;
		private $precioFinal;
		private $infoExtra;
		private $cliente;
		private $comentario;
		
		function __construct($idTipo, $codigo, $precio, $precioFinal, $infoExtra, $cliente, $comentario){
			$this->idTipo = $idTipo;
			$this->codigo = $codigo;
			$this->precio = $precio;
			$this->precioFinal = $precioFinal;
			$this->infoExtra = $infoExtra;
			$this->cliente = $cliente;
			$this->comentario = $comentario;
		}
		
		function getIdTipo(){
			return $this->idTipo;
		}
		
		function getCodigo(){
			return $this->codigo;
		}
		
		function getPrecio(){
			return $this->precio;
		}
		
		function getPrecioFinal(){
			return $this->precioFinal;
		}
		
		function getInfoExtra(){
			return $this->infoExtra;
		}
		
		function getCliente(){
			return $this->cliente;
		}
		
		function getComentario(){
			return $this->comentario;
		}
	}
?>