// post controller and input section

let tags,
  tags_selected = [];
let tags_box = document.getElementById("tags-container");
axios
  .get(`http://localhost:4000/api/v1/tag/?pageNumber=1&pageSize=500}`)
  .then(function (response) {
    tags = response.data.tags;

    var $input = $(".typeahead");
    $input.typeahead({
      source: tags,
      autoSelect: true,
      afterSelect: function (data) {
        addTagToContainerBox(data);
      },
    });

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

//  editor section
$("#summernote").summernote({
  placeholder: "Hello stand alone ui",
  tabsize: 3,
  height: 240,
  toolbar: [
    ["style", ["style"]],
    ["font", ["bold", "underline", "clear"]],
    ["color", ["color"]],
    ["para", ["ul", "ol", "paragraph"]],
    ["table", ["table"]],
    ["insert", ["link", "picture", "video"]],
    ["view", ["fullscreen", "codeview", "help"]],
  ],
});

//   test
function addCode() {
let language = document.getElementById('language');
let language_value = language.options[language.selectedIndex].value;
if(language_value === "not"){
  alert("Please select programing language  !");
  return;
}
  /*
          const editorContiner =  $('#summernote').summernote('code');
          console.log( editorContiner);
          */
  let contant = document.getElementById("code_container").value;
  let code = `<pre >
    <code class="${language_value} hljs">
  
       ${contant}
    </code>
  </pre>
  </div>
  <p> to wite again</p>
  `;
  $("#summernote").summernote(
    "code",
    $("#summernote").summernote("code") + code
  );

  modal.style.display = "none";
  hljs.highlightAll();

}

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

function close_modal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

function addTagToContainerBox(data) {
  tags_selected.push( data._id );
  console.log(tags_selected);
  // tags-container
  tags_box.innerHTML += 
`
<h5 style="display: inline;">
<span class="badge" style="background-color:${data.color};"> 
${data.name}</span>
</h5>

`;

}


function savePost(){

  let title = document.getElementById("post_title").value;
  let slug = document.getElementById("post_slug").value;

  if(title == "" ){
          alert("Title is require !");
          return;
 }
 else if(slug == ""){
          alert("Slug is require !");
          return;
 }
 else if(tags_selected.length == 0){
          alert("Please choose tags for your post !");
          return;
 }

 let post_html = $("#summernote").summernote("code");

 axios.post('http://localhost:4000/api/v1/post/', {
  title,
  slug,
  tags:tags_selected,
  author:"6233b7bd5856d4f8c062a958",
  html: post_html
})
.then(function (response) {
  if(response.status == 201){
    alert("Posts sucess created .")
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