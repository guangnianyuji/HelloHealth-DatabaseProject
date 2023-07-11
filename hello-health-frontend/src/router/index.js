import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: ()=>import("@/pages/LoginPage.vue"),
            children:[
                {
                    path: "",
                    name: "loginView",
                    component: ()=>import("@/views/LoginView.vue"),
                }, {
                    path: "register",
                    name: "registerView",
                    component: ()=>import("@/views/RegisterView.vue"),
                }
                , {
                    path: "forgot",
                    name: "forgotView",
                    component: ()=>import("@/views/ForgotView.vue"),
                }
            ]
        },
        {
            path: '/',
            name: 'home',
            component: ()=>import("@/pages/HomePage.vue"),
            children:[{
                path: "",
                name: "homeView",
                component: ()=>import("@/views/TestView1.vue"),
            }, {
                path: "consultation",
                name: "consultationView",
                component: ()=>import("@/views/TestView2.vue"),
            }, {
                path: "news",
                name: "newsView",
                component: ()=>import("@/views/HealthFlashView.vue"),
            }, {
                path: "detailedNews",
                name: "detailedNews",
                component: ()=>import("@/pages/DetailedNewsPage.vue"),
            }]
        },
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: ()=>import("@/pages/ErrorPage.vue") },

    ]
})

export default router
