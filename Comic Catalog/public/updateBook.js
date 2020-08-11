function updateBook(id){
    $.ajax({
        url: '/inventory/' + id,
        type: 'PUT',
        data: $('#update_book').serialize(),
        statusCode: {
          202: function(){
            window.location.replace("./");
          },
          409: function(){
            alert("A book with that UPC already exists in the database!\n\nPlease enter a different UPC");
          }
        }
    })
};
