// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"cuEdQ":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "f61ed9a315b1ed03";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"eGa6Y":[function(require,module,exports,__globalThis) {
var _emailService = require("./services/emailService");
let detalheAtualId = null;
function setupDate() {
    const span = document.getElementById("today-date");
    if (!span) return;
    const hoje = new Date();
    const formatado = hoje.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
    span.textContent = formatado;
}
/* -------- DASHBOARD -------- */ function renderGraficoEstados() {
    const container = document.getElementById("state-chart");
    if (!container) return;
    const emails = (0, _emailService.emailService).getAll();
    if (emails.length === 0) {
        container.innerHTML = "<p class='empty'>Sem dados suficientes para exibir.</p>";
        return;
    }
    const ufs = [
        "AC",
        "AL",
        "AP",
        "AM",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MT",
        "MS",
        "MG",
        "PA",
        "PB",
        "PR",
        "PE",
        "PI",
        "RJ",
        "RN",
        "RS",
        "RO",
        "RR",
        "SC",
        "SP",
        "SE",
        "TO"
    ];
    const mapa = new Map();
    ufs.forEach((uf)=>mapa.set(uf, 0));
    emails.forEach((e)=>{
        const uf = e.uf;
        if (mapa.has(uf)) mapa.set(uf, (mapa.get(uf) ?? 0) + 1);
    });
    const dados = ufs.map((uf)=>({
            uf,
            total: mapa.get(uf) ?? 0
        }));
    const max = Math.max(...dados.map((d)=>d.total));
    if (max === 0) {
        container.innerHTML = "<p class='empty'>Nenhum e-mail classificado por estado ainda.</p>";
        return;
    }
    container.innerHTML = dados.map((d)=>{
        const largura = d.total / max * 100;
        return `
      <div class="bar-row">
        <span class="bar-label">${d.uf}</span>
        <div class="bar-track">
          <div class="bar-fill" style="width:${largura}%;"></div>
        </div>
        <span class="bar-value">${d.total}</span>
      </div>
    `;
    }).join("");
}
function renderGraficoPorDia() {
    const container = document.getElementById("daily-chart");
    if (!container) return;
    const emails = (0, _emailService.emailService).getAll();
    if (emails.length === 0) {
        container.innerHTML = "<p class='empty'>Sem dados suficientes para exibir.</p>";
        return;
    }
    const mapa = new Map();
    emails.forEach((email)=>{
        const data = email.criadoEm instanceof Date ? email.criadoEm : new Date(email.criadoEm);
        const chave = data.toLocaleDateString("pt-BR");
        mapa.set(chave, (mapa.get(chave) ?? 0) + 1);
    });
    const dias = Array.from(mapa.entries()).map(([data, total])=>({
            data,
            total
        })).sort((a, b)=>{
        const [da, ma, aa] = a.data.split("/").map(Number);
        const [db, mb, ab] = b.data.split("/").map(Number);
        return new Date(aa, ma - 1, da).getTime() - new Date(ab, mb - 1, db).getTime();
    }).slice(-7);
    const max = Math.max(...dias.map((d)=>d.total));
    if (max === 0) {
        container.innerHTML = "<p class='empty'>Sem dados suficientes para exibir.</p>";
        return;
    }
    container.innerHTML = dias.map((d)=>{
        const largura = d.total / max * 100;
        return `
        <div class="bar-row">
          <span class="bar-label">${d.data}</span>
          <div class="bar-track">
            <div class="bar-fill" style="width:${largura}%;"></div>
          </div>
          <span class="bar-value">${d.total}</span>
        </div>
      `;
    }).join("");
}
function renderTopDestinatarios() {
    const container = document.getElementById("top-destinatarios");
    if (!container) return;
    const emails = (0, _emailService.emailService).getAll();
    if (emails.length === 0) {
        container.innerHTML = "<p class='empty'>Nenhum dado suficiente.</p>";
        return;
    }
    const mapa = new Map();
    emails.forEach((e)=>{
        mapa.set(e.destinatario, (mapa.get(e.destinatario) ?? 0) + 1);
    });
    const top3 = Array.from(mapa.entries()).map(([email, count])=>({
            email,
            count
        })).sort((a, b)=>b.count - a.count).slice(0, 3);
    container.innerHTML = `
    <ul>
      ${top3.map((d, i)=>`<li><span>${i + 1}. ${d.email}</span><strong>${d.count}</strong></li>`).join("")}
    </ul>
  `;
}
/* -------- PENDÊNCIAS -------- */ function renderPendencias() {
    const container = document.getElementById("pending-list");
    if (!container) return;
    const filtroRem = document.getElementById("pend-filter-remetente")?.value?.toLowerCase().trim();
    const filtroData = document.getElementById("pend-filter-data")?.value;
    let pendentes = (0, _emailService.emailService).getPendentes();
    if (filtroRem) pendentes = pendentes.filter((e)=>e.remetente.toLowerCase().includes(filtroRem));
    if (filtroData) pendentes = pendentes.filter((e)=>{
        const d = e.criadoEm;
        const iso = d.toISOString().slice(0, 10);
        return iso === filtroData;
    });
    if (pendentes.length === 0) {
        container.classList.add("empty");
        container.innerHTML = `
      <div class="big-check">\u{2705}</div>
      <p>Nenhuma pend\xeancia encontrada. Bom trabalho!</p>
    `;
        return;
    }
    container.classList.remove("empty");
    const html = `
    <div class="pending-table-header">
      <span>Remetente</span>
      <span>Destinat\xe1rio</span>
      <span>Data</span>
      <span>Local</span>
      <span>A\xe7\xf5es</span>
    </div>
    ${pendentes.map((e)=>{
        const data = e.criadoEm.toLocaleDateString("pt-BR");
        const local = e.uf && e.municipio ? `${e.uf} / ${e.municipio}` : "\u2014 / \u2014";
        return `
        <div class="pending-row" data-id="${e.id}">
          <span title="${e.remetente}">${e.remetente}</span>
          <span title="${e.destinatario}">${e.destinatario}</span>
          <span>${data}</span>
          <span>${local}</span>
          <button data-id="${e.id}">Classificar</button>
        </div>
      `;
    }).join("")}
  `;
    container.innerHTML = html;
    const buttons = container.querySelectorAll("button[data-id]");
    buttons.forEach((btn)=>{
        btn.addEventListener("click", (ev)=>{
            ev.stopPropagation();
            const id = Number(btn.dataset.id);
            (0, _emailService.emailService).classificar(id);
            renderStats();
        });
    });
    const rows = container.querySelectorAll(".pending-row");
    rows.forEach((row)=>{
        row.addEventListener("click", ()=>{
            const id = Number(row.dataset.id);
            abrirDetalhes(id);
        });
    });
}
/* -------- HISTÓRICO -------- */ function renderHistorico() {
    const container = document.getElementById("history-table");
    if (!container) return;
    const termo = document.getElementById("hist-search")?.value?.toLowerCase().trim();
    const filtroData = document.getElementById("hist-date")?.value;
    let lista = (0, _emailService.emailService).getAll();
    if (termo) lista = lista.filter((e)=>e.remetente.toLowerCase().includes(termo) || e.destinatario.toLowerCase().includes(termo) || e.assunto.toLowerCase().includes(termo));
    if (filtroData) lista = lista.filter((e)=>{
        const d = e.criadoEm;
        const iso = d.toISOString().slice(0, 10);
        return iso === filtroData;
    });
    if (lista.length === 0) {
        container.classList.add("empty");
        container.innerHTML = "<p class='empty'>Nenhum e-mail encontrado para os filtros.</p>";
        return;
    }
    container.classList.remove("empty");
    const html = `
    <div class="history-header">
      <span>Remetente</span>
      <span>Destinat\xe1rio</span>
      <span>Assunto</span>
      <span>Local</span>
    </div>
    ${lista.map((e)=>{
        const local = e.uf && e.municipio ? `${e.uf} / ${e.municipio}` : "\u2014 / \u2014";
        return `
        <div class="history-row" data-id="${e.id}">
          <span title="${e.remetente}">${e.remetente}</span>
          <span title="${e.destinatario}">${e.destinatario}</span>
          <span title="${e.assunto}">${e.assunto}</span>
          <span>${local}</span>
        </div>
      `;
    }).join("")}
  `;
    container.innerHTML = html;
    const rows = container.querySelectorAll(".history-row");
    rows.forEach((row)=>{
        row.addEventListener("click", ()=>{
            const id = Number(row.dataset.id);
            abrirDetalhes(id);
        });
    });
}
/* -------- DETALHES -------- */ function abrirDetalhes(id) {
    detalheAtualId = id;
    const email = (0, _emailService.emailService).getById(id);
    if (!email) return;
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((b)=>b.classList.remove("active"));
    const views = document.querySelectorAll(".view");
    views.forEach((v)=>v.classList.remove("active"));
    document.getElementById("view-detalhes")?.classList.add("active");
    const pageTitle = document.getElementById("page-title");
    if (pageTitle) pageTitle.textContent = "Detalhes do E-mail";
    document.getElementById("det-remetente").textContent = email.remetente;
    document.getElementById("det-destinatario").textContent = email.destinatario;
    document.getElementById("det-data").textContent = email.criadoEm.toLocaleString("pt-BR");
    document.getElementById("det-assunto").textContent = email.assunto;
    document.getElementById("det-local").textContent = email.uf && email.municipio ? `${email.uf} - ${email.municipio}` : "N\xe3o informado";
    document.getElementById("det-mensagem").textContent = email.mensagem;
    const selectUf = document.getElementById("det-uf");
    const inputMun = document.getElementById("det-municipio");
    if (selectUf) selectUf.value = email.uf || "";
    if (inputMun) inputMun.value = email.municipio || "";
}
function setupDetalhesActions() {
    const btnVoltar = document.getElementById("det-voltar");
    const btnSalvar = document.getElementById("det-salvar-local");
    btnVoltar?.addEventListener("click", ()=>{
        const navHist = document.querySelector('.nav-item[data-view="historico"]');
        navHist?.click();
    });
    btnSalvar?.addEventListener("click", ()=>{
        if (detalheAtualId == null) return;
        const ufSelect = document.getElementById("det-uf");
        const munInput = document.getElementById("det-municipio");
        const uf = ufSelect?.value ?? "";
        const municipio = munInput?.value ?? "";
        (0, _emailService.emailService).atualizarLocal(detalheAtualId, uf, municipio);
        alert("Localiza\xe7\xe3o atualizada com sucesso.");
        renderStats();
        abrirDetalhes(detalheAtualId);
    });
}
/* -------- ESTATÍSTICAS GERAIS -------- */ function renderStats() {
    const totalEl = document.getElementById("total-emails");
    const pendEl = document.getElementById("pending-emails");
    const classEl = document.getElementById("classified-emails");
    const badgePend = document.getElementById("badge-pendentes");
    if (!totalEl || !pendEl || !classEl || !badgePend) return;
    const total = (0, _emailService.emailService).getAll().length;
    const pendentes = (0, _emailService.emailService).getPendentes().length;
    const classificados = (0, _emailService.emailService).getClassificados().length;
    totalEl.textContent = String(total);
    pendEl.textContent = String(pendentes);
    classEl.textContent = String(classificados);
    badgePend.textContent = `${pendentes} pendentes`;
    renderPendencias();
    renderGraficoEstados();
    renderGraficoPorDia();
    renderTopDestinatarios();
    renderHistorico();
}
/* -------- NAVEGAÇÃO -------- */ function setupNavigation() {
    const navItems = document.querySelectorAll(".nav-item");
    const views = document.querySelectorAll(".view");
    const pageTitle = document.getElementById("page-title");
    navItems.forEach((btn)=>{
        btn.addEventListener("click", ()=>{
            const viewName = btn.dataset.view;
            if (!viewName) return;
            navItems.forEach((b)=>b.classList.remove("active"));
            btn.classList.add("active");
            views.forEach((v)=>{
                v.classList.toggle("active", v.id === `view-${viewName}`);
            });
            if (pageTitle) {
                if (viewName === "dashboard") pageTitle.textContent = "Vis\xe3o Geral";
                if (viewName === "pendencias") pageTitle.textContent = "E-mails Pendentes";
                if (viewName === "cadastro") pageTitle.textContent = "Novo E-mail Manual";
                if (viewName === "historico") pageTitle.textContent = "Hist\xf3rico de E-mails";
            }
        });
    });
}
function setupDashboardShortcuts() {
    const pend = document.getElementById("goto-pendencias");
    const manual = document.getElementById("goto-manual");
    pend?.addEventListener("click", ()=>{
        document.querySelector('.nav-item[data-view="pendencias"]')?.click();
    });
    manual?.addEventListener("click", ()=>{
        document.querySelector('.nav-item[data-view="cadastro"]')?.click();
    });
}
/* -------- SIMULAÇÃO -------- */ function setupSimulationButtons() {
    const topBtn = document.getElementById("simulate-btn");
    topBtn?.addEventListener("click", ()=>{
        (0, _emailService.emailService).simularCaptura(10);
        renderStats();
    });
}
/* -------- FORMULÁRIO MANUAL -------- */ function setupManualForm() {
    const form = document.getElementById("manual-form");
    if (!form) return;
    form.addEventListener("submit", (event)=>{
        event.preventDefault();
        const remetenteInput = form.querySelector('input[placeholder="colaborador@empresa.com"]');
        const destinatarioInput = form.querySelector('input[placeholder="cliente@dominio.com"]');
        const assuntoInput = form.querySelector('input[placeholder="Ex: Proposta Comercial"]');
        const msgTextarea = form.querySelector("textarea");
        const ufSelect = document.getElementById("manual-uf");
        const municipioInput = form.querySelector('input[placeholder="Piripiri"]');
        const dataHoraInput = document.getElementById("manual-datetime");
        if (!remetenteInput || !destinatarioInput || !assuntoInput || !ufSelect || !municipioInput) {
            console.warn("Campos do formul\xe1rio n\xe3o encontrados");
            return;
        }
        (0, _emailService.emailService).criarManual({
            remetente: remetenteInput.value,
            destinatario: destinatarioInput.value,
            assunto: assuntoInput.value,
            mensagem: msgTextarea?.value || "",
            uf: ufSelect.value,
            municipio: municipioInput.value,
            dataHora: dataHoraInput?.value
        });
        form.reset();
        renderStats();
        alert("E-mail registrado com sucesso (pendente de classifica\xe7\xe3o).");
    });
}
/* -------- BOTÕES "SALVAR TUDO" / "EXPORTAR" (mock) -------- */ function setupPendenciasButtons() {
    const btnSalvarTudo = document.getElementById("pend-save-all");
    const btnExport = document.getElementById("pend-export");
    btnSalvarTudo?.addEventListener("click", ()=>{
        const pendentes = (0, _emailService.emailService).getPendentes();
        pendentes.forEach((e)=>(0, _emailService.emailService).classificar(e.id));
        renderStats();
        alert("Todas as pend\xeancias foram marcadas como classificadas.");
    });
    btnExport?.addEventListener("click", ()=>{
        const pendentes = (0, _emailService.emailService).getPendentes();
        console.log("Exportando pendentes (mock):", pendentes);
        alert("Exporta\xe7\xe3o simulada! (dados exibidos no console)");
    });
}
/* -------- INICIALIZAÇÃO -------- */ document.addEventListener("DOMContentLoaded", ()=>{
    setupDate();
    setupNavigation();
    setupSimulationButtons();
    setupManualForm();
    setupDashboardShortcuts();
    setupPendenciasButtons();
    setupDetalhesActions();
    renderStats();
});

},{"./services/emailService":"e3ZH8"}],"e3ZH8":[function(require,module,exports,__globalThis) {
// source/services/emailService.ts
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "emailService", ()=>emailService);
class EmailService {
    // retorna todos os e-mails
    getAll() {
        return this.emails;
    }
    getById(id) {
        return this.emails.find((e)=>e.id === id);
    }
    getPendentes() {
        return this.emails.filter((e)=>e.status === "pendente");
    }
    getClassificados() {
        return this.emails.filter((e)=>e.status === "classificado");
    }
    atualizarLocal(id, uf, municipio) {
        const email = this.getById(id);
        if (email) {
            email.uf = uf;
            email.municipio = municipio;
        }
    }
    classificar(id) {
        const email = this.getById(id);
        if (email) email.status = "classificado";
    }
    criarManual(dados) {
        const criadoEm = dados.dataHora ? new Date(dados.dataHora) : new Date();
        const novo = {
            id: this.nextId++,
            remetente: dados.remetente,
            destinatario: dados.destinatario,
            assunto: dados.assunto,
            mensagem: dados.mensagem,
            uf: dados.uf,
            municipio: dados.municipio,
            status: "pendente",
            criadoEm
        };
        this.emails.push(novo);
        return novo;
    }
    // gera e-mails mockados (Simular Captura)
    simularCaptura(qtd = 5) {
        const ufs = [
            "AC",
            "AL",
            "AP",
            "AM",
            "BA",
            "CE",
            "DF",
            "ES",
            "GO",
            "MA",
            "MT",
            "MS",
            "MG",
            "PA",
            "PB",
            "PR",
            "PE",
            "PI",
            "RJ",
            "RN",
            "RS",
            "RO",
            "RR",
            "SC",
            "SP",
            "SE",
            "TO"
        ];
        const cidades = [
            "Teresina",
            "Piripiri",
            "Fortaleza",
            "S\xe3o Lu\xeds",
            "Salvador",
            "Curitiba",
            "S\xe3o Paulo",
            "Rio de Janeiro",
            "Florian\xf3polis"
        ];
        const destinatarios = [
            "clienteA@empresa.com",
            "clienteB@empresa.com",
            "clienteC@empresa.com",
            "financeiro@empresa.com",
            "contato@site.com"
        ];
        const assuntos = [
            "Proposta Comercial",
            "Cobran\xe7a em aberto",
            "Pedido de Informa\xe7\xf5es",
            "Agendamento de Reuni\xe3o",
            "Fatura do m\xeas"
        ];
        const mensagens = [
            "Prezados, segue em anexo a proposta referente ao projeto X.",
            "Ol\xe1, estamos com uma fatura em aberto, favor verificar.",
            "Gostaria de mais informa\xe7\xf5es sobre o servi\xe7o.",
            "Vamos alinhar uma reuni\xe3o para tratar dos pr\xf3ximos passos."
        ];
        for(let i = 0; i < qtd; i++){
            const uf = ufs[Math.floor(Math.random() * ufs.length)];
            const municipio = cidades[Math.floor(Math.random() * cidades.length)];
            const destinatario = destinatarios[Math.floor(Math.random() * destinatarios.length)];
            const assunto = assuntos[Math.floor(Math.random() * assuntos.length)];
            const mensagem = mensagens[Math.floor(Math.random() * mensagens.length)];
            const remetente = `colaborador${Math.floor(Math.random() * 50)}@empresa.com`;
            const status = Math.random() < 0.6 ? "classificado" : "pendente";
            // data nos últimos 7 dias
            const hoje = new Date();
            const diasAtras = Math.floor(Math.random() * 7);
            const criadoEm = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - diasAtras, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
            const email = {
                id: this.nextId++,
                remetente,
                destinatario,
                assunto,
                mensagem,
                uf,
                municipio,
                status,
                criadoEm
            };
            this.emails.push(email);
        }
    }
    constructor(){
        this.emails = [];
        this.nextId = 1;
    }
}
const emailService = new EmailService();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jnFvT":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["cuEdQ","eGa6Y"], "eGa6Y", "parcelRequire4487", {})

//# sourceMappingURL=source.15b1ed03.js.map
