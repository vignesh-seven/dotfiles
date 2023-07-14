var native = {
  "dark": {
    "object": {
      "shadownode": "native-dark-object-shadownode",
      "cssstylesheet": "native-dark-object-cssstylesheet"
    },
    "attribute": {
      "theme": "native-dark-active",
      "processed": "native-dark-attribute-processed",
      "shadowroot": "native-dark-attribute-shadowroot"
    },
    "class": {
      "cloned": "native-dark-class-cloned",
      "modified": "native-dark-class-modified",
      "original": "native-dark-class-original",
      "processed": "native-dark-class-processed",
      "shadownode": "native-dark-class-shadownode"
    },
    "regexp": {
      "url": /url\(['"]?((?:\S*?\(\S*?\))*\S*?)['"]?\)/,
      "check": /(?:-|_)(\d+[\/\d. ]*|\d)x|(\d+[\/\d. ]*|\d)x(?:-|_)/,
      "relative": /url\((?!['"]?(?:data:|https?:|\/\/))(['"]?)([^'")]*)\1\)/g,
      "color": new RegExp(`(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\)|${website.color.names.join('|')})`, 'i')
    },
    "theme": {
      "number": 41,
      "css": {
        "base": {
          "url": "native-dark-base-url"
        },
        "variable": {
          "prefix": "--native-dark-"
        }
      }
    },
    "observer": {
      "map": {},
      "delay": 0,
      "timeout": {
        'a': null, 
        'b': null, 
        'c': null,
        'd': null
      },
      "style": {
        "mutation": null,
        "options": {
          "subtree": true,
          "attributes" : true,
          "attributeFilter": ["style"]
        },
        "action": function (node) {
          if (node) {
            try {
              if (node.style) {
                if (node.style.length) {
                  const csstext = node.style.cssText;
                  //
                  if (csstext) {
                    const stylekeys = ["--", "color:", "border-color:", "background:", "background-color:", "background-image:"];
                    //
                    for (let i = 0; i < stylekeys.length; i++) {
                      if (csstext.indexOf(stylekeys[i]) !== -1) {
                        if (native.dark.observer.timeout.d) window.clearTimeout(native.dark.observer.timeout.d);
                        native.dark.observer.timeout.d = window.setTimeout(function () {
                          native.dark.engine.analyze.document.inline.styles();
                        }, native.dark.observer.delay);
                        //
                        return true;
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
          //
          return false;
        },
        "callback": function (mutations) {
          if (mutations) {
            try {
              for (let mutation of mutations) {
                if (mutation.attributeName) {
                  if (mutation.attributeName === "style") {
                    const node = mutation.target;
                    //
                    if (node) {
                      if (node.nodeType === Node.ELEMENT_NODE) {
                        const success = native.dark.observer.style.action(node);
                        if (success) return;
                        //
                        if (config.native.continue === false) {
                          if (document.readyState === "complete") {
                            const nodes = [...node.querySelectorAll("[style]")];
                            //
                            if (nodes) {
                              for (let i = 0; i < nodes.length; i++) {
                                const node = nodes[i];
                                if (node) {
                                  if ([...node.classList].filter(e => e.indexOf("ndcis-") !== -1).length === 0) {
                                    const success = native.dark.observer.style.action(node);
                                    if (success) return;
                                  }
                                }
                              }
                            }
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
      },
      "element": {
        "mutation": null,
        "options": {
          "subtree": true,
          "childList": true
        },
        "callback": function (mutations) {
          if (mutations) {
            try {
              for (let mutation of mutations) {
                for (let node of mutation.addedNodes) {
                  const tagname = node.tagName ? node.tagName.toLowerCase() : '';
                  const nodename = node.nodeName ? node.nodeName.toLowerCase() : '';
                  const htmlname = tagname || nodename;
                  //
                  const cond_1 = htmlname === "link" || htmlname === "style";
                  const cond_2 = htmlname === "iframe" || htmlname === "script";
                  //
                  if (cond_1) {
                    let cloned = native.dark.engine.is.node.cloned(node);
                    if (!cloned) {
                      if (config.log) console.error("process", htmlname);
                      native.dark.engine.analyze.document.node(node, node.sheet, "process", 0);
                      //
                      if (native.dark.observer.timeout.a) window.clearTimeout(native.dark.observer.timeout.a);
                      native.dark.observer.timeout.a = window.setTimeout(function () {
                        try {
                          let stylemap = document.documentElement.computedStyleMap();
                          if (stylemap) {
                            for (const item of stylemap) {
                              if (item) {
                                if (item[0]) {
                                  if (item[1]) {
                                    if (item[1][0]) {
                                      if (item[1][0][0]) {
                                        if (item[0].indexOf(native.dark.theme.css.variable.prefix) === -1) {
                                          native.dark.engine.map.css.object["var(" + item[0] + ")"] = item[1][0][0];
                                        }
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
                      }, native.dark.observer.delay);
                    }
                  }
                  //
                  if (cond_2) {
                    if (native.dark.observer.timeout.b) window.clearTimeout(native.dark.observer.timeout.b);
                    native.dark.observer.timeout.b = window.setTimeout(function () {
                      if (config.log) console.error("process", htmlname);
                      native.dark.engine.analyze.document.sheets("process", 1);
                    }, native.dark.observer.delay);
                  }
                  //
                  if (config.native.continue) {
                    try {
                      const cond_3 = !cond_1 && !cond_2;
                      const cond_4 = document.readyState === "complete";
                      const cond_5 = node.nodeType === Node.ELEMENT_NODE;
                      //
                      if (cond_3 && cond_4 && cond_5) {
                        const id = node.id;
                        const name = node.className;
                        //
                        if (id || name) {
                          const cond_6 = id ? native.dark.observer.map[id] === undefined : true;
                          const cond_7 = name ? native.dark.observer.map[name] === undefined : true;
                          //
                          if (cond_6 && cond_7) {
                            if (id) native.dark.observer.map[id] = true;
                            if (name) native.dark.observer.map[name] = true;
                            //
                            if (native.dark.observer.timeout.c) window.clearTimeout(native.dark.observer.timeout.c);
                            native.dark.observer.timeout.c = window.setTimeout(function () {
                              if (config.log) console.error("process", htmlname);
                              native.dark.engine.analyze.document.sheets("process", 2);
                            }, native.dark.observer.delay);
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
            } catch (e) {
              if (config.log) {
                console.error(e);
              }
            }
          }
        }
      }
    },
    "engine": {
      "map": {
        "css": {
          "rules": {},
          "object": {},
          "sheets": {},
          "classnames": {},
          "stylesheets": {},
          "inlinestyles": {},
          "variables": async function (style) {
            try {
              [...style].map((name) => [name.trim(), style.getPropertyValue(name).trim()]).filter(([e]) => e.startsWith("--")).forEach((item) => {
                if (item) {
                  if (item[0]) {
                    if (item[1]) {
                      if (item[0].indexOf(native.dark.theme.css.variable.prefix) === -1) {
                        native.dark.engine.map.css.object["var(" + item[0] + ")"] = item[1];
                      }
                    }
                  }
                }
              });
            } catch (e) {
              if (config.log) {
                console.error(e);
              }
            }
          }
        }
      },
      "add": {
        "class": {
          "modified": function (node, sheet) {
            const local = native.dark.engine.is.node.local(node);
            if (!local) {
              const cloned = native.dark.engine.is.node.cloned(node);
              if (!cloned) {
                const original = native.dark.engine.is.node.original(node);
                if (!original) {
                  const modified = native.dark.engine.is.node.modified(node);
                  if (!modified) {
                    const tagname = node.tagName ? node.tagName.toLowerCase() : '';
                    const nodename = node.nodeName ? node.nodeName.toLowerCase() : '';
                    const htmlname = tagname || nodename;
                    /*  */
                    if (htmlname === "style") {
                      node.classList.add(native.dark.class.modified);
                      native.dark.engine.process.stylesheet(sheet, 3);
                    }
                  }
                }
              }
            }
          }
        }
      },
      "fetch": {
        "stack": {},
        "remote": {
          "css": async function (href, node, index) {
            if (href) {
              try {
                try {
                  if (href.startsWith("http") === false) {
                    href = (new URL(href, document.location.href)).href;
                  }
                } catch (e) {
                  if (config.log) {
                    console.error(e);
                  }
                }
                //
                const cond_0 = href.endsWith(".css");
                const cond_1 = href.startsWith("http");
                const relative = href.replace(/^.*\:\/\//i, '');
                const cond_2 = href.indexOf("font.") === -1 && href.indexOf("font-") === -1 && relative.indexOf("/font") === -1;
                const cond_3 = href.indexOf("fonts.") === -1 && href.indexOf("fonts-") === -1 && relative.indexOf("/fonts") === -1;
                //
                if ((cond_0 && cond_1) || (cond_1 && cond_2 && cond_3)) {
                  if (node) {
                    let original = native.dark.engine.is.node.original(node);
                    if (!original) {
                      node.classList.add(native.dark.class.original);
                    }
                  }
                  //
                  const origin_1 = (new URL(href)).origin;
                  const origin_2 = document.location.origin;
                  native.dark.engine.fetch.stack[href] = node;
                  //
                  if (origin_1 === origin_2) {
                    try {
                      let response = await fetch(href);
                      if (response) {
                        if (response.ok) {
                          let cloned = response.clone();
                          //
                          let content = await response.text();
                          if (content) {
                            if (content.includes("\x00")) {
                              let decoder = new TextDecoder("utf-16");
                              let buffer = await cloned.arrayBuffer();
                              content = buffer ? decoder.decode(buffer) : content;
                            }
                            //
                            native.dark.engine.insert.remote.style(href, content, index);
                          }
                        }
                      }
                    } catch (e) {
                      background.send("fetch", {"href": href, "index": index});
                    }
                  } else {
                    background.send("fetch", {"href": href, "index": index});
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
      },
      "process": {
        "cssstylesheet": async function (src) { // Constructable Stylesheets
          if (src) {
            let script = document.createElement("script");
            script.type = "text/javascript";
            script.onload = function () {script.remove()};
            script.dataset.state = native.dark.engine.is.active ? "active" : "inactive";
            script.src = src;
            /*  */
            document.documentElement.appendChild(script);
          }
        },
        "remote": {
          "style": function (e) {
            if (e) {
              if (e.href) {
                if (e.content) {
                  native.dark.engine.insert.remote.style(e.href, e.content, e.index);
                }
              }
            }
          }
        },
        "color": function (code, rule, type, method, fallback) {
          if (code === fallback) return code;
          /*  */
          if (config.native.colorful) {
            if (config.native.colorfulmap[type] === true) {
              try {
                if (tinycolor) {
                  let color = code;
                  //
                  if (config.native.mapcssvariables) {
                    if (color.indexOf("--") !== -1) {
                      if (color.indexOf(',') === -1) {
                        color = native.dark.engine.map.css.object[color];
                        //
                        for (let i = 0; i < 5; i++) {
                          if (color) {
                            if (color.indexOf("--") !== -1) {
                              color = native.dark.engine.map.css.object[color];
                            } else break;
                          } else break;
                        }
                      } else {
                        try {
                          const colorstring = color.replace("var(", '').replace(')', '').trim();
                          //
                          const colorarray = colorstring.split(/,(.*)/s);
                          const colorkey_1 = colorarray[0].indexOf("--") !== -1 && colorarray[0].indexOf("var(") === -1 ? "var(" + colorarray[0] + ')' : colorarray[0];
                          const colorkey_2 = colorarray[1].indexOf("--") !== -1 && colorarray[1].indexOf("var(") === -1 ? "var(" + colorarray[1] + ')' : colorarray[1];
                          const colorcode_1 = colorkey_1.indexOf("--") !== -1 ? native.dark.engine.map.css.object[colorkey_1] : colorkey_1;
                          const colorcode_2 = colorkey_2.indexOf("--") !== -1 ? native.dark.engine.map.css.object[colorkey_2] : colorkey_2;
                          //
                          color = colorcode_1 ? colorcode_1 : colorcode_2;
                        } catch (e) {
                          if (config.log) {
                            console.error(e);
                          }
                        }
                      }
                    }
                  }
                  //
                  if (color) {
                    if (color.indexOf("--") === -1) {
                      if (color === "transparent") {
                        return "var(--native-dark-transparent-color)";
                      }
                      /*  */
                      const specs = tinycolor(color);
                      if (specs) {
                        const valid = specs.isValid();
                        if (valid) {
                          const percent = 10;
                          const hsl = specs.toHsl();
                          const text = rule ? rule.selectorText : '';
                          const limit = {"lower": 0.10, "upper": 0.90};
                          const threshold = {"min": 0.10, "max": 0.75};
                          /*  */
                          const hue = hsl.h;
                          const lightness = hsl.l;
                          const saturation = hsl.s;
                          const luminance = specs.getLuminance();
                          const alpha = hsl.a !== undefined ? hsl.a : specs.getAlpha();
                          /*  */
                          const cond_1 = lightness > threshold.max;
                          const cond_2 = ((saturation + lightness) / 2) > threshold.max;
                          const cond_3 = isNaN(saturation) === false && isNaN(lightness) === false && isNaN(alpha) === false;
                          const cond_4 = alpha !== undefined ? (alpha > threshold.max) || (saturation < limit.lower && lightness > limit.upper) : true;
                          const cond_5 = text ? text.indexOf('.') === -1 && text.split(',').map(e => e.trim()).filter(e => (e === "html" || e === "body")).length > 0 : false;
                          /*  */
                          if (alpha < limit.lower) {
                            return code;
                          } else {
                            if (luminance > threshold.max || (cond_3 && cond_4 && (cond_1 || cond_2 || cond_5))) {
                              return fallback;
                            } else if (luminance > threshold.min) {
                              const tmp = method === "lighten" ? specs.lighten(percent) : specs.darken(percent);
                              return tmp.toHex8String();
                            } else {
                              /*  */
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
          /*  */
          return fallback;
        },
        "stylesheet": async function (sheet, loc) { // Internal & External Stylesheets
          try {
            if (sheet) {
              if (sheet.cssRules) {
                const length = sheet.cssRules.length;
                //
                for (let index = 0; index < length; index++) {
                  const rule = sheet.cssRules[index];
                  //
                  if (rule) {
                    if (rule.href) {
                      native.dark.engine.fetch.remote.css(rule.href, sheet.ownerNode, index);
                    } else if (rule.style) {
                      if (config.native.mapcssvariables) {
                        native.dark.engine.map.css.variables(rule.style);
                      }
                      //
                      native.dark.engine.process.action(rule, sheet);
                    } else if (rule.cssRules) { // i.e. @media, @support
                      for (let key of rule.cssRules) {
                        if (key.style) {
                          native.dark.engine.process.action(key, sheet);
                        }
                      }
                    } else if (rule.styleSheet) {
                      native.dark.engine.process.stylesheet(rule.styleSheet, 1);
                    } else {
                      /*  */
                    }
                  }
                }
              } else {
                if (config.log) {
                  console.error(rule);
                }
              }
            } else {
              if (config.log) {
                console.error(sheet);
              }
            }
          } catch (e) {
            if (config.log) {
              console.error(e);
            }
          }
        },
        "action": async function (rule, sheet) {
          if (rule) {
            if (sheet) {
              if (rule.style) {
                const current = rule.style.length;
                const processed = rule[native.dark.class.processed] === current;
                //
                if (!processed) {
                  let property = {};
                  let base = sheet[native.dark.theme.css.base.url];
                  let shadowroot = sheet[native.dark.attribute.shadowroot];
                  //
                  rule[native.dark.class.processed] = current;
                  if (base) rule[native.dark.theme.css.base.url] = base;
                  sheet[native.dark.class.processed] = sheet.cssRules.length;
                  if (shadowroot) rule[native.dark.attribute.shadowroot] = true;
                  //
                  property.color = rule.style.getPropertyValue("color");
                  property.backgroundonly = rule.style.getPropertyValue("background");
                  property.svg = rule.style.getPropertyValue("fill") || rule.style.getPropertyValue("stroke");        
                  property.image = rule.style.getPropertyValue("background-image") || rule.style.backgroundImage;
                  property.backgroundcolor = rule.style.getPropertyValue("background-color") || rule.style.backgroundColor;
                  //
                  property.outline = rule.style.getPropertyValue("outline") || 
                                     rule.style.getPropertyValue("outline-color") || rule.style.outlineColor;
                  //
                  property.shadow = rule.style.getPropertyValue("box-shadow") || rule.style.boxShadow || 
                                    rule.style.getPropertyValue("text-shadow") || rule.style.textShadow;
                  //
                  property.border = rule.style.getPropertyValue("border") || 
                                    rule.style.getPropertyValue("border-top") || rule.style.borderTop || 
                                    rule.style.getPropertyValue("border-left") || rule.style.borderLeft || 
                                    rule.style.getPropertyValue("border-color") || rule.style.borderColor || 
                                    rule.style.getPropertyValue("border-right") || rule.style.borderRight || 
                                    rule.style.getPropertyValue("border-bottom") || rule.style.borderBottom || 
                                    rule.style.getPropertyValue("border-top-color") || rule.style.borderTopColor || 
                                    rule.style.getPropertyValue("border-left-color") || rule.style.borderLeftColor || 
                                    rule.style.getPropertyValue("border-right-color") || rule.style.borderRightColor || 
                                    rule.style.getPropertyValue("border-bottom-color") || rule.style.borderBottomColor;         
                  //
                  if (property.color) native.dark.engine.apply.style.for["color"](rule);
                  if (property.shadow) native.dark.engine.apply.style.for["shadow"](rule);
                  if (property.image) native.dark.engine.apply.style.for["background-image"](rule);
                  if (property.backgroundonly) native.dark.engine.apply.style.for["background-only"](rule);
                  if (property.backgroundcolor) native.dark.engine.apply.style.for["background-color"](rule);
                  if (property.border || property.outline) native.dark.engine.apply.style.for["border"](rule);
                }
              }
            }
          }
        }
      },
      "analyze": {
        "document": {
          "inline": {
            "styles": function () {
              let nodes = [...document.querySelectorAll("[style]")];
              if (nodes) {
                for (let i = 0; i < nodes.length; i++) {
                  let node = nodes[i];
                  let tagname = node.tagName ? node.tagName.toLowerCase() : '';
                  let nodename = node.nodeName ? node.nodeName.toLowerCase() : '';
                  let htmlname = tagname || nodename;
                  //
                  native.dark.engine.insert.rule.inline(node, htmlname);
                }
              }
            }
          },
          "sheets": async function (key, loc) {
            if (key) {
              let sheets = [...document.styleSheets];
              if (sheets) { // #1
                for (let sheet of sheets) {
                  let node = sheet.ownerNode;
                  native.dark.engine.analyze.document.node(node, sheet, key, loc);
                }
              }
              //
              if (key === "process") {
                if (config.native.selected) {
                  if (config.native.inline) { // #2
                    native.dark.engine.analyze.document.inline.styles();
                  }
                  /*  */
                  if (config.native.cssstylesheet) { // #3
                    if (config.native.shadow.sheets) {
                      if (config.native.shadow.sheets.length) {
                        for (let i = 0; i < config.native.shadow.sheets.length; i++) {
                          let sheet = config.native.shadow.sheets[i];
                          if (sheet) {
                            if (sheet[native.dark.class.processed] === undefined) {
                              native.dark.engine.process.stylesheet(sheet, 5);
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "node": function (node, sheet, key, loc) {
            if (node) {
              let local = native.dark.engine.is.node.local(node);
              if (!local) {
                let original = native.dark.engine.is.node.original(node);
                if (!original) {
                  let tagname = node.tagName.toLowerCase();
                  let nodename = node.nodeName.toLowerCase();
                  let cond_1 = tagname === "link" || nodename === "link";
                  let cond_2 = tagname === "style" || nodename === "style";
                  /*  */
                  if (cond_1 || cond_2) {
                    let cloned = native.dark.engine.is.node.cloned(node);
                    let modified = native.dark.engine.is.node.modified(node);
                    let processed = native.dark.engine.is.sheet.processed(sheet);
                    /*  */
                    if (key === "clean") {
                      if (cloned) {
                        if (sheet) sheet.disabled = true;
                        node.setAttribute("disabled", '');
                      }
                    }
                    /*  */
                    if (key === "process") {
                      if (cloned) {
                        if (sheet) sheet.disabled = false;
                        node.removeAttribute("disabled");
                      }
                      /*  */
                      if (!processed) {
                        if (cond_1) {
                          let href = {};
                          href.a = sheet && sheet.href ? sheet.href : '';
                          href.b = node.type === "text/css" || node.rel === "stylesheet" ? node.href : '';
                          href.c = href.a || href.b;
                          //
                          native.dark.engine.fetch.remote.css(href.c, node, 0);
                        }
                        /*  */
                        if (cond_2) {
                          if (cloned || modified) {
                            native.dark.engine.process.stylesheet(sheet, 2);
                          } else {
                            native.dark.engine.add.class.modified(node, sheet);
                          }
                        }
                      }
                    }
                  } else {
                    if (config.log) {
                      console.error(sheet);
                    }
                  }
                }
              }
            } else {
              if (config.log) {
                console.error(sheet);
              }
            }
          }
        }
      },
      "is": {
        "active": false,
        "sheet": {
          "processed": function (sheet) {
            try {
              return sheet && sheet.cssRules ? sheet[native.dark.class.processed] === sheet.cssRules.length : false;
            } catch (e) {
              if (config.log) {
                console.error(e);
              }
            }
            //
            return false;
          }
        },
        "node": {
          "cloned": function (node) {
            return node && node.classList.contains(native.dark.class.cloned);
          },          
          "modified": function (node) {
            return node && node.classList.contains(native.dark.class.modified);
          },
          "original": function (node) {
            return node && node.classList.contains(native.dark.class.original);
          },
          "local": function (node) {
            const cond_a = node && node.id && node.id === "dark-mode-custom-link";
            const cond_b = node && node.id && node.id === "dark-mode-general-link";
            const cond_c = node && node.id && node.id === "dark-mode-custom-style";
            const cond_d = node && node.id && node.id === "dark-mode-native-style";
            const cond_e = node && node.id && node.id === "dark-mode-native-sheet";
            /*  */
            return cond_a || cond_b || cond_c || cond_d || cond_e;
          }
        },
        "color": {
          "valid": {
            "for": {
              "font": {
                "color": function (e) {
                  if (e) {
                    try {
                      e = e.toLowerCase();
                      /*  */
                      if (e.indexOf("--") !== -1) return true;
                      //
                      if (e.indexOf("inherit") === -1) {
                        if (e.indexOf("window") === -1) {
                          if (e.indexOf("windowtext") === -1) {
                            return true;
                          }
                        }
                      }
                    } catch (e) {
                      return false;
                    }
                  }
                  /*  */
                  return false;
                }
              },
              "border": function (e) {
                if (e) {
                  try {
                    e = e.toLowerCase();
                    /*  */
                    if (e.indexOf("--") !== -1) return true;
                    //
                    if (e.indexOf("none") === -1) {
                      if (e.indexOf("unset") === -1) {
                        if (e.indexOf("inherit") === -1) {
                          if (e.indexOf("initial") === -1) {
                            if (e.indexOf("window") === -1) {
                              if (e.indexOf("windowtext") === -1) {
                                if (e.indexOf("transparent") === -1) {
                                  return true;
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  } catch (e) {
                    return false;
                  }
                }
                /*  */
                return false;
              },
              "background": {
                "url": function (e) {
                  if (e) {
                    try {
                      e = e.toLowerCase();
                      /*  */
                      if (e.indexOf("url(") !== -1) {
                        return true;
                      }
                    } catch (e) {
                      return false;
                    }
                  }
                  /*  */
                  return false;
                },
                "color": function (e) {
                  if (e) {
                    try {
                      e = e.toLowerCase();
                      /*  */
                      if (e.indexOf("-gradient") !== -1) return false;
                      if (e.indexOf("--") !== -1) return true;
                      //
                      if (e.indexOf("none") === -1) {
                        if (e.indexOf("unset") === -1) {
                          if (e.indexOf("black") === -1) {
                            if (e.indexOf("url(") === -1) {
                              if (e.indexOf("inherit") === -1) {
                                if (e.indexOf("initial") === -1) {
                                  if (e.indexOf("window") === -1) {
                                    if (e.indexOf("windowtext") === -1) {
                                      if (e.indexOf("-gradient") === -1) {
                                        return true;
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    } catch (e) {
                      return false;
                    }
                  }
                  /*  */
                  return false;
                }
              }
            }
          }
        }
      },
      "apply": {
        "style": {
          "for": {
            "shadow": function (rule) {
              if (rule.style) {
                var tmp = rule.style.getPropertyValue("text-shadow") || rule.style.textShadow;
                if (tmp && tmp !== "var(--native-dark-text-shadow)") {
                  native.dark.engine.insert.rule.custom(rule, "text-shadow", "var(--native-dark-text-shadow)", '');
                }
                //
                var tmp = rule.style.getPropertyValue("box-shadow") || rule.style.boxShadow;
                if (tmp && tmp !== "none" && tmp.indexOf("transparent") === -1 && tmp !== "var(--native-dark-box-shadow)") {
                  native.dark.engine.insert.rule.custom(rule, "box-shadow", "var(--native-dark-box-shadow)", '');
                }
              }
            },
            "color": function (rule) {
              if (rule.style) {  
                var tmp = rule.style.getPropertyValue("color") || rule.style.color;
                if (native.dark.engine.is.color.valid.for.font.color(tmp)) {
                  if (tmp && tmp !== "var(--native-dark-font-color)") {
                    if (tmp.indexOf("transparent") === -1) {
                      const value = native.dark.engine.process.color(tmp, rule, "font", "lighten", "var(--native-dark-font-color)");
                      native.dark.engine.insert.rule.custom(rule, "color", value, '');
                    } else {
                      native.dark.engine.insert.rule.custom(rule, "font-size", "0", '');
                    }
                  }
                }
              }
            },
            "svg": function (rule) {
              if (rule.style) {
                var tmp = rule.style.getPropertyValue("fill") || rule.style.fill;
                if (tmp && tmp !== "var(--native-dark-fill-color)") {
                  const value = native.dark.engine.process.color(tmp, rule, "svg", "lighten", "var(--native-dark-fill-color)");
                  native.dark.engine.insert.rule.custom(rule, "fill", value, '');
                }
                //
                var tmp = rule.style.getPropertyValue("stroke");
                if (tmp && tmp !== "var(--native-dark-fill-color)") {
                  const value = native.dark.engine.process.color(tmp, rule, "svg", "lighten", "var(--native-dark-fill-color)");
                  native.dark.engine.insert.rule.custom(rule, "stroke", value, '');
                }
              }
            },
            "background-image": function (rule) {
              if (rule.style) {
                var tmp = rule.style.getPropertyValue("background-image") || rule.style.backgroundImage;
                if (tmp && tmp !== "none") {
                  if (tmp.indexOf("url(") === -1) {
                    if (tmp.indexOf("-gradient") !== -1) {
                      native.dark.engine.insert.rule.custom(rule, "background-image", "none", '');
                    }
                  } else {
                    if (config.native.darken.background.image) {
                      native.dark.engine.insert.rule.for.image(rule, "background-image", tmp);
                    }
                  }
                }
              }
            },
            "background-color": function (rule) {
              if (rule.style) {
                var tmp = rule.style.getPropertyValue("background-color") || rule.style.backgroundColor;
                if (tmp) {
                  if (native.dark.engine.is.color.valid.for.background.color(tmp)) {
                    const value = native.dark.engine.process.color(tmp, rule, "background", "darken", "var(--native-dark-bg-color)");
                    if (tmp !== value || tmp === "transparent") {
                      native.dark.engine.insert.rule.custom(rule, "background-color", value, '');
                    }
                  }
                }
              }
            },
            "background-only": function (rule) { 
              if (rule.style) {
                var tmp = rule.style.getPropertyValue("background");
                if (tmp) {
                  if (native.dark.engine.is.color.valid.for.background.color(tmp)) {
                    const value = native.dark.engine.process.color(tmp, rule, "background", "darken", "var(--native-dark-bg-color)");
                    if (tmp !== value || tmp === "transparent") {
                      native.dark.engine.insert.rule.custom(rule, "background", value, '');
                    }
                  }
                  //
                  if (native.dark.engine.is.color.valid.for.background.url(tmp)) {
                    if (config.native.darken.background.image) {
                      native.dark.engine.insert.rule.for.image(rule, "background", tmp);
                    }
                  }
                }
              }
            },
            "border": function (rule) {
              if (rule.style) {
                var a = rule.style.getPropertyValue("outline");
                var c = rule.style.getPropertyValue("outline-color") || rule.style.outlineColor;
                var b = rule.style.getPropertyValue("outline-width") || rule.style.outlineWidth || config.native.force.color.border;
                if ((a && b) || c) {
                  var tmp = c ? c : a;
                  if (tmp && tmp !== "var(--native-dark-border-color)") {
                    if (native.dark.engine.is.color.valid.for.border(tmp)) {
                      const value = native.dark.engine.process.color(tmp, rule, "border", "darken", "var(--native-dark-border-color)");
                      native.dark.engine.insert.rule.custom(rule, "outline-color", value, '');
                    }
                  }
                }
                /*  */
                var a = rule.style.getPropertyValue("border");
                var c = rule.style.getPropertyValue("border-color") || rule.style.borderColor;
                var b = rule.style.getPropertyValue("border-width") || rule.style.borderWidth || config.native.force.color.border;
                if ((a && b) || c) {
                  var tmp = c ? c : a;
                  if (tmp && tmp !== "var(--native-dark-border-color)") {
                    if (native.dark.engine.is.color.valid.for.border(tmp)) {
                      const value = native.dark.engine.process.color(tmp, rule, "border", "darken", "var(--native-dark-border-color)");
                      native.dark.engine.insert.rule.custom(rule, "border-color", value, '');
                    }
                  }
                }
                /*  */
                var a = rule.style.getPropertyValue("border-top") || rule.style.borderTop;
                var c = rule.style.getPropertyValue("border-top-color") || rule.style.borderTopColor;
                var b = rule.style.getPropertyValue("border-top-width") || rule.style.borderTopWidth || config.native.force.color.border;
                if ((a && b) || c) {
                  var tmp = c ? c : a;
                  if (tmp && tmp !== "var(--native-dark-border-color)") {
                    if (native.dark.engine.is.color.valid.for.border(tmp)) {
                      const value = native.dark.engine.process.color(tmp, rule, "border", "darken", "var(--native-dark-border-color)");
                      native.dark.engine.insert.rule.custom(rule, "border-top-color", value, '');
                    }
                  }
                }
                /*  */
                var a = rule.style.getPropertyValue("border-left") || rule.style.borderLeft;
                var c = rule.style.getPropertyValue("border-left-color") || rule.style.borderLeftColor;
                var b = rule.style.getPropertyValue("border-left-width") || rule.style.borderLeftWidth || config.native.force.color.border;
                if ((a && b) || c) {
                  var tmp = c ? c : a;
                  if (tmp && tmp !== "var(--native-dark-border-color)") {
                    if (native.dark.engine.is.color.valid.for.border(tmp)) {
                      const value = native.dark.engine.process.color(tmp, rule, "border", "darken", "var(--native-dark-border-color)");
                      native.dark.engine.insert.rule.custom(rule, "border-left-color", value, '');
                    }
                  }
                }
                /*  */
                var a = rule.style.getPropertyValue("border-right") || rule.style.borderRight;
                var c = rule.style.getPropertyValue("border-right-color") || rule.style.borderRightColor;
                var b = rule.style.getPropertyValue("border-right-width") || rule.style.borderRightWidth || config.native.force.color.border;
                if ((a && b) || c) {
                  var tmp = c ? c : a;
                  if (tmp && tmp !== "var(--native-dark-border-color)") {
                    if (native.dark.engine.is.color.valid.for.border(tmp)) {
                      const value = native.dark.engine.process.color(tmp, rule, "border", "darken", "var(--native-dark-border-color)");
                      native.dark.engine.insert.rule.custom(rule, "border-right-color", value, '');
                    }
                  }
                }
                /*  */
                var a = rule.style.getPropertyValue("border-bottom") || rule.style.borderBottom;
                var c = rule.style.getPropertyValue("border-bottom-color") || rule.style.borderBottomColor;
                var b = rule.style.getPropertyValue("border-bottom-width") || rule.style.borderBottomWidth || config.native.force.color.border;
                if ((a && b) || c) {
                  var tmp = c ? c : a;
                  if (tmp && tmp !== "var(--native-dark-border-color)") {
                    if (native.dark.engine.is.color.valid.for.border(tmp)) {
                      const value = native.dark.engine.process.color(tmp, rule, "border", "darken", "var(--native-dark-border-color)");
                      native.dark.engine.insert.rule.custom(rule, "border-bottom-color", value, '');
                    }
                  }
                }
              }
            }
          }
        }
      },
      "insert": {
        "remote": {
          "style": function (href, content, index) {
            let style = document.createElement("style");
            /*  */
            try {
              content = content.replace(native.dark.regexp.relative, function (match, paran1, paran2) {
                try {
                  return "url('" + (new URL(paran2, href)).href + "')";
                } catch (e) {
                  if (config.log) {
                    console.error(e);
                  }
                }
                //
                return match;
              });
            } catch (e) {
              if (config.log) {
                console.error(e);
              }
            }
            //
            style.textContent = content;
            style.setAttribute("lang", "en");
            style.setAttribute("type", "text/css");
            style.setAttribute("native-dark-index", index);
            style.classList.add(native.dark.class.cloned);
            /*  */
            let node = native.dark.engine.fetch.stack[href];
            if (node) {
              if (node.media) style.setAttribute("media", node.media);
              node.appendChild(style);
            } else {
              document.head.appendChild(style);
            }
            /*  */
            style.sheet[native.dark.theme.css.base.url] = href;
            native.dark.engine.process.stylesheet(style.sheet, 4);
          }
        },
        "rule": {
          "for": {
            "node": function (node, name, value, classname) {
              try {
                if (classname) {
                  const selector = "html[" + native.dark.attribute.theme + "]" + " ." + classname;
                  const cssrulestring = selector + ' ' + "{" + name + ": " + value + " !important}";
                  //
                  if (native.dark.engine.map.css.rules[cssrulestring] === undefined) {
                    let sheet = config.native.stylesheet;
                    index = sheet.insertRule(cssrulestring, 0);
                    native.dark.engine.map.css.rules[selector] = index;
                    native.dark.engine.map.css.rules[cssrulestring] = index;
                  }
                }
              } catch (e) {
                if (config.log) {
                  console.error(e);
                }
              }
            },
            "image": function (rule, name, value) {
              try {
                let item = '';
                value = decodeURIComponent(value);
                name = value.indexOf("url(") === 0 ? "background-image" : name;
                //
                if (native.dark.regexp.check.test(value) === false) {
                  if (value.indexOf("data:image/svg") !== -1) {
                    item = 'a';
                    //
                    const o_color = native.dark.regexp.color.exec(value)[0].trim();
                    const c_color = tinycolor(config.native.css.variables["--native-dark-fill-color"]).toRgbString();
                    const n_color = native.dark.engine.process.color(o_color, '', "background", "lighten", c_color);
                    value = value.replace(o_color, n_color);
                  } else {
                    item = 'c';
                    value = native.dark.regexp.url.exec(value)[0].trim();
                  }
                  //
                  const option = {
                    'a': [name, value],
                    'b': ["filter", "var(--native-dark-bg-image-filter)"],
                    'c': [name, "linear-gradient(var(--native-dark-bg-image-color), var(--native-dark-bg-image-color)), " + value]
                  };
                  //
                  if (rule) {
                    const text = rule.selectorText;
                    const ishtml = text.startsWith("html");
                    const isbody = text.startsWith("body");
                    const pseudo = text.indexOf("::") !== -1;
                    //
                    if (ishtml && pseudo) {
                      native.dark.engine.insert.rule.custom(rule, option.b[0], option.b[1], "html");
                    } else if (isbody && pseudo) {
                      native.dark.engine.insert.rule.custom(rule, option.b[0], option.b[1], "body");
                    } else {
                      native.dark.engine.insert.rule.custom(rule, option[item][0], option[item][1], '');
                    }
                  } else {
                    return option[item][1];
                  }
                } else {
                  return value;
                }
              } catch (e) {
                return value;
              }
            }
          },
          "inline": async function (node, htmlname) {
            if (node) {
              try {
                if (node.nodeType) {
                  if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.style) {
                      if (node.style.length) {
                        let classname = [...node.classList].filter(e => e.indexOf("ndcis-") !== -1)[0];
                        if (classname === undefined) {
                          classname = "ndcis-" + Math.floor(Math.random() * 1e7);
                          node.classList.add(classname);
                        }
                        //
                        let current = native.dark.engine.map.css.inlinestyles[classname] || {};
                        //
                        for (let i = 0; i < node.style.length; i++) {
                          try {
                            let value = '';
                            const key = node.style[i];
                            //
                            if (key) {
                              if (current[key] === undefined) {
                                if (key.startsWith("--")) {
                                  if (key.indexOf(native.dark.theme.css.variable.prefix) === -1) {
                                    value = node.style.getPropertyValue(key);
                                    native.dark.engine.map.css.object["var(" + key + ")"] = value;
                                  }
                                }
                                //
                                if (key === "color") {
                                  value = node.style.getPropertyValue(key);
                                  value = native.dark.engine.process.color(value, '', "font", "lighten", "var(--native-dark-font-color)");
                                  native.dark.engine.insert.rule.for.node(node, key, value, classname);
                                }
                                //
                                if (key === "border-color") {
                                  value = node.style.getPropertyValue(key);
                                  value = native.dark.engine.process.color(value, '', "border", "darken", "var(--native-dark-border-color)");
                                  native.dark.engine.insert.rule.for.node(node, key, value, classname);
                                }
                                //
                                if (key === "background" || key === "background-color") {
                                  value = node.style.getPropertyValue(key);
                                  value = native.dark.engine.process.color(value, '', "background", "darken", "var(--native-dark-bg-color)");
                                  native.dark.engine.insert.rule.for.node(node, key, value, classname);
                                }
                                //
                                if (key === "background-image") {
                                  if (config.native.darken.background.image) {
                                    value = node.style.getPropertyValue(key);
                                    value = native.dark.engine.insert.rule.for.image(null, "background-image", value);
                                    native.dark.engine.insert.rule.for.node(node, key, value, classname);
                                  }
                                }
                                //
                                current[key] = value ? value : "N/A";
                                native.dark.engine.map.css.inlinestyles[classname] = current;
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
                }
              } catch (e) {
                if (config.log) {
                  console.error(e);
                }
              }
            }
          },
          "custom": async function (rule, name, value, match) {
            try {
              const text = rule.selectorText;
              //
              if (text) {
                if (name) {
                  const list = {};
                  const shadowroot = rule[native.dark.attribute.shadowroot];
                  //
                  list.a = document.documentElement.id ? ["#" + document.documentElement.id] : [];
                  list.b = document.documentElement.classList.length ? [...document.documentElement.classList].map(e => "." + e) : [];
                  list.c = [...list.a, ...list.b];
                  //
                  const selector = text.split(',').map(e => {
                    const selectortext = e.trim();
                    const firstclass = selectortext.split(' ')[0];
                    //
                    const cond_1 = selectortext.startsWith("*");
                    const cond_7 = selectortext.startsWith("[");
                    const cond_2 = selectortext.startsWith("::");
                    const cond_3 = selectortext.startsWith("html");
                    const cond_9 = selectortext.startsWith(":root");
                    const cond_8 = selectortext.indexOf(">") === -1;
                    const cond_10 = selectortext.startsWith(":host");
                    const cond_4 = selectortext.startsWith(".") && selectortext.endsWith("body");
                    const cond_5 = list.c.length ? list.c.indexOf(firstclass) !== -1 : false;
                    const cond_6 = selectortext.indexOf("-body") === -1 && selectortext.indexOf("body-") === -1;
                    //
                    const keyhtml = "html[" + native.dark.attribute.theme + "]";
                    const keyhost = ":host([" + native.dark.attribute.theme + "])";
                    const keyglobal = shadowroot ? (cond_10 ? keyhost : '') : keyhtml;
                    //
                    if (cond_1 || cond_2) {
                      return '';
                    } else if (cond_3) {
                      return selectortext.replace("html", keyhtml);
                    } else if (cond_10) {
                      const simple = selectortext.indexOf(')') === -1;
                      const complement = '[' + native.dark.attribute.theme + "])";
                      return simple ? selectortext.replace(":host", keyhost) : selectortext.replace(')', complement);
                    } else {
                      if (cond_5) {
                        const querycount = [...document.querySelectorAll(firstclass)].length + 1;
                        //
                        if (querycount === 1) {
                          return keyglobal + (cond_8 ? '' : " ") + selectortext;
                        } else {
                          if (cond_8) {
                            return keyglobal + '' + selectortext + ', ' + keyglobal + " " + selectortext;
                          } else {
                            return keyglobal + " " + selectortext;
                          }
                        }
                      } else if (cond_7 || cond_9) {
                        return keyglobal + (cond_8 ? '' : " ") + selectortext;
                      } else {
                        return keyglobal + " " + selectortext;
                      }
                    }
                  }).filter(e => e).join(", ");
                  //
                  if (selector) {
                    let hasmediaquery = false;
                    const priority = rule.style.getPropertyPriority(name);
                    const cssrulebody = name + ": " + (value ? value : "var(--native-dark-bg-color)");
                    const postfix = config.native.priority ? " !important" : (priority ? " !" + priority : '');
                    //
                    let cssrulestring = selector + " " + "{" + cssrulebody + postfix + "}";
                    let cssrulechecksum = selector + " " + "{" + cssrulebody + " !important" + "}";
                    //
                    if (config.native.mediaquery) {
                      if (rule.parentRule) {
                        if ("media" in rule.parentRule) {
                          if (rule.parentRule.conditionText) {
                            hasmediaquery = true;
                            cssrulestring = "@media " + rule.parentRule.conditionText + " {" + cssrulestring + "}";
                          }
                        }
                      }
                    }
                    //
                    if (native.dark.engine.map.css.rules[cssrulestring] === undefined) {
                      const cond_1 = text.indexOf(".") === -1;
                      const cond_2 = text.indexOf(",") === -1;
                      const cond_3 = match ? text.startsWith(match) : false;
                      //
                      if (match === '' || (cond_1 && cond_2 && cond_3)) {
                        try {
                          let index = native.dark.engine.map.css.rules[selector];
                          let sheet = shadowroot ? rule.parentStyleSheet[native.dark.object.cssstylesheet] : config.native.stylesheet;
                          //
                          if (sheet) {
                            if (index === undefined || hasmediaquery === true) {
                              index = sheet.insertRule(cssrulestring, 0);
                              native.dark.engine.map.css.rules[selector] = index;
                              native.dark.engine.map.css.rules[cssrulestring] = index;
                            } else {
                              try {
                                for (let i = 0; i < sheet.cssRules.length; i++) {
                                  if (sheet.cssRules[i].selectorText === selector) {
                                    const checksum = native.dark.engine.map.css.rules[cssrulechecksum];
                                    //
                                    native.dark.engine.map.css.rules[selector] = i;
                                    native.dark.engine.map.css.rules[cssrulestring] = i;
                                    return checksum === undefined ? sheet.cssRules[i].style.setProperty(name, value, config.native.priority ? "important" : priority) : '';
                                  }
                                }
                                //
                                index = sheet.insertRule(cssrulestring, 0);
                                native.dark.engine.map.css.rules[selector] = index;
                                native.dark.engine.map.css.rules[cssrulestring] = index;
                              } catch (e) {
                                index = sheet.insertRule(cssrulestring, 0);
                                native.dark.engine.map.css.rules[selector] = index;
                                native.dark.engine.map.css.rules[cssrulestring] = index;
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
  }
};