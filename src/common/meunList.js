export const meunList = {
    meunLists: [{
        title: 'HTML',
        name: 'html',
        path: '/html',
        icon: 'logo-html5',
        children: [
            {
                title: 'HTML基础',
                name: 'pageHtml',
                path: '/html',
                icon: 'ios-book',
                children: []
            },
            {
                title: '盒模型',
                name: 'pageBoxModel',
                path: '/boxModel',
                icon: 'md-arrow-dropdown-circle',
                children: []
            },
            {
                title: '瞄点',
                name: 'pageAimingPoint',
                path: '/aimingPoint',
                icon: 'md-git-branch',
                children: [{
                    title: 'HTML细节',
                    name: 'pageDetails',
                    path: '/details',
                    icon: 'md-appstore',
                },
                {
                    title: 'HTML布局',
                    name: 'pageLayout',
                    path: '/layout',
                    icon: 'ios-flame',
                },
                ]
            }
        ],
    },
    {
        title: 'CSS',
        name: 'css',
        path: '/css',
        icon: 'logo-css3',
        children: [{
            title: 'CSS基础',
            name: 'pageCss',
            path: '/css',
            icon: 'ios-book',
            children: []
        },
        {
            title: 'transform变形',
            name: 'pageTransform',
            path: '/transform',
            icon: 'md-arrow-dropdown-circle',
            children: []
        },
        {
            title: 'transition动画',
            name: 'pageTransition',
            path: '/transition',
            icon: 'md-git-branch',
            children: []
        }
        ]
    },
    {
        title: 'JAVASCRIPT',
        name: 'javascript',
        path: '/javascript',
        icon: 'logo-javascript',
        children: [{
            title: 'javascript基础',
            name: 'pageJavascript',
            path: '/javascript',
            icon: 'ios-book',
            children: [],
        },
        {
            title: 'class类',
            name: 'pageClass',
            path: '/class',
            icon: 'md-arrow-dropdown-circle',
            children: [],
        },
        {
            title: 'protoType原型链',
            name: 'pageProtoType',
            path: '/protoType',
            icon: 'md-git-branch',
            children: [],
        }
        ]
    },
    {
        title: 'VUE',
        name: 'vue',
        path: '/vue',
        icon: 'ios-jet',
        children: []
    },
    {
        title: '小程序',
        name: 'smallProgram',
        path: '/smallProgram',
        icon: 'ios-paper-plane',
        children: []
    },
    {
        title: 'REACT',
        name: 'react',
        path: '/react',
        icon: 'md-planet',
        children: []
    },
    {
        title: 'UNI-APP',
        name: 'uni-app',
        path: '/uni-app',
        icon: 'logo-apple',
        children: []
    },
    {
        title: 'MYSQY',
        name: 'mysql',
        path: '/mysql',
        icon: 'logo-hackernews',
        children: []
    },
    {
        title: 'NODE',
        name: 'node',
        path: '/node',
        icon: 'logo-nodejs',
        children: []
    },
    {
        title: 'KOA',
        name: 'koa',
        path: '/koa',
        icon: 'logo-rss',
        children: []
    },
    ],
}