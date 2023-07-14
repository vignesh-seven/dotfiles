var background = (function () {
  let tmp = {};
  /*  */
  chrome.runtime.onMessage.addListener(function (request) {
    for (let id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.path === "background-to-page") {
          if (request.method === id) {
            tmp[id](request.data);
          }
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {
      tmp[id] = callback;
    },
    "send": function (id, data) {
      chrome.runtime.sendMessage({
        "method": id, 
        "data": data,
        "path": "page-to-background"
      }, function () {
        return chrome.runtime.lastError;
      });
    }
  }
})();

var config = {
  "log": false,
  "general": {
    "link": document.getElementById("dark-mode-general-link")
  },
  "custom": {
    "link": document.getElementById("dark-mode-custom-link"),
    "style": document.getElementById("dark-mode-custom-style")
  },
  "content": function (e) {
    if (e) {
      native.dark.engine.process.remote.style(e);
    }
  },
  "load": function () {
    config.observer.head.disconnect();
    //
    if (config.native.selected) {
      if (native.dark.engine.is.active) {
        native.dark.engine.analyze.document.sheets("process", 3);
      }
    }
    //
    window.removeEventListener("load", config.load, false);
  },
  "message": function (e) {
    if (e) {
      if (e.data) {
        if (e.data.from) {
          if (e.data.from === "native-dark-context-shadownode") {
            if (config.native.shadow.timeout) window.clearTimeout(config.native.shadow.timeout);
            config.native.shadow.timeout = window.setTimeout(function () {
              config.native.shadow.find.stylesheets(document.documentElement);
            }, 100);
          }
        }
      }
    }
  },
  "hostname": function (url) {
    url = url.replace("www.", '');
    let s = url.indexOf("//") + 2;
    if (s > 1) {
      let o = url.indexOf('/', s);
      if (o > 0) return url.substring(s, o);
      else {
        o = url.indexOf('?', s);
        if (o > 0) return url.substring(s, o);
        else return url.substring(s);
      }
    } else {
      return url;
    }
  },
  "observer": {
    "storage": function () {
      chrome.storage.onChanged.addListener(function () {
        background.send("reload");
      });
    },
    "head": new MutationObserver(function () {
      if (document.documentElement) {
        config.check.darkmode.nodes();
        config.observer.head.disconnect();
      }
    })
  },
  "temporarily": {
    "timeout": undefined,
    "id": "temporarily-dark-style",
    "add": function () {
      if (document.documentElement) {
        document.documentElement.setAttribute(config.temporarily.id, '');
      }
    },
    "remove": function (delay) {
      if (document.documentElement) {
        if (delay) {
          if (config.temporarily.timeout) window.clearTimeout(config.temporarily.timeout);
          config.temporarily.timeout = window.setTimeout(function () {
            document.documentElement.removeAttribute(config.temporarily.id);
          }, delay);
        } else {
          document.documentElement.removeAttribute(config.temporarily.id);
        }
      }
    }
  },
  "apply": {
    "style": function (e) {
      let loc = e.loc;
      let href_g = e.href_g;
      let href_c = e.href_c;
      let text_c = e.text_c;
      let text_n = e.text_n;
      let options = e.options;
      /*  */
      if (options.frameId === 0) {
        if (options.reload === false) {
          if (href_g === '' && href_c === '' && text_c === '' && text_n === '') {
            config.temporarily.remove(0);
          } else {
            config.temporarily.add();
            config.temporarily.remove(200);
          }
        } else {
          config.temporarily.remove(0);
        }
      } else {
        config.temporarily.remove(0);
      }
      /*  */
      config.custom.style.textContent = text_c;
      config.native.style.textContent = text_n;
      /*  */
      href_c ? config.custom.link.setAttribute("href", href_c) : config.custom.link.removeAttribute("href");
      href_g ? config.general.link.setAttribute("href", href_g) : config.general.link.removeAttribute("href");
      /*  */
      if (text_n) {
        config.check.darkmode.nodes();
        //
        native.dark.observer.element.mutation = new MutationObserver(native.dark.observer.element.callback);
        native.dark.observer.element.mutation.observe(document.documentElement, native.dark.observer.element.options);
        //
        if (config.native.inline) {
          native.dark.observer.style.mutation = new MutationObserver(native.dark.observer.style.callback);
          native.dark.observer.style.mutation.observe(document.documentElement, native.dark.observer.style.options);
        }
        //
        document.documentElement.setAttribute(native.dark.attribute.theme, '');
        //
        native.dark.engine.is.active = true;
        config.native.sheet.disabled = false;
        if (config.native.cssstylesheet) config.native.shadow.toggle.stylesheets({"disabled": false});
        //
        native.dark.engine.analyze.document.sheets("process", 4);
      } else {
        if (native.dark.engine.is.active) {
          document.documentElement.removeAttribute(native.dark.attribute.theme);
          if (native.dark.observer.element.mutation) native.dark.observer.element.mutation.disconnect();
          if (native.dark.observer.style.mutation) native.dark.observer.style.mutation.disconnect();
          native.dark.engine.is.active = false;
          config.native.sheet.disabled = true;
          //
          native.dark.engine.analyze.document.sheets("clean", 5);
          if (config.native.cssstylesheet) config.native.shadow.toggle.stylesheets({"disabled": true});
        }
      }
      /*  */
      if (config.native.selected) {
        if (config.native.cssstylesheet) {          
          const src = chrome.runtime.getURL("data/content_script/page_context/inject.js");
          native.dark.engine.process.cssstylesheet(src);
        }
      }
    }
  },
  "start": function () {
    background.send("load");
    config.observer.storage();
    /*  */
    if (!config.general.link) {
      config.general.link = document.createElement("link");
      config.general.link.setAttribute("type", "text/css");
      config.general.link.setAttribute("rel", "stylesheet");
      config.general.link.setAttribute("id", "dark-mode-general-link");
    }
    /*  */
    if (!config.custom.link) {
      config.custom.link = document.createElement("link");
      config.custom.link.setAttribute("type", "text/css");
      config.custom.link.setAttribute("rel", "stylesheet");
      config.custom.link.setAttribute("id", "dark-mode-custom-link");
    }
    /*  */
    if (!config.custom.style) {
      config.custom.style = document.createElement("style");
      config.custom.style.setAttribute("lang", "en");
      config.custom.style.setAttribute("type", "text/css");
      config.custom.style.setAttribute("id", "dark-mode-custom-style");
    }
    /*  */
    if (!config.native.style) {
      config.native.style = document.createElement("style");
      config.native.style.setAttribute("lang", "en");
      config.native.style.setAttribute("type", "text/css");
      config.native.style.setAttribute("id", "dark-mode-native-style");
    }    
    /*  */
    if (!config.native.sheet) {
      config.native.sheet = document.createElement("style");
      config.native.sheet.setAttribute("lang", "en");
      config.native.sheet.setAttribute("type", "text/css");
      config.native.sheet.setAttribute("id", "dark-mode-native-sheet");
    }
    /*  */
    if (document.documentElement) {
      document.documentElement.appendChild(config.custom.link);
      document.documentElement.appendChild(config.general.link);
      document.documentElement.appendChild(config.custom.style);
      document.documentElement.appendChild(config.native.style);
      document.documentElement.appendChild(config.native.sheet);
      //
      config.native.stylesheet = config.native.sheet.sheet;
    } else {
      config.observer.head.observe(document, {
        "subtree": true,
        "childList": true,
      });
    }
  },
  "check": {
    "darkmode": {
      "nodes": function () {
        let tmp = {};
        /*  */
        if (document.documentElement) {
          tmp.a = document.getElementById("dark-mode-general-link");
          if (!tmp.a) {
            document.documentElement.appendChild(config.general.link);
          }
          /*  */
          tmp.b = document.getElementById("dark-mode-custom-link");
          if (!tmp.b) {
            document.documentElement.appendChild(config.custom.link);
          }
          /*  */
          tmp.c = document.getElementById("dark-mode-custom-style");
          if (!tmp.c) {
            document.documentElement.appendChild(config.custom.style);
          }
          /*  */
          tmp.d = document.getElementById("dark-mode-native-style");
          if (!tmp.d) {
            document.documentElement.appendChild(config.native.style);        
          }
          /*  */
          tmp.d = document.getElementById("dark-mode-native-sheet");
          if (!tmp.d) {
            document.documentElement.appendChild(config.native.sheet);
          }
        }
      }
    },
    "darkness": function (e) {
      try {
        if (e && e.length) {
          for (let i = 0; i < e.length; i++) {
            if (document.cookie) {
              if (document.cookie.indexOf(e[i]) !== -1) {
                return true;
              }
            }
            /*  */
            if (localStorage) {
              let keys = JSON.stringify(localStorage).replace(/\\/g, '').replace(/\"/g, '');
              if (keys) {
                if (keys.indexOf(e[i]) !== -1) {
                  return true;
                }
              }
            }
            /*  */
            if (sessionStorage) {
              let keys = JSON.stringify(sessionStorage).replace(/\\/g, '').replace(/\"/g, '');
              if (keys) {
                if (keys.indexOf(e[i]) !== -1) {
                  return true;
                }
              }
            }
          }
        }
      } catch (e) {
        return false;
      }
      /*  */
      return false;
    }
  },
  "render": function (e) {
    let top = e.top ? e.top : document.location.href;
    let uri = e.uri ? e.uri : decodeURIComponent(top);
    let darkness = config.check.darkness(e.storage.cookie);
    let hostname = e.hostname ? e.hostname : config.hostname(top);
    let options = {"reload": e.reload, "frameId": e.frameId, "cssstylesheet": e.storage.nativecssstylesheet};
    /*  */
    if (darkness) {
      return config.apply.style({"loc": 0, "href_g": '', "href_c": '', "text_c": '', "text_n": '', "options": options});
    }
    /*  */
    if (top.indexOf("/chrome/newtab") !== -1) {
      return config.apply.style({"loc": 1, "href_g": '', "href_c": '', "text_c": '', "text_n": '', "options": options});
    }
    /*  */
    if (e.storage.inclusiveaction) {
      if (e.storage.inclusivelist.indexOf(hostname) === -1) {
        return config.apply.style({"loc": 9, "href_g": '', "href_c": '', "text_c": '', "text_n": '', "options": options});
      }
    }
    /*  */
    if (e.storage.whitelist) {
      for (let i = 0; i < e.storage.whitelist.length; i++) {
        if (e.storage.whitelist[i] === hostname) {
          return config.apply.style({"loc": 2, "href_g": '', "href_c": '', "text_c": '', "text_n": '', "options": options});
        }
      }
    }
    /*  */
    website.theme.number.active = null;
    for (let i = 1; i <= website.total.themes.number; i++) {
      if (e.storage["dark_" + i]) {
        website.theme.number.active = i;
        break;
      }
    }
    /*  */
    config.native.selected = website.theme.number.active === website.theme.number.native;
    config.native.compatible = e.storage.nativecompatible && config.native.selected;
    config.native.respect = e.storage.nativerespect && config.native.selected;
    config.native.ignore = e.storage.nativeignore && config.native.selected;
    config.native.darken.background.image = e.storage.nativedarkenimage;
    config.native.force.color.border = e.storage.nativeforceborder;
    config.native.cssstylesheet = e.storage.nativecssstylesheet;
    config.native.css.variables = e.storage.nativecssvariables;
    config.native.mapcssvariables = e.storage.mapcssvariables;
    config.native.mediaquery = e.storage.nativemediaquery;
    config.native.css.rules = e.storage.nativecssrules;
    config.native.colorful = e.storage.nativecolorful;
    config.native.priority = e.storage.nativepriority;
    config.native.continue = e.storage.nativecontinue;
    config.native.inline = e.storage.nativeinline;
    config.native.colorfulmap = {
      "svg": e.storage["nativecolorful-svg"] !== undefined ? e.storage["nativecolorful-svg"] : false,
      "font": e.storage["nativecolorful-font"] !== undefined ? e.storage["nativecolorful-font"] : false,
      "border": e.storage["nativecolorful-border"] !== undefined ? e.storage["nativecolorful-border"] : false,
      "background": e.storage["nativecolorful-background"] !== undefined ? e.storage["nativecolorful-background"] : true
    };
    /*  */
    for (let name in website.custom.regex.rules) {
      const cond_1 = config.native.ignore === false;
      const cond_2 = config.native.compatible === false;
      const cond_3 = config.native.compatible && e.compatible.indexOf(name) === -1;
      /*  */
      let usecustom = cond_1 && (cond_2 || cond_3);
      if (usecustom) {
        if (e.storage[name]) {
          let rule = new RegExp(website.custom.regex.rules[name]);
          if (rule.test(uri)) {
            let href_g = e.storage.state === "dark" ? chrome.runtime.getURL("data/content_script/custom/dark.css") : '';
            let href_c = e.storage.state === "dark" ? chrome.runtime.getURL("data/content_script/custom/" + name + ".css") : '';
            /*  */
            href_g = website.exclude.from.custom.dark.mode.indexOf(name) === -1 ? href_g : '';
            config.apply.style({"loc": 3, "href_g": href_g, "href_c": href_c, "text_c": '', "text_n": '', "options": options});
            return;
          }
        }
      }
    }
    /*  */
    if (e.storage.state === "dark") {
      if (website.theme.number.active) {
        if (website.theme.number.active === website.theme.number.custom) {
          config.apply.style({"loc": 4, "href_g": '', "href_c": '', "text_c": e.storage.custom, "text_n": '', "options": options});
        } else if (config.native.selected) {
          const rules = config.native.css.rules;
          const variables = JSON.stringify(config.native.css.variables, null, 2).replace(/\"/g, '').replace(/\,\n/g, ";\n");
          const nativecss = ":root, ::after, ::before, ::backdrop " + variables + "\n\n" + rules;
          //
          config.apply.style({"loc": 5, "href_g": '', "href_c": '', "text_c": '', "text_n": nativecss, "options": options});
        } else {
          let href_g = chrome.runtime.getURL("data/content_script/general/dark_" + website.theme.number.active + ".css");
          config.apply.style({"loc": 6, "href_g": href_g, "href_c": '', "text_c": '', "text_n": '', "options": options});
        }
      } else {
        config.apply.style({"loc": 7, "href_g": '', "href_c": '', "text_c": '', "text_n": '', "options": options});
      }
    } else {
      config.apply.style({"loc": 8, "href_g": '', "href_c": '', "text_c": '', "text_n": '', "options": options});
    }
  },
  "native": {
    "inline": false,
    "ignore": false,
    "respect": false,
    "colorful": true,
    "continue": false,
    "selected": false,
    "priority": false,
    "colorfulmap": {},
    "compatible": true,
    "stylesheet": null,
    "mediaquery": false,
    "cssstylesheet": false,
    "mapcssvariables": true,
    "style": document.getElementById("dark-mode-native-style"),
    "sheet": document.getElementById("dark-mode-native-sheet"),
    "css": {
      "rules": '',
      "variables": ''
    },
    "force": {
      "color": {
        "border": true
      }
    },
    "darken": {
      "background": {
        "image": true
      }
    },
    "shadow": {
      "sheets": [],
      "timeout": null,
      "classnames": [],
      "toggle": {
        "stylesheets": function (e) {
          if (native.dark.engine.map.css.stylesheets) {
            for (let key in native.dark.engine.map.css.stylesheets) {
              const cssstylesheet = native.dark.engine.map.css.stylesheets[key];
              if (cssstylesheet) {
                cssstylesheet.disabled = e.disabled;
                //
                const shadownode = cssstylesheet[native.dark.object.shadownode];
                if (shadownode) {
                  if (e.disabled) {
                    shadownode.removeAttribute(native.dark.attribute.theme);
                  } else {
                    shadownode.setAttribute(native.dark.attribute.theme, '');
                  }
                }
              }
            }
          }
        }
      },
      "find": {
        "nodes": function (target, selector) {
          const nodes = [];
          //
          try {
            const recursivefind = function (node) {
              if (node) {
                if (node.nodeType !== Node.ELEMENT_NODE) return;
                if (node.matches(selector)) nodes.push(node);
                //
                const nodechilds = node.children;
                if (nodechilds) {
                  if (nodechilds.length) {
                    for (const nodechild of nodechilds) {
                      recursivefind(nodechild);
                    }
                  }
                }
                //
                const shadowoot = node.shadowRoot;
                if (shadowoot) {
                  const shadowchilds = shadowoot.children;
                  if (shadowchilds) {
                    for (const shadowchild of shadowchilds) {
                      recursivefind(shadowchild);
                    }
                  }
                }
              }
            }
            //
            recursivefind(target);
          } catch (e) {
            if (config.log) {
              console.error(e);
            }
          }
          //
          return nodes;
        },
        "stylesheets": function (target) {
          try {
            const selector = '[' + native.dark.class.shadownode + ']';
            const shadownodes = config.native.shadow.find.nodes(target, selector);
            //
            if (shadownodes) {
              if (shadownodes.length) {
                for (let i = 0; i < shadownodes.length; i++) {
                  let shadow = {};
                  //
                  shadow.node = shadownodes[i];
                  shadow.classname = shadow.node.getAttribute(native.dark.class.shadownode);
                  shadow.action = config.native.shadow.classnames.indexOf(shadow.classname) === -1;
                  //
                  if (shadow.action) {
                    shadow.root = shadow.node.shadowRoot;
                    //
                    if (shadow.root) {
                      config.native.shadow.classnames.push(shadow.classname);
                      //
                      shadow.stylesheets = [...shadow.root.styleSheets];
                      shadow.adoptedstylesheets = [...shadow.root.adoptedStyleSheets];
                      shadow.sheets = [...shadow.stylesheets, ...shadow.adoptedstylesheets];
                      //
                      let cssstylesheet = native.dark.engine.map.css.stylesheets[shadow.classname];
                      if (cssstylesheet === undefined) {
                        cssstylesheet = new CSSStyleSheet();
                        cssstylesheet[native.dark.object.shadownode] = shadow.node;
                        cssstylesheet.disabled = native.dark.engine.is.active ? false : true;
                        native.dark.engine.map.css.stylesheets[shadow.classname] = cssstylesheet;
                      }
                      //
                      if (shadow.sheets) {
                        if (shadow.sheets.length) {
                          for (let j = 0; j < shadow.sheets.length; j++) {
                            let sheet = shadow.sheets[j];
                            //
                            if (sheet[native.dark.object.shadownode] === undefined) {
                              sheet[native.dark.attribute.shadowroot] = true;
                              //
                              let _cssstylesheet = sheet[native.dark.object.cssstylesheet];
                              if (_cssstylesheet === undefined) {
                                sheet[native.dark.object.cssstylesheet] = cssstylesheet;
                                shadow.root.adoptedStyleSheets = [...shadow.root.adoptedStyleSheets, cssstylesheet];
                              } else {
                                shadow.root.adoptedStyleSheets = [...shadow.root.adoptedStyleSheets, _cssstylesheet];
                              }
                            }
                          }
                          //
                          config.native.shadow.sheets = [...config.native.shadow.sheets, ...shadow.sheets];
                        }
                      }
                    }
                  }
                }
              }
            }
          } catch (e) {
            if (config.log) {
              console.error(e);
            }
          }
        }
      }
    }
  }
};

config.start();

//if (window === window.top) config.temporarily.add();

background.receive("storage", config.render);
background.receive("content", config.content);

window.addEventListener("load", config.load, false);
window.addEventListener("message", config.message, false);