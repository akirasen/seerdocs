const langs = [
  { title: 'English', path: '/home', matchPath: /^\/(home|plugin|cli|changelog)/ },
  { title: '简体中文', path: '/zh-Hans/', matchPath: /^\/zh-Hans/ },
  { title: '繁體中文', path: '/zh-Hant/', matchPath: /^\/zh-Hant/ },
  { title: '日本語', path: '/ja/', matchPath: /^\/ja/ }
]

docute.init({
  landing: 'landing.html',
  announcement(route) {
    const info = { type: 'success' }
    if (/\/zh-.+$/.test(route.path)) {
      info.html = '<a style="margin-right:10px;" class="docute-button docute-button-mini docute-button-success" href="https://github.com/akirasen/seerdocs" target="_blank">加入我们!</a> 这是一个由 社区开发者 运营的 SEER 文档站。'
    } else {
      info.html = '<a style="margin-right:10px;" class="docute-button docute-button-mini docute-button-success" href="https://github.com/akirasen/seerdocs" target="_blank">Join Us!</a> A SEER Documentation web Operated by Community Developers.'
    }
    return info
  },
  debug: true,
  home: 'https://raw.githubusercontent.com/akirasen/seerdocs/master/README.md',
  repo: 'akirasen/seerdocs',
  twitter: 'info_seer',
  'edit-link': 'https://github.com/akirasen/seerdocs/blob/master/README.md',
  tocVisibleDepth: 3,
  nav: {
    default: [
      {
        title: 'Home', path: '/home', source: 'https://raw.githubusercontent.com/akirasen/seerdocs/master/README.md'
      },
      {
        title: 'Plugins', path: '/plugins'
      },
      {
        title: 'Command-Line Tool', path: '/cli'
      },
      {
        title: 'Changelog', path: '/changelog', source: 'https://raw.githubusercontent.com/egoist/docute/master/CHANGELOG.md'
      },
      {
        title: 'Languages', type: 'dropdown', items: langs
      }
    ],
    'zh-Hans': [
      {
        title: '首页', path: '/zh-Hans/', source: 'https://raw.githubusercontent.com/akirasen/seerdocs/master/zh-Hans/README.md'
      },
      {
        title: '插件', path: '/zh-Hans/plugins'
      },
      {
        title: '命令行工具', path: '/zh-Hans/cli'
      },
      {
        title: '选择语言', type: 'dropdown', items: langs
      }
    ],
    'zh-Hant': [
      {
        title: '首頁', path: '/zh-Hant/'
      },
      {
        title: '插件', path: '/zh-Hant/plugins'
      },
      {
        title: '命令行工具', path: '/zh-Hant/cli'
      },
      {
        title: '選擇語言', type: 'dropdown', items: langs
      }
    ],
    ja: [
      {
        title: 'はじめに', path: '/ja/'
      },
      {
        title: 'プラグイン', path: '/ja/plugins'
      },
      {
        title: 'コマンドラインツール', path: '/ja/cli'
      },
      {
        title: '言語', type: 'dropdown', items: langs
      }
    ]
  },
  icons: [
    {
      label: '在微博关注SEER',
      svgId: 'i-weibo',
      svgClass: 'weibo-icon',
      link: 'http://weibo.com/seerchain'
    }
  ]/*,
  plugins: [
    docsearch({
      appId: 'BH4D9OD16A',
      apiKey: '65360cf9a91d87cd455d2b286d0d89ee',
      indexName: 'docute',
      tags: ['english', 'zh-Hans', 'zh-Hant', 'ja'],
      url: 'https://v3.docute.org'
    }),
    evanyou(),
    disqus({
            shortname: 'wxa'
        })
  ]*/
})
