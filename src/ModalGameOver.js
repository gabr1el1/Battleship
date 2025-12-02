import setUpGame from "./interface.js"

export default function ModalGameOver(winnerName){

    const modalGameOver = Object.assign(
        document.createElement('div'),
        {className:"game-over-modal modal"}
    )

    let restartBtn = Object.assign(
        document.createElement('button'),
        {className:'restart', onclick: setUpGame}
    )

    restartBtn.append(
        Object.assign(document.createElement('img'),
        {src:'assets/restart-arrow.svg', alt:'Restart game'})
    )
    
    modalGameOver.append(
        Object.assign(
        document.createElement('p'),
        {innerText:`${winnerName} wins!`}),
        restartBtn
    )

    return modalGameOver
}