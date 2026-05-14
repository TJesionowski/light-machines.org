(function () {
  var KEY = 'lm-theme';
  var ORDER = ['auto', 'light', 'dark'];

  function current() {
    var t = localStorage.getItem(KEY);
    return ORDER.indexOf(t) === -1 ? 'auto' : t;
  }

  function apply(t) {
    if (t === 'auto') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem(KEY);
    } else {
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem(KEY, t);
    }
  }

  function render(button, label, t) {
    label.textContent = t;
    button.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
    button.title = 'Theme: ' + t + ' (click to cycle)';
  }

  var buttons = document.querySelectorAll('[data-lm-theme-toggle]');
  buttons.forEach(function (button) {
    var label = button.querySelector('[data-lm-theme-label]') || button;
    var t = current();
    render(button, label, t);
    button.addEventListener('click', function () {
      var next = ORDER[(ORDER.indexOf(current()) + 1) % ORDER.length];
      apply(next);
      render(button, label, next);
    });
  });
})();
