(function(){
  try {
    var blockKeys = function(e){
      var key = e.key || e.keyCode;
      var ctrl = e.ctrlKey || e.metaKey;
      var shift = e.shiftKey;
      var blocked = false;
      // F12
      if (key === 'F12' || key === 123) blocked = true;
      // Ctrl+Shift+I/J/C
      if (ctrl && shift && (key === 'I' || key === 'J' || key === 'C' || key === 73 || key === 74 || key === 67)) blocked = true;
      // Ctrl+U / Ctrl+S / Ctrl+P
      if (ctrl && (key === 'U' || key === 'S' || key === 'P' || key === 85 || key === 83 || key === 80)) blocked = true;
      // Ctrl+Shift+K (Firefox devtools)
      if (ctrl && shift && (key === 'K' || key === 75)) blocked = true;
      if (blocked) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    var blockContextMenu = function(e){
      e.preventDefault();
      return false;
    };

    var blockSelection = function(){
      try { document.body.style.userSelect = 'none'; } catch(_) {}
    };

    document.addEventListener('keydown', blockKeys, true);
    document.addEventListener('contextmenu', blockContextMenu, true);
    document.addEventListener('dragstart', blockContextMenu, true);
    document.addEventListener('copy', blockContextMenu, true);
    document.addEventListener('cut', blockContextMenu, true);
    document.addEventListener('paste', blockContextMenu, true);
    document.addEventListener('DOMContentLoaded', blockSelection, true);

    // Basic devtools detection
    var devtoolsOpen = false;
    var threshold = 160;
    var checkDevtools = function(){
      var widthThreshold = window.outerWidth - window.innerWidth > threshold;
      var heightThreshold = window.outerHeight - window.innerHeight > threshold;
      if (widthThreshold || heightThreshold) {
        devtoolsOpen = true;
      }
      // console.profile trick
      var start = performance.now();
      debugger; // may trigger slowdowns with devtools
      if (performance.now() - start > 100) devtoolsOpen = true;
      if (devtoolsOpen) {
        // Aggressive response: blur content
        var overlay = document.getElementById('anti-tamper-overlay');
        if (!overlay) {
          overlay = document.createElement('div');
          overlay.id = 'anti-tamper-overlay';
          overlay.style.position = 'fixed';
          overlay.style.inset = '0';
          overlay.style.background = '#0b1220';
          overlay.style.color = '#fff';
          overlay.style.display = 'flex';
          overlay.style.alignItems = 'center';
          overlay.style.justifyContent = 'center';
          overlay.style.zIndex = '2147483647';
          overlay.style.fontFamily = 'system-ui, -apple-system, Segoe UI, Roboto, Arial';
          overlay.style.fontSize = '16px';
          overlay.textContent = 'Developer tools are disabled on this site.';
          document.body.appendChild(overlay);
        }
        document.body.style.pointerEvents = 'none';
        document.body.style.filter = 'blur(6px)';
      }
    };

    setInterval(checkDevtools, 1000);

    // Prevent print to PDF revealing content
    if (window.matchMedia) {
      try {
        var mediaQueryList = window.matchMedia('print');
        if (mediaQueryList && mediaQueryList.addListener) {
          mediaQueryList.addListener(function(mql){ if (mql.matches) { window.stop(); } });
        }
      } catch(_){}
    }
  } catch(_){}
})();
