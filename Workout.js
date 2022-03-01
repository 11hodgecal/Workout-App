//Greets the user on login
new function Greeting(){
    //gets the users name stored in localstorage then displays it on the greeting
    let Fname = window.localStorage.getItem('Fname')
    let Sname = window.localStorage.getItem('Sname')
    document.getElementById("Greeting").innerHTML = `Hello ${Fname +" "+Sname}!`
}