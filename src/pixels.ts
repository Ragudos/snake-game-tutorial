import Dimensions from "./dimensions";
import Position from "./position";

abstract class Pixels {
    private __color: string;
    private __position: Position;
    private __dimensions: Dimensions;

    abstract animate(ctx: CanvasRenderingContext2D): void;

    constructor() {
        this.__color = "black";
        this.__position = new Position(0, 0);
        this.__dimensions = new Dimensions(0, 0);
    }

    setPosition(x: number, y: number): void {
        this.__position = new Position(x, y);
    }

    setDimensions(width: number, height: number): void {
        this.__dimensions = new Dimensions(width, height);
    }

    setColor(color: string): void {
        this.__color = color;
    }

    getPosition(): Position {
        return this.__position;
    }

    getDimensions(): Dimensions {
        return this.__dimensions;
    }

    getColor(): string {
        return this.__color;
    }
}

class SquarePixel extends Pixels {
    constructor() {
        super();
    }

    override animate(ctx: CanvasRenderingContext2D): void {
        const position = this.getPosition();
        const dimensions = this.getDimensions();
        const color = this.getColor();
    
        ctx.fillStyle = color;
        ctx.fillRect(position.x, position.y, dimensions.width, dimensions.height);
    }
}

export {
    SquarePixel
};
