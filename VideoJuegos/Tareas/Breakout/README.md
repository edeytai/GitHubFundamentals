# Breakout Game
Emiliano Deyta - A01785881

Breakout es un juego arcade clásico en el que controlas una paleta para rebotar una pelota y destruir todos los bloques situados en la parte superior de la pantalla. 

## Controles del Juego

- **Mover la Paleta a la Izquierda:** Presiona la tecla `ArrowLeft`
- **Mover la Paleta a la Derecha:** Presiona la tecla `ArrowRight`

## Reglas y Objetivo del Juego

- **Objetivo:**  
  Destruir todos los bloques situados en la parte superior de la pantalla para ganar la partida.

- **Vidas:**  
  Comienzas con 3 vidas. Si la pelota cae por debajo de la paleta, se resta una vida y el juego se reinicia (la pelota y la paleta se reposicionan al centro). 

- **Pelota:**  
  La pelota rebota en las paredes laterales y en el borde superior.  

- **Powerups:**  
  - **Paddle Enlarge:**  
    Al recoger este powerup, la paleta se agranda temporalmente, facilitando el control del rebote de la pelota.
  - **Double Ball:**  
    Al recoger este powerup se activa una segunda pelota. Mientras ambas estén en juego, si una cae, se elimina solo esa pelota y el juego continúa con la otra. El efecto se desactiva cuando pierdes la pelota restante (entonces se resta una vida y se reposiciona).

- **Fin del Juego:**  
  - **Game Over:**  
    Se muestra "GAME OVER" cuando se agotan todas las vidas.
  - **Victoria:**  
    Se muestra "¡Ganaste!" al destruir todos los bloques.

## Notas Adicionales

- Una vez que pierdes la pelota (si es la única en juego), ésta se reposiciona al centro para que puedas seguir jugando (si aún te quedan vidas).
- Para reiniciar la partida (después de ganar o perder), refresca la página.