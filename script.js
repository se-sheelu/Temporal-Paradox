const boxes = document.querySelectorAll(".box");
const PlayerInfo = document.querySelector(".player-info");
const newGameBtn = document.querySelector(".btn");

let currPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// let create a function to initialize game

function initGame(){
    currPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // UI par empty kro
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // initialize box with css property again
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    PlayerInfo.innerText = `Current Player - ${currPlayer}`;
}

initGame();

function swapTurn(){
    if(currPlayer === "X")
    {
        currPlayer = "O";
    }
    else{
        currPlayer = "X";
    }
    // UI update
    PlayerInfo.innerText = `Current Player - ${currPlayer}`;
}

function checkGameOver(){
    let winner = "";

    winningPositions.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]))
        {
            // check winner
            if(gameGrid[position[0]] === "X")
                winner = "X";
            else
            {
                winner = "O";
            }

            // disable pointer event
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            // now we know X/O is winner
            boxes[position[0]].classList.add("win")
            boxes[position[1]].classList.add("win")
            boxes[position[2]].classList.add("win")

        }

        // it means we have winner
        if(winner !== "")
        {
            PlayerInfo.innerText = `Winner Player - ${winner}`;
            newGameBtn.classList.add("active");
            return;
        }

        // check is there TIE
        let fillCount = 0;
        gameGrid.forEach((box) => {
            if(box !== "")
            {
                fillCount++;
            }
        });

        // board is filled , game is TIE
        if(fillCount === 9)
        {
            PlayerInfo.innerText = "Game TIED !";
            newGameBtn.classList.add("active");
        }
    })
}

function handleClick(index){
    if(gameGrid[index] === "")
    {
        boxes[index].innerText = currPlayer;
        gameGrid[index] = currPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap turn
        swapTurn();
        // check is game over
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);