//Rest API script -->
function fetchData() {
  fetch("https://swapi.dev/api/films/")
  .then(response => {
    if (!response.ok) {
      throw Error("ERROR");
    }
    return response.json();
  })
  .then(data => {
    console.log(data.results);
    const html = data.results.map(film => {
      return `
      <tr>      
      <td>${film.title}</td>
      <td>${film.director}</td>
      <td>${film.release_date}</td></tr>`;
    }).join("");    
    document.querySelector("#films").insertAdjacentHTML("afterbegin", html);
  }).catch(error => {
    console.log(error);
  });
}
fetchData();


//Comments section script -->
function setObject(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  function getObject(key) {
    var storage = window.localStorage,
        value = storage.getItem(key);
    return value && JSON.parse(value);
  }
  //Send Comment
  function sendComment(){
    var cText = $('.comment_area').val(),        
        cmtList = getObject('.cmt_items');      
  
    if (cmtList){
      cmtList.push({text: cText});
      setObject('.cmt_items', cmtList);
    }else{ //Add a comment
      setObject('.cmt_items', [{text: cText}]);
    }
    cText = $('.comment_area').val("");
    bindCmt();
  }
  
  function bindCmt(){
    var cmtListElement = $('.cmt_items'),
        cmtList = getObject('.cmt_items');  
    //Out with the old
    cmtListElement.empty();
    //And in with the new
    $.each(cmtList, function(i, k){
      cmtListElement.append( $('<p class="shadow-lg p-5 mb-5 bg-white">'+ k.text +'</p>') );
    });
    var count = $('.cmt_items').children().length;
    $("#counter").empty();
    $("#counter").append(count);
  }
 
  //comments on page ready
  $(function(){
    bindCmt();
  });