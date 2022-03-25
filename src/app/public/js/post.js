
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

let table = document.getElementById("table");
let pageSize = 10;
let total = 0;
let posts;

axios
  .get(`http://localhost:4000/api/v1/post/?pageNumber=1&pageSize=${pageSize}`)
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
      `http://localhost:4000/api/v1/post/?pageNumber=${page}&pageSize=${pageSize}`
    )
    .then(function (response) {
      console.log(response.data.posts)
      table.innerHTML = "";
      // handle success
      total = response.data.total;
      posts = response.data.posts;
      let count = 0;
      posts.map((i, j) => {
        let row = `<tr id="row_key${j}">
    <th scope="row" >${(page - 1) * pageSize + j + 1}</th>
    <td  class="text-center">${i.title}</td>

    <td  class="text-center">${i.author.name}</td>
    <td  class="text-center">
    <div class="color-box " style="background-color: ${(i.tags[0].color)?i.tags[0].color:"#9F4CA2"};">
    ${i.tags[0].name}
           </div>
    
    </td>

    
    
    <td  class="text-center">${i.createdAt}</td>
    <td  class="text-center">
    
    <button type="button" class="btn btn-info">
    <i class="fa-solid fa-pen-clip"></i>
    </button>
    
    <button type="button" class="btn btn-danger "  onclick="delete_post('${i._id}')">
    <i class="fa-solid fa-trash-can"></i>
    </button>
    <button type="button" class="btn btn-primary" onclick="viewPost('${i._id}')" >
    <i class="fa-solid fa-eye"></i>
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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~redirect to create new post page~~~~~~~~~~~~~~~~~

function goToCreatePage(){
  window.location.href = "post/create";
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ viewPost ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function viewPost(id){
  window.location.href = `post/view/?id=${id}`;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~delete post~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function delete_post(id){
  var answer = window.confirm("Delete post ?");
  if (!answer) 
  return ;

  axios.delete(`http://localhost:4000/api/v1/post/${id}`)
  .then(function (response) {
 
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