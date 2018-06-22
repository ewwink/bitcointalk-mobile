// Saves font size
var byId = function (id) { return document.getElementById(id); };
var coinAddr = document.getElementsByClassName('addr');
var copyStatus = byId('copyStatus');

for (var i = 0; i < coinAddr.length; i++) {
  coinAddr[i].addEventListener('click', function () {
    document.execCommand("copy");
  });
  coinAddr[i].addEventListener("copy", function (event) {
    event.preventDefault();
    if (event.clipboardData) {
      event.clipboardData.setData("text/plain", this.textContent);
      //console.log(event.clipboardData.getData("text"))
      copyStatus.textContent = 'Address Copied...';
      setTimeout(function () {
        copyStatus.textContent = '';
      }, 1500);
    }
  });
}

function save_options(fs, nm) {
  var fontSize = isNaN(fs) ? byId('fontSize').value : fs;
  var nightMode = nm !== undefined ? nm : byId('nightMode').checked;
  byId('fontSize').value = fontSize;
  chrome.storage.local.set({
    "bctMobile": {
      "fontSize": fontSize,
      "nightMode": nightMode
    }
  }, function () {
    var status = byId('status');
    status.textContent = 'Options saved.';
    setTimeout(function () {
      status.textContent = '';
    }, 1500);
  });

}

// Restores font size
function restore_options() {
  chrome.storage.local.get('bctMobile', function (items) {
    if (items.bctMobile.fontSize !== undefined) {
      byId('fontSize').value = items.bctMobile.fontSize;
      byId('nightMode').checked = items.bctMobile.nightMode;
      fontSize_status();
    }
  });
}

function reset_options() {
  save_options(13, false);
  byId('nightMode').checked = false;
  fontSize_status();
}
function fontSize_status() {
  byId('fontSizeValue').textContent = byId('fontSize').value;
}
document.addEventListener('DOMContentLoaded', restore_options);
byId('save').addEventListener('click', save_options);
byId('reset').addEventListener('click', reset_options);
byId('fontSize').addEventListener('input', fontSize_status);


// chrome.storage.local.get('fontSize', function(items){console.log(items.fontSize)})
