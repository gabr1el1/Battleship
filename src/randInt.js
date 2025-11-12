export default function randInt(min, max){
    const rand = Math.floor(Math.random() * (max-min+1) + min) 
    return rand
}
