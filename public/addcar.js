const submitButton = document.getElementById('submit-button')

//==========================================
// Send a Car to the DataBase
//==========================================
console.log(submitButton)
submitButton.onclick = () =>{
const xhr = new XMLHttpRequest;
const url = "/addnewcar";
console.log("Sent Request..")
  xhr.responseType ="json";
const data =  JSON.stringify({
  id: 13,
  make: "Ford",
  model: "Fusion",
  year: 2014,
  price: "$10,500",
  color: "silver",
  description: 'New Battery! Only 70,000 miles. Lot of Life Left!',
  image: "ford-fusion.jpg",
  specs: ["1.4L", "Gasoline", "Automatic", "26 city/ 38 hwy"],
  highlights: ["Bluetooth", "Satellite Radio", "Keyless Entry", "Traction Control"]
})
  xhr.onreadystatechange = () =>{
        if (xhr.readyState === XMLHttpRequest.DONE) {
            
        }
  }
  console.log("Data Sent", data)
  xhr.open('POST', url)
  xhr.send(data);
}