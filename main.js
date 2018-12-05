// JavaScript Document
// Ejemplo de una estructura mínima de navegación para un juego creado utilizando la librería externa Phaser
// realizado por el profesor Carlos Delgado para el curso Gráfica Interactiva de la Universidad Nacional de Colombia
// El primer paso es crear un nuevo objeto "Phaser.Game", definir su tamaño y despues crear los estados del juego
var juego = new Phaser.Game(width, height, Phaser.CANVAS, "consola");
juego.state.add("galeria", galeria);
juego.state.add("activo", jugar);
juego.state.start("activo");
	