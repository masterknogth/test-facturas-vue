export default {
    data(){
        return{          
            form:{
                email:"",
                password:"",
            },
            
            loader:false,
            
            
        }
    },
    
    
    methods:{
        async login(){
            this.loader = true
            await this.$store.dispatch("login", this.form);  
            this.loader = false
            if(this.$store.state.auth){            
                return this.$router.replace('/dashboard');    
            } 
        },      
 
    },

    mounted() {   
        this.$store.dispatch("resetState");                               
        if(this.$store.state.auth){
            return this.$router.replace('/dashboard');    
        }    		           
    } 
}