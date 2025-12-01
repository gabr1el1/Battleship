export default function ModalNext(cb, title='player'){
    let modalNext = Object.assign(
        document.createElement('div'),
        {className: 'next-modal modal'})

    modalNext.append(Object.assign(
        document.createElement('p'),
        {innerText:title}
    ))
    
    let playBtn = Object.assign(
        document.createElement('button'),
        {className: 'play',onclick: cb}
    )
    playBtn.append(
        Object.assign(document.createElement('img'),
        {src:'../assets/play-arrow.svg', alt:'Start playing'})
    )

    modalNext.append(playBtn)

    return modalNext
}