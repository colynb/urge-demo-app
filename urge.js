(function() {
  // fetch out node, show error if something is wrong
  var node = document.getElementById('urge_rv');
  if (! node) {
    alert('URGE: You must add a node with an id "urge_rv" to use Urge');
    return;
  }

  // create iframe
  var iframe = document.createElement('iframe');
  iframe.frameBorder = 0;
  iframe.width = '100%';
  iframe.height = '100%';
  iframe.src = '//'+window.location.host+'/app/index.html#/pid:'+urge_pid;
  node.appendChild(iframe);
})();