var gid_list = [];

function genreIdList(id){
   gid_list.push(id);
}

function selectGenres() {
   $("#genre_selector").val(gid_list);
}