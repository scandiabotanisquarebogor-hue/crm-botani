/* Pengganti google.script.run untuk PWA: meneruskan panggilan ke Apps Script Web App lewat fetch. */
(function () {
  function cfg() {
    var url = (window.CRM_CONFIG && window.CRM_CONFIG.apiUrl) || '', key = (window.CRM_CONFIG && window.CRM_CONFIG.apiKey) || '';
    try { url = url || localStorage.getItem('crm_api_url') || ''; key = key || localStorage.getItem('crm_api_key') || ''; } catch (e) {}
    return { url: url, key: key };
  }
  function setup(msg) {
    var u = prompt((msg ? msg + '\n\n' : '') + 'Tempel URL Web App Apps Script (berakhiran /exec):', cfg().url || '');
    if (!u) return false;
    var k = prompt('Kunci akses (PWA_KEY). Kosongkan jika tidak dipakai:', cfg().key || '') || '';
    try { localStorage.setItem('crm_api_url', u.trim()); localStorage.setItem('crm_api_key', k.trim()); } catch (e) {}
    return true;
  }
  window.crmSetup = function () { if (setup()) location.reload(); };
  function call(fn, args, ok, fail) {
    var c = cfg();
    if (!/^https:/.test(c.url)) { if (setup('URL server belum diatur.')) c = cfg(); }
    if (!/^https:/.test(c.url)) { fail && fail(new Error('URL server belum diatur.')); return; }
    fetch(c.url, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ fn: fn, args: args, key: c.key }) })
      .then(function (r) { return r.text(); })
      .then(function (t) {
        var j; try { j = JSON.parse(t); } catch (e) { throw new Error('Respons server tidak valid. Pastikan Web App di-deploy: Execute as "Me", akses "Anyone".'); }
        if (!j.ok) throw new Error(j.error || 'Server error');
        ok && ok(j.data);
      })
      .catch(function (e) {
        var m = (e && e.message) || String(e);
        if (/Failed to fetch|NetworkError|Load failed/i.test(m)) m = navigator.onLine ? 'Tidak dapat terhubung ke server. Periksa URL Web App.' : 'Tidak ada koneksi internet.';
        fail && fail(new Error(m));
      });
  }
  function make(ok, fail) {
    return new Proxy({}, { get: function (_, name) {
      if (name === 'withSuccessHandler') return function (f) { return make(f, fail); };
      if (name === 'withFailureHandler') return function (f) { return make(ok, f); };
      return function () { call(String(name), Array.prototype.slice.call(arguments), ok, fail); };
    } });
  }
  window.google = { script: { run: make(null, null) } };
})();
