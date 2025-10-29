import Player from "./Player.js";


function setUpGame(){
    const player1 = Player('player1','human')
    player1.setPieces()
    const player2 = Player('player2','human')
    player2.setPieces()

    let readyCount = 0
    let body =  document.querySelector('body')

    let header = document.createElement('div')
    
    let playArea = document.createElement('div')

    header.className = 'header'
    playArea.className = 'play-area'

    let playBtn = document.createElement('button')

    playBtn.innerText = 'Play'
    playBtn.className = 'play'

    playBtn.addEventListener('click',()=>{
        readyCount+=1
        if(readyCount==2){
            console.log(player1.getGb().getMap());
            console.log(player2.getGb().getMap());
            document.querySelector('.header').remove()
            document.querySelector('.play-area').remove()
            playTurn(player1,player2)
        }
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

        initBoard(player,true)

        function initBoard(player, setUp){
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
                    
                    let map = player.getGb().getMap()
                    
                    if(typeof map[i][j] == 'object'){
                        cell.classList.add('ship')
                        cell.classList.add('clear')

                        cell.classList.add(typeOfCell(player.getGb().getMap()[i][j],i,j))
                        if(setUp){
                            cell.addEventListener('mousedown',(event)=>{

                                cellX = event.target.dataset.row
                                cellY = event.target.dataset.col

                                initialX= event.clientX
                                initialY = event.clientY

                                currentX = initialX
                                currentY = initialY

                                shipOnDrag = map[cellX][cellY]
                                cell.addEventListener('drag',onDrag)   
                            })

                        cell.addEventListener('dragend',()=>{
                            initBoard(player,true)

                        })
                        }
                        
                    }else{
                        
                        cell.classList.add('open')
                    }

                    grid.append(cell)

                    
                    
                }
            }
        }

        document.addEventListener('dragover',(event)=>{
            event.preventDefault()
        })

        function onDrag(event){
            
            currentX = event.clientX
            currentY = event.clientY
            
            if(currentX > initialX && currentX - initialX > 45){
                initialX = currentX
                player.getGb().moveShip(shipOnDrag,'right')
                console.log('right')
                initBoard(player,false)
                
                
            }else if(currentX < initialX && currentX - initialX < -45){
                initialX = currentX
                player.getGb().moveShip(shipOnDrag,'left')
                console.log('left')
                initBoard(player,false)
               
            }else if(currentY < initialY && currentY - initialY < -45){
                initialY = currentY
                player.getGb().moveShip(shipOnDrag,'up')
                console.log('up')
                initBoard(player,false)
               
            }else if(currentY > initialY && currentY - initialY > 45){
                initialY = currentY
                player.getGb().moveShip(shipOnDrag,'down')
                console.log('down')
                initBoard(player,false)
            }
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

function playTurn(player1,player2){
    
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

        if(player1.getType()=="human" && player2.getType()=="human"){
            makeGrid(player1,false)
            makeGrid(player2,true)
        }

        function makeGrid(player,currPlayer){
            let grid = document.createElement('div')
            grid.className = 'grid'
            playArea.append(grid)
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                    let cell = document.createElement('div')
                    cell.dataset.row = i
                    cell.dataset.col = j

                    let map = player.getGb().getMap() 
                    
                    if(map[i][j]==player.getGb().OPEN_SHOT){
                        cell.classList.add('open')  
                        if(!currPlayer){
                            cell.addEventListener('click',()=>{
                                player.getGb().getMap().receiveAttack(i,j)
                                cell.classList.add('missed')
                            })
                        } 
                    }else if(map[i][j]==player.getGb().MISSED){
                        cell.classList.add('missed')
                    }else if(typeof map[i][j] == 'object'){
                        if(currPlayer){
                            cell.classList.add('ship')
                            cell.classList.add(
                            typeOfCell(map[i][j],i,j))
                            cell.classList.add(map[i][j].getPosStatus(i,j))
                        }else{
                            
                        }
                        

                    }
                    
                }
            }
        }
        
    }  
}



setUpGame()