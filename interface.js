
import Player from "./Player.js";

function setUpGame(){
    let player1 = Player('player1','human')
    player1.setPieces()
    let player2 = Player('player2','human')
    player2.setPieces()
    
    setUpHeader()

    function setUpHeader(){
        let header = document.createElement('div')
        header.className = 'header'

        let playBtn = document.createElement('button')

        playBtn.innerText = 'Play'
        playBtn.className = 'play'

        let playCount = 0

        let p1Section = document.createElement('div')
        p1Section.append(
            Object.assign(document.createElement('p'),{
                innerText: player1.name
            })
        )
        let p2Section = document.createElement('div')
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
            
        })

        p2Section.append(
            Object.assign(document.createElement('p'),{
                innerText: player2.name
            })
        )

        p2Section.append(dropdown)
        header.append(p1Section)
        header.append(p2Section)
        header.append(playBtn)
        document.querySelector('body').append(header)

        playBtn.addEventListener('click',()=>{
            
            let count = 0
            let interval

            playCount+=1
            function changePlayer(){
                count+=1
                document.querySelector('.wait-modal').innerText = 
                    `${count}s of 5s to switch to ${player2.name}`
                if(count==5){ 
                    document.querySelector('.wait-modal').remove()
                    document.querySelector('body').innerHTML = ""
                    clearInterval(interval)
                }
            }
            
            if(playCount==1){
                setUpBoard(player1)
                document.querySelector('body').append(playBtn)
                header.remove()
            }else if(player2.getType()=='human' && playCount==2){
                setUpBoard(player2)
                document.querySelector('body').append(playBtn)
            }else if(player2.getType()=='computer' && playCount==2){

                player2.setPieces()
                document.querySelector('body').innerHTML = ""
                console.log(player1.getGb().getMap())
                console.log(player2.getGb().getMap())
                
            }else if(player2.getType()=='human' && playCount==3){
                interval = setInterval(changePlayer,1000)
                document.querySelector('body').append(
                    Object.assign(
                    document.createElement('div'),
                    {innerText: 
                    `${count}s of 5s to switch to ${player1.name}`,
                    className: 'wait-modal'}
                    )
                )
            }
            
        })

        
        
    }
    function setUpBoard(player){
        
        let initialX = null
        let initialY = null

        let shipOnDrag = null
        let cellX, cellY

        let currentX = null
        let currentY = null

        let playArea
        if(!document.querySelector('.play-area')){
            playArea = document.createElement('div')
            playArea.className = 'play-area'
            document.querySelector('body').append(playArea)
        }else{
            document.querySelector('.play-area').remove()
            playArea = document.createElement('div')
            playArea.className = 'play-area'
            document.querySelector('body').append(playArea)
        }
         
        
        

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
                    cell.classList.add('cell')
                    if(typeof map[i][j] == 'object'){
                        
                        cell.classList.add('clear')

                        cell.classList.add(typeOfBorder(player.getGb().getMap()[i][j],i,j))
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

function typeOfBorder(shipCell,i,j){
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


        makeGrid(player1, true)
        makeGrid(player2, false)
        function makeGrid(player, currPlayer){
            let grid = document.createElement('div')
            grid.className = 'grid'
            playArea.append(grid)
            for (let i= 0; index < 10; i++) {
                for (let i = 0; i < 10; i++) {
                    
                    let cell = document.createElement('div')
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
                    }


                }
            }
        }
        
    }  
}



setUpGame()
