//when the exercise index is loaded get all the exercises and display them
async function index() {

    //gets all the exercises
    let response = await fetch('https://localhost:7267/api/activities', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    //gets the response
    let result = await response.json()

    //if sucessful diplay all exercises on the index
    if (response.status == 200) {
        var items = document.getElementById("items")
        var exercises = Object.values(result);
        //added html
        var Html = ""
        for (i = 0; i < exercises.length; i++)
        {
            //each row will include the name and a edit and delete button which will allow the user to edit and delete there specific exercise
            Html += `<tr><td id='goldtxt'>${exercises[i].id}</td><td id='goldtxt'>${exercises[i].name}</td><td id='goldtxt'>${exercises[i].type}</td><td><a id="${exercises[i].id}" onClick="Edit(this.id)" class='btn btn-primary'>Edit</a><a id="${exercises[i].id}" onClick="Delete(this.id)" class='btn btn-danger' >Delete</a></td></tr>`
        }
        //displays a table which will include the exercises in the Db
        items.innerHTML = `<table class='table'><thead><tr><th id='goldtxt'>ID</th><th id='goldtxt'>Name</th><th id='goldtxt'>Type</th><th id='goldtxt'></th><th id='goldtxt'></th></tr><tbody>${Html}</tbody></thead></table>`
        
    } else {
        console.log("Get request was unsuccessful")
    }


}

//allows for a exercise to be deleted
async function Delete(clicked_id)// the id will be provided by the delete button
{
    //tells the server to delete the specific exercise
    let response = await fetch(`https://localhost:7267/api/activities/${clicked_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    //if successfull reloads the page so the deleted exercise cannot be seen
    if (response.status == 204) {
        window.location.reload()
    } else {
        console.log("Delete request was unsuccessful")
    }
}


//allows the forwarding of the id of the exercise that is going to be edited to the edit page
async function Edit(clicked_id)
{
    //stores the id to local storage
    window.sessionStorage.setItem('ForwardID', clicked_id)
    window.location.href ="Edit.html"
}

//allows a new exercise to be created
CreateEx.onsubmit = async function (e) {
    e.preventDefault()


    //stores the form data (the new exercise) in a variable
    let formData = new FormData(CreateEx)
    let data = {}
    formData.forEach((value, key) => {
        data[key] = value;

    })

    //tells the server to create the new exercise
    let response = await fetch('https://localhost:7267/api/activities', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    //gets the json result
    let result = await response.json()
    // if it is successfull go back to the index
    if (response.status == 201) {
        window.location.href="index.html"
    } else {//displays any errors
        
        try {
            var errors = Object.values(result.errors);
        } catch (error) {
            var errors = Object.values(result);
        }
        
        
        var error_messages = ''

        for (i = 0; i < errors.length; i++)
        {
            error_messages += errors[i] + '<br />'
        }
        if(errors == null){
            error_messages == "Invalid Log in"
        }
        document.getElementById("error-msg").style.removeProperty("visibility")
        document.getElementById("error-msg").style.visibility = true
        document.getElementById("error-msg").innerHTML = error_messages
    }

    
}
