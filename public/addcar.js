const submitButton = document.getElementById('submit-button')
const addCarForm = document.getElementById('add-car-form')
//==========================================
// Send a Car to the DataBase
//==========================================
console.log(submitButton)

submitButton.onclick = () =>{
console.log(addCarForm.elements)
var formData =  {
  id: 13,
  make: addCarForm[0].value,
  model: addCarForm[1].value,
  year: addCarForm[2].value,
  price: addCarForm[3].value,
  color: addCarForm[4].value,
  description: addCarForm[0].value,
  image: addCarForm[0].value,
  specs: addCarForm[0].value,
  highlights: addCarForm[0].value
}

const xhr = new XMLHttpRequest;  
const url = `/addnewcar?make=${formData.make}&model=${formData.model}&year=${formData.year}&price=${formData.price}
&color=${formData.color}&description=${formData.description}&image=${formData.image}&specs=${formData.specs}&highlights=${formData.highlights}`;
console.log("Sent Request..")
  xhr.responseType ="json";
  xhr.onreadystatechange = () =>{
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.response)
        }
  }
  console.log("Data Sent", xhr.data)
  xhr.open('POST', url)
  xhr.send();
}