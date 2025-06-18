import { GameObjects } from "./gameObjects.js";
import { down, up, left, right } from "./input.js";
import { tileSize } from "./main.js";

export class Hero extends GameObjects {
    constructor({ game, sprite, position, scale }) {
        super({ game, sprite, position, scale });
        this.speed = 100;      // píxeles por segundo
        this.maxFrame = 8;     // último frame de la animación
        this.moving = false;   // ¿se está desplazando?
    }

    /**
     * Actualiza posición, dirección y animación del héroe.
     * @param {number} deltaTime  Tiempo transcurrido desde el último frame (ms)
     */
    update(deltaTime) {
        // Posición destino actual
        let nextX = this.destinationPosition.x;
        let nextY = this.destinationPosition.y;

        // Paso de movimiento en píxeles para este frame
        const scaledSpeed = this.speed * (deltaTime / 1000);

        // Avanza suavemente hacia el destino
        const distance = this.moveTowards(this.destinationPosition, scaledSpeed);
        const arrived  = distance <= scaledSpeed;

        // Solo si llegó al tile destino, calcula un nuevo destino
        if (arrived) {
            // Decide adónde moverse según la última tecla
            if (this.game.input.lastKey === up) {
                nextY -= tileSize;
                this.sprite.y = 8;         // fila de sprites “arriba”
            } else if (this.game.input.lastKey === down) {
                nextY += tileSize;
                this.sprite.y = 10;        // fila “abajo”
            } else if (this.game.input.lastKey === left) {
                nextX -= tileSize;
                this.sprite.y = 9;         // fila “izquierda”
            } else if (this.game.input.lastKey === right) {
                nextX += tileSize;
                this.sprite.y = 11;        // fila “derecha”
            }

            // Coordenadas del tile al que intentamos movernos
            const col = nextX / tileSize;
            const row = nextY / tileSize;

            // Comprueba si el tile está bloqueado (1 = colisión)
            const isBlocked = this.game.world.getTile(
                this.game.world.level1.collisionLayer,
                row,
                col
            );

            // Solo actualiza el destino si no hay colisión
            if (!isBlocked) {
                this.destinationPosition.x = nextX;
                this.destinationPosition.y = nextY;
            }
        }

        /* ---------- Animación de sprites ---------- */

        // ¿Hay teclas activas o aún está llegando al destino?
        this.moving = this.game.input.keys.length > 0 || !arrived;

        // Avanza frames solo cuando toca y si está en movimiento
        if (this.game.eventUpdate && this.moving) {
            if (this.sprite.x < this.maxFrame) {
                this.sprite.x++;
            } else {
                this.sprite.x = 0;
            }
        } else if (!this.moving) {
            this.sprite.x = 0; // frame estático
        }
    }
}
