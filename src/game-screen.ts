import { SquarePixel } from "./pixels";

class GameScreen extends SquarePixel {
    private __canvas: HTMLCanvasElement;
    private __ctx: CanvasRenderingContext2D;

    constructor(canvasElement: HTMLCanvasElement, canvasColor: string) {
        super();
        this.__canvas = canvasElement;
        this.__ctx = canvasElement.getContext("2d")!;
        this.setColor(canvasColor);
        this.initialize();
    }

    private initialize(): void {
        const width = this.__canvas.width;
        const height = this.__canvas.height;

        this.setPosition(0, 0);
        this.setDimensions(width, height)
    }

    getContext(): CanvasRenderingContext2D {
        return this.__ctx;
    }
}

export default GameScreen;
