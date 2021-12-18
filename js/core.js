function clearInner(node) {
    while (node.hasChildNodes()) {
      clear(node.firstChild);
    }
  }
  
  function clear(node) {
    while (node.hasChildNodes()) {
      clear(node.firstChild);
    }
    node.parentNode.removeChild(node);
  }
  
function clearalltabs(){
    let login = document.getElementById('Login');
    clearInner(login);
    let current = document.getElementById('Current');
    clearInner(current);
    let archive = document.getElementById('Archive');
    clearInner(archive);
    let create = document.getElementById('Create');
    clearInner(create);
}

function archiveall(){
  
  Object.keys(localStorage).forEach(function (key) {
    let item = localStorage.getItem(key);
    let itemjs = JSON.parse(item);
    itemjs.incurrent = false;
    itemjs.indaily = false;
    itemjs.indaycare = false;
    itemjs.incurrentdaycare = false;
    localStorage.setItem(key,JSON.stringify(itemjs));
  });
  displaycurrent();
  
}