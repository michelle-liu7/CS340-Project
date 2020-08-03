function deleteCollector(id){
    $.ajax({
        url: '/collectors/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};