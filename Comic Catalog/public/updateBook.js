function updateBook(id){
    $.ajax({
        url: '/inventory/' + id,
        type: 'PUT',
        data: $('#update_book').serialize(),
        success: function(result){
            onsole.log(result);
            window.location.replace("./");
        }
    })
};