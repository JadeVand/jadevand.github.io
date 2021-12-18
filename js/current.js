function removecell(e) {
  let tr = e.parentNode.parentNode.parentNode.parentNode;
  let tbody = tr.parentNode;
  tbody.removeChild(tr);
}
function archivebyelement(e) {
  let uid = e.parentNode.getAttribute("uid");
  if (uid) {
    let item = localStorage.getItem(uid);
    let itemjs = JSON.parse(item);
    itemjs.incurrent = false;
    itemjs.indaily = false;
    localStorage.setItem(uid, JSON.stringify(itemjs));
  }
  removecell(e);
}

function removebyelement(e) {
  let uid = e.parentNode.getAttribute("uid");
  if (uid) {
    let item = localStorage.getItem(uid);
    let itemjs = JSON.parse(item);
    itemjs.indaily = false;
    localStorage.setItem(uid, JSON.stringify(itemjs));
  }
  removecell(e);
}

function restoreelements(e) {
  Object.keys(localStorage).forEach(function (key) {
    let item = localStorage.getItem(key);
    let itemjs = JSON.parse(item);
    if (itemjs.incurrent) {
      itemjs.indaily = true;
      localStorage.setItem(key,JSON.stringify(itemjs));
    }
  });
  displaycurrent();
}
function createcurrentbutton(key) {
  let td = document.createElement("td");
  let div = document.createElement("div");
  div.setAttribute("class", "btn-group");
  let buttondropdown = document.createElement("button");
  buttondropdown.setAttribute("class", "btn btn-primary dropdown-toggle");
  buttondropdown.setAttribute("data-toggle", "dropdown");
  buttondropdown.setAttribute("aria-haspopup", "true");
  buttondropdown.setAttribute("data-boundary", "window");
  buttondropdown.setAttribute("aria-expanded", "false");
  let spanc = document.createElement("span");
  spanc.innerText = "Actions";
  buttondropdown.appendChild(spanc);
  div.appendChild(buttondropdown);

  let divdropdown = document.createElement("div");
  divdropdown.classList.add("dropdown-menu");
  divdropdown.classList.add("dropdown-menu-color");
  divdropdown.setAttribute("uid", key);
  let a = document.createElement("a");
  a.setAttribute("href", "#");
  a.classList.add("dropdown-item");
  a.classList.add("remove-action");
  a.innerText = "Remove";
  a.setAttribute("onclick", "removebyelement(this)");
  let aarchive = document.createElement("a");
  aarchive.setAttribute("href", "#");
  aarchive.classList.add("dropdown-item");
  aarchive.classList.add("archive-action");
  aarchive.innerText = "Archive";
  aarchive.setAttribute("onclick", "archivebyelement(this)");
  /*
  let aout = document.createElement("a");
  aout.setAttribute("href","#");
  aout.classList.add("dropdown-item");
  aout.classList.add("hasgoneout");
  aout.innerText = "Remove";
  divdropdown.appendChild(aout);
  */
  divdropdown.appendChild(a);
  divdropdown.appendChild(aarchive);

  div.appendChild(divdropdown);
  td.appendChild(div);
  return td;

}
function displaycurrent() {
  clearalltabs();
  let parent = document.getElementById("Current");
  let buttonrestore = document.createElement("button");
  buttonrestore.classList.add("btn");
  buttonrestore.classList.add("btn-primary");
  buttonrestore.addEventListener("click", restoreelements);
  buttonrestore.innerText = "Restore";

  let buttonarchiveall = document.createElement("button");
  buttonarchiveall.classList.add("btn");
  buttonarchiveall.classList.add("btn-danger");
  buttonarchiveall.addEventListener("click",archiveall);
  buttonarchiveall.innerText = "Archive All";

  let table = document.createElement("table");
  table.setAttribute("class", "table table-dark");
  let thead = document.createElement("thead");
  var tr = document.createElement("tr");
  let thash = document.createElement("th");
  thash.setAttribute("scope", "col");
  thash.innerText = "#";
  tr.appendChild(thash);
  let tname = document.createElement("th");
  tname.setAttribute("scope", "col");
  tname.innerText = "name";
  thead.appendChild(tr);
  tr.appendChild(tname);
  let tfood = document.createElement("th");
  tfood.setAttribute("scope", "col");
  tfood.innerText = "food";
  tr.appendChild(tfood);
  let tdportion = document.createElement("th");
  tdportion.setAttribute("scope", "col");
  tdportion.innerText = "portion";
  tr.appendChild(tdportion);
  table.appendChild(thead);
  let tbody = document.createElement("tbody");
  var i = 0;
  Object.keys(localStorage).forEach(function (key) {
    let item = localStorage.getItem(key);
    let itemjs = JSON.parse(item);
    if(itemjs.incurrent){
      if (itemjs.indaily) {
        tr = document.createElement("tr");
        let thitem = document.createElement("th");
        thitem.setAttribute("scope", "row");
        thitem.innerText = i++;
        tr.appendChild(thitem);
        let td = document.createElement("td");
        td.innerText = itemjs.name;
        tr.appendChild(td);
        let tdfood = document.createElement("td");
        tdfood.innerText = itemjs.food;
        tr.appendChild(tdfood);
        let tdportion = document.createElement("td");
        tdportion.innerText = itemjs.quantity;
        tr.appendChild(tdportion);
        let tddropdown = createcurrentbutton(key);
        tr.appendChild(tddropdown);
        tbody.appendChild(tr);
      }
    }
    



  });
  table.appendChild(tbody);
  parent.appendChild(buttonrestore);
  parent.appendChild(table);
  parent.appendChild(buttonarchiveall);
}