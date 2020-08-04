function deleteAuthor(id){
    $.ajax({
        url: '/authors/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};