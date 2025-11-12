export default function typeOfBorder(shipCell,i,j){
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