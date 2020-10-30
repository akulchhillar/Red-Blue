let button = document.getElementById("game-button")

button.addEventListener("click",()=>{
    document.getElementById("seek-line").style.display="block"
    document.getElementById("hide-line").style.display="block"
    
    button.innerText = "Create another game"


    fetch(window.origin+"/slug").then(data=>data.json()).then(data=>{
        
        document.getElementById("seek-link").href= window.origin +"/seek/" + data["game_id"],
        document.getElementById("hide-link").href= window.origin +"/hide/" +data["game_id"],
        document.getElementById("seek-link").innerText= window.origin +"/seek/" + data["game_id"],
        document.getElementById("hide-link").innerText= window.origin +"/hide/" +data["game_id"]}
        )
})