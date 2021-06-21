<template>
    
    <v-container style="margin-top:200px">
        <v-layout  justify-center >
            <span class="form-title">Login</span>          
        </v-layout>
        <v-layout  justify-center v-if="$store.state.errorLogin != null">
            <v-alert type="error">{{this.$store.state.errorLogin}}</v-alert>        
        </v-layout>

        <v-form   @submit.prevent="login"  >
            <v-layout justify-center >
                <v-flex xs6  >                
                    <v-col cols="12" md="12" >
                        <span class="form-input-errors">{{this.$store.state.emailEmpty}}</span>
                        <v-text-field v-model="form.email"  label="Usuario" required> </v-text-field>
                    </v-col>      
                </v-flex>
            </v-layout> 

            <v-layout justify-center>
                <v-flex xs6  >                
                    <v-col cols="12" md="12" >
                        <span class="form-input-errors">{{this.$store.state.passwordEmpty}}</span>
                        <v-text-field v-model="form.password" type="password" label="Password" required> </v-text-field>
                    </v-col>      
                </v-flex>
            </v-layout>

            <v-layout justify-center >          
                <v-flex xs4 sm2 >
                    <v-layout justify-center xs12>                
                        <button  xs12 align-center class="form-button">Enviar
                            <v-progress-circular v-if="loader" indeterminate color="grey lighten-5"></v-progress-circular>
                        </button>  
                    </v-layout >    
                </v-flex>
            </v-layout>    
    
        </v-form>
       
    </v-container>
    
</template>
<style>
    @import "../../assets/css/form.css";
</style>
<script src="./Login.js"></script>