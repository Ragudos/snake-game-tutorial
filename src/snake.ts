import GameScreen from "./game-screen";
import { SquarePixel } from "./pixels";
import Position from "./position";
import { Direction, Path } from "./types";


class Snake {
    private __head: SquarePixel;
    private __body: SquarePixel[];
    private __baseSnakeSize: number;
    private __isInitialPositionSet: boolean;

    constructor(baseSnakeSize: number, pixelSize: number, color: string) {
        if (baseSnakeSize < 4) {
            throw new Error("Please provide at least 4 base snake sizes");
        }
        
        this.__head = new SquarePixel();
        
        this.__head.setDimensions(pixelSize, pixelSize);
        this.__head.setColor(color);

        this.__body = [];
        this.__baseSnakeSize = baseSnakeSize;
        this.__isInitialPositionSet = false;

        for (let idx = 0; idx < baseSnakeSize; ++idx) {
            const body = new SquarePixel();

            body.setDimensions(pixelSize, pixelSize);
            body.setColor(color);

            this.__body.push(body);
        }
    }

    /** Provide the initial position
     *  and initial path of the snake.
     */
    setPosition(position: Position, initialPath: Path, initialDirection: Direction): void {
        if (this.__isInitialPositionSet) {
            console.error("The initial position has already been set. Did you mean to call move()?");
            
            return;
        }

        const headDimensions = this.__head.getDimensions();

        let positionX = position.x;
        let positionY = position.y;

        this.__head.setPosition(positionX, positionY);

        for (const part of this.__body) {
            console.log(positionY);

            if (initialPath == "horizontal") {
                positionX -= headDimensions.width * initialDirection;
            }

            if (initialPath == "vertical") {
                positionY -= headDimensions.height * initialDirection;
            }

            part.setPosition(positionX, positionY);
        }
    }

    move(howMuch: number, path: Path, direction: Direction, gameScreen: GameScreen): void {
        const head = this.__head;
        const body = this.__body;

        console.log(body);

        const gameScreenDimensions = gameScreen.getDimensions();
        const headDimensions = head.getDimensions();
    
        let currentPositionOfPixelInFront = head.getPosition();

        if (path == "horizontal") {
            let newPositionX = currentPositionOfPixelInFront.x + howMuch * direction;

            if (newPositionX >= gameScreenDimensions.width) {
                newPositionX = 0;
            } else if (newPositionX <= 0) {
                newPositionX = gameScreenDimensions.width - headDimensions.width;
            }

            head.setPosition(newPositionX, currentPositionOfPixelInFront.y);
        }

        if (path == "vertical") {
            let newPositionY = currentPositionOfPixelInFront.y + howMuch * direction;

            if (newPositionY >= gameScreenDimensions.height) {
                newPositionY = 0;
            } else if (newPositionY <= 0) {
                newPositionY = gameScreenDimensions.height - headDimensions.height;
            }

            head.setPosition(currentPositionOfPixelInFront.x, newPositionY);
        }

        for (const part of body) {
            const currentPositionOfPart = part.getPosition();

            part.setPosition(currentPositionOfPixelInFront.x, currentPositionOfPixelInFront.y);

            currentPositionOfPixelInFront = currentPositionOfPart;
        }
    };

    animate(ctx: CanvasRenderingContext2D): void {
        this.__head.animate(ctx);
        
        for (const part of this.__body) {
            part.animate(ctx);
        }
    }
}

export default Snake;
