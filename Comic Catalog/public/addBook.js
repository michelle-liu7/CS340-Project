function validateInput(){
  var validTitleInput = /^[a-zA-Z0-9:\s]+$/;
  var validIssueInput = /^[0-9]{1,}$/;
  var validUPCInput = /^[0-9]{12,12}$/;
  var validPriceInput = /^[0-9]*[.]?[0-9]+$/;


  if (!(document.getElementById("add_title").value.match(validTitleInput))){
      alert("Invalid title: please enter only letters, numbers and ':'");
      return false;
  }

  if (!(document.getElementById("add_issue").value.match(validIssueInput))){
      alert("Invalid issue number: please enter numbers only");
      return false;
  }

  if (!(document.getElementById("add_upc").value.match(validUPCInput))){
      alert("Invalid UPC code: please enter a 12-digit code");
      return false;
  }

  if (!(document.getElementById("add_price").value.match(validPriceInput))){
      alert("Invalid price: please enter a valid price");
      return false;
  }

  if (document.getElementById("add_owner").value == ""){
      alert("Please choose an owner");
      return false;
  }

  if (document.getElementById("add_publisher").value == ""){
      alert("Please choose a publisher");
      return false;
  }

  if (document.getElementById("add_authors").value == ""){
      alert("Please choose an author");
      return false;
  }

  if (document.getElementById("add_genres").value == ""){
      alert("Please choose a genre");
      return false;
  }

  return true;
}

function addBook(){
  if(validateInput()){
    $.ajax({
      url: '/insertQueries/add_book',
      type: 'POST',
      data: $('#add_book').serialize(),
      statusCode: {
        202: function(){
          window.location.replace("../inventory");
        },
        409: function(){
          alert("A book with that UPC already exists in the database!\n\nPlease enter a different UPC");
        }
      }
  })
  }
};
