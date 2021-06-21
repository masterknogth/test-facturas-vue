import Vue from "vue";
import VueRouter from 'vue-router'

import Login from "./components/Login/Login.vue";
import SignUp from "./components/signup/SignUp.vue";
import Dashboard from "./components/Dashboard/Dashboard.vue";
import Invoices from "./components/Invoices/Invoices.vue";
import InvoiceDetailed from "./components/InvoiceDetailed/InvoiceDetailed.vue";
import PageNotFound from './components/PageNotFound.vue'
Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "login",
        component: Login
    },

    {
        path: "/signup",
        name: "signup",
        component: SignUp
    },

    {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard
    },

    {
        path: "/invoices",
        name: "invoices",
        component: Invoices
    },
    {
        path: "/invoice-detailed/:id",
        name: "invoice",
        component: InvoiceDetailed
    },
    {
        path: "*",
        name: "notfound",
        component: PageNotFound
    },




];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;