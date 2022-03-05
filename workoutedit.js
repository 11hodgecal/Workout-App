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
        inputs = `<div class="mb-3 row"><label class="col-sm-2 col-form-label">Seconds:</label><div class="col-sm-10"><input type="number" value="${item.seconds}"  class="form-control" id="Seconds" name="Seconds" /></div></div>`

    }
    if (item.type == "Strength") {
        inputs = `<div class="mb-3 row"><label class="col-sm-2 col-form-label">Sets:</label><div class="col-sm-10"><input value="${item.sets}" type="number" class="form-control" id="Sets" name="Sets" /></div></div><div class="mb-3 row"><label class="col-sm-2 col-form-label">Reps:</label><div class="col-sm-10"><input value="${item.reps}" type="number" class="form-control" id="Reps" name="Reps" /></div></div><div class="mb-3 row"><label class="col-sm-2 col-form-label">Weight(Kg):</label><div class="col-sm-10"><input value="${item.weight}" type="number" class="form-control" id="weight" name="weight" /></div></div>`


    }
    if (item.type == "Endurance") {
        inputs = `<div class="mb-3 row"><label class="col-sm-2 col-form-label">Minuites:</label><div class="col-sm-10"><input value="${item.minuites}" type="number" class="form-control" id="Minuites" name="Minuites" /></div></div>`
    }


    //diplays the type dependant inputs
    document.getElementById("WorkoutItemVars").innerHTML = inputs + `<button type="submit"  class="btn btn-gold">Edit</button><a href="WorkoutView.html" type="submit" class="btn btn-gold">back</a>`


}

