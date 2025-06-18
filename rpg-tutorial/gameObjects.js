import { halfTile, tileSize } from "./main.js";

export class GameObjects {
    constructor({
        game,
        sprite,
        position,
        scale }
    ) {
        this.game = game;
        this.sprite = sprite ?? {image: "",x:0,y:0,width:tileSize,height:tileSize,};
        this.position = position ?? {x:0, y:0};
        this.scale = scale ?? 1;

        this.destinationPosition = {x: this.position.x, y: this.position.y};
        this.distanceToTravel = {x: 0, y: 0};

        this.width = this.sprite.width * this.scale;
        this.height = this.sprite.height * this.scale;
        this.halfWidth = this.width /2;
    }
    moveTowards(destinationPosition, speed) {
        this.distanceToTravel.x = destinationPosition.x - this.position.x;
        this.distanceToTravel.y = destinationPosition.y - this.position.y;

        // let distance = Math.sqrt(this.distance.x**2 + this.distanceToTravel.y**2)
        let distance = Math.hypot(this.distanceToTravel.x, this.distanceToTravel.y);

        if (distance <= speed){
            this.position.x = destinationPosition.x;
            this.position.y = destinationPosition.y;
        } else {
            const stepX = this.distanceToTravel.x / distance;
            const stepY = this.distanceToTravel.y / distance;
            this.position.x += stepX * speed;
            this.position.y += stepY * speed;

            this.distanceToTravel.x = destinationPosition.x - this.position.x;
            this.distanceToTravel.y = destinationPosition.y - this.position.y
            distance = Math.hypot(this.distanceToTravel.x, this.distanceToTravel.y);
        }
        return distance;
    }


    draw(ctx) {
        if (this.game.debug){
            ctx.fillStyle = "blue";
            ctx.fillRect(
                this.position.x,
                this.position.y,
                tileSize,
                tileSize
            )
        }
        ctx.strokeStyle = "white";
        ctx.strokeRect(
            this.destinationPosition.x,
            this.destinationPosition.y,
            tileSize,
            tileSize
        )
        ctx.drawImage(
            this.sprite.image,
            this.sprite.x * this.sprite.width,
            this.sprite.y * this.sprite.height,
            this.sprite.width,
            this.sprite.height, 
            this.position.x + halfTile - this.halfWidth, 
            this.position.y + tileSize - this.height,
            this.width,
            this.height
        )
    }
}