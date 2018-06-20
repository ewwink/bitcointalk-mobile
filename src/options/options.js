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

function save_options(val) {
  var fontSize = isNaN(val) ? byId('fontSize').value : val;
  byId('fontSize').value = fontSize;
  chrome.storage.local.set({
    "fontSize": fontSize,
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
  chrome.storage.local.get('fontSize', function (items) {
    if (items.fontSize !== undefined) {
      byId('fontSize').value = items.fontSize;
      fontSize_status();
    }
  });
}

function reset_options() {
  save_options(13);
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
