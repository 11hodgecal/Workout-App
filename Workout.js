//Greets the user on login
function Greeting(){
    //gets the users name stored in localstorage then displays it on the greeting
    let Fname = window.localStorage.getItem('Fname')
    let Sname = window.localStorage.getItem('Sname')
    document.getElementById("Greeting").innerHTML = `Hello ${Fname +" "+Sname}!`
}
// gets the users workouts
async function GetUserWorkouts(){
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
    for (i = 0; i < userworkouts.length; i++){
        if(userworkouts[i].userid == Userid){
            document.getElementById("workouts").innerHTML += `<div class="card bg-WorkoutItem text-center space" ><div class="card-body "><h5 id ="goldtxt" class="card-title ">${userworkouts[i].name}</h5><a id="${userworkouts[i].id}" onclick="Getworkout(this.id)" class="btn  btn-gold-inverse">View Workout</a></div></div>`
        }
    }

}
//forwards id onto workout view then goes to it
function Getworkout(clicked_id){
    var id = clicked_id
    window.sessionStorage.setItem("ForwardID", id)
    window.location.href = "WorkoutView.html"
}
//Puts the reqired information on the workout view
async function Workoutload(){
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
    for (i = 0; i < workoutitems.length; i++){


        if(workoutitems[i].type == "Flexibility"){
            document.getElementById("workoutitems").innerHTML +=`<div class="card  bg-WorkoutItem space"><div class="card-body "><h4 id="goldtxt" class="card-title ">${workoutitems[i].name}</h4><p id="silvertxt">${workoutitems[i].seconds +" "} Seconds</p><button id="${workoutitems[i].id}"  class="btn btn-gold-inverse ">Edit</button><button id="${workoutitems[i].id}"  class="btn btn-gold-inverse ">Delete</button></div></div>`
        }
        if(workoutitems[i].type == "Strength"){
            //if the strength exercise includes weight display it
            var weighttxt = ""
            if(workoutitems[i].weight != 0){
                weighttxt = ` Kg: ${workoutitems[i].weight}`
            }
            document.getElementById("workoutitems").innerHTML += `<div class="card  bg-WorkoutItem space"><div class="card-body "><h4 id="goldtxt" class="card-title ">${workoutitems[i].name}</h4><p id="silvertxt">Sets:${workoutitems[i].sets +"   "} Reps:${workoutitems[i].reps + weighttxt}  </p><button id="${workoutitems[i].id}" class="btn btn-gold-inverse ">Edit</button><button id="${workoutitems[i].id}"  class="btn btn-gold-inverse ">Delete</button></div></div>`
        }
        if(workoutitems[i].type == "Endurance"){
            document.getElementById("workoutitems").innerHTML += `<div class="card  bg-WorkoutItem space"><div class="card-body "><h4 id="goldtxt" class="card-title ">${workoutitems[i].name}</h4><p id="silvertxt">${workoutitems[i].minuites +" "}Minutes</p><button id="${workoutitems[i].id}"  class="btn btn-gold-inverse ">Edit</button><button id="${workoutitems[i].id}"  class="btn btn-gold-inverse ">Delete</button></div></div>`
        }
        
        
        
    }

}