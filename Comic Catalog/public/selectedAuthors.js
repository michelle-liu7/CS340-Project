var aid_list = [];

function authorIdList(id){
   aid_list.push(id);
}

function selectAuthors() {
   $("#author_selector").val(aid_list);
}