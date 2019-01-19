const submitButton = document.getElementById('submit-button')

//==========================================
// Send a Car to the DataBase
//==========================================
console.log(submitButton)
submitButton.onclick = () =>{
var formData =  {
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
}

const xhr = new XMLHttpRequest;  
const url = `/addnewcar?make=${formData.make}&model=${formData.model}&year=${formData.year}&price=${formData.price}
&color=${formData.color}&description=${formData.description}&image=${formData.image}&specs=${formData.specs}&highlights=${formData.highlights}`;
console.log("Sent Request..")
  xhr.responseType ="json";
  xhr.onreadystatechange = () =>{
        if (xhr.readyState === XMLHttpRequest.DONE) {
            
        }
  }
  console.log("Data Sent", xhr.data)
  xhr.open('POST', url)
  xhr.send("make=Ford&Model=Focus");
}