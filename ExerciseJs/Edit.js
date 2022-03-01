

//allows the admin to edit the exercises
async function editfinal()  {
    //gets the forwarded id and puts the data into a variable
    let id = window.sessionStorage.getItem("ForwardID")
    let formData = new FormData(EditEx)
    let data = {}
    formData.forEach((value, key) => {
        data[key] = value;

    })
    // tells the server the specific exercise has a edit
    let response = await fetch(`https://localhost:7267/api/activities/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        
    })
    //if sucessfull the forwarded id will be removed and the user will be redirected to the index of the exercise crud
    if (response.status == 204) {
        window.sessionStorage.removeItem("ForwardID")
        window.location.href="index.html"
    } else {
        console.log("Edit Invalid")
        
    }


}

//allows the existing objects attributes to to be displayed on the inputs when the edit page is loaded
async function EditPage(){
    //gets the forwarded id and puts the data into a variable
    let id = window.sessionStorage.getItem("ForwardID")

    //retrieves the information on that specific exercise
    let response = await fetch(`https://localhost:7267/api/activities/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    //gets the result
    let result = await response.json()

    //selects the results type then puts it as the selected in the html
    var selected = "" 
    if(result.type == "Endurance"){
       selected = `"<select name="type" id="inputtype" class="form-select" aria-label="Default select example"><option selected value="Endurance">Endurance</option><option value="Strength">Strength</option><option value="Flexibility">Flexibility</option></select>"`
    }
    if(result.type == "Strength"){
        selected = `"<select name="type" id="inputtype" class="form-select" aria-label="Default select example"><option  value="Endurance">Endurance</option><option selected value="Strength">Strength</option><option value="Flexibility">Flexibility</option></select>"`
    }
    if(result.type == "Flexibility"){
        selected = `"<select name="type" id="inputtype" class="form-select" aria-label="Default select example"><option  value="Endurance">Endurance</option><option value="Strength">Strength</option><option selected  value="Flexibility">Flexibility</option></select>"`
    }
    //the html containing the results name and and selected type as the default values 
    var editform = `<h1 class="">Edit exercise</h1><div class="mb-3 row"><label class="col-sm-2 col-form-label">Name:</label><div class="col-sm-10"><input type="text" value="${result.name}" class="form-control" id="name" name="name"  /><input type="hidden" class="form-control" value="${id}" id="id" name="id" /></div></div><div class="mb-3 row"><label for="inputtype" class="col-sm-2 col-form-label">Type:</label><div class="col-sm-10">${selected}</div></div>`
    var form = document.getElementById("form").innerHTML = editform //generates the html on the edit page
}