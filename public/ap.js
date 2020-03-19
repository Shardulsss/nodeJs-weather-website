// console.log('client side rinning')

// fetch('https://localhost:3000/weather?address=!').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

// const weatherform = document.querySelector('form')
// weatherform.addEventListener('submit',(e)=>{
//     e.preventDefault()
//     console.log('testing')
// })
console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})