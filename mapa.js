﻿// Ejemplo de una animación controlada utilizando la librería externa Phaser
//  basado en los ejemplos de la clase Grafica Interactiva y adaptado por José Luis Mayorga

// El primer paso es crear un nuevo objeto "Phaser.Game" y definir su tamaño

// se declaran todas las variables
var width = 960;
var height =720;
var ratio;

var fondojuego;
var personaje;
var boton1;
var boton2;
var boton3;
var texto;
var letrero

var flechaderecha;
var flechaizquierda;
var flechaarriba;
var flechaabajo;

var joystick;
var jsize=0.3;
var wsize=2;

var iglesia
var plaza;
var rural;
var ferias;

var x;
var y;
var xp = width/2;
var yp = height/2;

var k;
var i = 1;
var size;

//esta  es un estado del juego, que es la parte principal
var jugar = {
	preload: function() {   // se cargan todas las imágenes que se van a usar
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;         // Escala la imagen al reducir el tamaño de la ventana
		juego.load.image("fondo", "imagenes/mapa2.png",740,679);
		juego.load.spritesheet("caminante", "imagenes/rpg.png", 48, 64);  // un spritesheet son varias imágenes en un solo archivo
		juego.load.image("dpad", "imagenes/unnamed.png",300,300);
		juego.load.image("boton1", "imagenes/i1.jpg",740,697);
		juego.load.image("boton2", "imagenes/p1.jpg",1200,800);
		juego.load.image("boton3", "imagenes/r1.jpg",1200,800);
		juego.load.image("boton4", "imagenes/f1.jpg",1200,800);
		juego.load.image("letrero", "imagenes/sign.png",740,697);
			
	},
	
	create: function() { // pone en el canvas los elemntos que se quieren mostrar y que previamente se cargaron en load.
	
		fondojuego = juego.add.image(0, 0, "fondo");		
		fondojuego.scale.setTo(width*wsize/fondojuego.width);
		fondojuego.anchor.setTo(0);
		
		letrero = juego.add.image(30,30, "letrero");
		letrero.scale.setTo(1.6);
		//u2190-u2193
		var text="Use las teclas \u2190 \u2191 \u2192 \u2193 o el \n control  táctil para mover el personaje. situalo sobre una imágen, clickéala/tócala y mira \n las Fotos";
		var style = {font: "24px Arial", fill: "#000000",wordWrap: true, wordWrapWidth: letrero.width, align: "center" };
		letreroT =juego.add.text(50,50, text, style);
		
		if(juego.device.touch || juego.device.android || juego.device.iPhone){
		joystick = juego.add.image(0,height, "dpad");
		joystick.anchor.setTo(0,1);
		joystick.scale.setTo(width*jsize/joystick.width);
		joystick.alpha=0.5;
		joystick.fixedToCamera = true;
		
		}
		
		// crea, situa, redimensiona y le da propiedades al botón que abre la galeria de la iglesia 1120 815
		iglesia = juego.add.button(width*1.12,width*0.815, "boton1",openIglesia, this);
		iglesia.scale.setTo(width*0.1/iglesia.width);
		iglesia.anchor.setTo(0.5); 
		iglesia.alpha = 0.5;
		iglesia.inputEnabled = false;
		
		// crea, situa, redimensiona y le da propiedades al botón que abre la galeria de la plaza 880 800
		plaza = juego.add.button(width*0.88,width*0.8, "boton2",openPlaza, this);
		plaza.scale.setTo(width*0.15/plaza.width);
		plaza.anchor.setTo(0.5); 
		plaza.alpha = 0.5;
		plaza.inputEnabled = false;
		
		// crea, situa, redimensiona y le da propiedades al botón que abre la galeria de la zona rural 1330 440
		rural = juego.add.button(width*1.33,width*0.44, "boton3",openRural, this); 
		rural.scale.setTo(width*0.15/rural.width);
		rural.anchor.setTo(0.5); 
		rural.alpha = 0.5;
		rural.inputEnabled = false;
		
		//crea, situa, redimensiona y le da propiedades al botón que abre la galeria de las fiestas 530 1240
		ferias = juego.add.button(width*0.53,width*1.24, "boton4",openFerias, this);
		ferias.scale.setTo(width*0.15/ferias.width);
		ferias.anchor.setTo(0.5); 
		ferias.alpha = 0.5;
		ferias.inputEnabled = false;
		
		// se dibuja y se muestra 
		personaje = juego.add.sprite(xp, yp, "caminante"); //crea el sprite del personaje
		personaje.scale.setTo(width*0.15/personaje.width ); //lo escala y le da el tamaño adecuado
		personaje.anchor.setTo(0.5,0.8);  // centra las coordenadas del objeto 	
		personaje.animations.add("upa", [0, 1, 2], 10, true);  // se crea la animación, orden de los pasos, velocidad para arriba
		personaje.animations.add("downa", [6, 7, 8], 10, true); // para abajo
		personaje.animations.add("lefta", [9, 10, 11], 10, true); // izquierda
		personaje.animations.add("righta", [3, 4, 5], 10, true);	// y derecha
		
		juego.camera.follow(personaje);
			
		
		
	//fija los limites del mundo en el que el personaje se mueve
	    juego.world.setBounds(0, 0, width*wsize, height*wsize);
	// inicia el sistema de fisica del juego que permite la colision entre objetos.                                     
		juego.physics.startSystem(Phaser.Physics.ARCADE);						
  	//habilita al jugador las colisiones (entre otras funciones que no se estan usando)
		juego.physics.arcade.enable(personaje);
		personaje.body.collideWorldBounds = true; // para que no se salga del mundo.


	// activa las teclas de Arriba, Abajo, izquierda y derecha del teclado como metodos de entrada
		flechaderecha = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		flechaizquierda = juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		flechaarriba = juego.input.keyboard.addKey(Phaser.Keyboard.UP);  
		flechaabajo = juego.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	},
	
	update: function(){ //aqui se pone como los atributos de los objetos cambian, de acuerdo a los metodos de entrada.
	//coordenadas de la entrada táctil en la ventana
	x=juego.input.pointer1.x;
	y=juego.input.pointer1.y;
	//coordenadas del personaje en el mundo (se usa en la cámara)
	xp = personaje.position.x;
	yp = personaje.position.y;
	juego.camera.x = xp;	
	//hace que el personaje se muevan de acuerdo a las entradas (permite entrada táctil)
		if(flechaderecha.isDown ||(juego.input.pointer1.isDown && x>width*jsize/2 && x<width*jsize && (Math.abs(y-height+height*jsize/2)<(x-width*jsize/2)))){
			this.caminader(); //mueve el personaje a la derecha
			personaje.animations.play("righta"); // animacion del personaje cuando camina a la derecha (y asi mismo para el resto de entradas)
		}else if(flechaizquierda.isDown ||(juego.input.pointer1.isDown && x<width*jsize/2 && x>0 && (-Math.abs(y-height+height*jsize/2)>(x-width*jsize/2)))){
			this.caminaizq();
			personaje.animations.play("lefta");
		}else if(flechaarriba.isDown ||(juego.input.pointer1.isDown && y<height-height*jsize/2 && y>height-height*jsize && x>0&& x<width*jsize )){
			this.arriba();
			personaje.animations.play("upa");
		}else if(flechaabajo.isDown ||(juego.input.pointer1.isDown && y>height-height*jsize/2&& y<height&& x>0&& x<width*jsize )){
			this.abajo();
			personaje.animations.play("downa");	
		}else{
			personaje.animations.stop();
			}
	// reconoce cuando el personaje esta sobre un boton.		
		if(personaje.overlap(iglesia)){
			this.enable(iglesia); // activa el boton para ver la información
			iglesia.input.useHandCursor = true;
			
		}else{
			this.disable(iglesia); //desactiva el boton si no está sobre él			
				}
		if(personaje.overlap(plaza)){
			this.enable(plaza); // activa el boton para ver la información
			plaza.input.useHandCursor = true;
		}else{
			this.disable(plaza); //desactiva el boton si no está sobre él			
				}
		if(personaje.overlap(rural)){
			this.enable(rural); // activa el boton para ver la información
			rural.input.useHandCursor = true;
		}else{
			this.disable(rural); //desactiva el boton si no está sobre él			
				}
		if(personaje.overlap(ferias)){
			this.enable(ferias); // activa el boton para ver la información
			ferias.input.useHandCursor = true;
		}else{
			this.disable(ferias); //desactiva el boton si no está sobre él			
				}
				
				
		
	
	},
	enable: function(button1){
		    button1.alpha=1; //sin transparencia
			button1.inputEnabled = true; //habilita la funcion del botón
			
			
			
		},
	disable: function(button1){
		    button1.alpha=0.5; //le da cierta transparencia al botón
			button1.inputEnabled = false; //deshabilta la funcion dle botón (no es clickeable)
			
		},
	
//	render: function(){
//			juego.debug.inputInfo(32,32); //opcion para ver las propiedades del puntero mientras se ejecuta el juego util para hallar coordenadas para situar objetos.
//		},

//funciones que permiten mover al personaje
	caminader: function(){  
			personaje.position.x += 5;       // mueve la animación hacia la derecha
     },
	caminaizq: function(){  
			personaje.position.x -= 5;	// mueve la animación hacia la izquierda			
     },
	 arriba: function(){
			personaje.position.y -= 5; // mueve la animación hacia arriba						                                                    
	 },
	 abajo: function(){
			personaje.position.y += 5;// mueve la animación hacia abajo			                                                    
	 },
	 
}
// estado del juego cuando se clickea un botón 

function openIglesia(){	
		//juego.state.shutDown;
		size=4; //indica el numero de fotos en la galeria
		k="i";  //letra clave para acceder a las imágenes
		juego.state.start("galeria");	
	 }
function openPlaza(){	
		//juego.state.shutDown;
		size=3; //indica el numero de fotos en la galeria
		k="p"; //letra clave para acceder a las imágenes
		juego.state.start("galeria");	
	}
function openRural(){
			size=4; //indica el numero de fotos en la galeria
			k="r"; //letra clave para acceder a las imágenes
		juego.state.start("galeria");
	}
function openFerias(){
			size=3; //indica el numero de fotos en la galeria
			k="f"; //letra clave para acceder a las imágenes
		juego.state.start("galeria");
	}


