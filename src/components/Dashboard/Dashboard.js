
import axios from "axios"
axios.defaults.baseURL = process.env.VUE_APP_API_URL

export default {
    data() {
        return {    
            products:[],//lista los productos disponibles para comprar
           
            addedProduct:[],// muestra los productos que han sido agregados para su venta
            name:'',//nombre del comprador  
            nit:'',//nit del comprador
            total:0.00,//es el total a pagar sin IVA
            iva:0.00,//este es el IVA
            totalAndIva:0.00, //es el total a pagar mas  IVA

            buttonInvoice:false,// por defecto esta oculto,  si se agrega productos para comprar el boton se muestra
            inputErrors:[], // guarda en arreglo los errores de validacion y los inprimen en su respectivo input
            disableButton:false, //desactiva el boton una vez que se envia peticion de generar factura y lo activa cuando obtiene respuesta
            loader:false, // un pequeño  loader que aparece en el boton de generar factura
            alertSuccess:false,//es el contenedor del alerta que muestra la generacion de factura
            generateInvoiceMessage:'',//muestra el mensaje de exito al generar factura
        };
    },

    

    methods: {
      
        
        addProducts(){
            this.addedProduct = []
            
            for (let i = 0; i < this.products.length; i++) {  
                
               let val = document.getElementById('item'+this.products[i].id).value; 
              /* console.log(this.products[i].id)
               console.log("valor de : "+this.products[i].id+"--"+val)*/               
                if(val > 0){
                    let objAdded = {
                        description:this.products[i].description,                
                        quantity:val,
                        value:this.products[i].price,
                        total_value: (val * this.products[i].price).toFixed(2)
                    }
                    this.addedProduct.push(objAdded)             
               }   
            }
           
            this.totalToPay()
            // como SI hay productos seleccionados el boton de generar factura se muestra
            if(this.addedProduct.length > 0){
                this.buttonInvoice = true
            }else{
                this.buttonInvoice = false
            }
            
            
        },

        removeProduct(index){  
            this.addedProduct.splice(index,1) 
            this.totalToPay()
            if(this.addedProduct.length < 1){
                // como no hay productos seleccionados el boton de generar factura se oculta
                this.buttonInvoice = false 
            }
        },

        totalToPay(){
            let total = 0
            for (let i = 0; i < this.addedProduct.length; i++) {
                total += parseFloat(this.addedProduct[i].total_value);           
            }
            this.total = total.toFixed(2)
            this.iva = (total*0.10).toFixed(2)
            this.totalAndIva = (parseFloat(this.total) + parseFloat(this.iva) ).toFixed(2)
             
        },

        async  listProducts(){
            let config = {
                headers: {                  
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json',     
                }
            }
          
            try{
                const res = await axios.get('/items',config)              
                this.products = res.data.items 
            }catch(error){
                if (error.response) {
                    console.log(error.response.data);  
                }
            }
        },

        async  generateInvoice(){
            this.inputErrors = []
            this.disableButton = true 
            this.loader = true
            let formData = new  FormData();
            let config = {
                headers: {                  
                    'Accept': 'application/json',
                    'Authorization': 'Bearer '+this.$store.state.token,       
                }
            }
            formData.append('buyer_name', this.name)
            formData.append('buyer_nit', this.nit)
            formData.append('items',JSON.stringify(this.addedProduct) )
            
           
            try{
                const res = await axios.post('/auth/generate-invoice',formData,config)              
                console.log(res.data)
                this.disableButton = false 
                this.loader = false
                this.addedProduct = []
                this.name = ''
                this.nit = ''
                this.total = 0
                this.iva = 0
                this.totalAndIva = 0
                this.alertSuccess = true
                setTimeout(() => {
                    this.alertSuccess = false;    
                },5000)
                this.generateInvoiceMessage = res.data.message
                
                for (let i = 0; i < this.products.length; i++) { 
                    // limpio los inputs de la lista de productos      
                    document.getElementById('item'+this.products[i].id).value = '';
                }
            }catch(error){
                this.disableButton = false  
                this.loader = false
                this.alertSuccess = false
                if (error.response) {
                    this.inputErrors.push(
                        error.response.data.error.buyer_name,
                        error.response.data.error.buyer_nit          
                    )
                    console.log(error.response.data);
                     
                }
            }
        }

           
    },
    mounted() {
        if(!this.$store.state.auth){
            return this.$router.replace('/');    
        } 
        this.listProducts()
    }
}

