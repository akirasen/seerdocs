const langs = [
  { title: 'English', path: '/home', matchPath: /^\/(home|plugin|cli|changelog)/ },
  { title: '简体中文', path: '/zh-Hans/', matchPath: /^\/zh-Hans/ , source: 'https://raw.githubusercontent.com/akirasen/seerdocs/master/zh-Hans/README.md'},
  { title: '繁體中文', path: '/zh-Hant/', matchPath: /^\/zh-Hant/ , source: 'https://raw.githubusercontent.com/akirasen/seerdocs/master/zh-Hant/README.md'},
  { title: '日本語', path: '/ja/', matchPath: /^\/ja/ , source: 'https://raw.githubusercontent.com/akirasen/seerdocs/master/ja/README.md'}
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
        title: 'Tools', path: '/tools', source: 'https://raw.githubusercontent.com/akirasen/seerdocs/master/tools.md'
      },
      {
        title: 'Command-Line', path: '/cli', source: 'https://raw.githubusercontent.com/akirasen/seerdocs/master/cli.md'
      },
      {
        title: 'Witness', path: '/witness', source: 'https://raw.githubusercontent.com/akirasen/seerdocs/master/witness.md'
      },
      {
        title: 'Changelog', path: '/changelog', source: 'https://raw.githubusercontent.com/akirasen/seerdocs/master/log.md'
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
        title: '工具', path: '/zh-Hans/tools', source: 'https://raw.githubusercontent.com/akirasen/seerdocs/master/zh-Hans/tools.md'
      },
      {
        title: '命令行', path: '/zh-Hans/cli', source: 'https://raw.githubusercontent.com/akirasen/seerdocs/master/zh-Hans/cli.md'
      },
      {
        title: '见证人', path: '/zh-Hans/witness', source: 'https://raw.githubusercontent.com/akirasen/seerdocs/master/zh-Hans/witness.md'
      },
      {
        title: '选择语言', type: 'dropdown', items: langs
      }
    ],
    'zh-Hant': [
      {
        title: '首頁', path: '/zh-Hant/', source: 'https://raw.githubusercontent.com/akirasen/seerdocs/master/zh-Hant/README.md'
      },
      {
        title: '工具', path: '/zh-Hant/tools', source: 'https://raw.githubusercontent.com/akirasen/seerdocs/master/zh-Hant/tools.md'
      },
      {
        title: '命令行', path: '/zh-Hant/cli', source: 'https://raw.githubusercontent.com/akirasen/seerdocs/master/zh-Hant/cli.md'
      },
      {
        title: '見證人', path: '/zh-Hans/witness', source: 'https://raw.githubusercontent.com/akirasen/seerdocs/master/zh-Hant/witness.md'
      },
      {
        title: '選擇語言', type: 'dropdown', items: langs
      }
    ],
    ja: [
      {
        title: 'はじめに', path: '/ja/', source: 'https://raw.githubusercontent.com/akirasen/seerdocs/master/ja/README.md'
      },
      {
        title: 'プラグイン', path: '/ja/tools', source: 'https://raw.githubusercontent.com/akirasen/seerdocs/master/ja/tools.md'
      },
      {
        title: 'コマンドラインツール', path: '/ja/cli', source: 'https://raw.githubusercontent.com/akirasen/seerdocs/master/ja/cli.md'
      },
      {
        title: 'ブロックプロデューサー', path: '/ja/witness', source: 'https://raw.githubusercontent.com/akirasen/seerdocs/master/ja/witness.md'
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
  ],
  plugins: [
    /*docsearch({
      appId: 'VCYQ2HSX55',
      apiKey: 'a97f6f989c2354e556c5e094f2a1e31f',
      indexName: 'seerdocs',
      tags: ['english', 'zh-Hans', 'zh-Hant', 'ja'],
      url: 'https://docs.seerchain.org'
    }),*/
    evanyou()/*,
    disqus({
            shortname: 'wxa'
        })*/
  ]
})
