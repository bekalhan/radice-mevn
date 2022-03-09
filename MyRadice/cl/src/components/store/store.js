import { createStore } from "vuex";
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'


import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });



const store = createStore({
    state : 
    {
        token: '',
        devtoken : '',
        isBoss : false,
        isSuccess : false,
        isLoginSuccess : false,
        isDeveloperRegister : false,
        isDeveloperLogin : false,
        confirm_configure :
        {
            isBioSuccess : false,
            isPatchFeature : false,
            isAddFeature : false,
            isGithub : false,
            isLinkedln : false,
            isTwitter : false,
            isDeveloperAccept : false
        },
        confirm_company :
        {
            isCompanySuccess : false,
            isFeatureSuccess : false,
            isJobSuccess : false,
            isDeveloperRefuse : false,
            isJobRefuse : false
        },
        company_info:
        {
            founder : ''
        },
        id : '',
        name : ''
    },
    getters  :
    {
        isAuthenticated (state)
        {
            if(state.token==="")
            {
                return false;
            }
            else
            {
                return true;
            }
        },
        isDeveloperAuthenticated (state)
        {
            if(state.devtoken==="")
            {
                return false;
            }
            else
            {
                return true;
            }
        },
        isBoss (state)
        {
            if(state.isBoss===true)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    },
    mutations :
    {
        SetToken(state,token)
        {
            state.token = token;
        },
        SetDevToken(state,token)
        {
            state.devtoken = token;
        },
        SetId(state,id)
        {
            state.id = id;
        },
        SetBoss(state,info)
        {
            state.isBoss = info;
        },
        ClearToken(state)
        {
            state.token = "";
            state.devtoken = "";
            state.id = "";
        }
    },
    actions :
    {

        async register({commit,dispatch,state},authdata)
        {
            const request = await  axios.post('http://localhost:5000/register',{
                name : authdata.name,
                email : authdata.email,
                password : authdata.password
              })
              .then(res =>
              {
                if(res.status===201)
                {
                    state.isSuccess = true;
                }
                else
                {
                    state.isSuccess  = false;
                }
              })
        },
        async login({commit,dispatch,state},authdata)
        {
        try
        {
        await axios.post('http://localhost:5000/login',{
           email : authdata.email,
           password : authdata.password
         })
         .then(res =>
         {
             if(res.status===200)
             {
                 state.isLoginSuccess = true;
                 commit("SetToken",res.data.token);
             }
         })
        }catch(err)
        {
            console.log(err+"başarısız");
            state.isLoginSuccess = false;
        }
        },
        async developerregister({commit,dispatch,state},authdata)
        {
            try
            {
            const request = await axios.post('http://localhost:5000/regdeveloper',{
                email: authdata.email,
                password : authdata.password,
                secret_key : authdata.secret_key
            })
            .then(res =>{
                if(res.status===201)
                {
                    state.isDeveloperRegister = true;
                }
            })
        }catch(err)
        {
            state.isDeveloperRegister = false;
        }
        },
        async developerlogin({commit,dispatch,state},authdata)
        {
            try
            {
            await axios.post('http://localhost:5000/logdeveloper',{
                email : authdata.email,
                password : authdata.password,
                secret_key : authdata.secret_key
            })
            .then(res =>{
                if(res.status===200)
                {
                    state.isDeveloperLogin = true;
                    commit('SetDevToken',res.data.token);
                    commit("SetId",res.data.developer._id);
                    state.name = res.data.developer.name;
                }
            })
        }catch
        {
            state.isDeveloperLogin = false;
        }
        },
        logout({commit,dispatch,state})
        {
           commit('ClearToken');
        },
        async fetchdeveloper({commit,dispatch,state},path)
        {
            const request = await axios.get(path);
            return request.data;
        },
        async fetchfeatures({commit,dispatch,state},path)
        {
            const request = await axios.get(path);
            return request.data;
        },
        async patchinfo({commit,dispatch,state},authdata)
        {
             try
            {
            await axios.patch(`http://localhost:5000/developer/configure/patchinfo/${state.id}`,{
                secret_key : authdata.secret_key,
                information : authdata.newinfo
            })
            .then(res=>
                {
                    if(res.status===200)
                    {
                        state.confirm_configure.isBioSuccess = true;
                    }

                })
            }catch(err)
                {
                    state.confirm_configure.isBioSuccess = false;
                }
        },
        async newfeature({commit,dispatch,state},authdata)
        {
            try
            {
            await axios.post(`http://localhost:5000/developer/configure/addfeature/${state.id}`,{
                secret_key : authdata.secret_key,
                featurename : authdata.featurename,
                featurerate : authdata.featurerate
            })
            .then(res=>
                {
                    if(res.status===200)
                    {
                        state.confirm_configure.isAddFeature = true;
                    }
                })
            }catch(err)
            {
                state.confirm_configure.isAddFeature = false;
            }
        },
        async patchfeature({commit,dispatch,state},authdata)
        {
            try
            {
            await axios.patch(`http://localhost:5000/developer/configure/patchfeature/${state.id}`,
            {
                secret_key : authdata.secret_key,
                featurename : authdata.featurename,
                newfeaturename : authdata.newfeaturename,
                featurerate : authdata.featurerate
            })
            .then(res =>
                {
                    if(res.status===200)
                    {
                        state.confirm_configure.isPatchFeature = true;
                    }
                })
            }catch(err)
            {
                state.confirm_configure.isPatchFeature = false;
            }
        },
        async deletefeature({commit,dispatch,state},authdata)
        {
            await axios.delete(`http://localhost:5000/developer/configure/deletefeature/${state.id}`,
            {
                secret_key : secret_key,
                featurename : featurename
            })
        },
        async addgithub({commit,dispatch,state},authdata)
        {
            try
            {
                await axios.post(`http://localhost:5000/developer/configure/addgithub/${state.id}`,{
                    secret_key : authdata.secret_key,
                    github : authdata.github
                })
            .then(res =>
                {
                    if(res.status===200)
                    {
                        state.confirm_configure.isGithub = true;
                    }
                })
            }catch(err)
            {
                state.confirm_configure.isGithub = false;
            }
          
        },
        async addlinkedln({commit,dispatch,state},authdata)
        {
            try
            {
            await axios.post(`http://localhost:5000/developer/configure/addlinkedln/${state.id}`,{
                secret_key : authdata.secret_key,
                linkedln : authdata.linkedln
            })
            .then(res =>
                {
                    if(res.status===200)
                    {
                        state.confirm_configure.isLinkedln = true;
                    }
                })
            }catch(err)
            {
                state.confirm_configure.isLinkedln = false;
            }
        },
        async addtwitter({commit,dispatch,state},authdata)
        {
            try
            {
            await axios.post(`http://localhost:5000/developer/configure/addtwitter/${state.id}`,{
                secret_key : authdata.secret_key,
                twitter : authdata.twitter
            })
            .then(res =>
                {
                    if(res.status===200)
                    {
                        state.confirm_configure.isTwitter = true;
                    }
                })
            }catch(err)
            {
                state.confirm_configure.isTwitter = false;
            }

        },
        async addcompany({commit,dispatch,state},authdata)
        {
            try
            {
                await axios.post('http://localhost:5000/company',{
                    email : authdata.email,
                    password : authdata.password,
                    secret_key : authdata.secret_key,
                    company_name : authdata.company_name,
                    developer : state.id
                })
                .then(res =>{
                    if(res.status===200)
                    {
                        state.confirm_company.isCompanySuccess = true;
                        commit("SetBoss",true);
                    }
                })
            }catch
            {
                state.confirm_company.isCompanySuccess = false;
            }
        },
        async bosscontrol({commit,dispatch,state})
        {
            const request = await axios.get(`http://localhost:5000/company/control/${state.id}`);
            commit("SetBoss",request.data.developer.isBoss);
        },
        async fetchcompany({commit,dispatch,state},path)
        {
            const request = await axios.get(path);
            state.company_info.founder = request.data.founder;
            return request.data;
        },
        async fetchappointments({commit,dispatch,state},path)
        {
            const request = await axios.get(path);
            return request.data;
        },
        async fetchcompanyfeatures({commit,dispatch,state},path)
        {
            const request = await axios.get(path);
            return request.data;
        },
        async fetchoffers({commit,dispatch,state},path)
        {
            const request = await axios.get(path);
            return request.data;
        },
        async addcompanyfeature({commit,dispatch,state},authdata)
        {
            try
            {
                await axios.post(`http://localhost:5000/company/feature/${state.id}`,
                {
                    featurename : authdata.featurename,
                    secret_key : authdata.secret_key
                })
                .then(res =>
                    {
                        if(res.status===200)
                        {
                            state.confirm_company.isFeatureSuccess = true;
                        }
                    })
            }
            catch(e)
            {
                state.confirm_company.isFeatureSuccess =false;
            }
        },
        async fetchmembers({commit,dispatch,state},path)
        {
            try
            {
            const request = await  axios.get(path);
            return request.data;
            }catch(e)
            {
            }
        },
        async fetchactiveworks({commit,dispatch,state},path)
        {
            const request = await axios.get(path);
            return request.data;
        },
        async fetchcv({commit,dispatch,state},path)
        {
            const request = await axios.get(path);
            return request.data;
        },
        async fetchdef({commit,dispatch,state},path)
        {
            const request = await axios.get(path);
            return request.data;
        },
        async developeraccept({commit,dispatch,state},authdata)
        {
            try
            {
                await axios.post(`http://localhost:5000/company/developer/${state.id}/${authdata.email}`,{
                    secret_key : authdata.secret_key
                })
                .then(res=>{
                    if(res.status===200)
                    {
                        state.confirm_company.isDeveloperAccept = true;
                    }
                })
            }catch(e)
            {
                state.confirm_company.isDeveloperAccept = false;
            }
        },
        async jobaccept({commit,dispatch,state},authdata)
        {
            try
            {
                await axios.post(`http://localhost:5000/company/offer/${state.id}/${authdata.email}`,{
                    secret_key : authdata.secret_key
                })
                .then(res=>{
                    if(res.status===200)
                    {
                        state.confirm_company.isJobAccept = true;
                    }
                })
            }catch(e)
            {

                state.confirm_company.isJobAccept = false;
            }
        },
        async refusedeveloper({commit,dispatch,state},authdata)
        {
            try{
                await axios.post(`http://localhost:5000/company/refusedeveloper/${state.id}/${authdata.email}`,{
                    secret_key : authdata.secret_key
                })
            .then(res=>{
                if(res.status===200)
                {
                    state.confirm_company.isDeveloperRefuse = true;
                }
            })
            }catch(e)
            {
                state.confirm_company.isDeveloperRefuse = false;
            }
        },
        async refusejob({commit,dispatch,state},authdata)
        {
            try{
                await axios.post(`http://localhost:5000/company/refusejob/${state.id}/${authdata.email}`,{
                    secret_key : authdata.secret_key
                })
            .then(res=>{
                if(res.status===200)
                {
                    state.confirm_company.isJobRefuse = true;
                }
            })
            }catch(e)
            {
                state.confirm_company.isJobRefuse = false;
            }
        },
  


    },
    plugins :
    [
        // createPersistedState({
        //     storage: {
        //       getItem: (key) => ls.get(key),
        //       setItem: (key, value) => ls.set(key, value),
        //       removeItem: (key) => ls.remove(key),
        //     },
        //   })
        createPersistedState()
    ]
  
});



export default store;