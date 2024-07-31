// ==UserScript==
// @name         Replacer
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Запуск телеграм приложений в браузере
// @author       AndrewNovikof
// @match        *://*/*
// @grant        none
// @downloadURL  https://github.com/AndrewNovikof/telegram-web-app-replacer/replacer.js
// @updateURL    https://github.com/AndrewNovikof/telegram-web-app-replacer/replacer.js
// @homepage     https://github.com/AndrewNovikof/telegram-web-app-replacer
// ==/UserScript==

(function() {
  'use strict';


  function getRandomIOSUserAgent() {
    const iOSVersions = ['14_0', '14_1', '14_2', '14_3', '14_4', '14_5', '14_6', '14_7', '14_8',
      '15_0', '15_1', '15_2', '15_3', '15_4', '15_5', '15_6', '15_7',
      '16_0', '16_1', '16_2', '16_3', '16_4', '16_5', '16_6', '16_7',
      '17_0', '17_1', '17_2', '17_3', '17_4', '17_5'];
    const iPhoneModels = ['iPhone11,2', 'iPhone11,4', 'iPhone11,6', 'iPhone11,8', 'iPhone12,1',
      'iPhone12,3', 'iPhone12,5', 'iPhone13,1', 'iPhone13,2', 'iPhone13,3',
      'iPhone13,4', 'iPhone14,2', 'iPhone14,3', 'iPhone14,4', 'iPhone14,5'];
    const randomVersion = iOSVersions[Math.floor(Math.random() * iOSVersions.length)];
    const randomModel = iPhoneModels[Math.floor(Math.random() * iPhoneModels.length)];
    return `Mozilla/5.0 (${randomModel}; CPU iPhone OS ${randomVersion} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1`;
  }

  const newUserAgent = getRandomIOSUserAgent();

  function replaceScriptUrl() {
    const newUrl = 'https://tapahelper.com/assets/js/telegram-web-app-ios.js';
    const scripts = document.getElementsByTagName('script');
    for (let script of scripts) {
      if (script.src.match(/^https:\/\/\S+telegram-web\-app\.js/gm)) {
        const newScript = document.createElement('script');
        newScript.src = newUrl;
        newScript.type = 'text/javascript';
        script.parentNode.replaceChild(newScript, script);
      }
    }
  }

  Object.defineProperty(navigator, 'userAgent', {
    get: function() { return newUserAgent; }
  });
  Object.defineProperty(navigator, 'platform', {
    get: function() { return 'iPhone'; }
  });
  Object.defineProperty(navigator, 'vendor', {
    get: function() { return 'Apple Computer, Inc.'; }
  });
  Object.defineProperty(navigator, 'deviceMemory', {
    get: function() { return undefined; }
  });
  Object.defineProperty(navigator, 'maxTouchPoints', {
    get: function() { return 5; }
  });

  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        replaceScriptUrl();
      }
    });
  });

  const config = {
    childList: true,
    subtree: true
  };

  observer.observe(document.body, config);

  replaceScriptUrl();
})();
