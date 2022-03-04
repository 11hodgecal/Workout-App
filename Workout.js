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
    
    

}