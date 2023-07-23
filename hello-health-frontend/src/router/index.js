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
                path: 'medicine',
                name: 'findMedicineView',
                component: ()=>import("@/views/FindMedicineView.vue"),
            },{
                path: 'medicineCard',
                name: 'medicineCardView',
                component: ()=>import("@/views/MedicineInformationView.vue"),
            },{
                path: "forum",
                name: "forumView",
                component: () => import ("@/views/PostBoardView.vue")
            }, {
                path: "forum/:postId",
                name: "postView",
                component: () => import ("@/views/PostView.vue")
            },{
                path: "calendar",
                name: "calendarView",
                component: () => import ("@/views/CalendarView.vue")
            }, {
                path: "detailedNews",
                name: "detailedNews",
                component: ()=>import("@/pages/DetailedNewsPage.vue"),
            }, {
                path: 'collection/medicineCollection',
                name: 'medicineCollectionView',
                component: ()=>import("@/views/MedicineCollectionView.vue"),
            },
            ]
        },
        {
            path: '/',
            name: 'coin',
            //component: ()=>import("@/pages/HomePage.vue"),
            children:[
                {
                    path: "coin",
                    name: "coinview",
                    component: ()=>import("@/components/CoinView.vue"),
                },
                {
                    path: "UserAgreement",
                    name: "UserAgreement",
                    component: ()=>import("@/pages/UseragreementPage.vue"),
                }
            ]
        },{
            path: "/test",
            name: "test",
            component: () => import ("@/components/postView/TipTapEditable.vue")
        },
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: ()=>import("@/pages/ErrorPage.vue") },

    ]
})

export default router
