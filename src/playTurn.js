import randInt from "./randInt.js";
import ModalGameOver from "./ModalGameOver.js";
import typeOfBorder from "./typeOfBorder.js";
import ModalNext from "./ModalNext.js";
export default function playTurn(player1, player2) {
    document.body.innerHTML = ""

    document.querySelector('body').append(
        Object.assign(document.createElement('div'),
            { className: 'game-title', innerText: 'BATTLESHIP' })
    )

    let playA1 = Object.assign(document.createElement('div'),
        { className: 'play-area current' })
    let playA2 = Object.assign(document.createElement('div'),
        { className: 'play-area not-current' })

    let playerInfo1 = document.createElement('h2')
    playerInfo1.innerText = `${player1.getName()}'s board`
    playerInfo1.className = 'player-info'

    let playerInfo2 = document.createElement('div')
    playerInfo2.className = 'player-info'
    playerInfo2.append(
        Object.assign(document.createElement('h2'),
            { innerText: `${player2.getName()}'s board` }),
    )

    if (document.querySelector('.sunken-info')) {
        document.querySelector('.sunken-info').remove()
    }

    document.querySelector('.game-title').append(Object.assign(document.createElement('h2'),
        {
            innerText: `${player2.getGb().getSunken()} sunken of 10`,
            className: 'sunken-info'
        }))

    playA1.append(playerInfo1)
    playA2.append(playerInfo2)

    let boards = document.createElement('div')
    boards.className = 'boards'
    boards.append(playA1)
    boards.append(playA2)

    document.querySelector('body').append(boards)

    let grid1 = Object.assign(
        document.createElement('div'),
        { className: 'grid' })

    let grid2 = Object.assign(
        document.createElement('div'),
        { className: 'grid' })

    playA1.append(grid1)
    playA2.append(grid2)

    fillGrid(grid1, player1, true)
    fillGrid(grid2, player2, false)
    if (player1.getType() == 'computer') {
        /*
        seleccionar un movimiento random con randInt 
        de indice de player moves [(x,y), (z,j), (x,r)]
        si acerto fill grid otra vez y si 
        hundio cambiar clase de letrero info
        el siguiente movimiento generamos los cuatro 
        movimientos adyacentes seleccionamos con randInt
        el siguiente movimiento si es hit seguimos 
        */
        let moveKeys = Object.keys(player1.getOpen())
        let firstIndex = randInt(0, moveKeys.length - 1)
        let firstMove = player1.getOpen()[moveKeys[firstIndex]]
        player1.useOpen(firstMove[0], firstMove[1])
        let move = firstMove
        setTimeout(startPlaying, 1000)

        function startPlaying() {
            if (player2.getGb().receiveAttack(firstMove[0], firstMove[1]) == 'hit') {
                fillGrid(grid2, player2, false)
                let pos = player2.getGb().getMap()[firstMove[0]][firstMove[1]]
                if (pos.isSunk()) {
                    document.querySelector('.sunken-info').classList.add('you-hit')
                    setTimeout(document.querySelector('.sunken-info').classList.remove('you-hit'), 1500)
                    if (player2.getGb().gameOver()) {
                        let modal = ModalGameOver(player1.getName())
                        document.body.append(modal)
                        setTimeout(() => {
                            document.querySelector('.game-over-modal')
                                .classList.add('active')
                        }, 3000)
                    }
                }

                let missed = false
                let interval = setInterval(action, 3000)
                function action() {
                    if (missed) {
                        playTurn(player2, player1)
                        clearInterval(interval)
                    } else {
                        let nextMoves = [[move[0] - 1, move[1]],
                        [move[0] + 1, move[1]], [move[0], move[1] + 1],
                        [move[1] - 1]]
                        nextMoves = nextMoves.filter((move) => {
                            if ((move[0] >= 0 && move[0] <= 9)
                                && (move[1] >= 0 && move[1] <= 9)
                                && (`${move[0]}${move[1]}` in player1.getOpen())) {
                                return true
                            }
                        })

                        if (nextMoves.length > 0) {
                            let index = randInt(0, nextMoves.length - 1)
                            move = nextMoves[index]
                        } else {
                            let moveKeys = Object.keys(player1.getOpen())
                            let firstIndex = randInt(0, moveKeys.length - 1)
                            let firstMove = player1.getOpen()[moveKeys[firstIndex]]
                            move = firstMove
                        }

                        let result = player2.getGb().receiveAttack(move[0], move[1])
                        
                        if (result == 'hit') {
                            player1.useOpen(move[0], move[1])
                            let sunken = player2.getGb().getMap()[move[0]][move[1]].isSunk()
                            if (sunken) {
                                document.querySelector('.sunken-info').classList.add('you-hit')
                                setTimeout(() => document.querySelector('.sunken-info').classList.remove('you-hit'), 1500)
                            }

                            if (player2.getGb().gameOver()) {
                                clearInterval(interval)
                                let modal = ModalGameOver(player1.getName())
                                document.body.append(modal)
                                setTimeout(() => {
                                    document.querySelector('.game-over-modal')
                                        .classList.add('active')
                                }, 3000)
                            }
                        } else {
                            document.querySelector('.sunken-info').classList.add('you-missed')
                            player1.useOpen(move[0], move[1])
                            missed = true
                        }

                        fillGrid(grid2, player2, false)
                    }
                }
            } else {
                fillGrid(grid2, player2, false)
                document.querySelector('.sunken-info').classList.add('you-missed')
                player1.useOpen(firstMove[0], firstMove[1])
                setTimeout(() => playTurn(player2, player1), 3000)
            }
        }

    }

    function fillGrid(grid, player, currPlayer) {
        grid.innerHTML = ""
        if (!currPlayer && player1.getType() == 'computer') {
            grid.classList.add('no-interaction')
        }

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let cell = document.createElement('div')
                cell.dataset.row = i
                cell.dataset.col = j
                let gb = player.getGb()
                let map = gb.getMap()
                let pos = map[i][j]

                cell.classList.add('cell')
                if (currPlayer) {
                    if (player.getType() == 'computer') {
                        if (pos == gb.OPEN_SHOT) {
                            cell.classList.add('open')
                        } else if (pos == gb.MISSED) {
                            cell.classList.add('missed')
                        } else if (typeof pos == 'object') {
                            if (pos.getPosStatus(i, j) == gb.HIT) {
                                cell.classList.add('hit')
                                if (pos.isSunk()) {
                                    cell.classList.add(typeOfBorder(pos))
                                }
                            } else {
                                cell.classList.add('open')
                            }
                        }
                    } else if (player.getType() == 'human') {
                        if (pos == gb.OPEN_SHOT) {
                            cell.classList.add('open')
                        } else if (pos == gb.MISSED) {
                            cell.classList.add('missed')
                        } else if (typeof pos == 'object') {
                            cell.classList.add(pos.getPosStatus(i, j))
                            cell.classList.add(typeOfBorder(pos, i, j))
                        }
                    }
                } else if (!currPlayer) {
                    if (pos == gb.OPEN_SHOT) {
                        cell.classList.add('open')
                        if (player1.getType() == 'human') {
                            cell.addEventListener('click', (event) => {
                                cell.classList.remove('open')
                                cell.classList.add(gb.receiveAttack(i, j))
                                document.querySelector('.sunken-info').classList.add('you-missed')
                                grid.classList.add('no-interaction')
                                if (player.getType() == 'computer') {
                                    setTimeout(() => {
                                        playTurn(player2, player1)
                                    }, 3000)

                                } else {
                                    let modal = ModalNext(() => playTurn(player2, player1),
                                        `Turn to ${player2.getName()}!`)
                                    document.body.append(modal)
                                    setTimeout(() => {
                                        document.querySelector('.next-modal').classList.add('active')
                                    }, 3000)
                                }

                            })
                        }
                    } else if (pos == gb.MISSED) {
                        cell.classList.add('missed')
                    } else if (typeof pos == 'object') {
                        if (player1.getType() == 'computer') {
                            cell.classList.add(pos.getPosStatus(i, j))
                            cell.classList.add(typeOfBorder(pos, i, j))
                        } else if (player1.getType() == 'human') {
                            if (pos.getPosStatus(i, j) == gb.HIT) {
                                cell.classList.add('hit')
                                if (pos.isSunk()) {
                                    cell.classList.add(typeOfBorder(pos, i, j))
                                }
                            } else if (pos.getPosStatus(i, j) == gb.CLEAR) {
                                cell.classList.add('open')
                                cell.addEventListener('click', () => {
                                    cell.classList.remove('clear')
                                    cell.classList.add(gb.receiveAttack(i, j))
                                    if (pos.isSunk()) {
                                        setTimeout(() => document.querySelector('.sunken-info').classList.add('you-hit'), 10)
                                        setTimeout(() => document.querySelector('.sunken-info').classList.remove('you-hit'), 1500)
                                        playTurn(player1, player2)
                                    }
                                    if (gb.gameOver()) {
                                        let modal = ModalGameOver(player1.getName())
                                        document.body.append(modal)
                                        setTimeout(() => {
                                            document.querySelector('.game-over-modal')
                                                .classList.add('active')
                                        }
                                            , 3000)
                                    }
                                })

                            }

                        }

                    }
                }
                grid.append(cell)
            }
        }
    }
}

