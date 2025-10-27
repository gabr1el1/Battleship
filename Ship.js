export default function Ship(length){
    let _hits = 0
    let _initRow, _initCol, _isVert
    let hitPos = {}
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

    

    return {hit, isSunk, length, setPos, getPos}
}

