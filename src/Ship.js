export default function Ship(length){
    let _hits = 0
    let _initRow, _initCol, _isVert
    let _positions = {}

    function setPosStatus(i,j,status){
        _positions[`${i}${j}`] = status
    }

    function getPosStatus(i,j){
        return _positions[`${i}${j}`]
    }

    function clearPosStatus(){
        _positions = {}
    }

    function hit(){
        _hits+=1
    }

    function setPos(initRow, initCol, isVert){
        _initRow = initRow
        _initCol = initCol
        _isVert = isVert
    }

    function getPos(){
        return {
            initRow: _initRow,
            initCol: _initCol,
            isVert: _isVert
        }
    }

    
    function isSunk(){
        return _hits >= length
    }

    

    return {hit, isSunk, length, setPos, 
            getPos,setPosStatus,
            getPosStatus, clearPosStatus}
}

