/**
 * @see {@link https://developer.chrome.com/extensions/manifest}
 */
module.exports = {
  name: 'cnlab',
  description: 'cnlab team8 final',
  author: 'WooLNinesun <woolninesun@gmail.com>',
  version: '0.0.7',
  icons: {
    '16': 'icons/16.png',
    '48': 'icons/48.png',
    '128': 'icons/128.png'
  },
  /**
   * @see {@link https://developer.chrome.com/extensions/declare_permissions}
   */
  permissions: [
    "webRequest",
    "tabs",
    "notifications",
    "http://work.hortune.tw/",
    "<all_urls>"
  ],
  browser_action: {
    default_title: "CNLab Team 8",
    default_popup: "pages/popup.html",
    default_icon: {
        '19': "icons/19.png",
        '38': "icons/38.png"
    }
  },
  background: {
    page: 'pages/background.html'
  },
  content_scripts: [{
      matches: ["https://zombsroyale.io/"],
      js: ["js/keyboard.js", "js/content.js"],
      run_at: 'document_end',
      all_frames: true
  }],
  manifest_version: 2,
  content_security_policy: "script-src 'self' https://apis.google.com https://www.gstatic.com/; object-src 'self'",
  web_accessible_resources: [
    'js/content.js'
  ]
}
