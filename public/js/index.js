const contents = document.querySelectorAll('.contents');

const CONTENTS_LIGHT_CS = 'contents-light'
      , CONTENTS_NO_LIGHT_CS = 'contents-no-light';

function handlerMouseLeaveContents(event){
  event.target.classList.remove(CONTENTS_LIGHT_CS);
  event.target.classList.add(CONTENTS_NO_LIGHT_CS);
}

function handlerMouseEnterContents(event){
  event.target.classList.remove(CONTENTS_NO_LIGHT_CS);
  event.target.classList.add(CONTENTS_LIGHT_CS);
  event.target.addEventListener('mouseleave', handlerMouseLeaveContents);
}

function regiEvnet(){
  for(let i = 0; i < contents.length; ++i){
    contents[i].addEventListener('mouseenter', handlerMouseEnterContents);
  }
}

function init(){
  regiEvnet();
}
init();
