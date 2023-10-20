import React, { useEffect, useState } from 'react'
import pageCSS from './pageCSS.css'

export default function Page() {

    let totalGridSize=20;
                              //  r:10               c: 10                  r : 1      c:10
    let initialSnakePosition = [{r:totalGridSize/2 , c:totalGridSize/2} ,{r:totalGridSize/2+1 , c:totalGridSize/2},
    {r:totalGridSize/2+2 , c:totalGridSize/2},{r:totalGridSize/2+2 , c:totalGridSize/2+1},{r:totalGridSize/2+2 , c:totalGridSize/2+2}

];

//let initialSnakePosition = [{r:0 , c:1} ]

    const [food ,setFood]=useState({r:5,c:5});
    const [snake ,setSnake]=useState(initialSnakePosition);
    const [direction , setDirection ] =useState('LEFT');
    const [score , setScore] = useState(0);
    const [gameOverr , setGameOverr]=useState(false);
    const [yourScore ,setYourscore] =useState(0);
    const [highestScore , setHighestScore] =useState(0);


  function gameOver()
  {
       const ys= score;
        setYourscore(ys);
        setGameOverr(true)
        console.log(score);
        if(highestScore < score)
        {
           // console.log("setting ");
            localStorage.setItem("heigh" , score);

        }

        setHighestScore(+localStorage.getItem("heigh"))  ;
    
  }

    function Board()
    {
          let  cellArrac  =[];
           for(let row=0;row <totalGridSize; row++)
           {
              for(let col=0 ;col <totalGridSize; col++)
              {
                   let cellName="cell";
                   let isSnake = snake.some(ele => ele.r===row && ele.c===col); 
                   // snake is an arrac we use some function it return true and flase if object is present

                   if(isSnake){
                    cellName+="snake"; 
                   }

                   let isSnakeHead= snake[0].r===row && snake[0].c=== col;

                   if(isSnakeHead)
                   cellName+="snakeHead"; 

                   let isFood = (food.r=== row && food.c===col);
                   if(isFood){
                      cellName+="food"; console.log("cellfood ");
                   }
                   
                   let singleBlock = <div className={cellName} kec={`${row}-${col}`} > </div>  // 0-0 0-1 0-2 0-3 0-4 0-5 06 07 08 09 0-10 
                   // 
                   //10 11 12 13 14 15 16 17 18 19 
                   cellArrac.push(singleBlock);
              }
           }
 

  
      return cellArrac;
        
    }

    function updateBoard()
    {
        if(snake[0].r <0 || snake[0].r>20  || snake[0].c <0 || snake[0].c >20 )
        {
            gameOver();
            return ;
        }

        if(snake.slice(1).some(ele=>ele.r===snake[0].r && ele.c===snake[0].c)){
            gameOver();
            return ;
        }
        let newState =[...snake];// 10 8 , 10,9  ,10 10 , 11 10 , 12 10 
        switch(direction)
        {
            case "LEFT" :
                 newState.unshift({r: newState[0].r , c:newState[0].c-1});
                  break;
                
            case "RIGHT" :
                newState.unshift({r: newState[0].r , c:newState[0].c+1});
            break;
            case "UP" :
                newState.unshift({r: newState[0].r-1 , c:newState[0].c});
            break;
            case "DOWN" :
                newState.unshift({r: newState[0].r+1 , c:newState[0].c});
            break;
                
        }
        
        if(newState[0].r ===food.r && newState[0].c===food.c)  
        {
            setScore(prev=>prev+1);
             createNewFood()

        }
            
        else
           newState.pop();
        setSnake(newState); 
    }

    
  function updateDirection(e) {
    let cc =e.code;
    switch(cc)
    {
        case "ArrowUp":
            if( direction!="DOWN") setDirection('UP');
            break;
        case "ArrowDown":
            if( direction!="UP") setDirection('DOWN');
            break;
        case "ArrowLeft":
            if( direction!="RIGHT") setDirection('LEFT');
            break;
        case "ArrowRight":
            if( direction!="LEFT") setDirection('RIGHT');
            break;
         
    }

  }

   const createNewFood =()=>{
        
    let rowPosition =Math.floor(Math.random() *totalGridSize)
    let colPosition =Math.floor(Math.random() *totalGridSize)
    setFood({r:rowPosition ,c:colPosition});
   }

   const reStartGame =()=>{

  
    setSnake(initialSnakePosition);
    setScore(0);
    setGameOverr(false);

    console.log("gett ", +localStorage.getItem("heigh"));

   }



    useEffect(()=>{

      let interval=  setInterval(updateBoard ,500);
      return()=>clearInterval(interval ,updateBoard);
      if(localStorage.getItem("heigh")== null ||localStorage.getItem("high")==   undefined)
      {
         localStorage.setItem("heigh" , 0);
      }
      else{
         
          
           setHighestScore(+localStorage.getItem("heigh"))  ;
         //  console.log("gett ", +localStorage.getItem("heigh"));
      }
    })

    useEffect(()=>{
        document.addEventListener("keydown" ,updateDirection);
        return()=>clearInterval("keydown" ,updateBoard);
    })

  return (
   
   

    <div>
            {gameOverr ? (<>

                <div  className='con' >
                 <div  className='score mb-5'>
                     
                     <h1 style={{color:"red"}}> Game Over !!!</h1>

                      <h1 style={{color:"red"}}>Your Score : {yourScore}</h1>
                      <h1 style={{color:"red"}}>Heigh Score : {highestScore}</h1>
                      <div className='mt-5'> 
                        <button  className='btn btn-primary'  onClick={reStartGame}
                        > ReStart Game</button>
                      </div>
                 </div>
         
                 <div className='boardd'> {}
                 </div>
                 </div>
         
           
        
           </>):
               
        
          
          (<>
              <div  className='con' >
                 <div  className='score mb-5'>
                     Score :<span> :  {score}</span> 
                     <span>High Score :  {highestScore}</span>
                 </div>
         
                 <div className='boardd'> {Board()}
                 </div>
                 </div>
          
          </>)}
    </div>

    
  )
}
