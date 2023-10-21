import React, { useEffect, useState } from 'react'
import pageCSS from './pageCSS.css'
import feedFood from '../SnakeCoundEffect/hiss3-103123.mp3'
import bite from '../SnakeCoundEffect/good-6081.mp3'


export default function Page() {

    let totalGridSize = 20;
    //  r:10               c: 10                  r : 11      c:10
    let initialSnakePosition = [{ r: totalGridSize / 2, c: totalGridSize / 2 }, { r: totalGridSize / 2 + 1, c: totalGridSize / 2 },
    { r: totalGridSize / 2 + 2, c: totalGridSize / 2 }, { r: totalGridSize / 2 + 3, c: totalGridSize / 2 }, { r: totalGridSize / 2 + 4, c: totalGridSize / 2 }

    ];

    //let initialSnakePosition = [{r:0 , c:1} ]

    const [food, setFood] = useState({ r: 5, c: 5 });
    const [snake, setSnake] = useState(initialSnakePosition);
    const [direction, setDirection] = useState('UP');
    const [score, setScore] = useState(0);
    const [gameOverr, setGameOverr] = useState(false);
    const [yourScore, setYourscore] = useState(0);
    const [highestScore, setHighestScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);



    function gameOver() {

        let audio = null;
        audio = new Audio(bite);
        if (isPlaying) {
            audio.pause();

        } else {
            audio.play();

        }
        setIsPlaying(true);


        const ys = score;
        setYourscore(ys);
        setGameOverr(true)

        if (highestScore < score) {
            localStorage.setItem("heigh", score);
        }

        setHighestScore(+localStorage.getItem("heigh"));
        //  console.log("function get Calling");
    }

    function Board() {
        let cellArrac = [];
        for (let row = 0; row < totalGridSize; row++) {
            for (let col = 0; col < totalGridSize; col++) {
                let cellName = "cell";
                let isSnake = snake.some(ele => ele.r === row && ele.c === col);
                // snake is an arrac we use some function it return true and flase if object is present

                if (isSnake) {
                    cellName += "snake";
                }

                let isSnakeHead = snake[0].r === row && snake[0].c === col;

                if (isSnakeHead)
                    cellName += "snakeHead";

                let isFood = (food.r === row && food.c === col);
                if (isFood) {
                    cellName += "food"; //console.log("cellfood ");
                }

                let singleBlock = <div className={cellName} kec={`${row}-${col}`} > </div>  // 0-0 0-1 0-2 0-3 0-4 0-5 06 07 08 09 0-10 
                // 
                //10 11 12 13 14 15 16 17 18 19 
                cellArrac.push(singleBlock);
            }
        }



        return cellArrac;

    }

    function updateBoard() {

        if (highestScore == 0) {
            setHighestScore(+localStorage.getItem("heigh"));
        }
        if (snake[0].r < 0 || snake[0].r > 20 || snake[0].c < 0 || snake[0].c > 20) {
            gameOver();
            return;
        }

        if (snake.slice(1).some(ele => ele.r === snake[0].r && ele.c === snake[0].c)) {
            gameOver();
            return;
        }
        let newState = [...snake];// 10 8 , 10,9  ,10 10 , 11 10 , 12 10 
        switch (direction) {

            case "LEFT":
                newState.unshift({ r: newState[0].r, c: newState[0].c - 1 });
                break;

            case "RIGHT":
                newState.unshift({ r: newState[0].r, c: newState[0].c + 1 });
                break;
            case "UP":
                console.log(direction);
                newState.unshift({ r: newState[0].r - 1, c: newState[0].c });
                break;
            case "DOWN":
                newState.unshift({ r: newState[0].r + 1, c: newState[0].c });
                break;

        }

        if (newState[0].r === food.r && newState[0].c === food.c) {
            let audio = null;
            audio = new Audio(feedFood);
            audio.play();
            setScore(prev => prev + 1);
            createNewFood()

        }

        else
            newState.pop();
        setSnake(newState);
    }


    function updateDirection(e) {
        let cc = e.code;

        console.log(cc);
        switch (cc) {
            case "ArrowUp":

                if (direction !== "DOWN")
                    setDirection('UP');
                break;
            case "ArrowDown":
                console.log(direction);
                if (direction !== "UP")
                    setDirection('DOWN');
                break;
            case "ArrowLeft":
                if (direction != "RIGHT") setDirection('LEFT');
                break;
            case "ArrowRight":
                if (direction != "LEFT") setDirection('RIGHT');
                break;

        }

    }

    const createNewFood = () => {

        let rowPosition = Math.floor(Math.random() * totalGridSize)
        let colPosition = Math.floor(Math.random() * totalGridSize)
        setFood({ r: rowPosition, c: colPosition });
    }

    const reStartGame = () => {

        setDirection("UP");
        setIsPlaying(false);
        setSnake(initialSnakePosition);
        setScore(0);
        setGameOverr(false);



    }



    useEffect(() => {

        console.log(direction);
        let interval = setInterval(updateBoard, 500);
        return () => clearInterval(interval, updateBoard);


    });

    useEffect(() => {
        document.addEventListener("keydown", updateDirection);
        return () => clearInterval("keydown", updateBoard);
    })

    return (



        <div>
            {gameOverr ? (<>

                <div className='con' >
                    <div className='score mb-5'>

                        <h1 style={{ color: "red" }}> Game Over !!!</h1>

                        <h1 style={{ color: "red" }}>Your Score : {yourScore}</h1>
                        <h1 style={{ color: "red" }}>Heigh Score : {highestScore}</h1>
                        <div className='mt-5'>
                            <button className='btn btn-primary' onClick={reStartGame}
                            > ReStart Game</button>
                        </div>
                    </div>

                    <footer className='mt-15'  style={{color:"white"}}>
                        <p>&copy; 2023  Danish Ansari.  </p>
                    </footer>

                  </div>

                </>):



                (<>
                    <div className='con' >
                        <div className='score mb-5'>
                            <h3> <b> Score : :  {score}</b> </h3>
                            <h3> <b> High Score :  {highestScore}</b> </h3>
                        </div>

                        <div className='boardd'> {Board()}
                        </div>

                        <footer className='mt-15'  style={{color:"white"}}>
                        <p>&copy; 2023  Danish Ansari.  </p>
                        </footer>
                    </div>

                  

                </>)}
            </div>


            )
}
