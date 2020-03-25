const DEFAULT_FETCH = 'default-fetch'
      ,UP_FETCH = 'up-fetch'
      ,DOWN_FETCH = 'down-fetch';

const DATA_PAGE = "data-page";
const DEFAULT_COLUMN = 5;

let a = 0;
const min = 1;
let max = 0;

function getPageNumber(){
  const pageNumber = $('.js-page-number').attr(DATA_PAGE);
  return pageNumber;
}

function pageMaxCalc(){
  fetch('http://localhost:3000/post/show/all')
    .then((response) =>{
      return response.json();
    })
    .then((json) =>{
      console.log(json);
      a = json.len;
      max = Math.floor((a/DEFAULT_COLUMN) + 1);
      console.log(max);
    })
    .catch((error) =>{
      console.log(error);
    });
}
function blockBtn(page){
  let before = $('.js-before');
  let next = $('.js-next');
  if(page === min){
    before.prop('disabled', true);
  }else{
    before.prop('disabled', false);
  }

  if(page === max){
    next.prop('disabled', true);
  }else{
    next.prop('disabled', false);
  }
}
function paintPageNumber(flag){
  const pageNumber = $('.js-page-number');
  let page = 0;
  if(flag === UP_FETCH){
    page = parseInt(getPageNumber()) + 1;
  }else if(flag === DOWN_FETCH){
    page = parseInt(getPageNumber()) - 1;
  }else{
    return;
  }
  console.log('hahaha');
  pageNumber.attr(DATA_PAGE, page);
  pageNumber.text(page);
  blockBtn(page);
}

function paintComments(comments){
  comments.forEach((comment) =>{
    const query = `<tr><td>${comment.id}</td><td>${comment.user.user_name}</td><td>${comment.contents}</td></tr>`;
    $('.js-comments').append(query);
  });

}
function removeComments(){
  $('.js-comment-header').siblings().remove();
}

function getHttpForFetch(pageNumber){
  const http = `http://localhost:3000/post/show/${pageNumber}`;
  return http;
}
function fetchDatas(pageNumber, flag){
  const http = getHttpForFetch(pageNumber);
  fetch(http)
    .then((response) =>{
      return response.json();
    })
    .then((json) =>{
      if(json.length !== 0){
        removeComments();
        paintComments(json);
        paintPageNumber(flag);
      }
    })
    .catch((error) =>{
      console.log(error);
    });
}

function handlerShowNextComments(){
  fetchDatas(parseInt(getPageNumber()) + 1, UP_FETCH);
}
function handlerShowBeforeComments(){
  fetchDatas(parseInt(getPageNumber()) - 1, DOWN_FETCH);
}
function handlerShowCommnets(){
  $('.js-comment-panel').slideToggle();

  fetchDatas(getPageNumber(), DEFAULT_FETCH);
}


$(document).ready(() =>{
  pageMaxCalc();
  $('.js-comment-panel-btn').click(handlerShowCommnets);
  $('.js-before').click(handlerShowBeforeComments);
  $('.js-next').click(handlerShowNextComments);
});
