import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../layout/globalBox.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'layout',
        component: Layout,
        meta: {title: '智慧环保管理系统'},
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {title: '智慧环保管理系统'},
                component: Home,
            },
            {
                path: '/setting',
                name: 'setting',
                meta: {title: '系统设置'},
                component: () => import('../layout/space.vue'),
                redirect: '/userManege',
                children: [
                    {
                        path: '/dtManege',
                        name: 'dtManege',
                        meta: {title: '动态管理'},
                        component: () => import('../views/Setting/dt/dtManege.vue')
                    },
                    {
                        path: '/userManege',
                        name: 'userManege',
                        meta: {title: '用户管理'},
                        component: () => import('../views/Setting/user/userManege.vue')
                    },
                    {
                        path: '/roleManege',
                        name: 'roleManege',
                        meta: {title: '角色管理'},
                        component: () => import('../views/Setting/role/roleManege.vue')
                    },
                    {
                        path: '/menuManege',
                        name: 'menuManege',
                        meta: {title: '菜单管理'},
                        component: () => import('../views/Setting/menu/menuManege.vue')
                    },{
                        path: '/dictionaryManage',
                        name: 'dictionaryManage',
                        meta: {
                            title: '字典管理'
                        },
                        component: () => import('../views/dictionaryManagement/index'),
                    }
                ]
            },

            {
                path: '/contentManege',
                name: 'contentManege',
                meta: {title: "商城管理"},
                component: () => import('../layout/space.vue'),
                redirect: '/column-managed',
                children: [
                    {
                        path: '/column-managed',
                        name: 'columnManaged',
                        meta: {title: '订单管理'},
                        component: () => import('../views/ContentManage/columnInfo/columnInfo')
                    },
                    {
                        path: '/related-links-managed',
                        name: 'relatedLinksManaged',
                        meta: {title: '商品管理'},
                        component: () => import('../views/RelatedLinksManage/index')
                    }
                ]
            },
        ]
    },

    {
        path: '/blank',
        name: 'NoPermission',
        component: () => import('../views/blank.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
