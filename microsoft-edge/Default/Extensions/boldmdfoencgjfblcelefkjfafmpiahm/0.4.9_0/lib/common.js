var core = {
  "start": function () {
    core.load();
  },
  "install": function () {
    core.load();
    core.update.storage();
  },
  "load": function () {
    core.update.alarm();
    core.update.contextmenu();
  },
  "alarm": {
    "reset": function () {
      app.alarms.reset();
    },
    "create": {
      "on": function () {
        app.storage.get("scheduleon", function (e) {
          if (e.scheduleon && e.scheduleon !== undefined) {
            const date = new Date();
            const H = e.scheduleon.split(':')[0];
            const M = e.scheduleon.split(':')[1];
            /*  */
            let diff = new Date(date.getFullYear(), date.getMonth(), date.getDate(), Number(H), Number(M), 0, 0) - date;
            if (diff < 0) diff += 86400000; // next day
            /*  */
            app.alarms.clear("dark-mode-on", function () {
              app.alarms.create("dark-mode-on", {
                "when": Date.now() + diff
              });
            });
          }
        });
      },
      "off": function () {
        app.storage.get("scheduleoff", function (e) {
          if (e.scheduleoff && e.scheduleoff !== undefined) {
            const date = new Date();
            const H = e.scheduleoff.split(':')[0];
            const M = e.scheduleoff.split(':')[1];
            /*  */
            let diff = new Date(date.getFullYear(), date.getMonth(), date.getDate(), Number(H), Number(M), 0, 0) - date;
            if (diff < 0) diff += 86400000; // next day
            /*  */
            app.alarms.clear("dark-mode-off", function () {
              app.alarms.create("dark-mode-off", {
                "when": Date.now() + diff
              });
            });
          }
        });
      }
    }
  },
  "action": {
    "button": function () {
      config.addon.state = config.addon.state === "dark" ? "light" : "dark";
    },
    "reload": function (e) {
      app.storage.update(function () {
        core.update.page(e, true);
      });
    },
    "alarm": function (e) {
      if (e) {
        if (e.name) {
          config.addon.state = e.name === "dark-mode-on" ? "dark" : "light";
          core.update.alarm();
        }
      }
    },
    "storage": function (changes) {
      if ("state" in changes) {
        core.update.button();
      }      
      /*  */
      if ("inclusiveaction" in changes) {
        core.update.contextmenu();
      }
      /*  */
      if ("scheduleon" in changes || "scheduleoff" in changes || "scheduleaction" in changes) {
        core.update.alarm();
      }
    },
    "fetch": function (e) {
      if (e.href) {
        fetch(e.href).then(r => r.text()).then(function (content) {
          if (content) {
            app.page.send("content", {
              "href": e.href,
              "index": e.index,
              "content": content
            }, e ? e.tabId : null, e ? e.frameId : null);
          }
        }).catch(e => {
          //console.error(e);
        });
      }
    },
    "contextmenu": function (e) {
      if (e) {
        const pageUrl = e.pageUrl;
        //
        if (e.menuItemId === "dark-mode-contextmenu-include") {
          app.storage.get({"inclusivelist": []}, function (data) {
            let inclusivelist = data.inclusivelist;
            inclusivelist.push(config.hostname(pageUrl));
            inclusivelist = inclusivelist.filter(function (element, index, array) {return element && array.indexOf(element) === index});
            app.storage.set({"inclusivelist": inclusivelist});
          });
        }
        /*  */
        if (e.menuItemId === "dark-mode-contextmenu-exclude") {
          app.storage.get({"whitelist": []}, function (data) {
            let whitelist = data.whitelist;
            whitelist.push(config.hostname(pageUrl));
            whitelist = whitelist.filter(function (element, index, array) {return element && array.indexOf(element) === index});
            app.storage.set({"whitelist": whitelist});
          });
        }
      }
    }
  },
  "update": {
    "button": function () {
      const state = config.addon.state;
      //
      app.button.icon(null, state);
      app.button.title(null, "Current State: " + state.toUpperCase());
    },
    "page": function (e, reload) {
      app.page.send("storage", {
        "reload": reload,
        "top": e ? e.top : null,
        "uri": e ? e.uri : null,
        "storage": app.storage.local,
        "frameId": e ? e.frameId : null,
        "hostname": e ? e.hostname : null,
        "compatible": website.custom.compatible
      }, e ? e.tabId : null, e ? e.frameId : null);
    },
    "alarm": function () {
      app.storage.get("scheduleaction", function (e) {
        if (e.scheduleaction !== undefined) {
          if (e.scheduleaction === true) {
            core.alarm.create.on();
            core.alarm.create.off();
          } else {
            core.alarm.reset();
          }
        }
      });
    },
    "contextmenu": function () {
      app.storage.get("inclusiveaction", function (e) {
        app.contextmenu.clear(function () {
          if (e.inclusiveaction) {
            app.contextmenu.create({
              "contexts": ["page"],
              "title": "Include in dark mode",
              "id": "dark-mode-contextmenu-include"
            }, app.error);
          } else {
            app.contextmenu.create({
              "contexts": ["page"],
              "title": "Exclude from dark mode",
              "id": "dark-mode-contextmenu-exclude"
            }, app.error);
          }
        });
      });
    },
    "storage": function () {
      app.storage.get(null, function (data) {
        let tmp = {};
        let cssrules = {};
        const active = "dark_" + 41;
        const cssvariables = website.custom.native.css.variables;
        /*  */
        cssrules.old = data.native;
        cssrules.new = website.custom.native.css.rules.replace(/\n/, '').replace(/          /g, '');
        /*  */
        tmp["open"] = data.open !== undefined ? data.open : false;
        tmp["custom"] = data.custom !== undefined ? data.custom : '';
        tmp["state"] = data.state !== undefined ? data.state : "light";
        tmp["whitelist"] = data.whitelist !== undefined ? data.whitelist : [];
        tmp["cookie"] = data.cookie !== undefined ? data.cookie : config.exception.keys;
        tmp["inclusivelist"] = data.inclusivelist !== undefined ? data.inclusivelist : [];
        tmp["inclusiveaction"] = data.inclusiveaction !== undefined ? data.inclusiveaction : false;
        /*  */
        tmp["scheduleon"] = data.scheduleon !== undefined ? data.scheduleon : '';
        tmp["scheduleoff"] = data.scheduleoff !== undefined ? data.scheduleoff : '';
        tmp["scheduleaction"] = data.scheduleaction !== undefined ? data.scheduleaction : false;
        /*  */
        tmp["nativeinline"] = data.nativeinline !== undefined ? data.nativeinline : false;
        tmp["nativeignore"] = data.nativeignore !== undefined ? data.nativeignore : false;
        tmp["nativerespect"] = data.nativerespect !== undefined ? data.nativerespect : false;
        tmp["nativepriority"] = data.nativepriority !== undefined ? data.nativepriority : false;
        tmp["nativecontinue"] = data.nativecontinue !== undefined ? data.nativecontinue : false;
        tmp["mapcssvariables"] = data.mapcssvariables !== undefined ? data.mapcssvariables : true;
        tmp["nativecompatible"] = data.nativecompatible !== undefined ? data.nativecompatible : true;
        tmp["nativemediaquery"] = data.nativemediaquery !== undefined ? data.nativemediaquery : false;
        tmp["nativeforceborder"] = data.nativeforceborder !== undefined ? data.nativeforceborder : true;
        tmp["nativedarkenimage"] = data.nativedarkenimage !== undefined ? data.nativedarkenimage : true;
        tmp["nativecssstylesheet"] = data.nativecssstylesheet !== undefined ? data.nativecssstylesheet : false;
        tmp["nativecssvariables"] = data.nativecssvariables !== undefined ? data.nativecssvariables : cssvariables;
        tmp["nativecssrules"] = data.nativecssrules !== undefined ? data.nativecssrules : (cssrules.old !== undefined ? cssrules.old : cssrules.new);
        /*  */
        tmp["nativecolorful"] = data.nativecolorful !== undefined ? data.nativecolorful : true;
        tmp["nativecolorful-svg"] = data["nativecolorful-svg"] !== undefined ? data["nativecolorful-svg"] : false;
        tmp["nativecolorful-font"] = data["nativecolorful-font"] !== undefined ? data["nativecolorful-font"] : false;
        tmp["nativecolorful-border"] = data["nativecolorful-border"] !== undefined ? data["nativecolorful-border"] : false;
        tmp["nativecolorful-background"] = data["nativecolorful-background"] !== undefined ? data["nativecolorful-background"] : true;
        /*  */
        tmp["section-1"] = data["section-1"] !== undefined ? data["section-1"] : false;
        tmp["section-2"] = data["section-2"] !== undefined ? data["section-2"] : false;
        tmp["section-3"] = data["section-3"] !== undefined ? data["section-3"] : false;
        tmp["section-4"] = data["section-4"] !== undefined ? data["section-4"] : true;
        tmp["section-5"] = data["section-5"] !== undefined ? data["section-5"] : false;
        tmp["section-6"] = data["section-6"] !== undefined ? data["section-6"] : false;
        tmp["section-7"] = data["section-7"] !== undefined ? data["section-7"] : false;
        /*  */
        for (let i = 1; i <= website.total.themes.number; i++) tmp["dark_" + i] = data["dark_" + i] !== undefined ? data["dark_" + i] : false;
        for (let name in website.custom.regex.rules) tmp[name] = data[name] !== undefined ? data[name] : true;
        tmp[active] = data[active] !== undefined ? data[active] : true;
        /*  */
        app.storage.set(tmp);
      });
    }
  }
};

app.on.alarm(core.action.alarm);
app.on.storage(core.action.storage);
app.storage.load(core.update.button);
app.button.on.clicked(core.action.button);
app.contextmenu.on.clicked(core.action.contextmenu);

app.page.receive("fetch", core.action.fetch);
app.page.receive("reload", core.action.reload);
app.page.receive("load", function (e) {core.update.page(e, false)});

app.options.receive("dark-mode-item", function () {app.tab.open(app.homepage())});
app.options.receive("test-dark-mode", function () {app.tab.open(config.page.test)});
app.options.receive("open-support-page", function () {app.tab.open(app.homepage())});
app.options.receive("dark-theme-item", function () {app.tab.open(config.page.theme)});
app.options.receive("reset-addon", function () {app.storage.clear(core.update.storage)});
app.options.receive("dark-new-tab-item", function () {app.tab.open(config.page.newtab)});
app.options.receive("youtube-tutorial", function () {app.tab.open(config.page.tutorial)});
app.options.receive("make-a-donation", function () {app.tab.open(app.homepage() + "?reason=support")});

app.on.startup(core.start);
app.on.installed(core.install);