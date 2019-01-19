const submitButton = document.getElementById('submit-button')
const addCarForm = document.getElementById('add-car-form')
//==========================================
// Send a Car to the DataBase
//==========================================
console.log(submitButton)

submitButton.onclick = () =>{
console.log(addCarForm.elements)
var formData =  {
  make: addCarForm[0].value,
  model: addCarForm[1].value,
  year: addCarForm[2].value,
  price: addCarForm[3].value,
  color: addCarForm[4].value,
  description: addCarForm[5].value,
  image: addCarForm[6].value,
  specs: addCarForm[7].value,
  highlights: addCarForm[8].value
}
// ||formData.model !== ''||formData.year !== ''||formData.price !== ''||formData.color !== ''  ||formData.description !== ''||formData.specs !== '' || formData.highlights !== ''
if(formData.make !== ''){
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
  }else{ alert("Please Complete the Form before Submitting")}
}
