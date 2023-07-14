(()=>{"use strict";var e={2697:function(e,t,o){var i=this&&this.__awaiter||function(e,t,o,i){return new(o||(o=Promise))((function(n,s){function r(e){try{c(i.next(e))}catch(e){s(e)}}function a(e){try{c(i.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(r,a)}c((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.sendRequestToCustomServer=t.setupBackgroundRequestProxy=t.sendRealRequestToCustomServer=void 0;const n=o(8884);function s(e,t,o={}){return i(this,void 0,void 0,(function*(){return"get"===e.toLowerCase()&&(t=(0,n.objectToURI)(t,o,!0),o=null),yield fetch(t,{method:e,headers:{"Content-Type":"application/json"},redirect:"follow",body:o?JSON.stringify(o):null})}))}t.sendRealRequestToCustomServer=s,t.setupBackgroundRequestProxy=function(){chrome.runtime.onMessage.addListener(((e,t,o)=>"sendRequest"===e.message&&(s(e.type,e.url,e.data).then((e=>i(this,void 0,void 0,(function*(){o({responseText:yield e.text(),status:e.status,ok:e.ok})})))).catch((()=>{o({responseText:"",status:-1,ok:!1})})),!0)))},t.sendRequestToCustomServer=function(e,t,o={}){return new Promise(((i,n)=>{chrome.runtime.sendMessage({message:"sendRequest",type:e,url:t,data:o},(e=>{-1!==e.status?i(e):n(e)}))}))}},4219:function(e,t){var o=this&&this.__awaiter||function(e,t,o,i){return new(o||(o=Promise))((function(n,s){function r(e){try{c(i.next(e))}catch(e){s(e)}}function a(e){try{c(i.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(r,a)}c((i=i.apply(e,t||[])).next())}))};function i(e){return null==e?"":" "==e?"Space":1==e.length?e.toUpperCase():e}Object.defineProperty(t,"__esModule",{value:!0}),t.keybindToString=t.formatKey=t.keybindEquals=t.isSafari=t.ProtoConfig=void 0,t.ProtoConfig=class{constructor(e,t,o){this.configLocalListeners=[],this.configSyncListeners=[],this.cachedSyncConfig=null,this.cachedLocalStorage=null,this.config=null,this.local=null,this.syncDefaults=e,this.localDefaults=t,this.setupConfig(o).then((e=>{this.config=null==e?void 0:e.sync,this.local=null==e?void 0:e.local}))}configProxy(){chrome.storage.onChanged.addListener(((e,t)=>{if("sync"===t){for(const t in e)this.cachedSyncConfig[t]=e[t].newValue;for(const t of this.configSyncListeners)t(e)}else if("local"===t){for(const t in e)this.cachedLocalStorage[t]=e[t].newValue;for(const t of this.configLocalListeners)t(e)}}));const e=this,t={set:(t,o,i)=>(e.cachedSyncConfig[o]=i,chrome.storage.sync.set({[o]:i}),!0),get(t,o){const i=e.cachedSyncConfig[o];return t[o]||i},deleteProperty:(e,t)=>(chrome.storage.sync.remove(t),!0)},o={set:(t,o,i)=>(e.cachedLocalStorage[o]=i,chrome.storage.local.set({[o]:i}),!0),get(t,o){const i=e.cachedLocalStorage[o];return t[o]||i},deleteProperty:(e,t)=>(chrome.storage.local.remove(t),!0)};return{sync:new Proxy({handler:t},t),local:new Proxy({handler:o},o)}}forceSyncUpdate(e){const t=this.cachedSyncConfig[e];if("unsubmittedSegments"===e&&JSON.stringify(t).length+e.length>8e3)for(const e in t)(!t[e]||t[e].length<=0)&&delete t[e];chrome.storage.sync.set({[e]:t})}forceLocalUpdate(e){chrome.storage.local.set({[e]:this.cachedLocalStorage[e]})}fetchConfig(){return o(this,void 0,void 0,(function*(){yield Promise.all([new Promise((e=>{chrome.storage.sync.get(null,(t=>{this.cachedSyncConfig=t,e()}))})),new Promise((e=>{chrome.storage.local.get(null,(t=>{this.cachedLocalStorage=t,e()}))}))])}))}setupConfig(e){return o(this,void 0,void 0,(function*(){if("undefined"==typeof chrome)return null;yield this.fetchConfig(),this.addDefaults();const t=this.configProxy();return e(t.sync),t}))}addDefaults(){for(const e in this.syncDefaults)if(Object.prototype.hasOwnProperty.call(this.cachedSyncConfig,e)){if("barTypes"===e)for(const t in this.syncDefaults[e])Object.prototype.hasOwnProperty.call(this.cachedSyncConfig[e],t)||(this.cachedSyncConfig[e][t]=this.syncDefaults[e][t])}else this.cachedSyncConfig[e]=this.syncDefaults[e];for(const e in this.localDefaults)Object.prototype.hasOwnProperty.call(this.cachedLocalStorage,e)||(this.cachedLocalStorage[e]=this.localDefaults[e])}isReady(){return null!==this.config}},t.isSafari=function(){return"undefined"!=typeof navigator&&"Apple Computer, Inc."===navigator.vendor},t.keybindEquals=function(e,t){return!(null==e||null==t||Boolean(e.alt)!=Boolean(t.alt)||Boolean(e.ctrl)!=Boolean(t.ctrl)||Boolean(e.shift)!=Boolean(t.shift)||null==e.key&&null==e.code||null==t.key&&null==t.code)&&(null!=e.code&&null!=t.code?e.code===t.code:null!=e.key&&null!=t.key&&e.key.toUpperCase()===t.key.toUpperCase())},t.formatKey=i,t.keybindToString=function(e){if(null==e||null==e.key)return"";let t="";return e.ctrl&&(t+="Ctrl+"),e.alt&&(t+="Alt+"),e.shift&&(t+="Shift+"),t+i(e.key)}},7984:function(e,t){var o=this&&this.__awaiter||function(e,t,o,i){return new(o||(o=Promise))((function(n,s){function r(e){try{c(i.next(e))}catch(e){s(e)}}function a(e){try{c(i.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(r,a)}c((i=i.apply(e,t||[])).next())}))};function i(e){var t;if(!e||0===e.offsetWidth||0===e.offsetHeight)return!1;if("VIDEO"===e.tagName&&e.classList.contains("html5-main-video")&&1===document.querySelectorAll("video").length)return!0;const o=null==e?void 0:e.getBoundingClientRect(),i=document.elementFromPoint(o.left+o.width/2,o.top+o.height/2)||document.elementFromPoint(o.left,o.top);return!i&&"movie_player"===e.id&&o.top<0||!!(i===e||i&&e.contains(i))||"VIDEO"===e.tagName&&!!(null===(t=null==i?void 0:i.closest(".html5-video-player"))||void 0===t?void 0:t.contains(e))}function n(e){return s(e)}function s(e,t){for(const o of e){const e=t?t(o):o;if(e&&i(e))return e}return null}Object.defineProperty(t,"__esModule",{value:!0}),t.getElement=t.waitForElement=t.findValidElement=t.findValidElementFromSelector=t.isVisible=void 0,t.isVisible=i,t.findValidElementFromSelector=function(e){return s(e,(e=>document.querySelector(e)))},t.findValidElement=n;let r=!1,a=null,c=[];function l(){if(!a){const e=()=>{const e=[];for(const{selector:t,visibleCheck:o,callback:i}of c){const n=u(t,o);n&&(i(n),e.push(t))}c=c.filter((t=>!e.includes(t.selector))),0===c.length&&(null==a||a.disconnect(),a=null,r=!1)};e(),c.length>0&&(a=new MutationObserver(e),a.observe(document.body,{childList:!0,subtree:!0}))}}function u(e,t){return t?n(document.querySelectorAll(e)):document.querySelector(e)}t.waitForElement=function(e,t=!1){return o(this,void 0,void 0,(function*(){return yield new Promise((o=>{const i=u(e,t);i?o(i):(c.push({selector:e,visibleCheck:t,callback:o}),r||(r=!0,document.body?l():window.addEventListener("DOMContentLoaded",(()=>{l()}))))}))}))},t.getElement=u},6031:function(e,t){var o=this&&this.__awaiter||function(e,t,o,i){return new(o||(o=Promise))((function(n,s){function r(e){try{c(i.next(e))}catch(e){s(e)}}function a(e){try{c(i.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(r,a)}c((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.getHash=void 0,t.getHash=function(e,t=5e3){return o(this,void 0,void 0,(function*(){if(t<=0)return"";let o=e;for(let e=0;e<t;e++){const e=yield crypto.subtle.digest("SHA-256",(new TextEncoder).encode(o).buffer);o=Array.from(new Uint8Array(e)).map((e=>e.toString(16).padStart(2,"0"))).join("")}return o}))}},8884:function(e,t){var o=this&&this.__awaiter||function(e,t,o,i){return new(o||(o=Promise))((function(n,s){function r(e){try{c(i.next(e))}catch(e){s(e)}}function a(e){try{c(i.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(r,a)}c((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.isFirefoxOrSafari=t.timeoutPomise=t.PromiseTimeoutError=t.objectToURI=t.waitFor=void 0,t.waitFor=function(e,t=5e3,i=100,n){return o(this,void 0,void 0,(function*(){return yield new Promise(((o,s)=>{setTimeout((()=>{clearInterval(a),s("TIMEOUT")}),t);const r=()=>{const t=e();(n?n(t):t)&&(o(t),clearInterval(a))},a=setInterval(r,i);r()}))}))},t.objectToURI=function(e,t,o){let i=0;for(const n in t){const s=e.includes("?")||i>0?"&":o?"?":"",r="string"==typeof t[n]?t[n]:JSON.stringify(t[n]);e+=s+encodeURIComponent(n)+"="+encodeURIComponent(r),i++}return e};class i extends Error{constructor(e){super("Promise timed out"),this.promise=e}}t.PromiseTimeoutError=i,t.timeoutPomise=function(e){return new Promise(((t,o)=>{e&&setTimeout((()=>{o(new i)}),e)}))},t.isFirefoxOrSafari=function(){return"undefined"!=typeof browser}},7957:(e,t)=>{function o(e){const t=e.replace(/__MSG_(\w+)__/g,(function(e,t){return t?chrome.i18n.getMessage(t).replace(/</g,"&#60;").replace(/"/g,"&quot;").replace(/\n/g,"<br/>"):""}));return t!=e&&t}Object.defineProperty(t,"__esModule",{value:!0}),t.getLocalizedMessage=t.localizeHtmlPage=t.generateUserID=void 0,t.generateUserID=function(e=36){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let o="";const i="undefined"==typeof window?crypto:window.crypto;if(i&&i.getRandomValues){const n=new Uint32Array(e);i.getRandomValues(n);for(let i=0;i<e;i++)o+=t[n[i]%t.length];return o}for(let i=0;i<e;i++)o+=t[Math.floor(Math.random()*t.length)];return o},t.localizeHtmlPage=function(){const e=o(document.title);e&&(document.title=e);const t=document.querySelector(".sponsorBlockPageBody"),i=o(t.innerHTML.toString());i&&(t.innerHTML=i)},t.getLocalizedMessage=o},7542:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=o(1181),n=o(2938),s=o(7683),r=o(4219);class a extends r.ProtoConfig{resetToDefault(){chrome.storage.sync.set(Object.assign(Object.assign({},this.syncDefaults),{userID:this.config.userID,minutesSaved:this.config.minutesSaved,skipCount:this.config.skipCount,sponsorTimesContributed:this.config.sponsorTimesContributed}))}}const c=new a({userID:null,isVip:!1,permissions:{},unsubmittedSegments:{},defaultCategory:"chooseACategory",renderSegmentsAsChapters:!1,whitelistedChannels:[],forceChannelCheck:!1,minutesSaved:0,skipCount:0,sponsorTimesContributed:0,submissionCountSinceCategories:0,showTimeWithSkips:!0,disableSkipping:!1,muteSegments:!0,fullVideoSegments:!0,fullVideoLabelsOnThumbnails:!0,manualSkipOnFullVideo:!1,trackViewCount:!0,trackViewCountInPrivate:!0,trackDownvotes:!0,dontShowNotice:!1,noticeVisibilityMode:s.NoticeVisbilityMode.FadedForAutoSkip,hideVideoPlayerControls:!1,hideInfoButtonPlayerControls:!1,hideDeleteButtonPlayerControls:!1,hideUploadButtonPlayerControls:!1,hideSkipButtonPlayerControls:!1,hideDiscordLaunches:0,hideDiscordLink:!1,invidiousInstances:["invidious.snopyta.org"],supportInvidious:!1,serverAddress:i.serverAddress,minDuration:0,skipNoticeDuration:4,audioNotificationOnSkip:!1,checkForUnlistedVideos:!1,testingServer:!1,refetchWhenNotFound:!0,ytInfoPermissionGranted:!1,allowExpirements:!0,showDonationLink:!0,showPopupDonationCount:0,showUpsells:!0,showNewFeaturePopups:!0,donateClicked:0,autoHideInfoButton:!0,autoSkipOnMusicVideos:!1,scrollToEditTimeUpdate:!1,categoryPillUpdate:!1,showChapterInfoMessage:!0,darkMode:!0,showCategoryGuidelines:!0,showCategoryWithoutPermission:!1,showSegmentNameInChapterBar:!0,useVirtualTime:!0,showSegmentFailedToFetchWarning:!0,allowScrollingToEdit:!0,deArrowInstalled:!1,showDeArrowPromotion:!0,categoryPillColors:{},skipKeybind:{key:"Enter"},startSponsorKeybind:{key:";"},submitKeybind:{key:"'"},nextChapterKeybind:{key:"ArrowRight",ctrl:!0},previousChapterKeybind:{key:"ArrowLeft",ctrl:!0},categorySelections:[{name:"sponsor",option:s.CategorySkipOption.AutoSkip},{name:"poi_highlight",option:s.CategorySkipOption.ManualSkip},{name:"exclusive_access",option:s.CategorySkipOption.ShowOverlay},{name:"chapter",option:s.CategorySkipOption.ShowOverlay}],payments:{licenseKey:null,lastCheck:0,lastFreeCheck:0,freeAccess:!1,chaptersAllowed:!1},colorPalette:{red:"#780303",white:"#ffffff",locked:"#ffc83d"},barTypes:{"preview-chooseACategory":{color:"#ffffff",opacity:"0.7"},sponsor:{color:"#00d400",opacity:"0.7"},"preview-sponsor":{color:"#007800",opacity:"0.7"},selfpromo:{color:"#ffff00",opacity:"0.7"},"preview-selfpromo":{color:"#bfbf35",opacity:"0.7"},exclusive_access:{color:"#008a5c",opacity:"0.7"},interaction:{color:"#cc00ff",opacity:"0.7"},"preview-interaction":{color:"#6c0087",opacity:"0.7"},intro:{color:"#00ffff",opacity:"0.7"},"preview-intro":{color:"#008080",opacity:"0.7"},outro:{color:"#0202ed",opacity:"0.7"},"preview-outro":{color:"#000070",opacity:"0.7"},preview:{color:"#008fd6",opacity:"0.7"},"preview-preview":{color:"#005799",opacity:"0.7"},music_offtopic:{color:"#ff9900",opacity:"0.7"},"preview-music_offtopic":{color:"#a6634a",opacity:"0.7"},poi_highlight:{color:"#ff1684",opacity:"0.7"},"preview-poi_highlight":{color:"#9b044c",opacity:"0.7"},filler:{color:"#7300FF",opacity:"0.9"},"preview-filler":{color:"#2E0066",opacity:"0.7"}}},{downvotedSegments:{},navigationApiAvailable:null},(function(e){if(e.chapterCategoryAdded||(e.chapterCategoryAdded=!0,e.categorySelections.some((e=>"chapter"===e.name))||(e.categorySelections.push({name:"chapter",option:s.CategorySkipOption.ShowOverlay}),e.categorySelections=e.categorySelections)),e.segmentTimes){const t={};for(const o of e.segmentTimes)t[o[0]]=o[1];chrome.storage.sync.remove("segmentTimes",(()=>e.unsubmittedSegments=t))}if(void 0!==e.exclusive_accessCategoryAdded&&chrome.storage.sync.remove("exclusive_accessCategoryAdded"),void 0!==e.fillerUpdate&&chrome.storage.sync.remove("fillerUpdate"),void 0!==e.highlightCategoryAdded&&chrome.storage.sync.remove("highlightCategoryAdded"),void 0!==e.highlightCategoryUpdate&&chrome.storage.sync.remove("highlightCategoryUpdate"),e.askAboutUnlistedVideos&&chrome.storage.sync.remove("askAboutUnlistedVideos"),!e.autoSkipOnMusicVideosUpdate){e.autoSkipOnMusicVideosUpdate=!0;for(const t of e.categorySelections)if("music_offtopic"===t.name&&t.option===s.CategorySkipOption.AutoSkip){e.autoSkipOnMusicVideos=!0;break}}if(e.disableAutoSkip)for(const t of e.categorySelections)"sponsor"===t.name&&(t.option=s.CategorySkipOption.ManualSkip,chrome.storage.sync.remove("disableAutoSkip"));"string"==typeof e.skipKeybind&&(e.skipKeybind={key:e.skipKeybind}),"string"==typeof e.startSponsorKeybind&&(e.startSponsorKeybind={key:e.startSponsorKeybind}),"string"==typeof e.submitKeybind&&(e.submitKeybind={key:e.submitKeybind});const t=["skipKeybind","startSponsorKeybind","submitKeybind"];for(let o=t.length-1;o>=0;o--)for(let i=0;i<t.length;i++)o!=i&&(0,r.keybindEquals)(e[t[o]],e[t[i]])&&(e[t[o]]=null);void 0!==e.sponsorVideoID&&chrome.storage.sync.remove("sponsorVideoID"),void 0!==e.previousVideoID&&chrome.storage.sync.remove("previousVideoID"),!e.supportInvidious&&e.invidiousInstances.length<n.length&&(e.invidiousInstances=[...new Set([...n,...e.invidiousInstances])]),e.lastIsVipUpdate&&chrome.storage.sync.remove("lastIsVipUpdate")}));t.default=c},2165:function(e,t,o){var i=this&&this.__awaiter||function(e,t,o,i){return new(o||(o=Promise))((function(n,s){function r(e){try{c(i.next(e))}catch(e){s(e)}}function a(e){try{c(i.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(r,a)}c((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const n=o(7542),s=o(3147),r=o(7957),a=new s.default;n.default.config,window.addEventListener("DOMContentLoaded",(function(){return i(this,void 0,void 0,(function*(){(0,r.localizeHtmlPage)(),document.getElementById("acceptPermissionButton").addEventListener("click",(()=>{a.applyInvidiousPermissions(n.default.config.supportInvidious).then((e=>{n.default.config.supportInvidious=e,e?(alert(chrome.i18n.getMessage("permissionRequestSuccess")),window.close()):alert(chrome.i18n.getMessage("permissionRequestFailed"))}))}))}))}))},7683:(e,t)=>{var o,i,n,s,r,a;Object.defineProperty(t,"__esModule",{value:!0}),t.NoticeVisbilityMode=t.ChannelIDStatus=t.SponsorSourceType=t.ActionTypes=t.ActionType=t.SponsorHideType=t.CategorySkipOption=void 0,(a=t.CategorySkipOption||(t.CategorySkipOption={}))[a.Disabled=-1]="Disabled",a[a.ShowOverlay=0]="ShowOverlay",a[a.ManualSkip=1]="ManualSkip",a[a.AutoSkip=2]="AutoSkip",(r=t.SponsorHideType||(t.SponsorHideType={}))[r.Visible=void 0]="Visible",r[r.Downvoted=1]="Downvoted",r[r.MinimumDuration=2]="MinimumDuration",r[r.Hidden=3]="Hidden",function(e){e.Skip="skip",e.Mute="mute",e.Chapter="chapter",e.Full="full",e.Poi="poi"}(o=t.ActionType||(t.ActionType={})),t.ActionTypes=[o.Skip,o.Mute],(s=t.SponsorSourceType||(t.SponsorSourceType={}))[s.Server=void 0]="Server",s[s.Local=1]="Local",s[s.YouTube=2]="YouTube",(n=t.ChannelIDStatus||(t.ChannelIDStatus={}))[n.Fetching=0]="Fetching",n[n.Found=1]="Found",n[n.Failed=2]="Failed",(i=t.NoticeVisbilityMode||(t.NoticeVisbilityMode={}))[i.FullSize=0]="FullSize",i[i.MiniForAutoSkip=1]="MiniForAutoSkip",i[i.MiniForAll=2]="MiniForAll",i[i.FadedForAutoSkip=3]="FadedForAutoSkip",i[i.FadedForAll=4]="FadedForAll"},3147:function(e,t,o){var i=this&&this.__awaiter||function(e,t,o,i){return new(o||(o=Promise))((function(n,s){function r(e){try{c(i.next(e))}catch(e){s(e)}}function a(e){try{c(i.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(r,a)}c((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const n=o(7542),s=o(7683),r=o(6031),a=o(1181),c=o(8884),l=o(7984),u=o(2697),d=o(4219);t.default=class{constructor(e=null){this.js=["./js/content.js"],this.css=["content.css","./libs/Source+Sans+Pro.css","popup.css","shared.css"],this.backgroundScriptContainer=e}wait(e,t=5e3,o=100){return i(this,void 0,void 0,(function*(){return(0,c.waitFor)(e,t,o)}))}containsPermission(e){return new Promise((t=>{chrome.permissions.contains(e,t)}))}setupExtraSitePermissions(e){let t=["webNavigation"];(0,d.isSafari)()||t.push("declarativeContent"),(0,c.isFirefoxOrSafari)()&&!(0,d.isSafari)()&&(t=[]),chrome.permissions.request({origins:this.getPermissionRegex(),permissions:t},(t=>i(this,void 0,void 0,(function*(){t?this.setupExtraSiteContentScripts():this.removeExtraSiteRegistration(),e(t)}))))}setupExtraSiteContentScripts(){const e=[];for(const t of this.js)e.push({file:t});const t=[];for(const e of this.css)t.push({file:e});const o={message:"registerContentScript",id:"invidious",allFrames:!0,js:e,css:t,matches:this.getPermissionRegex()};this.backgroundScriptContainer?this.backgroundScriptContainer.registerFirefoxContentScript(o):chrome.runtime.sendMessage(o)}removeExtraSiteRegistration(){const e="invidious";this.backgroundScriptContainer?this.backgroundScriptContainer.unregisterFirefoxContentScript(e):chrome.runtime.sendMessage({message:"unregisterContentScript",id:e}),!(0,c.isFirefoxOrSafari)()&&chrome.declarativeContent&&chrome.declarativeContent.onPageChanged.removeRules(["invidious"]),chrome.permissions.remove({origins:this.getPermissionRegex()})}applyInvidiousPermissions(e,t="supportInvidious"){return new Promise((o=>{e?this.setupExtraSitePermissions((e=>{e||(n.default.config[t]=!1),o(e)})):(this.removeExtraSiteRegistration(),o(!1))}))}containsInvidiousPermission(){return new Promise((e=>{let t=["declarativeContent"];(0,c.isFirefoxOrSafari)()&&(t=[]),chrome.permissions.contains({origins:this.getPermissionRegex(),permissions:t},(function(t){e(t)}))}))}getMergedTimestamps(e){let t=[];return e.forEach((e=>{const o=t.findIndex((t=>e[0]>=t[0]&&e[0]<=t[1])),i=t.findIndex((t=>e[1]>=t[0]&&e[1]<=t[1]));if(~o&&~i){if(o===i)return;const e=t.splice(Math.max(o,i),1)[0],n=t.splice(Math.min(o,i),1)[0];t.push([Math.min(e[0],n[0]),Math.max(e[1],n[1])])}else~o?t[o][1]=e[1]:~i?t[i][0]=e[0]:t.push(e.slice());t=t.filter((t=>!(t[0]>e[0]&&t[1]<e[1])))})),t}getTimestampsDuration(e){return this.getMergedTimestamps(e).reduce(((e,t)=>e+t[1]-t[0]),0)}getSponsorIndexFromUUID(e,t){for(let o=0;o<e.length;o++)if(e[o].UUID===t)return o;return-1}getSponsorTimeFromUUID(e,t){return e[this.getSponsorIndexFromUUID(e,t)]}getCategorySelection(e){for(const t of n.default.config.categorySelections)if(t.name===e)return t;return{name:e,option:s.CategorySkipOption.Disabled}}getPermissionRegex(e=[]){const t=[];0===e.length&&(e=[...n.default.config.invidiousInstances]);for(const o of e)t.push("https://*."+o+"/*"),t.push("http://*."+o+"/*");return t}asyncRequestToCustomServer(e,t,o={}){return(0,u.sendRequestToCustomServer)(e,t,o)}asyncRequestToServer(e,t,o={}){return i(this,void 0,void 0,(function*(){const i=n.default.config.testingServer?a.testingServerAddress:n.default.config.serverAddress;return yield this.asyncRequestToCustomServer(e,i+t,o)}))}sendRequestToServer(e,t,o){const i=n.default.config.testingServer?a.testingServerAddress:n.default.config.serverAddress;chrome.runtime.sendMessage({message:"sendRequest",type:e,url:i+t},(e=>{o(e)}))}findReferenceNode(){var e,t;let o=(0,l.findValidElementFromSelector)(["#player-container-id","#movie_player",".html5-video-player","#c4-player","#player-container","#main-panel.ytmusic-player-page","#player-container .video-js",".main-video-section > .video-container",".shaka-video-container"]);if(null==o){const i=document.getElementById("player");if(o=null==i?void 0:i.firstChild,o){let n=1;for(;n<i.children.length&&(!(null===(e=o.classList)||void 0===e?void 0:e.contains("html5-video-player"))||!(null===(t=o.classList)||void 0===t?void 0:t.contains("ytp-embed")));)o=i.children[n],n++}}return o}isContentScript(){return"http:"===window.location.protocol||"https:"===window.location.protocol}isHex(e){return Boolean(e.match(/^[0-9a-f]+$/i))}addHiddenSegment(e,t,o){return i(this,void 0,void 0,(function*(){if(chrome.extension.inIncognitoContext||!n.default.config.trackDownvotes)return;const i=(yield(0,r.getHash)(e,1)).slice(0,4),a=yield(0,r.getHash)(t,1),c=n.default.local.downvotedSegments,l=c[i]||{segments:[],lastAccess:0};l.lastAccess=Date.now();const u=l.segments.find((e=>e.uuid===a));o===s.SponsorHideType.Visible?(l.segments.splice(l.segments.indexOf(u),1),0===l.segments.length&&delete c[i]):(u?u.hidden=o:l.segments.push({uuid:a,hidden:o}),c[i]=l);const d=Object.entries(c);if(d.length>1e4){let e=null;for(let t=0;t<d[0].length;t++)(null===e||d[t][1].lastAccess<e[1].lastAccess)&&(e=d[t]);delete c[e[0]]}n.default.forceLocalUpdate("downvotedSegments")}))}}},2938:e=>{e.exports=JSON.parse('["inv.bp.projectsegfau.lt","inv.zzls.xyz","invidious.0011.lt","invidious.baczek.me","invidious.lunar.icu","invidious.privacydev.net","invidious.tiekoetter.com","iv.ggtyler.dev","iv.melmac.space","vid.puffyan.us","y.com.sb","yewtu.be","yt.artemislena.eu"]')},1181:e=>{e.exports=JSON.parse('{"serverAddress":"https://sponsor.ajay.app","testingServerAddress":"https://sponsor.ajay.app/test","serverAddressComment":"This specifies the default SponsorBlock server to connect to","categoryList":["sponsor","selfpromo","exclusive_access","interaction","poi_highlight","intro","outro","preview","filler","chapter","music_offtopic"],"categorySupport":{"sponsor":["skip","mute","full"],"selfpromo":["skip","mute","full"],"exclusive_access":["full"],"interaction":["skip","mute"],"intro":["skip","mute"],"outro":["skip","mute"],"preview":["skip","mute"],"filler":["skip","mute"],"music_offtopic":["skip"],"poi_highlight":["poi"],"chapter":["chapter"]},"wikiLinks":{"sponsor":"https://wiki.sponsor.ajay.app/w/Sponsor","selfpromo":"https://wiki.sponsor.ajay.app/w/Unpaid/Self_Promotion","exclusive_access":"https://wiki.sponsor.ajay.app/w/Exclusive_Access","interaction":"https://wiki.sponsor.ajay.app/w/Interaction_Reminder_(Subscribe)","intro":"https://wiki.sponsor.ajay.app/w/Intermission/Intro_Animation","outro":"https://wiki.sponsor.ajay.app/w/Endcards/Credits","preview":"https://wiki.sponsor.ajay.app/w/Preview/Recap","filler":"https://wiki.sponsor.ajay.app/w/Filler_Tangent","music_offtopic":"https://wiki.sponsor.ajay.app/w/Music:_Non-Music_Section","poi_highlight":"https://wiki.sponsor.ajay.app/w/Highlight","guidelines":"https://wiki.sponsor.ajay.app/w/Guidelines","mute":"https://wiki.sponsor.ajay.app/w/Mute_Segment","chapter":"https://wiki.sponsor.ajay.app/w/Chapter"},"extensionImportList":{"chromium":["enamippconapkdmgfgjchkhakpfinmaj"],"firefox":["deArrow@ajay.app","deArrowBETA@ajay.app"],"safari":["app.ajay.dearrow.extension"]}}')}},t={};!function o(i){var n=t[i];if(void 0!==n)return n.exports;var s=t[i]={exports:{}};return e[i].call(s.exports,s,s.exports,o),s.exports}(2165)})();