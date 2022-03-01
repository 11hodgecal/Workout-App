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
    let result = await response.json()
    // puts the workouts into a objects
    var userworkouts =  Object.values(result)

    //delete all workouts from the array that are not the current users
    for (i = 0; i < userworkouts.length; i++){
        if(userworkouts[i].userid != Userid){
            userworkouts.splice(i)
        }
    }

    //displays the users workouts
    for (i = 0; i < userworkouts.length; i++){
        document.getElementById("workouts").innerHTML += `<div class="card bg-black text-center space" ><div class="card-body "><h5 id ="goldtxt" class="card-title ">${userworkouts[i].name}</h5><a id="${userworkouts[i].id}" onclick="Getworkout(this.id)" class="btn  btn-gold-inverse">View Workout</a></div></div>`
    }
}
async function Getworkout(clicked_id){

}