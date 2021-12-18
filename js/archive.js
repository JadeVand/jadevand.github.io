   function restorebyelement(e){
       let uid = e.parentNode.getAttribute("uid");
       if(uid){
           let item = localStorage.getItem(uid);
           let itemjs = JSON.parse(item);
           itemjs.incurrent = true;
           itemjs.indaily = true;
           localStorage.setItem(uid,JSON.stringify(itemjs));
       }
   }
    function createactionbuttonarchive(key) {
        let td = document.createElement("td");
        let div = document.createElement("div");
        div.setAttribute("class", "btn-group");
        let buttondropdown = document.createElement("button");
        buttondropdown.setAttribute("class", "btn btn-primary dropdown-toggle");
        buttondropdown.setAttribute("data-toggle", "dropdown");
        buttondropdown.setAttribute("aria-haspopup","true");
        buttondropdown.setAttribute("data-boundary","window");
        buttondropdown.setAttribute("aria-expanded","false");
        let spanc = document.createElement("span");
        spanc.innerText = "Actions";
        buttondropdown.appendChild(spanc);
        div.appendChild(buttondropdown);
      
        let divdropdown = document.createElement("div");
        divdropdown.classList.add("dropdown-menu");
        divdropdown.classList.add("dropdown-menu-color");
        divdropdown.setAttribute("uid",key);
        let a = document.createElement("a");
        a.setAttribute("href","#");
        a.classList.add("dropdown-item");
        a.classList.add("restore-action");
        a.innerText = "Restore";
        a.setAttribute("onclick","restorebyelement(this)");
        /*
        let aout = document.createElement("a");
        aout.setAttribute("href","#");
        aout.classList.add("dropdown-item");
        aout.classList.add("hasgoneout");
        aout.innerText = "Remove";
        divdropdown.appendChild(aout);
        */
        divdropdown.appendChild(a);
        
        div.appendChild(divdropdown);
        td.appendChild(div);
        return td;
      
      }
      function displayarchive() {
        clearalltabs();
        let parent = document.getElementById("Current");
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
        tname.innerText = "uid";
        thead.appendChild(tr);
        tr.appendChild(tname);
        let tfood = document.createElement("th");
        tfood.setAttribute("scope", "col");
        tfood.innerText = "name";
        tr.appendChild(tfood);
        table.appendChild(thead);
        let tbody = document.createElement("tbody");
        var i = 0;
        Object.keys(localStorage).forEach(function (key) {
          let item = localStorage.getItem(key);
          let itemjs = JSON.parse(item);
          tr = document.createElement("tr");
          tr.setAttribute("uid",key);
          let thitem = document.createElement("th");
          thitem.setAttribute("scope", "row");
          thitem.innerText = i++;
          tr.appendChild(thitem);
          let td = document.createElement("td");
          td.innerText = key
          tr.appendChild(td);
          let tdfood = document.createElement("td");
          tdfood.innerText = itemjs.owner;
          tr.appendChild(tdfood);
          let tddropdown = createactionbuttonarchive(key);
          tr.appendChild(tddropdown);
          tbody.appendChild(tr);
      
      
        });
        table.appendChild(tbody);
        parent.appendChild(table);
      }