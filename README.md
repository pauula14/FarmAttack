# FarmAttack
Práctica para la asignatura Juegos en Red.

**Título:** Farm Attack

**Temática:** Plataformas 2D cooperativo en el que los jugadores tienen que lograr huir

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

##2. Introducción

Este es el documento de diseño del juego titulado “Farm Attack”. Este escrito tiene como objetivo principal plasmar los elementos que debe incluir Farm Attack y servir de carta de presentación en caso de buscar colaboradores en un futuro. Para el desarrollo del juego utilizaremos Phaser 3 como motor de renderizado. 

### 2.1. Concepto del juego

Farm Attack es un juego de dos jugadores en el que cada jugador tiene por personaje una gallina. Estos deberán cooperar para lograr recuperar los huevos perdidos y poder alcanzar al zorro que les ha robado los huevos. Será un plataformas 2D cooperativo.

### 2.2. Características principales

El juego se basa en:
* __Dinamismo:__ los jugadoresdeben darse prisa para conseguir los huevos antes de que el tiempo se acabe.
* __Planteamiento sencillo:__ es una historia sencilla basada en una granja
* __Cooperación:__ los jugadores deben estar compenetrados para lograr escapar victoriosos

### 2.3. Género

Nuestro juego se basa en:
* __Plataformas 2D:__ Un género conocido y caracterizado por tener que caminar, correr, saltar o escalar sobre una serie de plataformas y acantilados, para llegar al final del mapa y superar el nivel.
* __Cooperativo:__ Es como los clásicos juegos, en los que los jugadores tienen que trabajar juntos para lograr la victoria.
* __Multijugador:__ Dos jugadores deberán trabajar juntos
* __Arcade:__ Un juego que puede gustar a un amplio sector de público

### 2.4. Propósito y público objetivo

El principal objetivo de Farm Attack es el modo de juego y sus mecánicas. Está dirigido a jugadores de todas las edades con tiempo limitado que dedicar a los videojuegos. Por ello, se apuesta por un sistema de partidas cortas y rápidas. La historia es simple y sencilla, lo que permite poder jugar de forma esporádica sin emplear mucho tiempo.

### 2.5. Jugabilidad

Para cooperar, los personajes deberán saltar y conseguir los coleccionables (huevos) en el tiempo limitado. Además tienen que ayudarse, accionando distintos mecanismos para permitir que el juego siga en curso.

### 2.6. Estilo Visual

Farm Attack tendrá un estilo visual clásico y sencillo, el cartoon. Utilizaremos colores planos y vivos para así hacer el juego visualmente más atractivo para todos los públicos. El estilo visual lo sacamos del concepto de cómic y dibujo animado típico. Como por ejemplo 'Tintín', 'Astérix y Obélix' etc.

### 2.7. Alcance

El objetivo principal es desarrollar un sistema de juego sólido al que poder ir introduciendo contenidos sin dificultad. La primera versión contendrá el juego multijugador en local en su versión más simple.

## 3. Mecánicas del Juego

### 3.1. Flujo de juego 
  * __Modo de juego:__  El jugador deberá elegir si quiere jugar en modo online o en modo offline.   
  * __Menú de Juego:__  Aparecerá en un menú en el que debe seleccionar Jugar para proceder al gameplay.
  * __Gameplay:__ Una vez comienza el juego, aperece el mapa y tras unos segundos, podrán comenzar a jugar cuando el cronómetro se ponga en marcha.
  
### 3.2. Personajes 

Habrá tres personajes, pero sólo dos serán jugables:
* __Gallinas:__ habrá dos gallinas con distintos estilos, las cuales controlarán una cada jugador. Estas gallinas pueden correr y saltar con sus alas. 
* __Zorro:__ el zorro no será un personaje jugable, pero será el antagonista, ya que es quien ha robado los huevos. Aparecerá en muy pocas ocasiones.

### 3.3. Movimiento y físicas 
  
  __1. Interacción entre elementos__  
      La interacción entre elementos será muy básica. Las gallinas pueden interactuar con el mapa, saltando por las plataformas y además con los huevos, pudiendo al pasar por encima de ellos recorgerlos y guardarlos.

  __2. Controles__  
  * __Movimiento:__ Los personajes pueden moverde de derecha a izquiera y saltar, estos controles son respectivamente  D, A y W uno de ellos y el tros las flechas derecha, izquiera y arriba.
  * __Coger Huevos:__ Para que los personajes puedan reocger los huevos deben utilizar un botón. Uno de ellos utilizará la S y el otro la flecha de abajo.

## 4. Interfaz

   La interfaz tendrá un estilo minimalista. Esto quiere decir que una vez los controles se hayan mostrados, no tendrás más referencia de equipamiento y movimiento que lo visual.

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

## 6. Arte 

El arte será muy simple., estilo cartoon.
El fondo será estático y será del tamaño del canvas, por lo que la pantalla no tiene mayor longitud.
Los personajes serán una complexión estilo 'Phineas y Ferb' definidos y visualmente atractivos.
Por otro lado, los escenarios variarán según el momento del juego en que nos encontremos.
Los huevos serán iguales en todo el mapa, bastante simples.

### 6.2. Audio  
El audio lo separaremos en dos ámbitos  
* __Menús:__ Esta música ambiental no muy enérgica y con un loop corto ya que el jugador no pasará mucho tiempo.   
* __In-Game:__ Esta música por el contrario tendrá un énfasis más elevado y con mayor ritmo. Tendrá pequeñas variaciones en función del mapa que se elija pero con un trasfondo común.


## 7. Referencias  
