import Ship from "./Ship.js"
import Gameboard from "./Gameboard.js"

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

        expect(gb.placeShip(3,'A',Ship(1),false)).toBeTruthy()

        expect(gb.placeShip(2,'D',Ship(4),false)).toBeTruthy()

        expect(gb.placeShip(1,'J',Ship(1),false)).toBeTruthy()

        expect(gb.placeShip(4,'F',Ship(2),true)).toBeTruthy()

        expect(gb.placeShip(5,'B',Ship(3),true)).toBeTruthy()

        expect(gb.placeShip(7,'D',Ship(3),false)).toBeTruthy()

        expect(gb.placeShip(5,'J',Ship(2),true)).toBeTruthy()

        expect(gb.placeShip(8,'J',Ship(1),false)).toBeTruthy()

        expect(gb.placeShip(9,'B',Ship(1),false)).toBeTruthy()

        expect(gb.placeShip(10,'D',Ship(2),false)).toBeTruthy()   
    })

    test('Place ships overlapping',()=>{
        let gb = Gameboard()

        expect(gb.placeShip(3,'A',Ship(1),false)).toBeTruthy()

        expect(gb.placeShip(3,'A',Ship(4),false)).toBeFalsy()

        expect(gb.placeShip(2,'D',Ship(4),false)).toBeTruthy()

        expect(gb.placeShip(1,'E',Ship(2),true)).toBeFalsy()

        expect(gb.placeShip(1,'I',Ship(2),true)).toBeTruthy()

        expect(gb.placeShip(2,'J',Ship(1),true)).toBeTruthy()

        expect(gb.placeShip(3,'J',Ship(2),true)).toBeTruthy()

        expect(gb.placeShip(5,'B',Ship(3),true)).toBeTruthy()

        expect(gb.placeShip(7,'D',Ship(3),true)).toBeTruthy()

        expect(gb.placeShip(9,'B',Ship(1),true)).toBeTruthy()

        expect(gb.placeShip(10,'D',Ship(2),false)).toBeTruthy()

        expect(gb.placeShip(8,'J',Ship(3),false)).toBeFalsy()

        expect(gb.placeShip(8,'E',Ship(3),true)).toBeFalsy()
    })

    test('Receive attack',()=>{
        let gb = Gameboard()

        gb.placeShip(3,'A',Ship(1),false)

        gb.placeShip(2,'D',Ship(4),false)

        gb.placeShip(1,'J',Ship(1),false)

        gb.placeShip(4,'F',Ship(2),false)

        gb.placeShip(5,'B',Ship(3),true)

        gb.placeShip(7,'D',Ship(3),false)

        gb.placeShip(5,'J',Ship(2),true)

        gb.placeShip(8,'J',Ship(1),false)

        gb.placeShip(9,'B',Ship(1),false)

        gb.placeShip(10,'D',Ship(2),false)

        expect(gb.receiveAttack(1,'A')).toBe(gb.MISSED)
        expect(gb.receiveAttack(3,'A')).toBe(gb.HIT)
        expect(gb.receiveAttack(3,'A')).toBe(gb.CLOSED)
    })
    
    test('Sink ships',()=>{
        let gb = Gameboard()

        gb.placeShip(3,'A',Ship(1),false)

        gb.placeShip(2,'D',Ship(4),false)

        gb.placeShip(1,'J',Ship(1),false)

        gb.placeShip(4,'F',Ship(2),true)

        gb.placeShip(5,'B',Ship(3),true)

        gb.placeShip(7,'D',Ship(3),false)

        gb.placeShip(5,'J',Ship(2),true)

        gb.placeShip(8,'J',Ship(1),false)

        gb.placeShip(9,'B',Ship(1),false)

        gb.placeShip(10,'D',Ship(2),false)

        expect(gb.receiveAttack(1,'A')).toBe(gb.MISSED)
        expect(gb.receiveAttack(3,'A')).toBe(gb.HIT)
        expect(gb.receiveAttack(3,'A')).toBe(gb.CLOSED)
        expect(gb.sunkenStatus()).toBe(1)
        gb.receiveAttack(2,'D')
        gb.receiveAttack(2,'E')
        gb.receiveAttack(2,'F')
        gb.receiveAttack(2,'G')
        expect(gb.sunkenStatus()).toBe(2)
        gb.receiveAttack(1,'J')
        expect(gb.sunkenStatus()).toBe(3)
        gb.receiveAttack(5,'B')
        gb.receiveAttack(6,'B')
        gb.receiveAttack(7,'B')
        expect(gb.sunkenStatus()).toBe(4)
        gb.receiveAttack(4,'F')
        gb.receiveAttack(5,'F')
        expect(gb.sunkenStatus()).toBe(5)
        gb.receiveAttack(5,'J')
        gb.receiveAttack(6,'J')
        expect(gb.sunkenStatus()).toBe(6)
        gb.receiveAttack(8,'J')
        expect(gb.sunkenStatus()).toBe(7)
        gb.receiveAttack(7,'D')
        gb.receiveAttack(7,'E')
        gb.receiveAttack(7,'F')
        expect(gb.sunkenStatus()).toBe(8)
        gb.receiveAttack(9,'B')
        expect(gb.sunkenStatus()).toBe(9)
        expect(gb.gameOver()).toBeFalsy()
        gb.receiveAttack(10,'D')
        gb.receiveAttack(10,'E')
        expect(gb.sunkenStatus()).toBe(10)
        expect(gb.gameOver()).toBeTruthy() 
    })

    
})