{
  let script = document.currentScript;
  
  Element.prototype.attachShadow = new Proxy(Element.prototype.attachShadow, {
    apply(target, self, args) {
      let isshadowroot = self.getRootNode() instanceof ShadowRoot;
      let rootnode = isshadowroot ? self.getRootNode().host : self;
      if (rootnode) {
        if (rootnode.nodeType === Node.ELEMENT_NODE) {
          const classname = "ndcsn-" + Math.floor(Math.random() * 1e7);
          const action = rootnode.getAttribute("native-dark-class-shadownode") === null;
          //
          if (action) {
            if (script.dataset.state === "active") {
              rootnode.setAttribute("native-dark-active", '');
            } else {
              rootnode.removeAttribute("native-dark-active");
            }
            //
            rootnode.setAttribute("native-dark-class-shadownode", classname);
            window.postMessage({"from": "native-dark-context-shadownode"}, '*');
          }
        }
      }
      //
      if (args) {
        if (args[0]) {
          if (args[0].mode) {
            args[0].mode = "open";
          }
        }
      }
      //
      return Reflect.apply(target, self, args);
    }
  });
}