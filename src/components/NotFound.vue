<!--    
    ESTE COMPONENTE TENDRA LA VISTA DE QUE NO SE ENCUENTRA UNA PAGINA O UN ARTICULO
    Y ATRAVES DE LA PROPS SE ENVIA EL MENSAJE DE ERROR CORRESPONDIENTE

-->
<template>
    <div>
        <v-layout class="justify-center">
            <div class="pnf-circle "> 
                <div class="pnf-sing-top">
                    
                </div>
                <div class="pnf-sing-bottom">
                </div>
            </div>  
        </v-layout>

        <v-layout mt-10 class="justify-center">
            <p class="pnf-text">{{message}}</p>
        </v-layout>
    </div>
</template>

<style>
    @import "../assets/css/pageNotFound.css";
</style>

<script>
    export default {
        name: 'PageNotFound',
        props:['message'],
        data(){
            return{                     
                
            }
        },
       
           
    }
</script>