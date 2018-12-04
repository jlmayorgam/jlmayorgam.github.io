// Ejemplo de una animación controlada utilizando la librería externa Phaser
//  basado en los ejemplos de la clase Grafica Interactiva y adaptado por José Luis Mayorga

// El primer paso es crear un nuevo objeto "Phaser.Game" y definir su tamaño

// se declaran todas las variables
var width = 480;
var height = 360;
var ratio;
var juego = new Phaser.Game(width, height, Phaser.CANVAS, "consola");

var fondojuego;
var personaje;
var aviso;
var boton1;
var boton2;
var boton3;
var texto;
var flechaderecha;
var flechaizquierda;
var flechaarriba;
var flechaabajo;
var pad;
var joystick;
var circulo;
var iglesia
var plaza;
var x;
var y;
var i = 1;
var xp = width/2;
var yp = height/2;
var tween;
var size;

//esta  es un estado del juego, que es la parte principal
var jugar = {
	preload: function() {   // se cargan todas las imágenes que se van a usar
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;         // Escala la imagen al reducir el tamaño de la ventana
		juego.load.image("fondo", "imagenes/mapa2.png",740,679);
		juego.load.spritesheet("caminante", "imagenes/rpg.png", 48, 64);  // un spritesheet son varias imágenes en un solo archivo
		juego.load.image("dpad", "imagenes/unnamed.png",300,300);
		juego.load.image("sign", "imagenes/sign.png",244,120);
		juego.load.image("boton1", "imagenes/i1.jpg",740,697);
		juego.load.image("boton2", "imagenes/p1.jpg",1200,800);
			
	},
	
	create: function() { // pone en el canvas los elemntos que se quieren mostrar y que previamente se cargaron en load.
	
		fondojuego = juego.add.image(740, 679, "fondo");		
		fondojuego.scale.setTo(2,2);
		fondojuego.anchor.setTo(0.5);
		
		aviso = juego.add.image(50,50, "sign");
		
		if(juego.device.touch){
		joystick = juego.add.image(0,679, "dpad");
		joystick.anchor.setTo(0,1);
		joystick.alpha=0.5;
		joystick.fixedToCamera = true;
		}
		
		// iglesia  730 630
		iglesia = juego.add.button(760,630, "boton1",openIglesia, this);
		iglesia.scale.setTo(0.08);
		iglesia.anchor.setTo(0,1); 
		iglesia.alpha = 0.5;
		iglesia.inputEnabled = false;
		//plaza 660 580
		plaza = juego.add.button(660,580, "boton2",openPlaza, this);
		plaza.scale.setTo(0.08);
		plaza.anchor.setTo(0.5); 
		plaza.alpha = 0.5;
		plaza.inputEnabled = false;
		
		
		personaje = juego.add.sprite(xp, yp, "caminante");
		personaje.scale.setTo(2,2);
		personaje.anchor.setTo(0.5,0.8);  // centra las coordenadas del objeto 	
		personaje.animations.add("upa", [0, 1, 2], 10, true);  // se crea la animación, orden de los pasos, velocidad 
		personaje.animations.add("downa", [6, 7, 8], 10, true);
		personaje.animations.add("lefta", [9, 10, 11], 10, true);
		personaje.animations.add("righta", [3, 4, 5], 10, true);
		
		juego.camera.follow(personaje);
			
		
		
	//fija los limites del mundo en el que el personaje se mueve
	    juego.world.setBounds(0, 0, 1480, 1358);
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
	//hace que el personaje s emueva de acuerdo a las entradas
		if(flechaderecha.isDown ||(juego.input.pointer1.isDown && x>150&& x<300 && (Math.abs(y-529)<(x-150)))){
			this.caminader(); //mueve el personaje a la derecha
			personaje.animations.play("righta"); // animacion del personaje cuando camina a la derecha (y asi mismo para el resto de entradas)
		}else if(flechaizquierda.isDown ||(juego.input.pointer1.isDown && x<150 && x>0&& (-Math.abs(y-529)>(x-150)))){
			this.caminaizq();
			personaje.animations.play("lefta");
		}else if(flechaarriba.isDown ||(juego.input.pointer1.isDown && y<529&& y>379&& x>0&& x<300 )){
			this.arriba();
			personaje.animations.play("upa");
		}else if(flechaabajo.isDown ||(juego.input.pointer1.isDown && y>529&& y<679&& x>0&& x<300 )){
			this.abajo();
			personaje.animations.play("downa");	
		}else{
			personaje.animations.stop();
			}
	// reconoce cuando el personaje esta sobre un boton.		
		if(personaje.overlap(iglesia)){
			this.enable(iglesia); // activa el boton para ver la información
		}else{
			this.disable(iglesia); //desactiva el boton si no está sobre él			
				}
		if(personaje.overlap(plaza)){
			this.enable(plaza); // activa el boton para ver la información
		}else{
			this.disable(plaza); //desactiva el boton si no está sobre él			
				}
				
				
		
	
	},
	enable: function(button1){
		    button1.alpha=1; //sin transparencia
			button1.inputEnabled = true; //habilita la funcion del botón
			button1.interaction = true;
		},
	disable: function(button1){
		    button1.alpha=0.5; //le da cierta transparencia al botón
			button1.inputEnabled = false; //deshabilta la funcion dle botón (no es clickeable)
			button1.interaction = false;
		},
	
	render: function(){
			juego.debug.inputInfo(32,32);
		},
		//funciones que permiten mover al personaje
	caminader: function(){  
			personaje.position.x += 5;       // mueve la animación hacia la derecha
     },
	caminaizq: function(){  
			personaje.position.x -= 3;			
     },
	 arriba: function(){
			personaje.position.y -= 3;						                                                    
	 },
	 abajo: function(){
			personaje.position.y += 3;			                                                    
	 },
	 
}
// estado del juego cuando se clickea un botón 
var iglesia={
	preload: function() {
		size=4;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;         // Escala la imagen al reducir el tamaño de la ventana
		juego.load.image("fondo1", "imagenes/i1.jpg");
		juego.load.image("fondo2",  "imagenes/i2.jpg", 800, 1200);
		juego.load.image("fondo3",  "imagenes/i3.jpg");
		juego.load.image("fondo4",  "imagenes/i4.jpg");
		juego.load.image("button", "imagenes/arrow.png");
		juego.load.image("buttonx", "imagenes/close-button.png");
		}, 
	create: function(){
		juego.world.setBounds(0, 0, width, height);
		juego.stage.backgroundColor = '#000000';
		
		fondojuego = juego.add.image(juego.world.centerX , juego.world.centerY, "fondo1");
		fondojuego.anchor.setTo(0.5);
		ratio= fondojuego.height/fondojuego.width;
		
		//fondojuego.visible=false;
		
		boton1 = juego.add.button(width, height/2, "button", next, this);
		boton1.anchor.setTo(1,0.5);
		boton1.scale.setTo(0.1);	
		
		boton2 = juego.add.button(0, height/2, "button", prev, this);
		boton2.anchor.setTo(1,0.5);
		boton2.scale.setTo(-0.1,0.1);
		
		boton2 = juego.add.button(width, 0, "buttonx", close, this);
		boton2.anchor.setTo(1,0);
		boton2.scale.setTo(0.1,0.1);		
		
		this.resize(ratio);
		}
		,
	update: function(){
		
		this.resize(ratio);
			}, 
	resize: function(ratio){
		if(ratio<1){
			fondojuego.width= 0.9*width;
			fondojuego.height=ratio*0.9*width;
			fondojuego.anchor.setTo(0.5);
		}else{
			fondojuego.height=0.9*height;	
			fondojuego.width= 0.9*height/ratio;
		}
	}
	

}
var plaza={
	preload: function() {
		size=3;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;         // Escala la imagen al reducir el tamaño de la ventana
		juego.load.image("fondo1", "imagenes/p1.jpg");
		juego.load.image("fondo2",  "imagenes/p2.jpg");
		juego.load.image("fondo3",  "imagenes/p3.jpg");
		juego.load.image("button", "imagenes/arrow.png");
		juego.load.image("buttonx", "imagenes/close-button.png");
		}, 
	create: function(){
		juego.world.setBounds(0, 0, width, height);
		juego.stage.backgroundColor = '#000000';
		
		fondojuego = juego.add.image(juego.world.centerX , juego.world.centerY, "fondo1");
		fondojuego.anchor.setTo(0.5);
		ratio= fondojuego.height/fondojuego.width;
		
		//fondojuego.visible=false;
		
		boton1 = juego.add.button(width, height/2, "button", next, this);
		boton1.anchor.setTo(1,0.5);
		boton1.scale.setTo(0.1);	
		
		boton2 = juego.add.button(0, height/2, "button", prev, this);
		boton2.anchor.setTo(1,0.5);
		boton2.scale.setTo(-0.1,0.1);
		
		boton2 = juego.add.button(width, 0, "buttonx", close, this);
		boton2.anchor.setTo(1,0);
		boton2.scale.setTo(0.1,0.1);		
		
		this.resize(ratio);
		}
		,
	update: function(){
		
		this.resize(ratio);
			}, 
	resize: function(ratio){
		if(ratio<1){
			fondojuego.width= 0.8*width;
			fondojuego.height=ratio*0.8*width;
			fondojuego.anchor.setTo(0.5);
		}else{
			fondojuego.height=0.8*height;	
			fondojuego.width= 0.8*height/ratio;
		}
	}
	

}
function next(){
	if(i<size){
		i=i+1;		
	    keys = "fondo" + i;				
		fondojuego.loadTexture(keys);		
	}else{
		i=0;
		next();
		}
		
	}
function prev(){
	if(i>1){
		i=i-1;		
	    keys = "fondo" + i;		
		fondojuego.loadTexture(keys);		
	}else{
		i=size+1;
		prev();
		}
		
	}
function close(){
		juego.state.start("activo");
	}
	
function openIglesia(){	
		//juego.state.shutDown;
		juego.state.start("iglesia");	
		 }
		 function openPlaza(){	
		//juego.state.shutDown;
		juego.state.start("plaza");	
		 }
	juego.state.add("iglesia", iglesia);
	juego.state.add("plaza", plaza);
	juego.state.add("activo", jugar);
	juego.state.start("activo");

