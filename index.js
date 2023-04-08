let playerText= document.getElementById("playerText");
let resetButton=document.getElementById("resetButton");
let boardBoxes= Array.from(document.getElementsByClassName("board")); //we can use "array from" o the response that brings resonse similar to array
let wonText=document.getElementById('playerWon');
console.log( boardBoxes)

//use css style in JS
let winningBox=getComputedStyle(document.body).getPropertyValue("--winning-blocks")

const player1="X", player2="O";
let currentPlayer=player1;
let spaces=Array(9).fill(null)
console.log("spaces, ",spaces)

const startGame=()=>{
    boardBoxes.forEach((box)=>box.addEventListener('click', boxClicked))    
}
let count=0;
let image=document.getElementsByTagName('img');

function boxClicked(e){
    console.log("target", e.target)
    const id=e.target.id;
    //check if spaces array at that id is null
    if(!spaces[id]){
        spaces[id]=currentPlayer
        e.target.innerText=currentPlayer
        
        if(playerHasWon()!=false){
            c=0;
            if(currentPlayer=='X')
            {wonText.innerText='Player X has won!!!'}
            else{
                wonText.innerText='Player O has won!!!'
            }
            let winning_blocks=playerHasWon()
            winning_blocks.map(box=>boardBoxes[box].style.background=winningBox)
            for(let i=0;i<image.length;i++){
            document.getElementsByTagName('img')[i].style.width='100px'
            document.getElementsByTagName('img')[i].style.height='100px'
            }           
            setTimeout(ResetButtonClicked, 3000)
            return;
            
        }
        console.log("c",count);
        count=count+1;
        if(count==9){
            wonText.innerText='It is a draw!!!'
        }

        currentPlayer= currentPlayer==player1?player2:player1    
    }
}

const winningCombos=[
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
]
function playerHasWon(){
   for (const iterator of winningCombos) {
    [a,b,c]=iterator;
    if(spaces[a]&&spaces[a]==spaces[b]&&spaces[a]==spaces[c])
    {
        return([a,b,c]);
    }
   }
   return(false)

}

//add event listener to reset button which will call the reset button function
resetButton.addEventListener('click',ResetButtonClicked)

function ResetButtonClicked(){
    //will empty the array, remove the element on the board and will reassign the current player
    spaces.fill(null)
    boardBoxes.forEach(box=>{box.innerText=''
    box.style.background=''})
    currentPlayer=player1;
    count=0;
    wonText.innerText=''
    for(let i=0;i<image.length;i++){
        document.getElementsByTagName('img')[i].style.width='0px'
        document.getElementsByTagName('img')[i].style.height='0px'
        }
}

startGame()