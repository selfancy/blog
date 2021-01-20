/**
 * dark mode
 */
const darkModePlugin = (hook, vm) => {
    var trans = () => {
        document.documentElement.classList.add('transition')
        window.setTimeout(() => {
            document.documentElement.classList.remove('transition')
        }, 800)
    }
    var setColor = ({background, toggleBtnBg, textColor, themeLink }) => {
        document.documentElement.style.setProperty('--docsify_dark_mode_btn', toggleBtnBg)
        var themeDom = document.getElementById('theme-css');
        if (themeDom && themeLink) {
            themeDom.setAttribute('href', themeLink);
        } else {
            document.documentElement.style.setProperty('--docsify_dark_mode_bg', background)
            document.documentElement.style.setProperty('--text_color', textColor)
        }
    }

    var theme = { dark: {}, light: {} }
    var defaultConfig = {
        dark: {
            background: '#1c2022',
            toggleBtnBg: '#34495e',
            textColor: '#b4b4b4',
            themeLink: ''
        },
        light: {
            background: 'white',
            toggleBtnBg: 'var(--theme-color)',
            textColor: 'var(--theme-color)',
            themeLink: ''
        }
    }

    theme = { ...defaultConfig, ...vm.config.darkMode }

    hook.afterEach(function(html, next) {
        var darkEl = ` <div id="dark_mode">
             <input class="container_toggle" type="checkbox" id="switch" name="mode" />
             <label for="switch">Toggle</label>
           </div>`
        html = `${darkEl}${html}`
        next(html)
    })

    hook.doneEach(function() {
        var currColor
        if (localStorage.getItem('DOCSIFY_DARK_MODE')) {
            currColor = localStorage.getItem('DOCSIFY_DARK_MODE')
            setColor(theme[`${currColor}`])
        } else {
            currColor = 'light'
            setColor(theme.light)
        }

        var checkbox = document.querySelector('input[name=mode]')

        if (!checkbox) {
            return
        }

        checkbox.addEventListener('change', function() {
            // dark
            if (currColor === 'light') {
                trans()
                setColor(theme.dark)
                localStorage.setItem('DOCSIFY_DARK_MODE', 'dark')
                currColor = 'dark'
            } else {
                trans()
                setColor(theme.light)
                localStorage.setItem('DOCSIFY_DARK_MODE', 'light')
                currColor = 'light'
            }
        })
    })
}
/**
 * edit on github plugin
 */
const editOnGithubPlugin = function (hook, vm) {
    hook.beforeEach(function (html) {
        if (/githubusercontent\.com/.test(vm.route.file)) {
            url = vm.route.file
                .replace('raw.githubusercontent.com', 'github.com')
                .replace(/\/master/, '/blob/master')
        } else {
            url = 'https://github.com/selfancy/blog/blob/master/docs/' + vm.route.file
        }
        var editHtml = '[:memo: 编辑](' + url + ')\n'
        return editHtml + html;
    })
};
/**
 * gitalk plugin
 */
const gitalkPlugin = function (hook, vm) {
    hook.mounted(function() {
        var div = Docsify.dom.create('div')
        div.id = 'gitalk-container'
        var main = Docsify.dom.getNode('#main')
        div.style = `width: ${main.clientWidth}px; margin: 0 auto 20px;`
        Docsify.dom.appendTo(Docsify.dom.find('.content'), div)
    })

    hook.doneEach(function() {
        var el = document.getElementById('gitalk-container')
        while(el.hasChildNodes()) el.removeChild(el.firstChild)
        gitalk.render('gitalk-container')
    })
};

const gitalk = new Gitalk({
    clientID: '0c1bebfe0ee17ef36a6d',
    clientSecret: 'c7e508fd3f4243f9c79262f4414ec80ef6010af6',
    repo: 'https://github.com/selfancy/blog',
    owner: 'selfancy',
    admin: ['selfancy'],
    // facebook-like distraction free mode
    distractionFreeMode: false,
    id: location.pathname
});

// window.onhashchange = function (event) {
//     if (event.newURL.split('?')[0] !== event.oldURL.split('?')[0]) {
//         location.reload()
//     }
// }

/**
 *  last updated plugin
 */
const lastUpdatedPlugin = function (hook, vm) {
    hook.beforeEach(function (html) {
        return html
            + '<hr/>'
            + '上次更新：{docsify-updated} '
    })
};

var num = 0;
// default, forest, dark, neutral
mermaid.initialize({ startOnLoad: false, theme: 'default'});
window.$docsify = {
    alias: {
        '/.*/_sidebar.md': '/_sidebar.md'
    },
    routerMode: 'hash', // default: 'hash',
    auto2top: true,
    // Only coverpage is loaded when visiting the home page.
    onlyCover: true,
    // coverpage: true,
    loadSidebar: true,
    autoHeader: false,
    loadNavbar: true,
    mergeNavbar: true,
    maxLevel: 2,
    subMaxLevel: 2,
    executeScript: true,
    name: 'selfancy 的博客',
    repo: 'selfancy',
    formatUpdated: '{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}',
    search: {
        noData: '没有结果!',
        paths: 'auto',
        placeholder: '搜索'
    },
    copyCode: {
        buttonText: '点击复制',
        errorText: '复制错误',
        successText: '已复制'
    },
    pagination: {
        previousText: '上一章节',
        nextText: '下一章节',
        crossChapter: true,
        crossChapterText: true
    },
    toc: {
        tocMaxLevel: 5,
        target: "h2, h3, h4, h5, h6",
    },
    darkMode: {
        light: {
            background: '#1c2022',
            toggleBtnBg: '#34495e',
            textColor: '#b4b4b4',
            themeLink: '//cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple.css'
        },
        dark: {
            background: 'white',
            toggleBtnBg: 'var(--theme-color)',
            textColor: 'var(--theme-color)',
            themeLink: '//cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple-dark.css'
        }
    },
    // autoFooter: {
    //     name: 'mike',
    //     copyYear: '2018-2021',
    //     url: 'https://www.selfancy.com'
    // },
    footer: {
        copy: '<span>Acme &copy; 2020</span>',
        auth: 'by Me',
        pre: '<hr/>',
        style: 'text-align: right;',
    },
    plugins: [
        editOnGithubPlugin,
        gitalkPlugin,
        darkModePlugin,
        lastUpdatedPlugin,
    ],
    markdown: {
        renderer: {
            code: function (code, lang) {
                if (lang === "mermaid") {
                    return (
                        '<div class="mermaid">' + mermaid.render('mermaid-svg-' + num++, code) + "</div>"
                    );
                }
                return this.origin.code.apply(this, arguments);
            }
        }
    }
};