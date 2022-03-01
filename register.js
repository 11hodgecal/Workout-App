//allows a user to register an account
frmReg.onsubmit = async function (e) {
    e.preventDefault()
    //sets the form data as a variable
    let formData = new FormData(frmReg)
    let data = {}
    formData.forEach((value, key) => {
        data[key] = value;
    })

    //passes the data to the server to register the new user
    let response = await fetch('https://localhost:7267/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    //gets the json result
    let result = await response.json()
    //go back to login if sucessful
    if (response.status == 200) {
        window.location.href = `index.html?m=${result.message}`
    } else {
        //gets the errors
        var errors = Object.values(result.errors);
        
        var error_messages = ''
        //null values bollen
        var nullValues = 0
        var indexs = ["email", "firstName", "lastName", "password"]
        //checks the data for null values
        for (i = 0; i < indexs.length; i++) {
            if (data[indexs[i]] == "") {
                nullValues = 1
            }
        }
        //if there are null values show the users that they are required
        if (nullValues == 1) {
            for (i = 0; i < errors.length; i++) {
                error_messages += errors[i]+ '<br />'
            }
            document.getElementById("error-msg").style.removeProperty("visibility")
            document.getElementById("error-msg").style.visibility = true
            document.getElementById("error-msg").innerHTML = error_messages
        }
        //if there are not null values show the users know the issues with there inputss
        else if (nullValues == 0) {
            for (i = 0; i < errors.length; i++) {
                error_messages += errors[i].errors[0].errorMessage + '<br />'
            }
            document.getElementById("error-msg").style.removeProperty("visibility")
            document.getElementById("error-msg").style.visibility = true
            document.getElementById("error-msg").innerHTML = error_messages
        }

    }

}