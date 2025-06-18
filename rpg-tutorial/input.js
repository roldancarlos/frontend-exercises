export const left = "left";
export const right = "right";
export const up = "up";
export const down = "down";

export class Input {
    constructor(game) {
        this.game = game;
        this.keys = [];

        window.addEventListener("keydown", e => {
            if (e.key === "ArrowUp" || e.key.toLowerCase() === "w") {
                this.keyPressed(up);
            } else if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") {
                this.keyPressed(down);
            } else if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
                this.keyPressed(left);
            } else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
                this.keyPressed(right);
            } else if (e.key === "Enter") {
                this.game.toggleDebug();
            }
        });

        window.addEventListener("keyup", e => {
            if (e.key === "ArrowUp" || e.key.toLowerCase() === "w") {
                this.keyReleased(up);

            } else if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") {
                this.keyReleased(down);

            } else if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
                this.keyReleased(left);

            } else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
                this.keyReleased(right);

            }
        });
    }

    keyPressed(key) {
        if (!this.keys.includes(key)) {
            this.keys.unshift(key);
        }
        console.log(key);
    }

    keyReleased(key) {
        const index = this.keys.indexOf(key);
        if (index === -1) return
        this.keys.splice(index, 1);

    }
    get lastKey() {
        return this.keys[0];
    }
}
