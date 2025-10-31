export default function showGameOver(winnerName){

    const modalGameOver = Object.assign(
        document.createElement('div'),
        {className:"game-over-modal"})
    modalGameOver.append(
        Object.assign(
            document.createElement('div'),
            {innerText:`${winnerName} wins!`}),
        Object.assign(
            document.createElement('button'),
            {innerText:'Restart',onclick:()=>{setUpGame()}})
    )
    document.querySelector('body').append(modalGameOver)
}