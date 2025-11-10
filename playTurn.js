import randInt from "./randInt.js";
import showGameOver from "./showGameOver.js";
import typeOfBorder from "./typeOfBorder.js";
export default function playTurn(player1,player2){
    
    
    document.querySelectorAll('.play-area').forEach(element => {
        element.remove()
    });

    document.querySelector('body').className = 'playing'
    let playA1 = Object.assign(document.createElement('div'),
            {className:'play-area'})
    let playA2 = Object.assign(document.createElement('div'),
            {className:'play-area'})

    let playerInfo1 = document.createElement('h1')
    playerInfo1.innerText = player1.name

    let playerInfo2 = document.createElement('h1')
    playerInfo2.innerText = player2.name  
    playA1.append(playerInfo1)
    playA2.append(playerInfo2)
    document.querySelector('body').append(
    playA1, playA2)  
    
    let grid1 = Object.assign(
    document.createElement('div'),
    {className:'grid'})

    let grid2 = Object.assign(
        document.createElement('div'),
        {className:'grid'})

    playA1.append(grid1)    
    playA2.append(grid2) 
    
    fillGrid(grid1, player1, true)
    fillGrid(grid2, player2, false)
    
    if(player1.getType()=='computer'){  
        
        const keys = Object.keys(player1.getMoves())
        const randInd = keys[randInt(0,keys.length)]
        const randKey = keys[randInd]
        const randMove = player1.getMoves()[randKey]
        const randRow = randMove[0]
        const randCol = randMove[1]
        player2.setMove(randRow,randCol)
        
        if(player2.getGb().receiveAttack(randRow,randCol)
        ==player2.getGb().HIT){
            
            if(player1.gameOver()){
                showGameOver()
            }else{
                
                grid2.querySelector(`div[data-row="${randRow}"]
                [data-col="${randCol}"]`).classList.add('hit')

                setTimeout(()=>{
                    fillGrid(grid2, player2, false)
                },3000)
            }
        }
        
    }  


    function fillGrid(grid, player, currPlayer){
        grid.innerHTML = ""
        for (let i= 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                
                let cell = document.createElement('div')
                cell.dataset.row = i
                cell.dataset.col = j
                let gb = player.getGb()
                let map = gb.getMap()
                let pos = map[i][j]

                cell.classList.add('cell')
                
                if(currPlayer && player.getType()=='computer'){
                    if(pos==gb.OPEN_SHOT){
                        cell.classList.add('open')
                    }else if(pos==gb.MISSED){
                        cell.classList.add('missed')
                    }else if(typeof pos == 'object'){
                        cell.classList.add(pos.getPosStatus(i,j))
                        if(pos.isSunk()){ 
                            cell.classList.add(typeOfBorder(pos))
                        }
                    }
                }else if(currPlayer && player.getType()=='human'){
                    if(pos==gb.OPEN_SHOT){
                        cell.classList.add('open')
                    }else if(pos==gb.MISSED){
                        cell.classList.add('missed')
                    }else if(typeof pos == 'object'){
                        cell.classList.add(pos.getPosStatus(i,j))
                        cell.classList.add(typeOfBorder(pos,i,j))
                    }
                }else if(!currPlayer){
                    if(pos==gb.OPEN_SHOT){
                        cell.classList.add('open')
                        if(player2.getType()=='human'){
                            cell.addEventListener('click',()=>{
                                let count = 0   
                                let interval  
                                let modal
                                cell.classList.remove('open')
                                cell.classList.add(gb.receiveAttack(i,j))
                                grid.classList.add('playing')
                                
                                setTimeout(()=>{
                                    interval = setInterval(changePlayer,1000)
                                    modal = Object.assign(document.createElement('div'), {
                                        className: 'wait-modal', innerText:`${count}s of 5s to switch to ${player1.name}`
                                    })
                                document.querySelector('body').append(modal)
                                },3000)
                                

                                function changePlayer(){
                                    if(count==5){
                                        clearInterval(interval)
                                        modal.remove()
                                        playTurn(player2, player1)   
                                    }else{
                                        count+=1
                                        modal.innerText = `${count}s of 5s to switch to ${player1.name}`
                                    }
                                
                                }

                                
                        })
                        }
                       
                        
                    }else if(pos==gb.MISSED){
                        cell.classList.add('missed')
                    }else if(typeof pos == 'object'){
                        if(pos.getPosStatus(i,j)==gb.HIT){
                            cell.classList.add('hit')
                            if(pos.isSunk() || player1.getType()=='computer'){
                                cell.classList.add(typeOfBorder(pos,i,j))
                            }
                        }else if(pos.getPosStatus(i,j)==gb.CLEAR){
                            cell.classList.add('open')
                            if(player1.getType()=='human'){
                                cell.classList.add(typeOfBorder(pos,i,j))
                                
                                cell.addEventListener('click',()=>{
                                    cell.classList.remove('clear')
                                    cell.classList.add(gb.receiveAttack(i,j))
                                    grid.classList.add('playing')
                                    if(!gb.gameOver()){
                                        
                                        setTimeout(()=>{
                                            grid.classList.remove('playing')
                                            playTurn(player1, player2)
                                        },3000)
                                    }else{
                                        showGameOver()
                                    }
                                }) 
                            }   
                        }
        
                    }
                }
                grid.append(cell)
            }
        }
    }
}

