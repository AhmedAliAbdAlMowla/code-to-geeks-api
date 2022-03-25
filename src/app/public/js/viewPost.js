let main_container = document.getElementById("main-container");
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];


var urlParams;
(window.onpopstate = function () {
  var match,
    pl = /\+/g, // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) {
      return decodeURIComponent(s.replace(pl, " "));
    },
    query = window.location.search.substring(1);

  urlParams = {};
  while ((match = search.exec(query)))
    urlParams[decode(match[1])] = decode(match[2]);
})();

axios
  .get(`http://localhost:4000/api/v1/post/${urlParams.id}`)
  .then(function (response) {

    let  now = new Date(response.data.post.createdAt);
    let createdAt_with_new_format =  months[now.getMonth()] +" " + now.getDay() +", "+ now.getFullYear()


    let slug = `
    <div class = "slug-container">
       <h1>${response.data.post.slug}</h1>
       <div class="date-container">
          <h5 style ="color:#ADB5C3">
          ${createdAt_with_new_format}
          </h5> 
        </div>
    </div>`;
    main_container.innerHTML = slug + response.data.post.html;

    hljs.highlightAll();

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
