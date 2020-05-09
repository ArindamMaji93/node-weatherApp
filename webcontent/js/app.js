console.log('Client side javascript in action!')



const weatherForm = document.querySelector('form')
const messageOne = document.querySelector('#m1')
const messageTwo = document.querySelector('#m2')
weatherForm.addEventListener('submit', (event)=>{
    // To prevent browser to perform its default behaviour to refresh the page
    // everytime the submit button is hit.
    event.preventDefault()
    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''
    const location = weatherForm.querySelector('input').value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        } else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})
