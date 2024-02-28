const X_CLASS='x';
const CIRCLE_CLASS='circle';
const WINNING_COMBINATIONS=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const celElements=document.querySelectorAll('[data-cell')
const board=document.getElementById('board')
const winningMsgElement=document.getElementById('winning-msg')
const reStart=document.getElementById('restartbtn')
const winningMsgTextElement=document.querySelector('[data-winning-msg-txt]')
let circleTurn

startGame()

reStart.addEventListener('click', startGame)

function startGame(){
    circleTurn=false
    celElements.forEach(cell =>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click',handleClick)
    cell.addEventListener('click',handleClick,{once :true})
})
setBoardhoverClass()
winningMsgElement.classList.remove('show')
}



function handleClick(e){
    const cell=e.target
    const currentClass=circleTurn? CIRCLE_CLASS: X_CLASS
    placeMark(cell,currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    }
    else if(isDraw()){
        endGame(true)
    }
    else{
    swapTurns()
    setBoardhoverClass()
    }
    // switch turns

}

function endGame(draw){
    if(draw){
        winningMsgTextElement.innerText='Draw!'
    }
    else{
        winningMsgTextElement.innerText=`${circleTurn ? "0's " : "X's "}wins!`
    }
    winningMsgElement.classList.add('show')
}

function isDraw()
{
    return[...celElements].every(cell =>{
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })
}
function placeMark(cell,currentClass){
    cell.classList.add(currentClass)
}
function swapTurns(){
    circleTurn=!circleTurn
}

function setBoardhoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }
    else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination =>{
        return combination.every(index =>{
            return celElements[index].classList.contains(currentClass)
        })
    })
}