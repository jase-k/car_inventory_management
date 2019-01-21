//This Sets the Id from the URL
const pathName = document.location.pathname
var paths = pathName.split('/')
var id = paths[2]

console.log(id)

const submitButton = document.getElementById('submit-button')
const addCarForm = document.getElementById('add-car-form')

//input Fields///
const makeField = document.getElementById('make')
const modelField = document.getElementById('model')
const yearField = document.getElementById('year')
const priceField = document.getElementById('price')
const colorField = document.getElementById('color')
const descriptionField = document.getElementById('description')
const imageField = document.getElementById('image')
const specsField = document.getElementById('specs')
const highlightsField = document.getElementById('highlights')

function presetInputFields(object){
  console.log("makeField", makeField)
  makeField.value = object.make
  modelField.value = object.model
  yearField.value = object.year
  priceField.value = object.price
  colorField.value = object.color
  imageField.value = object.image
  descriptionField.value = object.description
  specsField.value= object.specs.join(",")
  highlightsField.value = object.highlights.join(",")
}

//==========================================
// Send a Car to the DataBase
//==========================================
//console.log(submitButton)
const xhr = new XMLHttpRequest;  
const url = `/editcar?id=${id}`;
console.log("Sent Request..")
  xhr.responseType ="json";
  xhr.onreadystatechange = () =>{
        if (xhr.readyState === XMLHttpRequest.DONE) {
          console.log(xhr.response)  
          presetInputFields(xhr.response)
        }
  } 
  xhr.open('GET', url)
  xhr.send();


submitButton.onclick = () =>{
console.log(addCarForm.elements)
var formData =  {
  make: addCarForm[0].value,
  model: addCarForm[1].value,
  year: addCarForm[2].value,
  price: addCarForm[3].value,
  color: addCarForm[4].value,
  description: addCarForm[5].value,
  specs: addCarForm[6].value,
  highlights: addCarForm[7].value,
  image: addCarForm[8].value
}
// ||formData.model !== ''||formData.year !== ''||formData.price !== ''||formData.color !== ''  ||formData.description !== ''||formData.specs !== '' || formData.highlights !== ''
if(formData.make !== ''){
const xhr = new XMLHttpRequest;  
const url = `/updatecar?id=${id}&make=${formData.make}&model=${formData.model}&year=${formData.year}&price=${formData.price}
&color=${formData.color}&description=${formData.description}&image=${formData.image}&specs=${formData.specs}&highlights=${formData.highlights}`;
console.log("Sent Request..")
  xhr.responseType ="json";
  xhr.onreadystatechange = () =>{
        if (xhr.readyState === XMLHttpRequest.DONE) {
            alert('Succes!')
        }
  } 
  console.log("Data Sent", xhr.data)
  xhr.open('PUT', url)
  xhr.send();
  }else{ alert("Please Complete the Form before Submitting")}
}
