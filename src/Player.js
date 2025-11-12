import Gameboard from "./Gameboard.js"
import Ship from "./Ship.js"
import randInt from "./randInt.js"
export default function Player(name,type){

    let _gb = Gameboard()
    let _type = type
    let av_moves = []

    
    function _initMoves(){
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                av_moves[`${i}${j}`] = [i,j]
            }
            
    }
    }

    function setType(type){
        _type = type
    }

    function getType(){
        return _type
    }

    function setMove(row,col){
        delete av_moves[`${row}${col}`]
    }

    function getMoves(){
        return av_moves
    }



    function setPieces(){
        _gb.initMap()
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
        if(_type=='human'){    
            _gb.placeShip(2,0,ships[0],false)

            _gb.placeShip(1,3,ships[1],false)

            _gb.placeShip(0,9,ships[2],false)
            
            _gb.placeShip(3,5,ships[3],true)

            _gb.placeShip(4,1,ships[4],true)

            _gb.placeShip(6,3,ships[5],false)

            _gb.placeShip(4,9,ships[6],true)

            _gb.placeShip(7,9,ships[7],false)

            _gb.placeShip(8,1,ships[8],false)
            
            _gb.placeShip(9,3,ships[9],false)    
        }else if(_type=='computer'){
            let i = 0
            while(i<=9){
                
                const x = randInt(0,9)
                const y = randInt(0,9)
                const isVertical = Math.random() < 0.5
                const goodPlace = _gb.placeShip(x,y,ships[i],isVertical)
                //console.log(`x: ${randX} y: ${randY}, length: ${ships[i].length} vertical: ${isVertical} good: ${goodPlace}`)
                if(goodPlace){
                    i+=1
                }
            }
        }
    }  

    function getGb(){
        return _gb
    }

    _initMoves()
    return {getGb, name, setPieces, 
        setType,getType, setMove,
        getMoves}
}