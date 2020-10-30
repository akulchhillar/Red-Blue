
    let turn = null
    let new_turn = null

    const unused_tiles = []


    let socket = io.connect(window.origin +"/seek")

    socket.on("connect",()=>{socket.send(window.location.pathname.split("/")[2])})
    socket.on("message",(msg)=>{document.getElementById("player-status").innerText=msg})
 

    const squares = document.querySelectorAll("#board button")
squares.forEach(square=>{
    square.addEventListener("click",relevantsquare)
    
   
})

socket.on("rs",(msg)=>{
    for (let element in msg){
        document.getElementById(msg[element]).style.backgroundColor="#2980b9"
        
        unused_tiles.push(document.getElementById(msg[element]))
    }
    
})


function seekserver(data){
    socket.emit("ss",data)    
}

function send_turn_to_server(msg){
    socket.emit("sttsr",msg)
    
}

socket.on("sttcr", (msg)=>{new_turn = msg
    set_message_player()

})

let message_player = null

function set_message_player(){
    if ((turn =="red"||turn==null||new_turn=="red")){
        message_player = "It's your turn"
        }
        
    else if(turn=="blue"){
            message_player="It's player blue's turn"
        }
        
    


    document.getElementById("red-score").innerText = "Red: " + document.querySelectorAll('button[style="background-color: rgb(192, 57, 43);"]').length
    document.getElementById("blue-score").innerText = "Blue: " + document.querySelectorAll('button[style="background-color: rgb(41, 128, 185);"]').length

    if ((document.querySelectorAll('button[style="background-color: rgb(192, 57, 43);"]').length)+(document.querySelectorAll('button[style="background-color: rgb(41, 128, 185);"]').length)==64){
        if (document.querySelectorAll('button[style="background-color: rgb(41, 128, 185);"]').length>document.querySelectorAll('button[style="background-color: rgb(192, 57, 43);"]').length){
            message_player = "Blue player won, you lost!"
        }

        else if (document.querySelectorAll('button[style="background-color: rgb(41, 128, 185);"]').length==document.querySelectorAll('button[style="background-color: rgb(192, 57, 43);"]').length){
            message_player = "It's a tie!"
        }            
        else{
            message_player = "You Won!"
        }
    }

    document.getElementById("turn").innerText = message_player


}
set_message_player()
// setInterval(set_message_player,100)


function relevantsquare(){
    const grid = 8
    
    if (unused_tiles.length == 0) {
        turn = "red"
    }

  else if(new_turn !==null){
      turn = new_turn
  }

  else{
      turn = turn
  }


    if ((this.id%grid == 1)&&(unused_tiles.includes(this)==false)&&(turn=="red"))  {

        let res = []

        res.push(this.nextElementSibling)
        res.push(this)
        this.nextElementSibling.style.backgroundColor="#c0392b";
        this.style.backgroundColor="#c0392b";
        unused_tiles.push(this.nextElementSibling)
        unused_tiles.push(this)
        

       try{
           res.push(this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling)
           this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.backgroundColor="#c0392b"
           unused_tiles.push(this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling)

       }
       catch(err){

       }

      try{
          res.push(this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling)
          this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.style.backgroundColor="#c0392b"
          unused_tiles.push(this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling)

      }
      catch(err){

      }

      let filtered_res = res.filter(el=>{return el!= null})
      
      let id = filtered_res.map(n=>{
          return n.id
      })
      
      seekserver([id,window.location.pathname.split("/")[2]])
      send_turn_to_server(["blue",window.location.pathname.split("/")[2]])
      new_turn=null
      turn="blue"
      set_message_player()
      
      
      
      
      


      
        
    }
    else if ((this.id%grid == 0)&&(unused_tiles.includes(this)==false)&&(turn=="red")) {
        
        let res = []

        
        res.push(this.previousElementSibling)
        unused_tiles.push(this.previousElementSibling)
        this.previousElementSibling.style.backgroundColor="#c0392b";

        res.push(this)
        this.style.backgroundColor="#c0392b";
        unused_tiles.push(this)

        try{
            res.push(this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling)
            this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.backgroundColor="#c0392b"
            unused_tiles.push(this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling)


        }


        catch(err){

        }


        try{
            res.push(this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling)
            this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.style.backgroundColor="#c0392b"
            unused_tiles.push(this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling)

        }
        catch(err){

        }

        let filtered_res = res.filter(el=>{return el!= null})
        
        let id = filtered_res.map(n=>{
            return n.id
        })
        seekserver([id,window.location.pathname.split("/")[2]])
        send_turn_to_server(["blue",window.location.pathname.split("/")[2]])
        new_turn=null
        turn="blue"
        set_message_player()
        
        
    }

    else if((unused_tiles.includes(this)==false)&&(turn=="red")){

        let res = []

        res.push(this.previousElementSibling)
        unused_tiles.push(this.previousElementSibling)
        this.previousElementSibling.style.backgroundColor="#c0392b"

        res.push(this)
        this.style.backgroundColor="#c0392b";
        unused_tiles.push(this)

        res.push(this.nextElementSibling)
        unused_tiles.push(this.nextElementSibling)
        this.nextElementSibling.style.backgroundColor="#c0392b"



        try{
            res.push(this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling)
            this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.backgroundColor="#c0392b"
            unused_tiles.push(this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling)

        }
        catch(err){

        }

        try{
            res.push(this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling)
            this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.style.backgroundColor="#c0392b"
            unused_tiles.push(this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling)


        }
        catch(err){
            
        }



        let filtered_res = res.filter(el=>{return el!= null})
        
        let id = filtered_res.map(n=>{
            return n.id
        })
        seekserver([id,window.location.pathname.split("/")[2]])
        send_turn_to_server(["blue",window.location.pathname.split("/")[2]])
        new_turn=null
        turn="blue"
        set_message_player()
        
        
        
    }
}






