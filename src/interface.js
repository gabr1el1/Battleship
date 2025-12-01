
import {Human, Computer} from "./Player.js";
import typeOfBorder from "./typeOfBorder.js";
import playTurn from "./playTurn.js";
import ModalNext from "./ModalNext.js";

export default function setUpGame(){
    let player1 = Human('player1','human')
    let player2 = Human('player2','human')
    setUpMenu(player1, player2)   
}

function setUpMenu(player1,player2){
    
    let typeP2
    let menu = document.createElement('div')
    menu.className = 'menu'

    let playBtn = document.createElement('button')
    playBtn.className = 'play'

    playBtn.append(
        Object.assign(document.createElement('img'),
        {src:'../assets/play-arrow.svg', alt:'Play'})
    )
    let playCount = 0

    let p1Section = document.createElement('div')
    p1Section.append(
        Object.assign(document.createElement('p'),{
            innerText: player1.getName()
        })
    )
    let p2Section = document.createElement('div')
    let form = Object.assign(
            document.createElement('form'),
            {id:'form-type-player'}
        )
    
    let option1 = document.createElement('div')
    option1.append(
        Object.assign(document.createElement('input'),
        {checked:'true',name:'type',id:'human', type:'radio',value:'human'}),
        Object.assign(document.createElement('label'),
        {htmlFor:'human',innerText:'Human'})
    )
    
    let option2 = document.createElement('div')
    option2.append(
        Object.assign(document.createElement('input'),
        {name:'type',id:'computer',type:'radio',value:'computer'}),
        Object.assign(document.createElement('label'),
        {htmlFor:'computer',innerText:'Computer'})
    )

    form.append(option1,option2)

    p2Section.append(
        Object.assign(document.createElement('p'),{
            innerText: player2.getName()
        })
    )

    p2Section.append(form)
    let playersSec = document.createElement('div')
    playersSec.setAttribute('id','players-sec')
    playersSec.append(p1Section,p2Section)
    menu.append(playersSec)
    
    menu.append(playBtn)
    document.querySelector('body').append(
        Object.assign(document.createElement('div'),
        {className:'game-title', innerText: 'BATTLESHIP'})
    )
    
    document.querySelector('body').append(menu)

    playBtn.addEventListener('click',()=>{ 
        let count = 0
        let interval

        playCount+=1
        
        if(playCount==1){
            player1.setPieces()
            typeP2 = document.querySelector('input[name="type"]:checked').value
            if(typeP2=='computer'){
                player2 = Computer('player2','computer')
            }
            setUpBoard(player1, playBtn)
            document.querySelector('.play-area').append(playBtn)
            menu.remove()   
        }else if(player2.getType()=='human' && playCount==2){
            player2.setPieces()
            setUpBoard(player2, playBtn)
            document.querySelector('.play-area').append(playBtn)
        }else if(player2.getType()=='computer' && playCount==2){
            player2.setPieces()
            playTurn(player1,player2)
           
        }else if(player2.getType()=='human' && playCount==3){
            let modal = ModalNext(()=>{
                playTurn(player1,player2)

            },`Turn to ${player1.getName()}!`)

            document.body.append(modal)
            
            setTimeout(()=>document.querySelector('.next-modal').classList.add('active'),0)

            //document.querySelector('.next-modal').classList.add('active')
           
           
            //console.log(player1.getGb().getMap())
            //console.log(player2.getGb().getMap())
        }
    }) 
}

function setUpBoard(player, playBtn){  
        let initialX = null
        let initialY = null

        let shipOnDrag = null
        let cellX, cellY

        let currentX = null
        let currentY = null

        initBoard(player,true)
        function initBoard(player, setUp){
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
            let playerInfo = document.createElement('h1')
            playerInfo.innerText = player.getName()
            playArea.append(playerInfo)

            let grid = document.createElement('div')
            grid.className = 'grid'
            
            playArea.append(grid) 
            playArea.append(playBtn) 
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

setUpGame()
