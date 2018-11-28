// Ejemplo de una animación controlada utilizando la librería externa Phaser
//  realizado por el profesor Carlos Delgado para el curso Gráfica Interactiva de la Universidad Nacional de Colombia

// El primer paso es crear un nuevo objeto "Phaser.Game" y definir su tamaño
var juego = new Phaser.Game(740, 679, Phaser.CANVAS, "consola");
// se declaran todas las variables
var fondojuego;
var personaje;
var aviso;
var boton1;
var boton2;
var texto;
var flechaderecha;
var flechaizquierda;
var flechaarriba;
var flechaabajo;
var pad;
var joystick;
var circulo;
var iglesia
var iglesiaPopup;
var x;
var y;
	var xp;
	var yp;
	var tween;

var jugar = {
	preload: function() {   // se cargan todas las imágenes que se van a usar
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;         // Escala la imagen al reducir el tamaño de la ventana
		juego.load.image("fondo", "imagenes/mapa2.png",740,679);
		juego.load.spritesheet("caminante", "imagenes/rpg.png", 48, 64);  // un spritesheet son varias imágenes en un solo archivo
		juego.load.image("dpad", "imagenes/unnamed.png",300,300);
		juego.load.image("sign", "imagenes/sign.png",244,120);
		juego.load.image("boton", "imagenes/boton.png",560,588);
		juego.load.image("popup1", "imagenes/iglesia.jpg",894,1055)		
	},
	
	create: function() { 
	
		fondojuego = juego.add.image(740, 679, "fondo");		
		fondojuego.scale.setTo(2,2);
		fondojuego.anchor.setTo(0.5);
		
		aviso = juego.add.image(50,50, "sign");
		
		joystick = juego.add.image(0,679, "dpad");
		joystick.anchor.setTo(0,1);
		joystick.alpha=0.5;
		joystick.fixedToCamera = true;
		
		// iglesia  730 630
		iglesia = juego.add.sprite(760,630, "boton");
		iglesia.scale.setTo(0.1);
		iglesia.anchor.setTo(0.5); 
		
		personaje = juego.add.sprite(370, 340, "caminante");
		personaje.scale.setTo(2,2);
		personaje.anchor.setTo(0.5,0.8);  // centra las coordenadas del objeto 	
		personaje.animations.add("upa", [0, 1, 2], 10, true);  // se crea la animación, orden de los pasos, velocidad 
		personaje.animations.add("downa", [6, 7, 8], 10, true);
		personaje.animations.add("lefta", [9, 10, 11], 10, true);
		personaje.animations.add("righta", [3, 4, 5], 10, true);
		
		iglesiaPopup = juego.add.button(780,610,"popup1",openIglesia, this);
		iglesiaPopup.scale.setTo(0.2);
		iglesiaPopup.anchor.setTo(0,1);
		iglesiaPopup.visible=false;
		
		
	    juego.world.setBounds(0, 0, 1480, 1358);
	                                          
		juego.physics.startSystem(Phaser.Physics.ARCADE);						// activa la capacidad de reconocer coliciones, bordes, gravedad, etc
  
		juego.physics.arcade.enable(personaje);
		personaje.body.collideWorldBounds = true;


	
		flechaderecha = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT); // activa la tecla derecha
		flechaizquierda = juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		flechaarriba = juego.input.keyboard.addKey(Phaser.Keyboard.UP);  // activa la tecla izquierda
		flechaabajo = juego.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	},
	
	update: function(){ 
	x=juego.input.pointer1.x;
	y=juego.input.pointer1.y;
	xp = personaje.position.x;
	yp = personaje.position.y;
		if(flechaderecha.isDown ||(juego.input.pointer1.isDown && x>150&& x<300 && (Math.abs(y-529)<(x-150)))){
			this.caminader();
			personaje.animations.play("righta");
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
		if(personaje.overlap(iglesia)){
			iglesiaPopup.visible = true;
			}else{
			iglesiaPopup.visible = false;	
				}
		
	
	},
	render: function(){
			juego.debug.inputInfo(32,32);
		},
	caminader: function(){  
			personaje.position.x += 5;       // mueve la animación hacia la dercha
			if(personaje.position.x>370){
				juego.camera.x += 5;
			}
     },
	caminaizq: function(){  
			personaje.position.x -= 3;
			if(personaje.position.x<1110){
			juego.camera.x -= 3;}
     },
	 arriba: function(){
			personaje.position.y -= 3;
			if(personaje.position.y<1019){juego.camera.y -= 3;}				                                                    
	 },
	 abajo: function(){
			personaje.position.y += 3;	
				
			if(personaje.position.y>340){juego.camera.y += 3;}			                                                    
	 },
	 invi: function(){
	 		iglesia.visible=false;
	 }
	 
}

var iglesia={
	preload: function() {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;         // Escala la imagen al reducir el tamaño de la ventana
		juego.load.image("fondo", "imagenes/iglesia.jpg");
		}, 
	create: function(){
		fondojuego = juego.add.image(0,0, "fondo");
		}
		//,
	//update: function(){
	//		}

	}
function openIglesia(){	
		juego.state.start("iglesia");	
		 }
	juego.state.add("iglesia", iglesia);
	juego.state.add("activo", jugar);
	juego.state.start("activo");

