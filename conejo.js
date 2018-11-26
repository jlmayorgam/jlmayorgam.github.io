// Ejemplo de una animación controlada utilizando la librería externa Phaser
//  realizado por el profesor Carlos Delgado para el curso Gráfica Interactiva de la Universidad Nacional de Colombia

// El primer paso es crear un nuevo objeto "Phaser.Game" y definir su tamaño
var juego = new Phaser.Game(740, 679, Phaser.CANVAS, "consola");
// se declaran todas las variables
var fondojuego;
var personaje;
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

var x;
var y;

var jugar = {
	preload: function() {   // se cargan todas las imágenes que se van a usar
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;         // Escala la imagen al reducir el tamaño de la ventana
		juego.load.image("fondo", "imagenes/mapa2.png",740,679);
		juego.load.spritesheet("caminante", "imagenes/rpg.png", 48, 64);  // un spritesheet son varias imágenes en un solo archivo
		juego.load.image("dpad", "imagenes/unnamed.png",300,300);	
	},
	
	create: function() { 
	
		fondojuego = juego.add.tileSprite(0, 0, 740, 679, "fondo");		
		personaje = juego.add.sprite(150, 325, "caminante");
		personaje.scale.setTo(2,2);
		personaje.anchor.setTo(0.5);  // centra las coordenadas del objeto 	
		personaje.animations.add("upa", [0, 1, 2], 10, true);  // se crea la animación, orden de los pasos, velocidad 
		personaje.animations.add("downa", [6, 7, 8], 10, true);
		personaje.animations.add("lefta", [9, 10, 11], 10, true);
		personaje.animations.add("righta", [3, 4, 5], 10, true);
		joystick = juego.add.image(0,679, "dpad");
		joystick.scale.setTo(0.5,0.5);
		joystick.anchor.setTo(0,1);
		
	
	                                          
		//juego.physics.startSystem(Phaser.Physics.ARCADE);						// activa la capacidad de reconocer coliciones, bordes, gravedad, etc
  
		//juego.physics.arcade.enable(personaje);
		//personaje.body.collideWorldBounds = true;


	
		flechaderecha = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT); // activa la tecla derecha
		flechaizquierda = juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		flechaarriba = juego.input.keyboard.addKey(Phaser.Keyboard.UP);  // activa la tecla izquierda
		flechaabajo = juego.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	},
	
	update: function(){ 
	x=juego.input.pointer1.x;
	y=juego.input.pointer1.y;
		if(flechaderecha.isDown ||(juego.input.pointer1.isDown && x>75&& x<150 && (Math.abs(y-604)<(x-75)))){
			this.caminader();
			personaje.animations.play("righta");
		}else if(flechaizquierda.isDown ||(juego.input.pointer1.isDown && x<75 && x>0&& (-Math.abs(y-604)>(x-75)))){
			this.caminaizq();
			personaje.animations.play("lefta");
		}else if(flechaarriba.isDown ||(juego.input.pointer1.isDown && y<604&& y>529&& x>0&& x<150 )){
			this.arriba();
			personaje.animations.play("upa");	
		}else if(flechaabajo.isDown ||(juego.input.pointer1.isDown && y>604&& y<679&& x>0&& x<150 )){
			this.abajo();
			personaje.animations.play("downa");	
		}else{
			personaje.animations.stop();
			}
		
	
	},
	caminader: function(){  
			personaje.position.x += 2;       // mueve la animación hacia la dercha
			            
     },
	caminaizq: function(){  
			personaje.position.x -= 2;
	
     },
	 arriba: function(){
			personaje.position.y -= 2;
						                                                    
	 },
	 abajo: function(){
			personaje.position.y += 2;			
						                                                    
	 },
}

juego.state.add("activo", jugar);
juego.state.start("activo");
