

//==========================================
// Send a Car to the DataBase
//==========================================
const xhr = new XMLHttpRequest;
const url = __dirname+"/addnewcar";
console.log("Sent Request..")
  xhr.responseType ="json";
  xhr.onreadystatechange = () =>{
        if (xhr.readyState === XMLHttpRequest.DONE) {
            container.appendChild(displayGame(xhr.response))
        }
  console.log("Returned")
  }
  xhr.open('Get', url)
  xhr.send();