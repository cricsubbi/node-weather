var wF = document.querySelector('form')
var search = document.querySelector('input')
var msg1 = document.querySelector('#msg1')
var msg2 = document.querySelector('#msg2')
var msg3 = document.querySelector('#msg3')
var msg4 = document.querySelector('#msg4')
wF.addEventListener('submit',(e)=>{
    e.preventDefault()

    var location = search.value

    msg1.textContent = 'loading...'
    msg2.textContent = ''
    msg3.textContent = ''
    msg4.textContent = ''

    fetch('/weather?address='+location).then((res)=>{
    res.json().then((data)=>{
if(data.err){
    msg1.textContent = data.err
}
else{
    msg1.textContent = data.loc
    msg2.textContent = data.forecast.sum
    msg3.textContent = "temp: "+data.forecast.temp
    msg4.textContent = "preci: "+data.forecast.preci
}
    })
})

})