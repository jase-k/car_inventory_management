const display = document.getElementById('inventory-holder')

console.log(document)

const xhr = new XMLHttpRequest;  
const url = `/allcars`
console.log("Sent Request..")
  xhr.responseType ="json";
  xhr.onreadystatechange = () =>{
        if (xhr.readyState === XMLHttpRequest.DONE) {
             display.appendChild(formatResponse(xhr.response))
        }
  } 
  console.log("Data Sent", xhr.data)
  xhr.open('Get', url)
  xhr.send();
//What needs to be created
 /* <div class="listing">
        <div class="image">
          <img src="https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/media/assets/submodel/8640.jpg" />
        </div>
        <div class="details">
          <div class="quick-facts">
            <div class="quickfactsDiv">
            <h3 class="make">  
              Tesla
            </h3>
            <h3 class="model">
              Model S
            </h3>
            <h3 class="year">
              2018
            </h3>
            </div>
            <div class="quickfactsDiv">
            <h4>
              Price:
            </h4>
            <p class="price">
              $100,000
            </p>
            <h4>
              Color:
            </h4>
            <p class="color">
              Silver
            </p>
            </div>
          </div>
          <div class="specs-highlights">
            <h4>
              Specs:
            </h4>
            <ul class ="specs">
              <li>1.4L</li>
              <li>Gasoline</li>
              <li>Automatic</li>
              <li>26 city/38 hwy</li>
            </ul>
            <h4>
              Highlights:
            </h4>
            <ul class="highlights">
              <li>Bluetooth</li>
              <li>Satellite Radio</li>
              <li>Keyless Entry</li>
              <li>Traction Control</li>
            </ul>
          </div>
          <div class="description">
            <h4>
              Description
            </h4>
            <p>
              Great Car should sell for over $10,000 to the right person. 
            </p>
          </div>
        </div>
  </div> */
function createElement(type, className, parentElement){
  var element = document.createElement(type)
  if(className){element.classList.add(className)}
  if(parentElement){
    parentElement.appendChild(element)
  }
    return element
}

function createListElements(array, className, ParentElement){
  var ul = createElement("ul", className)
    for(var i=0; i < array.length; i++){
    var li = createElement("li", null, ul)
      li.innerHTML = array[i]
    }
ParentElement.appendChild(ul)
}
function formatResponse(array){
  console.log(array)
  var inventorySection = createElement("section", "inventory-holder")
for(var i = 0; i < array.length; i++){ 
var listingDiv =  createElement("div", "listing")
  var imageDiv = createElement("div", "image", listingDiv)
    var image = createElement("img", null , imageDiv)
    image.src = array[i].image

  var detailsDiv = createElement("div", "details", listingDiv)
    var quickfactsDiv = createElement("div", "quick-facts", detailsDiv)  
      var quickfactsChildDiv1 = createElement("div", "quickfactsDiv", quickfactsDiv)
        var makeH3 = createElement("h3", "make", quickfactsChildDiv1)
          makeH3.innerHTML = array[i].make
        var modelH3 = createElement("h3", "model", quickfactsChildDiv1)
          modelH3.innerHTML = array[i].model
        var yearH3 = createElement("h3", "year", quickfactsChildDiv1)
          yearH3.innerHTML = array[i].year
      var quickfactsChildDiv2 = createElement("div", "quickfactsDiv", quickfactsDiv)
        var priceH4 = createElement("h4", null , quickfactsChildDiv2)
            priceH4.innerHTML = "PRICE:"
        var priceP = createElement("p", "price", quickfactsChildDiv2)
            priceP.innerHTML = array[i].price
        var colorH4 = createElement("h4", null, quickfactsChildDiv2)
            colorH4.innerHTML = "COLOR:"
        var colorP = createElement("p", "color", quickfactsChildDiv2)
            colorP.innerHTML = array[i].color
    var specshighlightsDiv = createElement("div", "specs-highlights", detailsDiv)
        var specsH4 = createElement("h4", null, specshighlightsDiv)
            specsH4.innerHTML = "Specs:"
        var specsList = createListElements(array[i].specs, "specs", specshighlightsDiv)
        var highlightsH4 = createElement("h4", null, specshighlightsDiv)
            highlightsH4.innerHTML = "Highlights:"
        var highlightsList = createListElements(array[i].highlights, "highlights", specshighlightsDiv)
    var descriptionDiv = createElement("div", "description", detailsDiv)
        var descriptionH4 = createElement("h4", null, descriptionDiv)
            descriptionH4.innerHTML = "Description:"
        var descriptionP = createElement("p", null, descriptionDiv)
            descriptionP.innerHTML = array[i].description
    listingDiv.id = array[i].id
    display.appendChild(listingDiv)
    }
  console.log("listing Div", listingDiv)

  return inventorySection
  }