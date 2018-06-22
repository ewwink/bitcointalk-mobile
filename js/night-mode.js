/*jshint esversion: 6 */

(function () {
  function appendCSS(txt) {
    var head = document.head || document.getElementsByTagName('head')[0],
      css = document.createElement("style");
    css.type = "text/css";
    css.textContent = txt;
    head.appendChild(css);
  }
  var nightMode, bgLoader;
  
  chrome.storage.local.get('bctMobile', function (items) {
    if(items.bctMobile === undefined)
      return
    nightMode = items.bctMobile.nightMode !== undefined ? items.bctMobile.nightMode : false;
    cssStyle = `body, .tborder {
      background-color: #2d2b2b !important;
    }
    body, td, th, tr {
        color: #b0b8c0 !important;
    }
    .nav, .windowbg, .windowbg2, .windowbg3 {
        color: #b0b8c0 !important;
        background-color: #393944 !important;
    }
    .titlebg, tr.titlebg th, tr.titlebg td, .titlebg2, tr.titlebg2 th, tr.titlebg2 td {
        color: #b0b8c0 !important;
        background-color: #454040 !important;
    }
    a:link {
        color: #A882CC !important;
    }
    .maintab_back a:link, .maintab_back a:visited, .maintab_active_back a:link, .maintab_active_back a:visited {
        color: #586BC0CC !important;
        font-weight: bold;
    }
    .maintab_back, .maintab_active_back {
        color: #4b3434 !important;
        background-color: #393434 !important;
    }
    .newtxt {
        color: #a9a9e0;
    }
    .quote {
        color: #a3c2c0 !important;
        background-color: #32323e !important;
    }
    .catbg2, tr.catbg2 td, .catbg, tr.catbg td, .catbg3, tr.catbg3 td {
      background: linear-gradient(#4d4b89, #3e2828) !important;
    }`;
    if (nightMode) {
      appendCSS(cssStyle);
    }
    

  });


})();


