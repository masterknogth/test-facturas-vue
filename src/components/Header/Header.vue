<template>    
   <div>
    <v-app-bar color="cyan accent-4" dense dark>
        <router-link class="header-href" to="/">
            <v-app-bar-nav-icon>
                
            </v-app-bar-nav-icon>
        </router-link>

        <v-toolbar-title>Sistema de facturacion</v-toolbar-title>

        <v-spacer></v-spacer>

        <!--<v-btn icon>
            <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
        </v-btn>-->

        <v-menu left bottom>
            <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
            </template>

            <v-list>
                <template  v-if="!$store.state.auth">
                    <v-list-item>
                        <v-list-item-title><router-link class="header-href" to="/">Login</router-link></v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title><router-link class="header-href" to="/signup">SignUp</router-link></v-list-item-title>
                    </v-list-item>
                </template>
                <template v-if="$store.state.auth">  

                    <v-list-item>
                        <v-list-item-title><router-link class="header-href" to="/dashboard">Dashboard</router-link></v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-title><router-link class="header-href" to="/invoices">Facturas</router-link></v-list-item-title>
                    </v-list-item>

            

                    <v-list-item>
                        <v-list-item-title class="header-href" @click="logout">Logout</v-list-item-title>
                    </v-list-item>

                </template>
                
                
            </v-list>
        </v-menu>
    </v-app-bar>
  
  </div>

  
</template>  


<script>
export default {

    data(){
        return{          
          
        }
    },
    
    
    methods:{
        logout(){
            this.$store.dispatch("logout",this.$store.state.token);         
        }, 

        
 
    },
       
    
}
</script>

<style>
    @import "../../assets/css/header.css";
</style>

