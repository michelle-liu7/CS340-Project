function filterByGenre() {
    //get the id of the selected genre from dropdown
    var genre_id = document.getElementById('genre_filter').value;
    //redirect to the designated URL
    window.location = '/inventory/genre/' + parseInt(genre_id);
}