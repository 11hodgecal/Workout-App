

//allows the user to sign in
frmLogin.onsubmit = async function (e) {
    e.preventDefault()
    //sets the form data as a variable
    let formData = new FormData(frmLogin)
    let data = {}
    formData.forEach((value, key) => {
        data[key] = value;

    })

    //Makes the api call to log in
    let response = await fetch('https://localhost:7267/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    //collects the json response
    let result = await response.json()
    // if the response was successful save the token and the users id and role then go the the workout 
    if (response.status == 200) {
        window.localStorage.setItem('token', result.token)
        window.localStorage.setItem('Fname', result.firstName)
        window.localStorage.setItem('Sname', result.lastName)
        window.localStorage.setItem('id', result.id)
        window.localStorage.setItem('role', result.role)
        window.location.href= "./WorkoutIndex.html"

        
        
    } else {// if the reponse was unsuccessful show the errors
        
        //try find input errors if there are none find Errors for null values
        try {
            var errors = Object.values(result.errors);
        } catch (error) {
            var errors = Object.values(result);
        }
        
        //error variable
        var error_messages = ''

        //add errors to errormessages
        for (i = 0; i < errors.length; i++)
        {
            error_messages += errors[i] + '<br />'
        }
        if(errors == null){// if there are no errors say the login in invalid
            error_messages == "Invalid Log in"
        }
        //show errors
        document.getElementById("error-msg").style.removeProperty("visibility")
        document.getElementById("error-msg").style.visibility = true
        document.getElementById("error-msg").innerHTML = error_messages
        
        
    }


}

//checks the user in logged in
function checkLoggedIn() {
    let token = window.localStorage.getItem('token')
    if (token == null) {
        window.location.href = 'login.html'
    } else {
        alert('You are already logged in')
    }
}
