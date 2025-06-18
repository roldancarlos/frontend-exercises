import { Hero } from "./hero.js";
import { World } from "./world.js";
import { Input } from "./input.js";

export const tileSize = 32;
export const cols = 15;
export const rows = 20;
const gameWidth = tileSize * cols;
const gameHeight = tileSize * rows;
export const halfTile = tileSize/2

window.addEventListener("load", function () {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = gameWidth;
    canvas.height = gameHeight;

    class Game {
        constructor() {
            this.world = new World();
            this.hero = new Hero({
                game: this,
                sprite: {
                    image: document.getElementById("hero1"),
                    x: 0,
                    y: 11,
                    width: 64,
                    height: 64
                },
                position: { x: 1 * tileSize, y: 2 * tileSize }, // en tiles
                scale: 1,
            });
            this.input = new Input(this);

            this.eventUpdate = false;
            this.eventTimer = 0;
            this.eventInterval = 60;

            this.debug = false;
        }
        toggleDebug(){
            this.debug = !this.debug
        }
        render(ctx, deltaTime) {
            this.hero.update(deltaTime);
            this.world.drawBackground(ctx);
            if (this.debug) {
                this.world.drawGrid(ctx);
            }
            this.hero.draw(ctx);
            this.world.drawForeground(ctx);
            if (this.debug) {
                this.world.drawCollisionMap(ctx);
            }

            if (this.eventTimer < this.eventInterval) {
                this.eventTimer += deltaTime;
                this.eventUpdate = false;
            } else {
                this.eventTimer = 0;
                this.eventUpdate = true;
            }
        }
    }

    const game = new Game();

    let lastTime = 0;

    function animate(TimeStamp) {
        requestAnimationFrame(animate);
        
        const deltaTime = TimeStamp - lastTime;
        lastTime = TimeStamp;
        
        game.render(ctx, deltaTime)
    }
    requestAnimationFrame(animate);


});
