export default function ModalNext(cb){
    let modalNext = Object.assign(
        document.createElement('div'),
        {className: 'next-modal'})

    
    let playBtn = Object.assign(
        document.createElement('button'),
        {className: 'play',onclick:()=>cb(),
        alt:'Start playing'}
    )
    playBtn.append(
        Object.assign(document.createElement('img'),
        {src:'../assets/play-arrow.svg', alt:'Play'})
    )

    modalNext.append(playBtn)

    document.body.append(modalNext)
}