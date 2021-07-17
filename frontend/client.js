
const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading')
const mewElement = document.querySelector('.content')
loadingElement.style.display = 'none'
const API_URL = "http://localhost:3000/mews"
listAllmews();
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    console.log(event);
    const formData = new FormData(form)
    
    const name=formData.get('name')
    const content = formData.get('content')
    console.log(name)
    const mew = {
        name,
        content
    }
    
    form.style.display = 'none';
    loadingElement.style.display=""
    
    fetch(API_URL, {
        
        method: 'POST',
        body: JSON.stringify(mew),
        headers: {
          'content-type': 'application/json'
        }
    }).then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        form.reset()
        form.style.display=''
        loadingElement.style.display='none'
        listAllmews()
        // addElement(data)
    })
  
});

function addElement (data) {
  // create a new div element
  const newDiv = document.createElement("div");

  // and give it some content
  const newContent = document.createTextNode(data.name,data.content);

  // add the text node to the newly created div
  newDiv.appendChild(newContent);

  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById("div1");
  document.body.insertBefore(newDiv, currentDiv);
}

function listAllmews(){
  fetch(API_URL)
  .then(response=>response.json())
  .then(mews=>
    {
      console.log(mews)
      mews.forEach(mew => {
        const div = document.createElement('div')
        const header = document.createElement('h3')
        header.textContent = mew.name
        const contents = document.createElement('p')
        contents.textContent = mew.content
        div.appendChild(header)
        div.appendChild(contents)
        mewElement.appendChild(div)
       
        
      });
    });
}
