const start = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const board = document.querySelector('#board')
let time = 0
const count = document.querySelector('#time')
let score = 0
const stopbtn = document.querySelector('#gameOver')
const restartbtn = document.querySelector('#restartGame')
const colors = ['red', 
                'blue', 
                'green', 
                'purple', 
                'yellow' , 
                'gold', 
                '#d83830',
                '#9c695d',
                '#165122',
                '#725a91',
                '#1fab3e']

start.addEventListener('click', (event) =>  {
    event.preventDefault()
    screens[0].classList.add('up')
})


timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
       time = parseInt(event.target.getAttribute('data-time'))
       screens[1].classList.add('up')
       board.innerHTML  = ``
       if (time === 888) {
        count.parentNode.classList.add('hide')
        time = 99999999999;
        stopbtn.classList.remove('hide')
       }
       startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove()
        createRandomCircle()
    }
})



function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)

}
function decreaseTime() {
    if (time===0) {
        finishGame()
    } else {
    let current = --time
        if (current<10){
            current = `0${current}`
            } 
        setTime(current)
    }
}

function setTime (value) {
    count.innerHTML = `00:${value}`
}


function finishGame() {
    count.parentNode.classList.add('hide')
    restartbtn.classList.remove('hide')
    board.innerHTML = `<h1>Your Score is ${score}</h1>`
    stopbtn.classList.add('hide')
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 40)
    const {width, height} = board.getBoundingClientRect()
    const positionX = getRandomNumber(0, width-size)
    const positionY = getRandomNumber(0, height-size)
    const color = getRandomColor()
    circle.style.background = color

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${positionX}px`
    circle.style.left = `${positionY}px`
    board.append(circle)
}


function restartGame() {
    window.location.reload();
}

function  getRandomNumber (min, max) {
    return Math.floor(Math.random()*(max-min) + min)
}

function getRandomColor() {
    const Index = Math.floor(Math.random()*colors.length)
    return colors[Index]
}