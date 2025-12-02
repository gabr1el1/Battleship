import Ship from "./src/Ship.js"
import Gameboard from "./src/Gameboard.js"

describe('Test ship',()=>{

    test('Hit and Sink ship',()=>{
        const ship = Ship(3)
        ship.hit()
        expect(ship.isSunk()).toBeFalsy()
        ship.hit()
        expect(ship.isSunk()).toBeFalsy()
        ship.hit()
        expect(ship.isSunk()).toBeTruthy()
        ship.hit()
        expect(ship.isSunk()).toBeTruthy()
    })

    test('Place ships not overlapping',()=>{
        let gb = Gameboard()

        expect(gb.placeShip(2,0,Ship(1),false)).toBeTruthy()

        expect(gb.placeShip(1,3,Ship(4),false)).toBeTruthy()

        expect(gb.placeShip(0,9,Ship(1),false)).toBeTruthy()
        
        expect(gb.placeShip(3,5,Ship(2),true)).toBeTruthy()

        expect(gb.placeShip(4,1,Ship(3),true)).toBeTruthy()

        expect(gb.placeShip(6,3,Ship(3),false)).toBeTruthy()

        expect(gb.placeShip(4,9,Ship(2),true)).toBeTruthy()

        expect(gb.placeShip(7,9,Ship(1),false)).toBeTruthy()

        expect(gb.placeShip(8,1,Ship(1),false)).toBeTruthy()
        
        expect(gb.placeShip(9,3,Ship(2),false)).toBeTruthy()   

    })

    test('Place ships overlapping',()=>{
        let gb = Gameboard()

        expect(gb.placeShip(2,0,Ship(1),false)).toBeTruthy()

        expect(gb.placeShip(2,0,Ship(4),false)).toBeFalsy()

        expect(gb.placeShip(0,3,Ship(4),false)).toBeTruthy()

        expect(gb.placeShip(0,4,Ship(2),true)).toBeFalsy()

        expect(gb.placeShip(0,8,Ship(2),true)).toBeTruthy()

        expect(gb.placeShip(1,9,Ship(1),true)).toBeTruthy()

        expect(gb.placeShip(2,9,Ship(2),true)).toBeTruthy()

        expect(gb.placeShip(4,1,Ship(3),true)).toBeTruthy()

        expect(gb.placeShip(6,3,Ship(3),true)).toBeTruthy()

        expect(gb.placeShip(8,1,Ship(1),true)).toBeTruthy()

        expect(gb.placeShip(9,3,Ship(2),false)).toBeTruthy()

        expect(gb.placeShip(7,9,Ship(3),false)).toBeFalsy()

        expect(gb.placeShip(7,4,Ship(3),true)).toBeFalsy()
    })

    test('Receive attack',()=>{
        let gb = Gameboard()

        gb.placeShip(2,0,Ship(1),false)

        gb.placeShip(1,3,Ship(4),false)

        gb.placeShip(0,9,Ship(1),false)
        
        gb.placeShip(3,5,Ship(2),true)

        gb.placeShip(4,1,Ship(3),true)

        gb.placeShip(6,3,Ship(3),false)

        gb.placeShip(4,9,Ship(2),true)

       gb.placeShip(7,9,Ship(1),false)

        gb.placeShip(8,1,Ship(1),false)
        
        gb.placeShip(9,3,Ship(2),false)

        expect(gb.receiveAttack(0,0)).toBe(gb.MISSED)
        expect(gb.receiveAttack(2,0)).toBe(gb.HIT)
        expect(gb.receiveAttack(2,0)).toBe(gb.CLOSED)
    })
    
    test('Sink ships',()=>{
        let gb = Gameboard()

        gb.placeShip(2,0,Ship(1),false)

        gb.placeShip(1,3,Ship(4),false)

        gb.placeShip(0,9,Ship(1),false)
        
        gb.placeShip(3,5,Ship(2),true)

        gb.placeShip(4,1,Ship(3),true)

        gb.placeShip(6,3,Ship(3),false)

        gb.placeShip(4,9,Ship(2),true)

        gb.placeShip(7,9,Ship(1),false)

        gb.placeShip(8,1,Ship(1),false)
        
        gb.placeShip(9,3,Ship(2),false)

        expect(gb.receiveAttack(0,0)).toBe(gb.MISSED)
        expect(gb.receiveAttack(2,0)).toBe(gb.HIT)
        expect(gb.receiveAttack(2,0)).toBe(gb.CLOSED)
        expect(gb.getSunken()).toBe(1)

        gb.receiveAttack(1,3)
        gb.receiveAttack(1,4)
        gb.receiveAttack(1,5)
        gb.receiveAttack(1,6)
        expect(gb.getSunken()).toBe(2)
        gb.receiveAttack(0,9)
        expect(gb.getSunken()).toBe(3)
        gb.receiveAttack(4,1)
        gb.receiveAttack(5,1)
        gb.receiveAttack(6,1)
        expect(gb.getSunken()).toBe(4)
        gb.receiveAttack(3,5)
        gb.receiveAttack(4,5)
        expect(gb.getSunken()).toBe(5)
        gb.receiveAttack(4,9)
        gb.receiveAttack(5,9)
        expect(gb.getSunken()).toBe(6)
        gb.receiveAttack(7,9)
        expect(gb.getSunken()).toBe(7)
        gb.receiveAttack(6,3)
        gb.receiveAttack(6,4)
        gb.receiveAttack(6,5)
        expect(gb.getSunken()).toBe(8)
        gb.receiveAttack(8,1)
        expect(gb.getSunken()).toBe(9)
        expect(gb.gameOver()).toBeFalsy()
        gb.receiveAttack(9,3)
        gb.receiveAttack(9,4)
        expect(gb.getSunken()).toBe(10)
        expect(gb.gameOver()).toBeTruthy() 
    })

    
})