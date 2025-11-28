import Gameboard from "./Gameboard.js"
import Ship from "./Ship.js"
import randInt from "./randInt.js"
function Player(name,type){

    let _gb = Gameboard()
    _gb.initMap()

    function getName(){
        return name
    }
    function getType(){
        return type
    }
    
    function getGb(){
        return _gb
    }

    return { getName, getType, getGb }
}

function Human(name,type){
    const player = Player(name,type)

    function setPieces(){
        
        let ships = [
            Ship(1),
            Ship(4),
            Ship(1),
            Ship(2),
            Ship(3),
            Ship(3),
            Ship(2),
            Ship(1),
            Ship(1),
            Ship(2)
        ]
          
        player.getGb().placeShip(2,0,ships[0],false)

        player.getGb().placeShip(1,3,ships[1],false)

        player.getGb().placeShip(0,9,ships[2],false)
        
        player.getGb().placeShip(3,5,ships[3],true)

        player.getGb().placeShip(4,1,ships[4],true)

        player.getGb().placeShip(6,3,ships[5],false)

        player.getGb().placeShip(4,9,ships[6],true)

        player.getGb().placeShip(7,9,ships[7],false)

        player.getGb().placeShip(8,1,ships[8],false)
        
        player.getGb().placeShip(9,3,ships[9],false)    
    }  

    return Object.assign({},player,{setPieces})
}


function Computer(name, type){
    const player = Player(name,type)

    let _av_open = {}

    function setPieces(){
        player.getGb().initMap()
        let ships = [
            Ship(1),
            Ship(4),
            Ship(1),
            Ship(2),
            Ship(3),
            Ship(3),
            Ship(2),
            Ship(1),
            Ship(1),
            Ship(2)
        ]
        let i = 0
        while(i<=9){
            const x = randInt(0,9)
            const y = randInt(0,9)
            const isVertical = Math.random() < 0.5
            const goodPlace = player.getGb().placeShip(x,y,ships[i],isVertical)
            //console.log(`x: ${randX} y: ${randY}, length: ${ships[i].length} vertical: ${isVertical} good: ${goodPlace}`)
            if(goodPlace){
                i+=1
            }
        }
    }  

    function _initOpen(){
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                _av_open[`${i}${j}`] = [i,j]
            }    
        }
    }

    function useOpen(i,j){
        delete _av_open[`${i}${j}`]
    }

    function getOpen(){
        return _av_open
    }
  
    _initOpen()
    
    return Object.assign({},player,
    {setPieces, useOpen, getOpen})
}

export {Human, Computer}