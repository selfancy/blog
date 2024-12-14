/**
 * mermaid plugin
 */
const loadMermaid = () => {
    // default, forest, dark, neutral
    let getMermaidTheme = (mode) => mode === 'dark' ? 'dark' : 'forest';
    mermaid.initialize({startOnLoad: false, theme: getMermaidTheme(localStorage.getItem('DOCSIFY_DARK_MODE'))});
}
const mermaidPlugin = (hook, vm) => {
    hook.init(loadMermaid);
}

/**
 * dark mode plugin
 */
const darkModePlugin = (hook, vm) => {
    let trans = () => {
        document.documentElement.classList.add('transition')
        window.setTimeout(() => {
            document.documentElement.classList.remove('transition')
        }, 300);
    }
    let theme = {
        dark: {
            background: '#1c2022',
            toggleBtnBg: 'var(--theme-color)',
            textColor: '#b4b4b4',
            themeLink: '//gcore.jsdelivr.net/npm/docsify-themeable/dist/css/theme-simple-dark.css',
            tocNavBg: 'hsl( 201 , 18% , 35%)'
        },
        light: {
            background: 'white',
            toggleBtnBg: '#34495e',
            textColor: 'var(--theme-color)',
            themeLink: '//gcore.jsdelivr.net/npm/docsify-themeable/dist/css/theme-simple.css',
            tocNavBg: '#fff'
        }
    }
    // theme = {...defaultConfig, ...vm.config.darkMode};
    let changeDarkMode = (mode, changeTheme) => {
        let cacheMode = localStorage.getItem('DOCSIFY_DARK_MODE');
        let currMode = document.documentElement.getAttribute('data-theme');
        if ((cacheMode != null && currMode == null) || mode !== currMode) {
            let modeTheme = theme[`${mode}`];
            let themeDom = document.getElementById('theme-css');
            if (themeDom && modeTheme.themeLink && changeTheme) {
                themeDom.setAttribute('href', modeTheme.themeLink);
            } else {
                document.documentElement.style.setProperty('--docsify_dark_mode_bg', modeTheme.background)
                document.documentElement.style.setProperty('--text_color', modeTheme.textColor)
            }
            document.documentElement.style.setProperty('--docsify_dark_mode_btn', modeTheme.toggleBtnBg)
            let $tovNav = document.querySelector('aside.toc-nav');
            if ($tovNav) {
                $tovNav.style.background = modeTheme.tocNavBg;
            }
            document.documentElement.setAttribute('data-theme', mode);
            localStorage.setItem('DOCSIFY_DARK_MODE', mode);
        }
    }
    hook.mounted(function () {
        /**
         * create dark-mode dom
         */
        let domObj = Docsify.dom;

        let sidebarFooterDiv = domObj.create('div');
        sidebarFooterDiv.classList = 'sidebar-footer';

        let darkModeDiv = domObj.create('div');
        darkModeDiv.id = 'dark_mode';
        domObj.appendTo(sidebarFooterDiv, darkModeDiv);
        domObj.appendTo(domObj.getNode('.sidebar'), sidebarFooterDiv);

        let darkModeInput = domObj.create('input');
        darkModeInput.id = 'switch';
        darkModeInput.name = 'mode';
        darkModeInput.classList.add('container_toggle');
        darkModeInput.setAttribute('type', 'checkbox');
        domObj.appendTo(darkModeDiv, darkModeInput);

        let darkModeLabel = domObj.create('label');
        darkModeLabel.setAttribute('for', 'switch');
        darkModeLabel.text = 'Toggle';
        domObj.appendTo(darkModeDiv, darkModeLabel);
        // init mode
        let currMode;
        if (localStorage.getItem('DOCSIFY_DARK_MODE')) {
            currMode = localStorage.getItem('DOCSIFY_DARK_MODE');
        } else {
            let hours = new Date().getHours();
            if (hours >= 6 && hours < 18) {
                currMode = 'light';
            } else {
                currMode = 'dark';
            }
        }
        if (currMode === 'dark') {
            darkModeInput.checked = true;
        }
        changeDarkMode(currMode, currMode === 'dark');
        /**
         * bind event listener
         */
        darkModeInput.addEventListener('change', function () {
            trans();
            let mode = localStorage.getItem('DOCSIFY_DARK_MODE') === 'dark' ? 'light' : 'dark';
            changeDarkMode(mode, true);
        });
    });
}
/**
 * gitalk plugin
 */
const gitalkConfig = {
    // remote
    clientID: '0c1bebfe0ee17ef36a6d',
    clientSecret: 'c7e508fd3f4243f9c79262f4414ec80ef6010af6',
    // localhost
    // clientID: '90fb80750f5bf03c8845',
    // clientSecret: 'efe7505d473f25a3dde489630e511af3e3763480',
    repo: 'blog',
    owner: 'selfancy',
    admin: ['selfancy'],
    distractionFreeMode: false,
    proxy: '/github/login'
};

const gitalkPlugin = (hook, vm) => {
    hook.doneEach(function () {
        let label, domObj, main, divEle, gitalk;
        label = vm.route.path;
        // label = vm.route.path.split("/").pop();
        domObj = Docsify.dom;
        main = domObj.getNode("#main");
        /**
         * render gitalk
         */
        if (vm.route.path.includes("zh-cn")) {
            gitalkConfig.language = "zh-CN";
        }
        Array.apply(null, document.querySelectorAll("div.gitalk-container")).forEach(function (ele) {
            ele.remove();
        });
        divEle = domObj.create("div");
        divEle.id = "gitalk-container-" + label;
        divEle.className = "gitalk-container";
        divEle.style = "width: " + main.clientWidth + "px; margin: 0 auto 20px;";
        domObj.appendTo(domObj.find(".content"), divEle);
        gitalk = new Gitalk(Object.assign(gitalkConfig, {id: !label || label === '/' ? "home" : label}));
        gitalk.render("gitalk-container-" + label);
    });
};
/**
 *  footer plugin
 */
const footerPlugin = (hook, vm) => {
    hook.beforeEach(function (html) {
        let url;
        if (/githubusercontent\.com/.test(vm.route.file)) {
            url = vm.route.file
                .replace('raw.githubusercontent.com', 'github.com')
                .replace(/\/master/, '/blob/master')
        } else {
            url = 'https://github.com/selfancy/blog/edit/master/docs/' + vm.route.file
        }
        let editHtml = '[:memo: 编辑](' + url + ')'
        return html + '\n<br/><hr/>' +
            '<span class="footer" style="float: left;">上次更新：{docsify-updated}</span>' +
            '<span class="footer" style="float: right;">' + editHtml + '</span>';
    });
};

/**
 * copyright plugin
 */
const copyrightPlugin = (hook, vm) => {
    hook.mounted(function () {
        $('.sidebar-footer').append('' +
            '<div class="beian">' +
            '<span>&copy2021 selfancy</span><br>' +
            '<a href="http://beian.miit.gov.cn/" target="_blank">湘ICP备17012000号-2</a>' +
            '</div>');

        let url = new URL(location.href);
        if (url.hash.length > 2) {
            $('.cover').toggleClass('hide', 'hide');
            $('main,.app-nav,.github-corner').show();
        }
    });
}

let num = 0;
window.$docsify = {
    alias: {
        '/.*/_sidebar.md': '/_sidebar.md',
        '/.*/_navbar.md': '/_navbar.md'
    },
    // basePath: 'https://gcore.jsdelivr.net/gh/selfancy/blog@master/docs/',
    // basePath: 'https://raw.githubusercontent.com/selfancy/blog/master/docs/',
    routerMode: 'hash', // default: 'hash',
    auto2top: true,
    coverpage: true,
    onlyCover: false,
    // coverpage: true,
    loadSidebar: true,
    autoHeader: false,
    loadNavbar: true,
    mergeNavbar: true,
    maxLevel: 2,
    subMaxLevel: 2,
    executeScript: true,
    name: 'selfancy 之家',
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
    count: {
        countable: true,
        fontsize: '0.9em',
        color: 'rgb(90,90,90)'
    },
    darkMode: {
        dark: {
            background: 'white',
            toggleBtnBg: 'var(--theme-color)',
            textColor: 'var(--theme-color)'
        },
        light: {
            background: '#1c2022',
            toggleBtnBg: '#34495e',
            textColor: '#b4b4b4'
        }
    },
    plugins: [
        mermaidPlugin,
        darkModePlugin,
        gitalkPlugin,
        footerPlugin,
        copyrightPlugin
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
            },
            image: function (href, title, text) {
                let imgName = href.substring(href.lastIndexOf('/') + 1);
                if (imgName.startsWith('sidebar-')) {
                    let url = new URL(location.href);
                    if (url.pathname !== '/') {
                        if (url.hash.length > 2) {
                            href = '../' + href;
                        }
                    } else {
                        href = '../' + href
                    }
                }
                return this.origin.image.apply(this, [href, title, text]);
            }
        }
    }
};

function showMainContent() {
    document.documentElement.scrollTop = document.querySelector('main').offsetTop;
    $('.cover').toggleClass('show', 'hide');
    $('main,.app-nav,.github-corner').show();
}

window.addEventListener('visibilitychange', function() {
    document.querySelector('head > title').innerHTML = document.hidden ? "😡死鬼，去哪浪了！" : "selfancy之家";
});

