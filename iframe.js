const iframe = document.getElementById('iframenav');
  iframe.onload = function () {
    iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
  };