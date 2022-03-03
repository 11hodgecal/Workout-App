//starts the service worker
if ("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(registration =>{
        console.log("SW Registered")
        console.log(registration)
    }).catch(error =>{
        console.log("sw failed")
        console.log(error)
    })
}