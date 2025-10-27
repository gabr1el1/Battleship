import Ship from "./Ship.js";

export default function Gameboard(){
    const OPEN_SHOT = ' '
    const MISSED = 'missed'
    const CLOSED = 'closed'
    const HIT = 'hit'

    let sunkenShips = []

    let _map = []
    
    function getMap(){
        return _map
    }

    function initMap(){
        _map = [
        OPEN_SHOT.repeat(10).split(''),
        OPEN_SHOT.repeat(10).split(''),
        OPEN_SHOT.repeat(10).split(''),
        OPEN_SHOT.repeat(10).split(''),
        OPEN_SHOT.repeat(10).split(''),
        OPEN_SHOT.repeat(10).split(''),
        OPEN_SHOT.repeat(10).split(''),
        OPEN_SHOT.repeat(10).split(''),
        OPEN_SHOT.repeat(10).split(''),
        OPEN_SHOT.repeat(10).split(''),
    ]
    }

  

    function placeShip(initRow, initCol, ship, isShipVert){
        
        if(initRow<0 || initRow>9 || initRow<0 || initCol>9 ){
            return false
        }
        for (let i = 0; i < ship.length; i++) {
            if(isShipVert){
                if(initRow+i>9 || _map[initRow+i][initCol]!=OPEN_SHOT){
                    if(i==0){
                        return false
                    }
                    cleanLine(initRow, initCol,i-1,isShipVert)
                    return false
                }
                _map[initRow+i][initCol] = ship
            }else{
                if(initCol+i>9 || _map[initRow][initCol+i]!=OPEN_SHOT ){
                    if(i==0){
                        return false
                    }
                    cleanLine(initRow, initCol,i-1, isShipVert)
                    return false
                }
                _map[initRow][initCol+i] = ship
            }
        }
        ship.setPos(initRow, initCol, isShipVert)
        return true     
    }

    function cleanLine(initRow, initCol, length, isVert){
        for (let i = 0; i <= length; i++) {
            if(isVert){
                _map[initRow+i][initCol] = OPEN_SHOT
            }else{
                _map[initRow][initCol+i] = OPEN_SHOT
            }
        }
    }

    function receiveAttack(row,col){
        let pos = _map[row][col]
        if(pos==OPEN_SHOT){
            _map[row][col] = MISSED
        }else if(typeof pos == 'object'){
            _map[row][letrToNum[col]].hit()
            if(pos.isSunk()){
                sunkenShips.push(pos)
            }
            _map[row][col] = HIT
        }
    }

    function moveShip(ship, direction){
        let pos = ship.getPos()
        cleanLine(pos.initRow, pos.initCol,ship.length,ship.isVert)
        if(direction=='right'){
            if(pos.isVert){
                if(!placeShip(pos.initRow,pos.initCol+1,ship,pos.isVert)){
                    placeShip(pos.initRow, pos.initCol,ship,pos.isVert)
                }
            }else{
                if(!placeShip(pos.initRow,pos.initCol+1,ship,pos.isVert)){
                    placeShip(pos.initRow, pos.initCol,ship,pos.isVert)
                }
            }
        }else if(direction=='left'){
            if(pos.isVert){
                if(!placeShip(pos.initRow,pos.initCol-1,ship,pos.isVert)){
                    
                    placeShip(pos.initRow, pos.initCol,ship,pos.isVert)
                }
            }else{
                if(!placeShip(pos.initRow,pos.initCol-1,ship,pos.isVert)){
                    
                    placeShip(pos.initRow, pos.initCol,ship,pos.isVert)
                }
            }

        }else if(direction=='up'){
            if(pos.isVert){
                if(!placeShip(pos.initRow-1,pos.initCol,ship,pos.isVert)){
                    
                    placeShip(pos.initRow, pos.initCol,ship,pos.isVert)
                }
            }else{
                if(!placeShip(pos.initRow-1,pos.initCol,ship,pos.isVert)){
                    
                    placeShip(pos.initRow, pos.initCol,ship,pos.isVert)
                }
            }

        }else if(direction=='down'){
            if(pos.isVert){
                if(!placeShip(pos.initRow+1,pos.initCol,ship,pos.isVert)){
                    
                    placeShip(pos.initRow, pos.initCol,ship,pos.isVert)
                }
            }else{
                if(!placeShip(pos.initRow+1,pos.initCol,ship,pos.isVert)){
                    
                    placeShip(pos.initRow, pos.initCol,ship,pos.isVert)
                }
            }
        }      
    }

    function gameOver(){
        return sunkenShips.length == 10
    }

    return {placeShip, receiveAttack, 
        MISSED, CLOSED, HIT, sunkenShips,
        gameOver, getMap,
        moveShip, initMap}
    
}



