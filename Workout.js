//Greets the user on login
function Greeting() {
    //gets the users name stored in localstorage then displays it on the greeting
    let Fname = window.localStorage.getItem('Fname')
    let Sname = window.localStorage.getItem('Sname')
    document.getElementById("Greeting").innerHTML = `Hello ${Fname +" "+Sname}!`
}
// gets the users workouts
async function GetUserWorkouts() {
    let Userid = window.localStorage.getItem("id")
    //gets all the workouts 
    let response = await fetch('https://localhost:7267/api/workouts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    //gets the response
    let userworkouts = await response.json()
    //delete all workouts from the array that are not the current users
    for (i = 0; i < userworkouts.length; i++) {
        if (userworkouts[i].userid == Userid) {
            document.getElementById("workouts").innerHTML += `<div class="card bg-WorkoutItem text-center space" ><div class="card-body "><h5 id ="goldtxt" class="card-title ">${userworkouts[i].name}</h5><a id="${userworkouts[i].id}" onclick="Getworkout(this.id)" class="btn  btn-gold-inverse">View Workout</a></div></div>`
        }
    }

}
//forwards id onto workout view then goes to it
function Getworkout(clicked_id) {
    var id = clicked_id
    window.sessionStorage.setItem("ForwardID", id)
    window.location.href = "WorkoutView.html"
}
//Puts the reqired information on the workout view
async function Workoutload() {
    //gets the id forwarded from the workout selected from the previous page
    let id = window.sessionStorage.getItem("ForwardID")
    //gets the specific workout 
    let response = await fetch(`https://localhost:7267/api/workouts/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    //gets the response
    let result = await response.json()

    //display title text
    title = `${result.name} Workout`
    document.getElementById("title").innerHTML = title

    //gets all workout items from the current workout
    let response2 = await fetch(`https://localhost:7267/api/WorkoutItems/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    //gets the json result
    let workoutitems = await response2.json()

    //displays all the results depending on the type
    for (i = 0; i < workoutitems.length; i++) {


        if (workoutitems[i].type == "Flexibility") {
            document.getElementById("workoutitems").innerHTML += `<div class="card  bg-WorkoutItem space"><div class="card-body "><h4 id="goldtxt" class="card-title ">${workoutitems[i].name}</h4><p id="silvertxt">${workoutitems[i].seconds +" "} Seconds</p><button id="${workoutitems[i].id}"  class="btn btn-gold-inverse ">Edit</button><button id="${workoutitems[i].id}" onclick="Delete(this.id)" class="btn btn-gold-inverse ">Delete</button></div></div>`
        }
        if (workoutitems[i].type == "Strength") {
            //if the strength exercise includes weight display it
            var weighttxt = ""
            if (workoutitems[i].weight != 0) {
                weighttxt = ` Kg: ${workoutitems[i].weight}`
            }
            document.getElementById("workoutitems").innerHTML += `<div class="card  bg-WorkoutItem space"><div class="card-body "><h4 id="goldtxt" class="card-title ">${workoutitems[i].name}</h4><p id="silvertxt">Sets:${workoutitems[i].sets +"   "} Reps:${workoutitems[i].reps + weighttxt}  </p><button id="${workoutitems[i].id}" class="btn btn-gold-inverse ">Edit</button><button id="${workoutitems[i].id}" onclick="Delete(this.id)" class="btn btn-gold-inverse ">Delete</button></div></div>`
        }
        if (workoutitems[i].type == "Endurance") {
            document.getElementById("workoutitems").innerHTML += `<div class="card  bg-WorkoutItem space"><div class="card-body "><h4 id="goldtxt" class="card-title ">${workoutitems[i].name}</h4><p id="silvertxt">${workoutitems[i].minuites +" "}Minutes</p><button id="${workoutitems[i].id}"  class="btn btn-gold-inverse ">Edit</button><button id="${workoutitems[i].id}" onclick="Delete(this.id)"  class="btn btn-gold-inverse ">Delete</button></div></div>`
        }



    }

}

//allows the user to delete a exercise item
async function Delete(clicked_id) {
    //tells the server the workout item needs to be deleted
    let response = await fetch(`https://localhost:7267/api/WorkoutItems/${clicked_id}`, {
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    //if successfull reloads the page so the deleted workout item cannot be seen in the frontend
    if (response.status == 204) {
        window.location.reload()
    } else {
        console.log("Delete request was unsuccessful")
    }
}
//generates a form depending on the type of exercise being created
async function GenerateCreateForm(sel) {
    //gets the value of the drop down
    var selected = sel.value
    //gets the workout id
    let id = window.sessionStorage.getItem("ForwardID")
    //if there is not a type make the user select a type and remove all 
    if (selected == '') {
        document.getElementById("form").innerHTML = `<label for="inputtype" class="col-sm-2 col-form-label">Type:</label><div class="col-sm-10"><select onchange="GenerateCreateForm(this)" name="type" id="inputtype" class="form-select" aria-label="Default select example"><option selected value=""></option><option value="Endurance">Endurance</option><option value="Strength">Strength</option><option value="Flexibility">Flexibility</option></select><div class="col-sm-10">`
        document.getElementById("WorkoutItemVars").innerHTML = `<a href="WorkoutView.html" type="submit" class="btn btn-gold">back</a>`
    }
    //if a type is selected it will generate a form for the user
    if (selected != '') {
        //dropdown items
        var dropdownitems = `<option value=""></option>`

        //requests for 
        let response = await fetch(`https://localhost:7267/api/activities`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        //puts the results into a variable
        let exercises = await response.json()

        //loops through all the exercises and if the exercise type equals the selected 
        //then will create a select item for the exercise select
        for (i = 0; i < exercises.length; i++) {
            if (selected == exercises[i].type) {
                dropdownitems += `<option value="${exercises[i].name}">${exercises[i].name}</option>`
            }

        }
        //depending on the type selected the form inputs other then the above will 
        //dependent for example endurance will be the only one with minuite input
        var inputs = ""
        for (i = 0; i < exercises.length; i++) {
            if (selected == "Flexibility") {
                inputs = `<div class="mb-3 row"><label class="col-sm-2 col-form-label">Seconds:</label><div class="col-sm-10"><input type="number" class="form-control" id="Seconds" name="Seconds" /></div></div>`
            }
            if (selected == "Strength") {
                inputs = `<div class="mb-3 row"><label class="col-sm-2 col-form-label">Sets:</label><div class="col-sm-10"><input type="number" class="form-control" id="Sets" name="Sets" /></div></div><div class="mb-3 row"><label class="col-sm-2 col-form-label">Reps:</label><div class="col-sm-10"><input type="number" class="form-control" id="Reps" name="Reps" /></div></div><div class="mb-3 row"><label class="col-sm-2 col-form-label">Weight(Kg):</label><div class="col-sm-10"><input type="number" class="form-control" id="weight" name="weight" /></div></div>`
            }
            if (selected == "Endurance") {
                inputs = `<div class="mb-3 row"><label class="col-sm-2 col-form-label">Minuites:</label><div class="col-sm-10"><input type="number" class="form-control" id="Minuites" name="Minuites" /></div></div>`
            }
        }
        //displays the exercise dropdown
        document.getElementById("form").innerHTML = `<input type="hidden"  name="workoutID" value="${id}"><label for="inputtype" class="col-sm-2 col-form-label">Type:</label><div class="col-sm-10"><select onchange="GenerateCreateForm(this)" name="type" id="inputtype" class="form-select" aria-label="Default select example"><option selected value=""></option><option value="Endurance">Endurance</option><option value="Strength">Strength</option><option value="Flexibility">Flexibility</option></select><label for="inputtype" class="col-sm-2 col-form-label">Exercise:</label><div class="col-sm-10"><select  name="Name" id="inputName" class="form-select" aria-label="Default select example">${dropdownitems}</select>`
        //diplays the type dependant inputs
        document.getElementById("WorkoutItemVars").innerHTML = inputs + `<button type="submit"  class="btn btn-gold">Create</button><a href="WorkoutView.html" type="submit" class="btn btn-gold">back</a>`
        //makes the selected the type value;
        document.getElementById("inputtype").value = selected
    }


}

//creates a new exercise item
CreateWItem.onsubmit = async function (e) {
    e.preventDefault()
    //sets the form data as a variable
    let formData = new FormData(CreateWItem)
    let data = {}
    formData.forEach((value, key) => {
        data[key] = value;

    })
    //validates the data
    let passed = validateitem(data)
    let valmessage = validatemessage(data)
    
    //the api call can be made if the validation check passes
    if (passed == true) {
        //Makes the api call to create the workout item
        let response = await fetch('https://localhost:7267/api/WorkoutItems', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        //redirect the the view to the front end if successful
        if (response.status != 400) {
            window.location.href = "WorkoutView.html"
        }
        //tell the user to select a exercise if they have not
        if (response.status == 400) {

            //show errors
            document.getElementById("error-msg").style.removeProperty("visibility")
            document.getElementById("error-msg").style.visibility = true
            document.getElementById("error-msg").innerHTML = "Select a Exercise"
        }
    }
    //if it fails validation show the errors
    if (passed == false) {
        
        //show errors
        document.getElementById("error-msg").style.removeProperty("visibility")
        document.getElementById("error-msg").style.visibility = true
        document.getElementById("error-msg").innerHTML = valmessage
        
    }



}

//validation boolean
function validateitem(data) {
    var invalid = false

    if (parseInt(data["Minuites"]) > 60) {
        invalid = true
    }
    if (parseInt(data["Sets"]) > 10) {
        invalid = true
    }
    if (parseInt(data["weight"]) > 250) {
        invalid = true
    }
    if (parseInt(data["Reps"]) > 30) {
        invalid = true
    }
    if (parseInt(data["Seconds"]) > 60) {
        invalid = true
    }
    if (invalid == false) {
        return true
    }
    if (invalid == true) {
        return false
    }

}

//validation messages
function validatemessage(data){
    var invalid = false
    var message = ""

    if (parseInt(data["Minuites"]) > 60) {
        invalid = true
        message += "Max mins is 60<br>"
    }
    if (parseInt(data["Sets"]) > 10) {
        invalid = true
        message += "Max Sets is 10<br>"
    }
    if (parseInt(data["weight"]) > 250) {
        invalid = true
        message += "Max weight is 250kg<br>"
    }
    if (parseInt(data["Reps"]) > 30) {
        invalid = true
        message += "Max reps is 30kg<br>"
    }
    if (parseInt(data["Seconds"]) > 60) {
        invalid = true
        message += "Max Seconds is 60<br>"
    }
    if (invalid == true) {
        return message
    }
    

}
