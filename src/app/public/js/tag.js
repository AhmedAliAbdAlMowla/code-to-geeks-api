let table = document.getElementById("table");
let pageSize = 10;
let total = 0;
let tags;

axios
  .get(`http://localhost:4000/api/v1/tag/?pageNumber=1&pageSize=${pageSize}`)
  .then(function (response) {
    total = response.data.total;
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ pagenation ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    let number_of_pages = Math.ceil(total / pageSize);
    let pagenation_container = document.getElementById(
      "pagenation-main-container"
    );

    let first_load = true;
    pagenation_container.innerHTML = `<li class="page-item disabled">
    <span class="page-link" id="button_prev">Previous</span>
  </li>`;
    for (let i = 1; i <= number_of_pages; i++) {
      page = `
  <li class="page-item ${
    first_load ? "active" : ""
  } " aria-current="page" id = "page_key${i}" onclick = "change_page(${i})">
            <span class="page-link">${i}</span>
          </li>
  `;
      let html_base = pagenation_container.innerHTML;

      pagenation_container.innerHTML = html_base + page;
      first_load = false;
    }

    let next_btn = ` </li>
        
<a class="page-link" href="#" id="button_next">Next</a>
</li>`;

    pagenation_container.innerHTML = pagenation_container.innerHTML + next_btn;

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  })
  .catch(function (error) {
    // handle error
    let error_message;
    if (error.response)
      error_message =
        "Api get endpoint  faild with status code " + error.response.status;
    else error_message = error.message;
    let html_error_message = ` <div class="alert alert-danger alert-dismissible fade show">
    <strong>Error!</strong> ${error_message}.
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>`;
    document.getElementById("main-container").innerHTML += html_error_message;
  });

renderItems(1);

function renderItems(page) {
  axios
    .get(
      `http://localhost:4000/api/v1/tag/?pageNumber=${page}&pageSize=${pageSize}`
    )
    .then(function (response) {
      table.innerHTML = "";
      // handle success
      total = response.data.total;
      tags = response.data.tags;
      let count = 0;
      tags.map((i, j) => {
        let row = `<tr id="row_key${j}">
    <th scope="row" >${(page - 1) * pageSize + j + 1}</th>
    <td  class="text-center">${i.name}</td>
    <td  class="text-center">
    <div class="color-box " style="background-color: ${i.color};">
    ${i.color}
           </div>
    
    </td>
    <td  class="text-center">${i.author}</td>
    
    
    <td  class="text-center">${i.createdAt}</td>
    <td  class="text-center">
    
    <button type="button" class="btn btn-info">
    <i class="fa-solid fa-pen-clip"></i>
    </button>
    
    <button type="button" class="btn btn-danger ">
    <i class="fa-solid fa-trash-can"></i>
    </button>
    
    </td>
    
    
    
    </tr>`;
        table.innerHTML = table.innerHTML + row;
        count++;
      });
    })
    .catch(function (error) {
      // handle error
      let error_message;
      if (error.response)
        error_message =
          "Api get endpoint  faild with status code " + error.response.status;
      else error_message = error.message;
      let html_error_message = ` <div class="alert alert-danger alert-dismissible fade show">
      <strong>Error!</strong> ${error_message}.
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  </div>`;
      document.getElementById("main-container").innerHTML += html_error_message;
    });
}

function change_page(index) {
  document.getElementById(
    document.getElementsByClassName("page-item active")[0].id
  ).className = "page-item";

  document.getElementById("page_key" + index).className = "page-item active";
  renderItems(index);
}



// ~~~~~~~~~~~~~~~~~~~~~~~~ create new tag ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function createTag(){
  let name = document.getElementById("name").value;
  let color = document.getElementById("color").value;
  let description = document.getElementById("description").value;
  if(name == "" ){
     alert("Name is require !..");
     return;
  }
  else if(color == ""){
    alert("Color is require !..");
    return;
  }
  else if(description == ""){
  alert("Description is require !..");
return
  }

  
  
  axios.post('http://localhost:4000/api/v1/tag/', {
    name: name,
    description: description,
    color:color,
    author:"6233b7bd5856d4f8c062a958",
  })
  .then(function (response) {
    if(response.status == 201){
      alert("Tag sucess created .")
    } 
  })
  .catch(function (error) {
    let error_message;
      if (error.response)
        error_message =
          "Api post endpoint  faild with status code: [ " + error.response.status + "] with message : ["+error.response.data.message+" ]";
      else error_message = error.message;
      alert(error_message);
  });


}