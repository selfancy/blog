// !function () {
//     function n(n, e, t) {
//         return n.getAttribute(e) || t
//     }
//
//     function e(n) {
//         return document.getElementsByTagName(n)
//     }
//
//     function t() {
//         var t = e("script"), o = t.length, i = t[o - 1];
//         return {
//             l: o, z: n(i, "zIndex", -1), o: n(i, "opacity", .5), c: n(i, "color", "0,0,0"), n: n(i, "count", 99)
//         }
//     }
//
//     function o() {
//         a = m.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
//             c = m.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
//     }
//
//     function i() {
//         r.clearRect(0, 0, a, c);
//         var n, e, t, o, m, l;
//         s.forEach(function (i, x) {
//             for (i.x += i.xa, i.y += i.ya, i.xa *= i.x > a || i.x < 0 ? -1 : 1, i.ya *= i.y > c || i.y < 0 ? -1 : 1, r.fillRect(i.x - .5, i.y - .5, 1, 1), e = x + 1; e < u.length; e++) n = u[e],
//             null !== n.x && null !== n.y && (o = i.x - n.x, m = i.y - n.y,
//                 l = o * o + m * m, l < n.max && (n === y && l >= n.max / 2 && (i.x -= .03 * o, i.y -= .03 * m),
//                 t = (n.max - l) / n.max, r.beginPath(), r.lineWidth = t / 2, r.strokeStyle = "rgba(" + d.c + "," + (t + .2) + ")", r.moveTo(i.x, i.y), r.lineTo(n.x, n.y), r.stroke()))
//         }), x(i)
//     }
//
//     var a, c, u, m = document.createElement("canvas"),
//         d = t(), l = "c_n" + d.l, r = m.getContext("2d"),
//         x = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
//             function (n) {
//                 window.setTimeout(n, 1e3 / 45)
//             },
//
//         w = Math.random, y = {x: null, y: null, max: 2e4};
//     m.id = l, m.style.cssText = "position:fixed;top:0;left:0;z-index:" + d.z + ";opacity:" + d.o, e("body")[0].appendChild(m), o(), window.onresize = o,
//         window.onmousemove = function (n) {
//             n = n || window.event, y.x = n.clientX, y.y = n.clientY
//         },
//         window.onmouseout = function () {
//             y.x = null, y.y = null
//         };
//
//     for (var s = [], f = 0; d.n > f; f++) {
//         var h = w() * a, g = w() * c, v = 2 * w() - 1, p = 2 * w() - 1;
//         s.push({x: h, y: g, xa: v, ya: p, max: 6e3})
//     }
//
//     u = s.concat([y]),
//         setTimeout(function () {
//             i()
//         }, 100)
// }();

function isDarkMode(background) {
    if (background) {
        return background === 'dark';
    }
    return localStorage.getItem('DOCSIFY_DARK_MODE') === 'dark';
}

/**
 * dark mode plugin
 */
const darkModePlugin = (hook, vm) => {
    let trans = () => {
        document.documentElement.classList.add('transition')
        window.setTimeout(() => {
            document.documentElement.classList.remove('transition')
        }, 800)
    }
    let setColor = ({background, toggleBtnBg, textColor, themeLink}) => {
        document.documentElement.style.setProperty('--docsify_dark_mode_btn', toggleBtnBg)
        let themeDom = document.getElementById('theme-css');
        if (themeDom && themeLink) {
            themeDom.setAttribute('href', themeLink);
        } else {
            document.documentElement.style.setProperty('--docsify_dark_mode_bg', background)
            document.documentElement.style.setProperty('--text_color', textColor)
        }
    }

    let theme = {dark: {}, light: {}}
    let defaultConfig = {
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

    theme = {...defaultConfig, ...vm.config.darkMode}

    hook.mounted(function () {
        /**
         * create dom
         */
        let domObj = Docsify.dom;

        let darkModeDiv = domObj.create('div');
        darkModeDiv.id = 'dark_mode';
        domObj.appendTo(domObj.getNode('.sidebar'), darkModeDiv);

        let darkModeInput = domObj.create('input');
        darkModeInput.id = 'switch';
        darkModeInput.name = 'mode';
        darkModeInput.classList.add('container_toggle');
        darkModeInput.setAttribute('type', 'checkbox');
        domObj.appendTo(domObj.getNode('#dark_mode'), darkModeInput);

        let darkModeLabel = domObj.create('label');
        darkModeLabel.setAttribute('for', 'switch');
        darkModeLabel.text = 'Toggle';
        domObj.appendTo(domObj.getNode('#dark_mode'), darkModeLabel);
        /**
         * bind event listener
         */
        let currColor;
        if (localStorage.getItem('DOCSIFY_DARK_MODE')) {
            currColor = localStorage.getItem('DOCSIFY_DARK_MODE')
            setColor(theme[`${currColor}`]);
        } else {
            currColor = 'light';
            setColor(theme.light);
        }

        let checkbox = document.querySelector('input[name=mode]');

        if (!checkbox) {
            return;
        }

        checkbox.addEventListener('change', function () {
            // dark
            if (currColor === 'light') {
                trans();
                currColor = 'dark';
                setColor(theme.dark);
                localStorage.setItem('DOCSIFY_DARK_MODE', currColor);
            } else {
                trans();
                currColor = 'light';
                setColor(theme.light);
                localStorage.setItem('DOCSIFY_DARK_MODE', currColor);

            }
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
    distractionFreeMode: false
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
            url = 'https://github.com/selfancy/blog/edit/master/docs' + vm.route.file
        }
        let editHtml = '[:memo: 编辑](' + url + ')'
        return html + '\n<br/><hr/>' +
            '<span class="footer" style="float: left;">上次更新：{docsify-updated}</span>' +
            '<span class="footer" style="float: right;">' + editHtml + '</span>';
    });
};

function getMermaidTheme(mode) {
    // default, forest, dark, neutral
    return mode === 'dark' ? 'dark' : 'forest';
}

function resetMermaid(mode) {
    mermaid.initialize({startOnLoad: false, theme: getMermaidTheme(mode)});
}

let num = 0;
mermaid.initialize({startOnLoad: false, theme: getMermaidTheme(localStorage.getItem('DOCSIFY_DARK_MODE'))});
window.$docsify = {
    alias: {
        '/.*/_sidebar.md': '/_sidebar.md',
        '/.*/_navbar.md': '/_navbar.md'
    },
    // basePath: 'https://cdn.jsdelivr.net/gh/selfancy/blog@master/docs/',
    // basePath: 'https://raw.githubusercontent.com/selfancy/blog/master/docs/',
    routerMode: 'hash', // default: 'hash',
    auto2top: true,
    // Only coverpage is loaded when visiting the home page.
    coverpage: false,
    onlyCover: false,
    // coverpage: true,
    loadSidebar: true,
    autoHeader: false,
    loadNavbar: true,
    mergeNavbar: true,
    maxLevel: 2,
    subMaxLevel: 3,
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
    count: {
        countable: true,
        fontsize: '0.9em',
        color: 'rgb(90,90,90)',
        language: 'chinese'
    },
    darkMode: {
        light: {
            background: '#1c2022',
            toggleBtnBg: '#34495e',
            textColor: '#b4b4b4',
            themeLink: '//cdn.jsdelivr.net/npm/docsify-themeable/dist/css/theme-simple.css'
        },
        dark: {
            background: 'white',
            toggleBtnBg: 'var(--theme-color)',
            textColor: 'var(--theme-color)',
            themeLink: '//cdn.jsdelivr.net/npm/docsify-themeable/dist/css/theme-simple-dark.css'
        }
    },
    plugins: [
        darkModePlugin,
        gitalkPlugin,
        footerPlugin
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
