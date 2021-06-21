import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
import  createPersistedState  from  'vuex-persistedstate';




Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],

    state:{
        token:null,
        userId:null,
        auth:false,
        errorLogin:null,
        emailEmpty:null,
        passwordEmpty:null
    },
    mutations:{
        SET_TOKEN(state,token){
            state.token = token;
        },
        SET_USER_ID(state,userId){
            state.userId = userId;
        },
        SET_AUTH(state,auth){
            state.auth = auth;
        },
        SET_ERROR_LOGIN(state,errorLogin){
            state.errorLogin = errorLogin;
        },
        SET_ERROR_EMAIL_EMPTY(state,emailEmpty){
            state.emailEmpty = emailEmpty;
        },
        SET_ERROR_PASSWORD_EMPTY(state,passwordEmpty){
            state.passwordEmpty = passwordEmpty;
        }

    },
    actions:{
        async login({commit},form){
            
            
            let formData = new  FormData();
            let config = {
                headers: {                  
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json',                             
                }
            }
            
            
            formData.append('email',form.email);
            formData.append('password',form.password);
            
        
                    
            try{
                const res = await axios.post('/login',formData, config)              
               
                commit("SET_TOKEN", res.data.token)
                commit("SET_USER_ID", res.data.sub)
                commit("SET_AUTH", true)  
            }catch(error){
                if (error.response) {
                    

                    if(error.response.data.error.email === undefined && error.response.data.error.password === undefined){
                        
                        commit("SET_ERROR_LOGIN", error.response.data.error) 
                        commit("SET_ERROR_EMAIL_EMPTY",null)
                        commit("SET_ERROR_PASSWORD_EMPTY",null)  
                    }else{
                        commit("SET_ERROR_LOGIN",null)
                        commit("SET_ERROR_EMAIL_EMPTY",error.response.data.error.email)
                        commit("SET_ERROR_PASSWORD_EMPTY",error.response.data.error.password)

                    }
                    
                     
                }
            }
        },
        async logout({commit},token){
            
            let config = {
                headers: {                  
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': "Bearer "+token         
                }
            }
          
            try{
                const res = await axios.get('/auth/logout',config)              
                console.log(res.data)
                commit("SET_TOKEN", null)
                commit("SET_AUTH", false)
                commit("SET_USER_ID", null)
                location.replace('/')
            }catch(error){
                if (error.response) {
                    console.log(error.response.data);  
                }
            }

          
        },
        resetState({commit}){
            commit("SET_ERROR_LOGIN",null)
            commit("SET_ERROR_EMAIL_EMPTY",null)
            commit("SET_ERROR_PASSWORD_EMPTY",null)
        }
 
   
    },
    modules:{}
});