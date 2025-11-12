export default function Gameboard(){
    const OPEN_SHOT = 'open'
    const MISSED = 'missed'
    const HIT = 'hit'
    const CLEAR = 'clear'

    let sunkenShips = 0
    let _map
    
    function getMap(){
        return _map
    }

    function initMap(){
        _map = []
        for (let i = 0; i < 10; i++) {
            let temp = []
            for (let j = 0; j < 10; j++) {
                temp.push(OPEN_SHOT)  
            }
            _map.push(temp)
            
        }
    }

    function placeShip(initRow, initCol, ship, isShipVert){
        if(initRow<0 || initRow>9 || initRow<0 || initCol>9 ){
            return false
        }
        if(isShipVert && initRow + ship.length - 1 > 9){
            return false
        }else if(!isShipVert && initCol + ship.length - 1 > 9){
            return false
        }

        for (let i = 0; i < ship.length; i++) {
            if(isShipVert){
                if(_map[initRow+i][initCol]!=OPEN_SHOT){
                    if(i==0){
                        return false
                    }else{
                        cleanLine(initRow,initCol,i,isShipVert)
                        return false
                    }  
                }else{
                    ship.setPosStatus(initRow+i,initCol,CLEAR)
                    _map[initRow+i][initCol] = ship
                }
            }else{
                if(_map[initRow][initCol+i]!=OPEN_SHOT ){
                    if(i==0){
                        return false
                    }else{
                        cleanLine(initRow,initCol,i,isShipVert)
                        return false
                    }         
                }else{
                    ship.setPosStatus(initRow,initCol+i,CLEAR)
                    _map[initRow][initCol+i] = ship
                }
            }
        }
        ship.setPos(initRow, initCol, isShipVert)
        return true     
    }

    function cleanLine(initRow, initCol, length, isVert){
        for (let i = 0; i < length; i++) {
            if(isVert){
                _map[initRow+i][initCol] = OPEN_SHOT
            }else{
                _map[initRow][initCol+i] = OPEN_SHOT
            }
        }
    }

    function receiveAttack(row,col){
        if(_map[row][col]==OPEN_SHOT){
            _map[row][col] = MISSED
            return MISSED
        }else if(typeof _map[row][col] == 'object'){
            let pos = _map[row][col]
            pos.hit()
            pos.setPosStatus(row,col,HIT)
            if(pos.isSunk()){
                sunkenShips+=1
            }
            return HIT
        }
    }

    function moveShip(ship, direction){
        let pos = ship.getPos()
        cleanLine(pos.initRow, pos.initCol,ship.length,pos.isVert)
        if(direction=='right'){
            if(pos.isVert){
                if(!placeShip(pos.initRow,pos.initCol+1,ship,pos.isVert)){
                    ship.clearPosStatus()
                    placeShip(pos.initRow,pos.initCol,ship,pos.isVert)
                }
            }else{
                if(!placeShip(pos.initRow,pos.initCol+1,ship,pos.isVert)){
                    ship.clearPosStatus()
                    placeShip(pos.initRow,pos.initCol,ship,pos.isVert)
                }
            }
        }else if(direction=='left'){
            if(pos.isVert){
                if(!placeShip(pos.initRow,pos.initCol-1,ship,pos.isVert)){
                    ship.clearPosStatus()
                    placeShip(pos.initRow,pos.initCol,ship,pos.isVert)
                }
            }else{
                if(!placeShip(pos.initRow,pos.initCol-1,ship,pos.isVert)){
                    ship.clearPosStatus()
                    placeShip(pos.initRow,pos.initCol,ship,pos.isVert)
                }
            }
        }else if(direction=='up'){
            if(pos.isVert){
                if(!placeShip(pos.initRow-1,pos.initCol,ship,pos.isVert)){ 
                    ship.clearPosStatus()
                    placeShip(pos.initRow, pos.initCol,ship,pos.isVert)
                }
            }else{
                if(!placeShip(pos.initRow-1,pos.initCol,ship,pos.isVert)){
                    ship.clearPosStatus()
                    placeShip(pos.initRow, pos.initCol,ship,pos.isVert)
                }
            }
        }else if(direction=='down'){
            if(pos.isVert){
                if(!placeShip(pos.initRow+1,pos.initCol,ship,pos.isVert)){
                    ship.clearPosStatus()
                    placeShip(pos.initRow, pos.initCol,ship,pos.isVert)
                }
            }else{
                if(!placeShip(pos.initRow+1,pos.initCol,ship,pos.isVert)){
                    ship.clearPosStatus()
                    placeShip(pos.initRow, pos.initCol,ship,pos.isVert)
                }
            }
        }      
    }

    function gameOver(){
        return sunkenShips.length == 10
    }

    return {placeShip, receiveAttack,
        CLEAR, MISSED,  HIT, OPEN_SHOT,
        sunkenShips, gameOver, getMap,
        moveShip, initMap}  
}



