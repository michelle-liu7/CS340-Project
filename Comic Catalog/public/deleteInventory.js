function deleteInventory(id){
    $.ajax({
        url: '/inventory/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};