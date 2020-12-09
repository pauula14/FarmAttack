# FarmAttack
Práctica para la asignatura Juegos en Red.

**Título:** Farm Attack

**Temática:** Plataformas 2D cooperativo en el que los jugadores tienen que lograr recoger todos los objetos y huir

**Integrantes del grupo:**

Paula Calzada Toledo      p.calzada.2017@alumnos.urjc.es  paulacalzada014@gmail.com        
Eusebiu Costinel Delcea   ec.delcea.2017@alumnos.urjc.es  deusebiu98@yahoo.es  
Rodrigo Martínez Sánchez  r.martinezsa.2016@alumnos.urjc.es prothoky@gmail.com                     
Diego Pérez Pérez         d.perezp.2017@alumnos.urjc.es   diegoperezp2@gmail.com  

# FARM ATTACK

## Índice

1. Cambios  
2. Introducción  
      1. Concepto del juego  
      2. Características principales   
      3. Género  
      4. Propósito y público objetivo  
      5. Jugabilidad   
      6. Estilo visual   
      7. Alcance   
3. Mecánicas de juego   
       1. Flujo de juego   
       2. Personajes   
                 2.1 Guerrero  
       3. Movimiento y físicas   
                 3.1 Interacción entre elementos   
                 3.2 Controles  
4. Interfaz   
5. Diagrama de flujo   
       1. Menú principal   
       2. Selección de nivel   
       3. Nivel   
       4. Fin de nivel   
6. Arte   
      1. Arte 2D   
      2. Audio 
7. Referencias  

## 1. Cambios

Esta es la primera fase de desarrollo del juego, así que de momento no se ha aplicado ningún cambio.

##2. Introducción

Este es el documento de diseño del juego titulado “Farm Attack”. Este escrito tiene como objetivo principal plasmar los elementos que debe incluir Farm Attack y servir de carta de presentación en caso de buscar colaboradores en un futuro. Para el desarrollo del juego utilizaremos Phaser 3 como motor de renderizado. 

### 2.1. Concepto del juego

Farm Attack es un juego de dos jugadores en el que cada jugador tiene por personaje una gallina. Estos deberán cooperar para lograr recuperar los huevos perdidos y poder alcanzar las cestas a lo largo de varias pantallas. Será un plataformas 2D cooperativo.

### 2.2. Características principales

El juego se basa en:
* __Dinamismo:__ los jugadores deben darse prisa para conseguir los huevos antes de que el tiempo se acabe.
* __Planteamiento sencillo:__  historia sencilla basada en una granja.
* __Cooperación:__ los jugadores deben estar compenetrados para lograr escapar victoriosos.

### 2.3. Género

Nuestro juego se basa en:
* __Plataformas 2D:__ Un género conocido y caracterizado por tener que caminar, correr, saltar o escalar sobre una serie de plataformas y acantilados, para llegar al final del mapa y superar el nivel.
* __Cooperativo:__ Como los clásicos juegos, en los que los jugadores tienen que trabajar juntos para lograr la victoria.
* __Multijugador:__ Dos jugadores deberán trabajar juntos.
* __Arcade:__ Un juego que puede gustar a un amplio sector de público.

### 2.4. Propósito y público objetivo

Farm Attack está dirigido a jugadores de todas las edades con un tiempo limitado para poder dedicar a los videojuegos. Por ello, se apuesta por un sistema de partidas cortas y rápidas. La historia es simple y sencilla, lo que permite poder jugar de forma esporádica sin emplear mucho tiempo.

### 2.5. Jugabilidad

Para cooperar, los personajes deberán saltar y conseguir los coleccionables (huevos) en un tiempo limitado y ajustado a cada nivel. Además, deberán cooperar y ayudarse accionando distintos mecanismos para desbloquear el acceso a nuevas zonas del mapa y, así, permitir que el juego siga en curso.

### 2.6. Estilo Visual

Farm Attack tendrá un estilo visual clásico y sencillo, acercándose un poco al cartoon. Utilizaremos colores planos y vivos para así hacer el juego visualmente más atractivo y llamativo para todos los públicos. Este estilo toma referencias del concepto de cómic y dibujo animado típico. Algunos ejemplos de estos son 'Tintín', 'Astérix y Obélix' etc.

### 2.7. Alcance

El objetivo principal es desarrollar un sistema de juego sólido al que poder ir introduciendo nuevos contenidos y mecánicas sin dificultad. La primera versión contendrá el juego multijugador en local en su versión más simple.

## 3. Mecánicas del Juego

### 3.1. Flujo de juego 
  * __Modo de juego:__  El jugador deberá elegir si quiere jugar en modo online o en modo offline.   
  * __Menú de Juego:__  Posteriormente, aparecerá un menú en el que debe seleccionar Jugar para proceder al gameplay.
  * __Gameplay:__ Una vez comienza el juego, aparece el mapa y tras unos segundos, podrán comenzar a jugar cuando el cronómetro se ponga en marcha.
  
### 3.2. Personajes 

Habrá tres personajes, pero sólo dos serán jugables:
* __Gallinas:__ habrá dos gallinas con distintos colores, estas serán los avatares que controlarán los jugadores. Estas gallinas pueden correr y saltar infinitamente con sus alas. 
* __Zorro:__ aún no introducido, no será un personaje jugable. Será el antagonista ya que es el responsable de haber robado los huevos. Aparecerá en muy pocas ocasiones.

### 3.3. Movimiento y físicas 
  
  __1. Interacción entre elementos__  
      La interacción entre elementos será muy básica. Las gallinas podrán interactuar con el mapa, saltando por las plataformas y accionando distintos mecanismos para desbloquear zonas del mismo. Además, podrán interactuar con los huevos, pudiendo recorgerlos al pasar por encima de ellos, guardándolos en cestas que tendrán que alcanzar para pasar de nivel.

  __2. Controles__  
  * __Navegación por la interfaz:__ Los jugadores podrán moverse por los distintos menús haciendo uso del ratón.
  * __Movimiento:__ Los personajes podrán moverse a izquierda, derecha y, además, saltar, las teclas asignadas a estos controles serán respectivamente  A, D y W para la gallina marrón y las flechas de dirección izquierda, derecha y arriba para la blanca.
  * __Coger huevos e interactuar con mecanismos:__ Para realizar estas acciones no será necesario accionar ninguna tecla, con pasar por encima de los huevos y las palancas será suficiente.

## 4. Interfaz

   La interfaz tendrá un estilo minimalista y simple. Los menús serán poco cargados y muy intuitivos, inspirados en un corral, compuestos de un fondo de madera con algunas plumas encima, un título y unos botones. Estos últimos tendrán un color algo más claro que el fondo y unas letras cartoon blancas, las cuáles cambiarán a rojo cuando se pase el ratón por encima del botón en cuestión, dándole un feedback visual al jugador.
   Al inicio de cada nivel se mostrará una pantalla con los controles y consejos para superarlo, una vez desaparezca o saltemos esta pantalla, para tener una interfaz sencilla y simple,durante el gameplay únicamente se mostrarán el botón de pausa y el indicador del tiempo en el HUD, de modo que los jugadores no tengan que preocuparse en estar atentos a demasiados elementos y así centrarse más en la resolución de los propios niveles.

## 5. Diagrama de flujo 

* __Menú inicial__
Pantalla con la carátula del juego en la que el jugador sólo debe hacer click en cualquier parte
* __Menú Selección__  
Pantalla simple en la que se elegirá el modo de juego. (OFFLINE / ONLINE)  
* __Menú Principal__  
Pantalla con el mismo fondo que el menú de selección en el que se debe elegir entre Jugar, opciones, controles y salir.  
* __Nivel__   
El nivel tendrá un fondo minimalista ambientado en una granja para dar mayor importancia a los personajes de los jugadores.  
* __Fin de nivel__  
El final de nivel se marcará con la palabra YOU WIN / YOU LOSE en función de si los jugadores han logrado recuperar todos los huevos o por el contrario, se les ha acabado el tiempo. Tras aceptar dicha pantalla volverás al menú principal.
* __Opciones:__
En esta pantalla el jugador podrá subir, bajar o muitear el volumen de la música.
* __Controles:__ En esta pantalla el jugador podrá ver las mecánicas básicas y botones que debe utilizar para el movimiento.

![DiagramaFlujo](https://github.com/pauula14/FarmAttack/blob/Fase2/FASE2/GDD/Diagrama%20de%20Flujo.PNG)

## 6. Arte 

El arte será bastante simple, con un estilo similar al cartoon como se ha comentado en el apartado de estilo visual.
El fondo será estático y del tamaño del canvas. A medida que vayamos avanzando en el juego nos encontraremos con tres temáticas distintas de escenarios.
Los dos primeros niveles se desarrollarán en un corral o gallinero,  con un fondo de madera, fardos de heno y cajas como obstáculos y paja sobre algunas de las plataformas. A continuación se muestra el diseño de dicho mapa:

![barn2](https://user-images.githubusercontent.com/55493193/101559271-15137480-39c1-11eb-881d-bd8a7505b4a9.jpg)

En el tercer y cuarto nivel los jugadores se desplazarán a la fachada de la granja, con un fondo clásico formado por ladrillos rojos adosados, algunas flores y plantas a modo de decoración, macetas como obstáculos y una tubería encargada de dividir las zonas transitables por cada jugador.

![facade2](https://user-images.githubusercontent.com/55493193/101559288-1d6baf80-39c1-11eb-803c-30b9f28bad00.jpg)

El último nivel se desarrollará en el bosque, donde se escondería el zorro en futuras actualizaciones, este escenario está compuesto de un fondo formado por distintos arbustos colocados a diferentes profundidades, ramas a modo de plataformas y hojas e hierba como decoración.

![forest](https://user-images.githubusercontent.com/55493193/101559296-1fce0980-39c1-11eb-9f17-80ce484432da.jpg)

Las gallinas, o personajes jugables, tendrán un estilo definido y simple, con unos cuerpos estilizados que, combinados con el uso de colores planos y contornos en negro, las harán más adorables, graciosas y atractivas visualmente. Las dos gallinas tienen la misma forma del cuerpo y las mismas animaciones, pero distintos colores en el plumaje para diferenciarlas.

![white_chicken_walk](https://user-images.githubusercontent.com/55493193/101577982-01c0d300-39da-11eb-99b0-da32735798f8.png)
![brown_chicken_walk](https://user-images.githubusercontent.com/55493193/101577992-02596980-39da-11eb-8037-781c543f74db.png)

Los huevos conservarán la misma estética de las gallinas empleando contornos en negro, pero, emitirán un sueve brillo para que resalten un poco más en el mapa.
Al igual que las gallinas, habrá dos sprites distintos, indicando de esta forma qué huevos corresponden a cada gallina. Así, la gallina marrón recogerá los huevos blancos, los cuáles tienen un brillo más marrón; y la gallina blanca recogerá los huevos marrones, que a diferencia de los anteriores tienen un brillo blanco.
Además, estos huevos se irán almacenando en dos cestas distintas, las cuáles se llenarán cuando se recogan los 3 huevos referentes a cada cesta, respectivamente.

![empty_egg_counter](https://user-images.githubusercontent.com/55493193/101579529-7267ef80-39da-11eb-8338-3716746b6ce4.png)
![egg_counter](https://user-images.githubusercontent.com/55493193/101579633-798efd80-39da-11eb-8347-903bb76704e2.png)
![white_egg_counter](https://user-images.githubusercontent.com/55493193/101580588-be1a9900-39da-11eb-9a83-80ac05866648.png)
![white_egg](https://user-images.githubusercontent.com/55493193/101578070-084f4a80-39da-11eb-90ed-440fcc65c010.png)
![egg](https://user-images.githubusercontent.com/55493193/101578074-084f4a80-39da-11eb-84e0-3e9adc9e8d90.png)

### 6.2. Audio  
Podemos encontrar audio en nuestro juego de las siguientes formas:
* __Efectos de sonido:__ 
* __Menús:__ Esta música ambiental no muy enérgica y con un loop corto ya que el jugador no pasará mucho tiempo.   
* __In-Game:__ Esta música por el contrario tendrá un énfasis más elevado y con mayor ritmo. Tendrá pequeñas variaciones en función del mapa que se elija pero con un trasfondo común.


## 7. Referencias  
