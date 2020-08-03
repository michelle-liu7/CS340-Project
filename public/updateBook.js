function updateBook(id){
    $.ajax({
        url: '/inventory/' + id,
        type: 'PUT',
        data: $('#update_book').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};