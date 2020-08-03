function deletePublisher(id){
    $.ajax({
        url: '/publishers/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};