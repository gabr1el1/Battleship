import randInt from "./randInt.js";
import showGameOver from "./showGameOver.js";

export default function playTurn(player1,player2){
    
    let playArea
    setUp()
    showBoards(player1, player2)

    function setUp(){
        
        if(document.querySelector('.play-area')){
            document.querySelector('.play-area').remove()
        }
        playArea = document.createElement('div')
        playArea.className = 'play-area'
        document.querySelector('body').append(playArea)   
    }

    function showBoards(player1, player2){

        let grid1 = Object.assign(
            document.createElement('div'),
            {className:'grid'})

        let grid2 = Object.assign(
            document.createElement('div'),
            {className:'grid'})

        playArea.append(grid1,grid2)    
        
        makeGrid(grid1, player1, true)
        makeGrid(grid2, player2, false)

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
                        makeGrid(grid2, player2, false)
                    },3000)
                }
            }
            
        }


        function makeGrid(grid, player, currPlayer){
            grid.innerHTML = ""
            
            for (let i= 0; index < 10; i++) {
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
                            cell.addEventListener('click',()=>{
                                
                                cell.classList.remove('open')
                                cell.classList.add(gb.receiveAttack(i,j))
                                setTimeout(()=>{
                                    playTurn(player2, player1)
                                },3000)
                                
                            })
                            
                        }else if(pos==gb.MISSED){
                            cell.classList.add('missed')
                        }else if(typeof pos == 'object'){
                            if(pos.getPosStatus(i,j)==pos.HIT){
                                cell.classList.add(pos.HIT)
                                if(pos.isSunk() || player1.getType()=='human'){
                                    cell.classList.add(typeOfBorder(pos,i,j))
                                }
                                cell.classList.add(pos.HIT)
                            }else if(pos.getPosStatus(i,j)==pos.CLEAR){
                                cell.classList.add(pos.CLEAR)
                                if(player1.getType()=='human'){
                                    cell.classList.add(typeOfBorder(pos,i,j))
                                    
                                    cell.addEventListener('click',()=>{
                                        cell.classList.add(gb.receiveAttack(i,j))
                                        cell.classList.remove('clear')
                                        if(!gb.gameOver()){
                                            
                                            setTimeout(()=>{
                                            
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
}