//display correct functions for current user in nav
function NavCheck() {
    //nav item ob
    var navitems = document.getElementById("moreNav")

    try {
        //gets the token and user role
        let token = window.localStorage.getItem('token')
        let role = window.localStorage.getItem('role')
        //if the user is not logged in only show 
        if (token == null) {
            //allow users without a token to login and register a account
            navitems.innerHTML = "<ul id = 'nav-items ' class='navbar-nav me-auto mb-2 mb-lg-0'><li class='nav-item'><a id ='goldtxt' class='nav-link active' aria-current='page' href='register.html'>Register</a></li><li class='nav-item'><a id ='goldtxt' class='nav-link active' aria-current='page' href='index.html'>Log in</a></li></ul>"


        } else {
            if (role == "user") {
                //allow regular users to logout and manage workouts
                navitems.innerHTML = "<ul id = 'nav-items ' class='navbar-nav me-auto mb-2 mb-lg-0'><li class='nav-item'><a id ='goldtxt' class='nav-link active' href='WorkoutIndex.html' aria-current='page' >Workouts</a></li><li class='nav-item'><a id ='goldtxt' class='nav-link active' onclick='logout()' aria-current='page' >Logout</a></li></ul>"
            } else if (role == "admin") {
                //allow admins to logout and manage workouts as well as manage exercises
                navitems.innerHTML = "<ul id = 'nav-items ' class='navbar-nav me-auto mb-2 mb-lg-0'><li class='nav-item'><a id ='goldtxt' class='nav-link active' href='WorkoutIndex.html' aria-current='page' >Workouts</a></li><li class='nav-item'><a id ='goldtxt' class='nav-link active' href='./ExerciseCrud/Index.html' aria-current='page' >Exercises</a></li><li class='nav-item'><a id ='goldtxt' class='nav-link active' onclick='logout()' aria-current='page' >Logout</a></li></ul>"
            }

        }
    } catch {
        console.log("not logged in")
    }
}
//same as last but navigation is sligtly different since it has an extra level
function NavCheckExercise() {
    //nav item object
    var navitems = document.getElementById("moreNav")

    try {
        
        let token = window.localStorage.getItem('token')
        let role = window.localStorage.getItem('role')
        if (token == null) {



        } else {
            //allow admins to logout and manage workouts as well as manage exercises
            if (role == "admin") {
                navitems.innerHTML = "<ul id = 'nav-items ' class='navbar-nav me-auto mb-2 mb-lg-0'><li class='nav-item'><a id ='goldtxt' class='nav-link active' href='../WorkoutIndex.html' aria-current='page' >Workouts</a></li><li class='nav-item'><a id ='goldtxt' class='nav-link active' href='../ExerciseCrud/Index.html' aria-current='page' >Exercises</a></li><li class='nav-item'><a id ='goldtxt' class='nav-link active' onclick='logout()' aria-current='page' >Logout</a></li></ul>"
            }

        }
    } catch {
        console.log("not logged in")
    }
}

//lets the user logout
async function logout() {

    //tells the server about the logout
    let response = await fetch('https://localhost:7267/api/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    //remove user information
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('id')
    window.localStorage.removeItem('role')

    //directs the user to the login page 
    var href = window.location.href.toString()
    href = href.includes("/ExerciseCrud/Index.html")
    if(href == true){
        window.location.href = '../index.html'
    }
    else{
        window.location.href = './index.html'
    }
    
}