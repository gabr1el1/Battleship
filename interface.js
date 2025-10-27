import Player from "./Player.js";


function setUpGame(){
    const player1 = Player('player1','human')
    player1.setPieces()
    const player2 = Player('player2','human')

    let body =  document.querySelector('body')

    let header = document.createElement('div')
    
    let playArea = document.createElement('div')

    header.className = 'header'
    playArea.className = 'play-area'

    let playBtn = document.createElement('button')

    playBtn.innerText = 'Play'
    playBtn.className = 'play'

    playBtn.addEventListener('click',()=>{
        let dropdown = Object.assign(
            document.createElement('select'),
            {id:'select-type-player'}
        )
        let option1 = Object.assign(
            document.createElement('option'),
            {value:'human',textContent:'Human'})
        let option2 = Object.assign(
            document.createElement('option'),
            {value:'computer',textContent:'Computer'})
        dropdown.append(option1,option2)

        dropdown.addEventListener('change',(e)=>{
            player2.setType(e.target.value)
            player2.setPieces()
            setUpBoard(player2)
        })
        header.append(dropdown)
        player2.setPieces()
        setUpBoard(player2)
    })
    
    
    header.append(playBtn)
    body.append(header)
    body.append(playArea)

    setUpBoard(player1)
   
    
    function setUpBoard(player){
        
        let initialX = null
        let initialY = null

        let shipOnDrag = null
        let cellX, cellY

        let currentX = null
        let currentY = null
        
        function onDrag(event){
            
            currentX = event.clientX
            currentY = event.clientY
            
            console.log(currentX,initialX)
            if(currentX > initialX && currentX - initialX > 35){
                initialX = currentX
                player.getGb().moveShip(shipOnDrag,'right')
                console.log('right')
                event.target.removeEventListener('drag',onDrag)
                initBoard(player)
                
            }else if(currentX < initialX && currentX - initialX < -35){
                initialX = currentX
                player.getGb().moveShip(shipOnDrag,'left')
                console.log('left')
                event.target.removeEventListener('drag',onDrag)
                initBoard(player)
               
            }else if(currentY < initialY && currentY - initialY < -35){
                initialY = currentY
                player.getGb().moveShip(shipOnDrag,'up')
                console.log('up')
                event.target.removeEventListener('drag',onDrag)
                initBoard(player)
               
            }else if(currentY > initialY && currentY - initialY > 35){
                initialY = currentY
                player.getGb().moveShip(shipOnDrag,'down')
                console.log('down')
                event.target.removeEventListener('drag',onDrag)
                initBoard(player)
            } 
        }

        initBoard(player)

        function initBoard(player){
            playArea.innerHTML = ""
            let playerInfo = document.createElement('h1')
            playerInfo.innerText = player.name
            playArea.append(playerInfo)

            let grid = document.createElement('div')
            grid.className = 'grid'
            
            
            
            playArea.append(grid) 
            
           
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                    let cell = document.createElement('div')
                    cell.dataset.row = i
                    cell.dataset.col = j
                    
                    
                    if(typeof player.getGb().getMap()[i][j] == 'object'){
                        cell.classList.add('ship')
                        cell.classList.add(typeOfCell(player.getGb().getMap()[i][j],i,j))
                        cell.addEventListener('mousedown',(event)=>{

                            cellX = event.target.dataset.row
                            cellY = event.target.dataset.col

                            initialX= event.clientX
                            initialY = event.clientY

                            currentX = initialX
                            currentY = initialY

                            shipOnDrag = player.getGb().getMap()[cellX][cellY]
                            cell.addEventListener('drag',onDrag)   
                        })

                        cell.addEventListener('dragend',()=>{
                            console.log('end');
                            
                        })

                        
 
                    }else{
                        
                        cell.classList.add('cell')
                    }

                    grid.append(cell)

                    
                    
                }
            }

            
        }


    function typeOfCell(shipCell,i,j){
        let pos = shipCell.getPos()
        let finalRow = pos.isVert ? 
        pos.initRow + shipCell.length - 1 : pos.initRow
        let finalCol = pos.isVert ? 
        pos.initCol : pos.initCol + shipCell.length - 1

        
        if(shipCell.length==1){
            return 'complete'
        }else if(pos.initRow == i && pos.initCol == j){
            if(pos.isVert){
                return 'init-vert'
            }else{
                return 'init-horiz'
            }
        }else if(i!==finalRow || j!==finalCol){
            if(pos.isVert){
                return 'middle-vert'
            }else{
                return 'middle-horiz'
            }
        }else if(i==finalRow && j==finalCol){
            if(pos.isVert){
                return 'final-vert'
            }else{
                return 'final-horiz'
            }
        }

    }          
    }
}


setUpGame()