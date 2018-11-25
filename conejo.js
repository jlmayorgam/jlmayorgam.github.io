// Ejemplo de una animación controlada utilizando la librería externa Phaser
//  realizado por el profesor Carlos Delgado para el curso Gráfica Interactiva de la Universidad Nacional de Colombia

// El primer paso es crear un nuevo objeto "Phaser.Game" y definir su tamaño
var juego = new Phaser.Game(720, 480, Phaser.CANVAS, "consola");
// se declaran todas las variables
var fondojuego;
var personaje;
var boton1;
var boton2;
var texto;
var flechaderecha;
var flechaizquierda;
var right = false;
var left = false;

var jugar = {
	preload: function() {   // se cargan todas las imágenes que se van a usar
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;         // Escala la imagen al reducir el tamaño de la ventana
		juego.load.image("fondo", "imagenes/potrero.jpg");
		juego.load.spritesheet("caminante", "imagenes/conejo.png", 240, 240);  // un spritesheet son varias imágenes en un solo archivo
		juego.load.image("boton", "imagenes/boton1.jpg");
		juego.load.image("botonO", "imagenes/play.png");
	},
	
	create: function() { 
	
		fondojuego = juego.add.tileSprite(0, 0, 720, 480, "fondo");		
		personaje = juego.add.sprite(150, 325, "caminante");
		personaje.animations.add("caminar", [0, 1, 2, 3, 4, 5, 6, 7], 10, true);  // se crea la animación, orden de los pasos, velocidad 
		personaje.anchor.setTo(0.5);                                             // centra las coordenadas del objeto
		juego.physics.startSystem(Phaser.Physics.ARCADE);						// activa la capacidad de reconocer coliciones, bordes, gravedad, etc
		juego.physics.arcade.gravity.y = 500;  
		juego.physics.arcade.enable(personaje);
		personaje.body.collideWorldBounds = true;
		personaje.body.allowGravity = true;
		
		 
		
		botonP = juego.add.button(220, 440, "boton", this.parar, this);
		botonA = juego.add.button(400, 440, "boton", this.andar, this);
		texto = juego.add.text(270, 440, "parar", {font: "bold 22px sans-serif", fill:"#996600"});  // agrega un texto a la pantalla
		texto = juego.add.text(450, 440, "andar", {font: "bold 22px sans-serif", fill:"#996600"});
		
		boton1 = juego.add.button(25, 455, "botonO", this.caminaizq, this);  // crea el botón y le asigna una función
		boton1.anchor.setTo(0.5);         // centra las coordenadas del objeto
		boton1.scale.setTo(-0.4, 0.4);   // cambia el tamaño del botón
		boton1.alpha = 0.4;	                  // cambia la transparencia del botón
		boton1.events.onInputOver.add(function(){left=true;});  // define instancias a las acciones con el botón ( over, out, down, up )
        boton1.events.onInputOut.add(function(){left=false;});
        boton1.events.onInputDown.add(function(){left=true;});
        boton1.events.onInputUp.add(function(){left=false;});
		
		boton2 = juego.add.button(695, 455, "botonO", this.caminader, this);
		boton2.anchor.setTo(0.5);
		boton2.scale.setTo(0.4, 0.4);
		boton2.alpha = 0.4;		
		boton2.events.onInputOver.add(function(){right=true;});
        boton2.events.onInputOut.add(function(){right=false;});
        boton2.events.onInputDown.add(function(){right=true;});
        boton2.events.onInputUp.add(function(){right=false;});
	
		flechaderecha = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT); // activa la tecla derecha
		flechaizquierda = juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		flechaarriba = juego.input.keyboard.addKey(Phaser.Keyboard.UP);  // activa la tecla izquierda
	},
	
	update: function(){ 
		if(flechaderecha.isDown){
			this.caminader();
		}
		if(flechaizquierda.isDown){
			this.caminaizq();
		}
		if(flechaarriba.isDown && personaje.body.onFloor()){
			this.salta();	
		}
		if(right){  // inserta la instancia de la acción del botón dentro del update para correr la función de manera reiterativa
			this.caminader();
		}else {
			boton2.alpha = 0.4;
		}	
		if(left){   // inserta la instancia de la acción del botón dentro del update para correr la función de manera reiterativa
			this.caminaizq();	
		} else {
			boton1.alpha = 0.4;
		}
		
	},
	caminader: function(){  
			personaje.position.x += 2;       // mueve la animación hacia la dercha
			personaje.scale.setTo(1, 1);    // define la orientación de la animación
			fondojuego.tilePosition.x -=1;  // mueve el fondo
		    boton2.alpha = 1;                    // mientras actua el botón se ve al 100%
     },
	caminaizq: function(){  
			personaje.position.x -= 2;
			personaje.scale.setTo(-1, 1);
			fondojuego.tilePosition.x +=1;
		    boton1.alpha = 1;
     },
	    parar: function(){  
	        personaje.animations.stop(); // detiene la animación
     },
	    andar: function(){  
	        personaje.animations.play("caminar");  // pone la animación en play
     },
	 salta: function(){        
            
	         
			personaje.body.velocity.y = -400; 
			                                                    
},
}

juego.state.add("activo", jugar);
juego.state.start("activo");
