/*jshint esversion: 6 */
/*
*
* Bitcointalk Mobile
* Firefox Addon for Android to make bitcointalk.org mobile friendly
* by fahbil https://bitcointalk.org/index.php?action=profile;u=1898722
* Support Thread: https://bitcointalk.org/index.php?topic=4507293.0
* Source Code: https://github.com/ewwink/bitcointalk-mobile
*
*/

(function () {
  function appendCSS(txt) {
    var head = document.head || document.getElementsByTagName('head')[0],
      css = document.createElement("style");
    css.type = "text/css";
    css.textContent = txt;
    head.appendChild(css);
  }
  function removeBG() {
    setTimeout(function () {
      if (document.getElementById('ajax_in_progress'))
        document.getElementById('ajax_in_progress').remove();
    }, 200);
  }
  var byId = function (id) { return document.getElementById(id); };
  var listPages = ['/$', '/index.php$', '\\?board='],
    currentURL = window.location.href,
    i, j, trs, fontSize, cssStyle,
    viewPortTag = document.createElement('meta');

  viewPortTag.name = "viewport";
  viewPortTag.content = "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5";
  document.getElementsByTagName('head')[0].appendChild(viewPortTag);

  chrome.storage.local.get('bctMobile', function (items) {
    if (items.bctMobile !== undefined) {
      fontSize = items.bctMobile.fontSize !== undefined ? items.bctMobile.fontSize : '13';
      cssStyle = 'body, td, th, tr, .post {font-size: ' + fontSize + 'px !important}';
      appendCSS(cssStyle);
      if (items.bctMobile.nightMode) {
        cssStyle = '.bordercolor{background-color: #2d2b2b !important;}';
      }
      else {
        cssStyle = '.bordercolor{background-color: #E5E5E8 !important;}';
      }
      appendCSS(cssStyle);
    }
    else {
      cssStyle = 'body, td, th, tr, .post {font-size: 13px !important}';
      appendCSS(cssStyle);
      cssStyle = '.bordercolor{background-color: #E5E5E8 !important;}';
      appendCSS(cssStyle);
    }
  });
  // Top menu
  var topMenu = document.getElementsByClassName('maintab_first')[0].parentNode.parentNode.parentNode;
  topMenu.id = 'topMenu';

  // profile page
  if (currentURL.includes('action=profile') || currentURL.includes('action=pm')) {
    var tbl = document.getElementsByClassName('bordercolor');
    if (tbl[1].textContent.indexOf('Modify Profile')) {
      tbl[1].parentNode.parentNode.id = 'modifyProfile';
    }
    removeBG();
    return;
  }

  // category or topic list
  for (var item of listPages) {
    item = new RegExp(item);
    var pathURL = currentURL.replace('https://bitcointalk.org', '');
    if (pathURL.match(item)) {
      var tables = document.getElementsByClassName('bordercolor');
      for (i = 0; i < tables.length; i++) {
        trs = tables[i].getElementsByTagName('tr');
        for (j = 0; j < trs.length; j++) {
          var tds = trs[j].getElementsByTagName('td');
          if (tds.length === 4) {
            tables[i].classList.add("catList");
          }
          /* else if (tds.length === 6) {
            index = [0, 2, 3, 4, 5];
            for (idx of index) {
              tds[idx].style.display = 'none';
            }
          } */
          else if (tds.length === 7) {
            var poster = '<p>Started by ' + tds[3].innerHTML.toString() + '</p>';
            var parser = new DOMParser();
            poster = parser.parseFromString(poster, "text/html");
            while (poster.body.hasChildNodes()) {
              tds[2].appendChild(poster.body.firstChild);
            }
            tables[i].classList.add('topicList');
          }
        }
      }
    }
  }

  if (!currentURL.includes('num_replies')) {
    appendCSS('.windowbg2 {display: block;width: 98%}');
  }
  // hide dummy post
  if (currentURL.includes('index.php?topic=')) {
    var post = document.getElementsByClassName('post');
    for (i = 0; i < post.length; i++) {
      if (post[i].textContent.match(/^\d+$/)) {
        var dummypost = document.getElementsByName('msg' + post[i].textContent);
        for (j = 0; j < dummypost.length; j++) {
          dummypost[j].parentNode.parentNode.classList.add('dummyPost');
        }
        break;
      }
    }
  }
  // navigation
  try {
    var navPages = document.getElementsByClassName('navPages');
    if (navPages.length) {
      if (navPages[0].parentNode.parentNode.nodeName !== 'TR') {
        navPages[0].parentNode.parentNode.parentNode.classList.add('navigationPages');
      }
      else {
        navPages[0].parentNode.parentNode.classList.add('navigationPages');
      }
      navPages[navPages.length - 2].parentNode.parentNode.classList.add('navigationPages');
    }
  }
  catch (err) { }
  removeBG();
})();


