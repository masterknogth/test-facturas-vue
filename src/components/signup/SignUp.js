import axios from 'axios';
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
export default {
    data() {
        return {    
            name:"", 
            email:"",
            nit:"",
            password:"",
            passwordConfirmation:"",
          
            
            alertSuccess:false, // mostrara el alerta de exito al regitrar
            alertSuccessMessage:"",//mostrara el mensaje de exito que tendra el alerta

            inputErrors:[], // guarda en arreglo los errores de validacion y los inprimen en su respectivo input
            //confirmPasswordError:"",//muestra el error de confirmacion de password
            disableButton:false,
            loader:false,
        };
    },

    methods: {

        async  signUp(){

            this.inputErrors = []
 
            let formData = new  FormData();
            let config = {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',  
                          
                }
            }


            formData.append('name', this.name)
            formData.append('email', this.email)
            formData.append('nit', this.nit)
            formData.append('password', this.password)
            formData.append('password_confirmation', this.passwordConfirmation)
            

            this.loader = true;
            this.disableButton = true
            try{
                const res = await axios.post('/signup',formData, config)
                
                this.disableButton = false
                this.loader = false    
                
                
                this.alertSuccess = true;
               
                this.alertSuccessMessage = res.data.message,
                setTimeout(() => {
                    this.alertSuccess = false;    
                },5000)
                this.name = "";       
                this.email = "";
                this.nit = "";
                this.password = "";
                this.passwordConfirmation = "";
                
                    
                
            }catch(error){
                this.disableButton = false
                this.loader = false    
                if (error.response) {
                   
                    this.inputErrors.push(
                        error.response.data.error.name,
                        error.response.data.error.nit,
                        error.response.data.error.email, 
                        error.response.data.error.password,            
                    )
                    console.log(error.response.data);         
                }
               
            }

        }

           
    },
    mounted() {
        if(this.$store.state.auth){
            return this.$router.replace('/dashboard');    
        }
    }
}