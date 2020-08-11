function validateUpdateInput(){
    var validTitleInput = /^[a-zA-Z0-9:\s]+$/;
    var validIssueInput = /^[0-9]{1,}$/;
    var validUPCInput = /^[0-9]{12,12}$/;
    var validPriceInput = /^[0-9]*[.]?[0-9]+$/;


    if (!(document.getElementById("update_title").value.match(validTitleInput))){
        alert("Invalid title: please enter only letters, numbers and ':'");
        return false;
    }

    if (!(document.getElementById("update_issue").value.match(validIssueInput))){
        alert("Invalid issue number: please enter numbers only");
        return false;
    }

    if (!(document.getElementById("update_upc").value.match(validUPCInput))){
        alert("Invalid UPC code: please enter a 12-digit code");
        return false;
    }

    if (!(document.getElementById("update_price").value.match(validPriceInput))){
        alert("Invalid price: please enter a valid price");
        return false;
    }

    if (document.getElementById("owner_selector").value == ""){
        alert("Please choose an owner");
        return false;
    }

    if (document.getElementById("publisher_selector").value == ""){
        alert("Please choose a publisher");
        return false;
    }

    if (document.getElementById("author_selector").value == ""){
        alert("Please choose an author");
        return false;
    }

    if (document.getElementById("genre_selector").value == ""){
        alert("Please choose a genre");
        return false;
    }

    return true;
}

function updateBook(id){
    if(validateUpdateInput()){
        $.ajax({
            url: '/inventory/' + id,
            type: 'PUT',
            data: $('#update_book').serialize(),
            success: function(result){
                console.log(result);
                window.location.replace("./");
            }
        })
    }
};