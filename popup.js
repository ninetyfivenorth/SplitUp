document.addEventListener('DOMContentLoaded', () => {
  var btSplitUp = document.querySelector(".splitUpBt");
  var urlList = [];
  var windowsList = [];
  btSplitUp.addEventListener('click', () => {

    var checkedBoxes = document.querySelectorAll('input[name=urlcb]:checked');

    checkedBoxes.forEach(function (e) {
      urlList.push(e.value);
    })

    //creates a window
    if (urlList != null) {
      chrome.windows.create({
        url: urlList,
        type: "normal"
      });
    }
  })

  chrome.windows.getAll({ populate: true }, function (windows) {
    var cbList = document.getElementById("cbList");

    windows.forEach(function (window) {
      let color = getRandomColor();
      let listId = "list_" + window.id;
      windowsList.push(listId);

      let list = document.createElement("div");
      list.setAttribute('id', listId);
      list.classList.add("listMain")
      cbList.appendChild(list);

      let ul = document.createElement("ul");
      // ul.classList.add("list");  
      ul.setAttribute('id', "list");
      ul.setAttribute('style', 'box-shadow: 0px 0px 9px #d8d8d8;background-color: white!important;border-left: 8px solid ' + color + '!important;')
      list.appendChild(ul);

      window.tabs.forEach(function (tab) {

        let li = document.createElement("li");
        let urlText = document.createElement("span");
        let icon = document.createElement("img");
        let checkbox = document.createElement("input");
        let close = document.createElement("input");
        li.setAttribute("draggable","true");
        icon.setAttribute("src", tab.favIconUrl);
        icon.setAttribute("width", "16");
        icon.setAttribute("height", "16");
        icon.setAttribute("class", "urlIcon")
        close.setAttribute('class', 'cclose');
        urlText.setAttribute("class", "item");
        urlText.textContent = tab.title.substring(0, 33);
        urlText.title = tab.title;
        close.value = 'x';
        close.type = 'button';
        close.style.fontWeight = 'bold';
        close.id = tab.id;
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", "urlcb");
        checkbox.setAttribute("class", "cb");
        checkbox.value = tab.url;
        // make it bold
        if (tab.active) {
          urlText.style.fontWeight = "bold";
        }
        if (tab.audible) {
          let audioIcon = document.createElement("img");
          audioIcon.setAttribute("src", "\\img\\SoundIcon.png");
          audioIcon.setAttribute('class', 'audio')
          audioIcon.setAttribute("width", "16");
          audioIcon.setAttribute("height", "16");
          li.appendChild(audioIcon);

          audioIcon.addEventListener('click', function (e) {
            muteTab(e.path[1].lastChild.id);
            console.log(e.path[1].lastChild.id)
          });
        }
        // if(tab.pinned){
        //   let pinnedIcon = document.createElement("img");
        //   pinnedIcon.setAttribute("src", "\\img\\pin.png");
        //   pinnedIcon.setAttribute('class','audio')
        //   pinnedIcon.setAttribute("width", "16");
        //   pinnedIcon.setAttribute("height", "16");
        //   li.appendChild(pinnedIcon);

        //   pinnedIcon.addEventListener('click',function(e){
        //     pinTab(e.path[1].lastChild.id);
        //     console.log(e.path[1].lastChild.id)
        // });
        // }
        // append tags
        li.appendChild(checkbox);
        li.appendChild(icon);
        li.appendChild(urlText);
        li.appendChild(close);
        ul.appendChild(li);

        close.addEventListener('click', function (e) {
          closeTab(e.path[0].id);
        });

        urlText.addEventListener('click', function (e) {
          console.log(e)
          selectTab(e.path[1].childNodes[3].id);
        });
       
      });
    }); 
  });

  

});




