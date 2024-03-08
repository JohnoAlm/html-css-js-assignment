function handleNewsletterSubmit(e){

    e.preventDefault()
    
    for(let element of e.target){

        if(validateEmail(element) === true){

            const email = element.value
                     
            fetch(`https://kyhnet23-assignment.azurewebsites.net/api/subscribe?email=${email}`, {
                method: 'post',     
            })
            .then(res => {
                if(res.status === 200){
                    console.log(res)
                    alert("You have successfully subscribed!")
                }
                if(res.status === 400){
                    alert("Incorrect form data was submitted")
                }
            })         
        }
        
    }

}

function handleContactSubmit(e){

    e.preventDefault()

    const bookingDetails = {
        fullName: e.target['fullName'].value,
        email: e.target['email'].value,
        specialist: e.target['specialist'].value,
        date: e.target['date'].value,
        time: e.target['time'].value
    }
                    
    fetch('https://kyhnet23-assignment.azurewebsites.net/api/book-appointment', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(bookingDetails)
            
    })
    .then(res => {
        if(res.status === 200){
            alert("You have successfully booked an appointment!")
        }
        if(res.status === 400){
            alert("Incorrect form data was submitted")
        }
    })         
}

function validateName(element){
    const errorHandler = document.getElementById("name-error-handler")

    if(/^[a-zA-Z]+ [a-zA-Z]+$/.test(element.value)){
        errorHandler.classList.remove("invalid")
        errorHandler.classList.add("valid")
        errorHandler.innerText = "Name is valid"
        return (true)
    }
    else{
        errorHandler.classList.remove("valid")
        errorHandler.classList.add("invalid")
        errorHandler.innerText = "Please use a valid name."
        return (false)
    }

}

function validateEmail(element){
    const inputWrapper = element.parentElement
    const errorHandler = inputWrapper.nextElementSibling
    
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(element.value)){
        errorHandler.classList.remove("invalid")
        errorHandler.classList.add("valid")
        errorHandler.innerHTML = "Email is valid."
        return (true)
    }
    else{
        errorHandler.classList.remove("valid")
        errorHandler.classList.add("invalid")
        errorHandler.innerText = "Please use a valid email address."
        return (false)
    }
}