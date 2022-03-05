//retrive existing workout information and paste on page 
async function workoutitemLoad() {
    var workoutitemid = window.sessionStorage.getItem("WorkoutItemID")
    //retrieves the information on that specific exercise
    let response = await fetch(`https://localhost:7267/api/WorkoutItems/${workoutitemid}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    //gets the result
    let item = await response.json()

    //depending on the type selected the form inputs other then the above will 
    //dependent for example endurance will be the only one with minuite input
    var inputs = ""
    if (item.type == "Flexibility") {
        inputs = `<div class="mb-3"><div class=""><label class="col-sm-2 col-form-label">Seconds:</label><input type="number" value="${item.seconds}"  class="form-control" id="Seconds" name="Seconds" /></div></div>`

    }
    if (item.type == "Strength") {
        inputs = `<div class="mb-3"><label class="col-sm-2 col-form-label">Sets:</label><div class=""><input value="${item.sets}" type="number" class="form-control" id="Sets" name="Sets" /></div></div><div class="mb-3"><label class="col-sm-2 col-form-label">Reps:</label><div class=""><input value="${item.reps}" type="number" class="form-control" id="Reps" name="Reps" /></div></div><div class="mb-3 row"><label class="col-sm-2 col-form-label">Weight(Kg):</label><div class=""><input value="${item.weight}" type="number" class="form-control" id="weight" name="weight" /></div></div>`


    }
    if (item.type == "Endurance") {
        inputs = `<div class="mb-3 "><label class="col-sm-2 col-form-label">Minuites:</label><div class=""><input value="${item.minuites}" type="number" class="form-control" id="Minuites" name="Minuites" /></div></div>`
    }


    //diplays the type dependant inputs
    document.getElementById("WorkoutItemVars").innerHTML = inputs + `<button type="submit"  class="btn btn-gold btn-spacing">Edit</button><a href="WorkoutView.html" type="submit" class="btn btn-gold">back</a>`


}

//make the edit
EditWItem.onsubmit = async function (e) {
    e.preventDefault()
    //sets the form data as a variable
    let formData = new FormData(EditWItem)
    let data = {}
    var workoutitemid = window.sessionStorage.getItem("WorkoutItemID")
    formData.forEach((value, key) => {
        data[key] = value;

    })
    //validates the data
    let passed = validateitemEdit(data)
    let valmessage = validatemessageEdit(data)


    //if the form data is valid allow the user to continue 
    if (passed == true) {
        //retrieves the information on that specific workout item
        let response = await fetch(`https://localhost:7267/api/WorkoutItems/${workoutitemid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        //gets the result
        let item = await response.json()
        //depending on type adds empty form data so the item can be accepted on the api
        if (item.type == "Flexibility") {
            data["id"] = item.id
            data["type"] = item.type
            data["name"] = item.name
            data["workoutID"] = item.workoutID
            data["minuites"] = 0
            data["sets"] = item.sets
            data["reps"] = item.reps
            data["weight"] = item.weight
        }
        if (item.type == "Strength") {
            data["id"] = item.id
            data["type"] = item.type
            data["name"] = item.name
            data["workoutID"] = item.workoutID
            data["minuites"] = 0
            data["seconds"] = 0
        }
        if (item.type == "Endurance") {
            data["id"] = item.id
            data["type"] = item.type
            data["name"] = item.name
            data["workoutID"] = item.workoutID
            data["sets"] = item.sets
            data["reps"] = item.reps
            data["weight"] = item.weight
            data["seconds"] = 0
        }

        

        // tells the server the specific workout item has a edit
        let response2 = await fetch(`https://localhost:7267/api/WorkoutItems/${workoutitemid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),

        })
        //if sucessfull the forwarded id will be removed and the user will be redirected to the index of the exercise crud
        if (response2.status == 204) {
            window.sessionStorage.removeItem("WorkoutItemID")
            window.location.href = "WorkoutView.html"
        }
    }
    //if the form data is not valid show the error message
    if(passed == false){
        document.getElementById("error-msg").style.removeProperty("visibility")
        document.getElementById("error-msg").style.visibility = true
        document.getElementById("error-msg").innerHTML = valmessage
    }



}


//make validation recognise null value
//validation boolean
function validateitemEdit(data) {
    var invalid = false

    if (parseInt(data["Minuites"]) > 60) {
        invalid = true
    }
    if (parseInt(data["Sets"]) > 10) {
        invalid = true
    }
    if (parseFloat(data["weight"]) > 250) {
        invalid = true
    }
    if (parseInt(data["Reps"]) > 30) {
        invalid = true
    }
    if (parseInt(data["Seconds"]) > 60) {
        invalid = true
    }
    if (data["Minuites"] == "") {
        invalid = true
    }
    if (data["Sets"] == "") {
        invalid = true
    }
    if (data["weight"] == "") {
        invalid = true
    }
    if (data["Reps"] == "") {
        invalid = true
    }
    if (data["Seconds"] == "") {
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
function validatemessageEdit(data) {
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
    if (parseFloat(data["weight"]) > 250) {
        invalid = true
        message += "Max weight is 250kg<br>"
    }
    if (parseInt(data["Reps"]) > 30) {
        invalid = true
        message += "Max reps is 30<br>"
    }
    if (parseInt(data["Seconds"]) > 60) {
        invalid = true
        message += "Max Seconds is 60<br>"
    }
    if (data["Minuites"] == "") {
        invalid = true
        message += "Minuites cannot be empty type 0 instead<br>"
    }
    if (data["Sets"] == "") {
        invalid = true
        message += "Sets cannot be empty type 0 instead<br>"
    }
    if (data["weight"] == "") {
        invalid = true
        message += "Weight cannot be empty type 0 instead<br>"
    }
    if (data["Reps"] == "") {
        invalid = true
        message += "Reps cannot be empty type 0 instead<br>"
    }
    if (data["Seconds"] == "") {
        invalid = true
        message += "Seconds cannot be empty type 0 instead<br>"
    }
    if (invalid == true) {
        return message
    }

}
