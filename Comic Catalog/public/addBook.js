function addBook(){
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
};
