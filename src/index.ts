import type { Direction, Path } from "./types";
import GameScreen from "./game-screen";
import Position from "./position";
import Snake from "./snake";

const canvas = document.getElementById("game-screen") as HTMLCanvasElement;

const gameScreen = new GameScreen(canvas, "black");
const gameContext = gameScreen.getContext();

const snake = new Snake(4, 10, "green");

snake.setPosition(new Position(0, 0), "vertical", 1);

let path: Path = "vertical";
let direction: Direction = 1;

const animate = () => {
    snake.move(10, path, direction, gameScreen);

    gameScreen.animate(gameContext);
    snake.animate(gameContext);
    
    setTimeout(() => {
        window.requestAnimationFrame(animate);
    }, 50);
};

window.addEventListener("keydown", (e) => {
    const key = e.key;

    switch (key) {
        case "ArrowDown":
            path = "vertical";
            direction = 1;
            break;

        case "ArrowUp":
            path = "vertical";
            direction = -1;
            break;
        
        case "ArrowLeft":
            path = "horizontal";
            direction = -1;
            break;

        case "ArrowRight":
            path = "horizontal";
            direction = 1;
            break;
    };
});

animate();
