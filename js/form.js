const getSpecialists = async () => {
    const response = await fetch('https://kyhnet23-assignment.azurewebsites.net/api/specialists')
    const data = await response.json()
    return data
}

const displaySpecialists = async () => {

    const selectList = document.getElementById('specialist')
   
    const data = await getSpecialists()

    let specialistsDisplay = data.map((specialist) => {
        const { firstName, lastName } = specialist

        return `
        <option value="${firstName.toLowerCase()}${lastName.toLowerCase()}">${firstName} ${lastName}</option>
        `
    })

    selectList.innerHTML = specialistsDisplay
}

displaySpecialists()

function handleNewsletterSubmit(e){

    const elementArray = Array.from(e.target.elements)
       
    e.preventDefault()

    for(let element of e.target){
        
        if(validateEmail(element) === true){
            
            const email = element.value
            
            fetch(`https://kyhnet23-assignment.azurewebsites.net/api/subscribe?email=${email}`, {
                method: 'post',     
            })
            .then(res => {
                if(res.status === 200){
                    alert("You have successfully subscribed!")
                }
                if(res.status === 400){
                    alert("Incorrect form data was submitted")
                }
            })    

            elementArray.forEach(element => {
                if(element.tagName === "INPUT"){
                    element.value=""
                }
            });
        }
    }
}

function handleContactSubmit(e){

    const elementArray = Array.from(e.target.elements)

    e.preventDefault()

    const bookingDetails = {
        fullName: e.target['fullName'].value,
        email: e.target['email'].value,
        specialist: e.target['specialist'].value,
        date: e.target['date'].value,
        time: e.target['time'].value
    }

    if(validateName(e.target['fullName']) === true && validateEmail(e.target['email']) === true){

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
    
    
        elementArray.forEach(element => {
            if(element.tagName === "INPUT" || element.tagName === "SELECT"){
                element.value=""
            }
        });
    }
}

function validateName(element){
    const inputWrapper = element.parentElement
    const errorHandler = inputWrapper.nextElementSibling

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