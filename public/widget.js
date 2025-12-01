(function () {
  const script = document.currentScript;
  const companyId = script?.getAttribute('data-company') || 'demo';

  const widget = document.createElement('div');
  widget.innerHTML = `
    <iframe
      src="${location.origin}/widget?company=${companyId}"
      style="width:100%; height:680px; border:none; border-radius:16px; box-shadow:0 20px 40px rgba(0,0,0,0.15);"
      allow="microphone; camera"
    ></iframe>
  `;
  script.parentNode.insertBefore(widget, script);
})();
