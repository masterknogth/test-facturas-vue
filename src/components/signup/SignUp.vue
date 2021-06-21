<template>
    <div  style="margin-top:50px">
       
        <v-layout  justify-center >
            <span class="form-title">Registrate</span>          
        </v-layout>
        <v-layout  justify-center v-if="alertSuccess">
            <v-alert  dense text type="success" >{{alertSuccessMessage}}</v-alert>         
        </v-layout>
        
        

        
        <v-form @submit.prevent="signUp" >
            <v-layout justify-center >
                <v-flex xs6  >  
                    <v-col >
                        <span class="form-input-errors">{{inputErrors[0]}}</span>
                    </v-col>              
                    <v-col cols="12" md="12" >
                        <v-text-field   v-model="name" label="Nombre" :counter="255"> </v-text-field>
                    </v-col>       
                </v-flex>
            </v-layout> 

            <v-layout justify-center>
                <v-flex xs6  >  
                    <v-col >
                        <span class="form-input-errors">{{inputErrors[1]}}</span>
                    </v-col>                
                    <v-col cols="12" md="12" >
                        <v-text-field v-model="email" label="Email" :counter="255"> </v-text-field>
                    </v-col>      
                </v-flex>
            </v-layout>

            <v-layout justify-center >
                <v-flex xs6  >  
                    <v-col >
                        <span class="form-input-errors">{{inputErrors[2]}}</span>
                    </v-col>              
                    <v-col cols="12" md="12" >
                        <v-text-field v-model="nit"  label="NIT" :counter="255"> </v-text-field>
                    </v-col>       
                </v-flex>
            </v-layout>

            <v-layout justify-center>
                <v-flex xs6  >  
                    <v-col >
                        <span class="form-input-errors">{{inputErrors[3]}}</span>
                    </v-col>                
                    <v-col cols="12" md="12" >
                        <v-text-field type="password" v-model="password" label="Password" > </v-text-field>
                    </v-col>      
                </v-flex>
            </v-layout>

            <v-layout justify-center>
                <v-flex xs6  >  
                    <v-col >
                        <span class="form-input-errors">{{inputErrors[3]}}</span>
                    </v-col>                
                    <v-col cols="12" md="12" >
                        <v-text-field type="password" v-model="passwordConfirmation" label="Confirmar Password"> </v-text-field>
                    </v-col>      
                </v-flex>
            </v-layout>

            <v-layout justify-center >          
                <v-flex xs6 >
                    <v-layout justify-center xs12>                
                        <button :disabled="disableButton" xs12 align-center class="form-button">Registrar
                            <v-progress-circular v-if="loader" indeterminate color="grey lighten-5"></v-progress-circular> 
                        </button>  
                    </v-layout >    
                </v-flex>
            </v-layout>      
        </v-form>
        <br/><br/><br/>
    </div>
</template>

<style>
    @import "../../assets/css/form.css";
</style>
<script src="./SignUp.js"></script>