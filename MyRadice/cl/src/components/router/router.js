import {createRouter, createWebHistory} from 'vue-router'
import store from '../store/store.js'

const routes = [
    {
        name : "DefaultPage",
        path : "/",
        component : () => import('../Home.vue')
    },
    {
        name : "Login",
        path : "/login",
        component : () => import('../RegisterMenus/Login.vue')
    },
    {
        name : "Register",
        path : "/register",
        component : () => import('../RegisterMenus/Register.vue')
    },
    {
        name: "FakeDeveloper",
        path:"/developer/"
    },
    {
        name : "RegDeveloper",
        path : "/regdeveloper",
        component : () => import('../DeveloperRegisterMenus/DeveloperRegister.vue')
    },
    {
        name : "LogDeveloper",
        path : "/logdeveloper",
        component : () => import("../DeveloperRegisterMenus/DeveloperLogin.vue")
    },
    {
        name : "CreateStartup",
        path : "/createstartup",
        component : () => import('../CompanyRegisterMenus/CompanyRegister.vue')
    },
    {
        path : "/radice",
        component : () => import('../RequiredPage/Home.vue')
    },
    {
        name : "DeveloperPage",
        path:"/developer/:id",
        component : () => import('../DeveloperPage/DeveloperHome.vue')
    },
    {
        name : "DeveloperFeatures",
        path : "/developer/features",
        component : () => import('../DeveloperPage/DeveloperSkills.vue')
    },
    {
        name : "DeveloperContact",
        path : "/developer/contact/:id",
        component : () => import('../DeveloperPage/DeveloperContact.vue')
    },
    {
        name : "DeveloperAppointments",
        path : "/developer/appointments",
        component : () => import('../DeveloperPage/DeveloperAppointments.vue')
    },
    {
        path : "/company/:id",
        component : () => import('../CompanyPage/CompanyHome.vue')
    },
    {
        path : "/company/developers",
        component : () => import('../CompanyPage/CompanyDevelopers.vue')
    },
    {
        path : "/company/appointments/:id",
        component : () => import('../CompanyPage/CompanyAppointments.vue')
    },
    {
        path  : "/company/offers/:id",
        component : () => import('../CompanyPage/CompanyOffers.vue')
    },
    {
        path : "/company/configure/:id",
        component : () => import('../CompanyPage/CompanyConfigure.vue')
    },
    {
        path : "/allcomponies",
        component :  () => import('../GenericCompany/AllCompanies.vue')
    },
    {
        name : "DeveloperConfigure",
        path : "/developer/configure/:id",
        component : () => import('../DeveloperPage/DeveloperConfigure.vue')
    }
]

const router = createRouter({
    routes : routes,
    history : createWebHistory()
});


router.beforeEach((to,from,next)=>
{
  const auth = store.getters.isAuthenticated;
  const devauth = store.getters.isDeveloperAuthenticated;
  const isBoss = store.getters.isBoss;;
  const AuthNotRequirePage = ["Register","Login","DefaultPage"];
  const AuthDevrequire = ["RegDeveloper","LogDeveloper"];
  const DevPage = ["DeveloperPage","FakeDeveloper","DeveloperFeatures","DeveloperContact","DeveloperConfigure","DeveloperAppointments"];
  const AuthPages = ["Login","DefaultPage","Register","RegDeveloper","LogDeveloper","CreateStartup"]
    if(devauth===true)
    {
        if(AuthNotRequirePage.indexOf(to.name) > -1)
        {
            next('/radice');
        }
        if(AuthDevrequire.indexOf(to.name) > -1)
        {
            next('/radice');
        }
        if (to.path!=='/login'&& to.path !=='/' && to.path!=='/register' && to.path!=="/regdeveloper" && to.path!=="/logdeveloper"  && devauth === false )
        {
            next('/login');
        }
        if(to.path === 'createstartup' && isBoss===true)
        {
            next('/radice')
        }
        if(to.path==="/createstartup" && isBoss===true)
        {
            next('/radice');
        }
        else
        {
            next();
        }
    }
    else if(devauth===false)
    {
        if(AuthNotRequirePage.indexOf(to.name) > -1 && auth===true)
        {
            next('/radice');
        }
        if(DevPage.indexOf(to.name)>-1)
        {
            next('/radice');
        }
        if(to.path==="/createstartup")
        {
            next('/radice');
        }
        if (to.path!=='/login'&& to.path !=='/' && to.path!=='/register' && to.path!=="/regdeveloper" && to.path!=="/logdeveloper"   && auth === false )
        {
            next('/login');
        }
        else
        {
            next()
        }
    }





 
});


export default router;