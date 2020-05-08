import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/components/layout/layout'

export default [{
    path: '/',
    name: 'login',
    component: () =>
        import('@/pages/login/login')
},
{
    path: '/home',
    name: 'Home',
    component: layout,
    redirect: '/home',
    children: [{
        path: '/home',
        name: 'pageHome',
        meta: {
            title: '首页',
            fatherName: 'home'
        },
        component: () =>
            import('@/pages/home/home')
    }]
},
{
    path: '/html',
    name: 'Html',
    component: layout,
    children: [{
        path: '/html',
        name: 'pageHtml',
        meta: {
            title: 'HTML基础',
            fatherName: 'html'
        },
        component: () =>
            import('@/pages/html/html/html')
    },
    {
        path: '/boxModel',
        name: 'pageBoxModel',
        meta: {
            title: '盒模型',
            fatherName: 'html'
        },
        component: () =>
            import('@/pages/html/boxModel/boxModel')
    },
    {
        path: '/aimingPoint',
        name: 'pageAimingPoint',
        meta: {
            title: '瞄点',
            fatherName: 'html'
        },
        children: [{
            path: '/details',
            name: 'pageDetails',
            meta: {
                title: 'HTML细节',
                fatherName: 'pageAimingPoint'
            },
            component: () =>
                import('@/pages/html/aimingPoint/children/details/details')
        },
        {
            path: '/layout',
            name: 'pageLayout',
            meta: {
                title: 'HTML布局 ',
                fatherName: 'pageAimingPoint'
            },
            component: () =>
                import('@/pages/html/aimingPoint/children/layout/layout')
        }
        ]
    }
    ]
},

{
    path: '/css',
    name: 'css',
    component: layout,
    children: [{
        path: '/css',
        name: 'pageCss',
        meta: {
            title: 'css基础',
            fatherName: 'css'
        },
        component: () =>
            import('@/pages/css/css/css')
    },
    {
        path: '/transform',
        name: 'pageTransform',
        meta: {
            title: 'transform变形',
            fatherName: 'css'
        },
        component: () =>
            import('@/pages/css/transform/transform')
    },
    {
        path: '/transition',
        name: 'pageTransition',
        meta: {
            title: 'transition动画',
            fatherName: 'css'
        },
        component: () =>
            import('@/pages/css/transition/transition')
    },
    ]
},



{
    path: '/javascript',
    name: 'javascript',
    component: layout,
    children: [{
        path: '/javascript',
        name: 'pageJavascript',
        meta: {
            title: 'javascript基础',
            fatherName: 'javascript'
        },
        component: () =>
            import('@/pages/javascript/javascript/javascript')
    },
    {
        path: '/class',
        name: 'pageClass',
        meta: {
            title: 'class类',
            fatherName: 'javascript'
        },
        component: () =>
            import('@/pages/javascript/class/class')
    },
    {
        path: '/protoType',
        name: 'pageProtoType',
        meta: {
            title: 'protoType原型链',
            fatherName: 'javascript'
        },
        component: () =>
            import('@/pages/javascript/protoType/protoType')
    },
    ]
},

]