const domainPath = "http://localhost:3000/api/provide/";
function sendSelectVersion(http){
  fetch(http)
    .then((response) =>{
      return response.json();
    })
    .then((json) =>{
      console.dir(json);
      if(json.result === 'ok'){
        alert('successed');
      }else{
        alert('failed');
      }
    })
    .catch((error) =>{
      console.log(error);
    });
}

function handlerClickThePremium(event){
  sendSelectVersion(domainPath + 'premium');
}
function handlerClickTheFree(event){
  sendSelectVersion(domainPath + 'free');
}

$(document).ready(() =>{
  const free = $('.js-free-version');
  const premium = $('.js-premium-version');


  free.click(handlerClickTheFree);
  premium.click(handlerClickThePremium);
});
