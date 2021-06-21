import axios from "axios"
axios.defaults.baseURL = process.env.VUE_APP_API_URL
import NotFound from '../NotFound.vue'
export default {

    components: {
        NotFound
    },

    data() {
        return {    
            invoiceDetailed:{},
            products:[],
            search:'', 
            total:0,
            iva:0,
            totalAndIva:0,
            dialog:false,

            noArticle:false,// mantiene oculto por defecto el contenedor que mostrara el mensaje de articulo no encontrado
            noArticleMessage:"",//muestra el mensaje de articulo no encontrado

            // son los v-model
            number:0,
            sellerName:'',
            sellerNit:'',
            buyerName:'',
            buyerNit:0,
            date:'',
            hour:'',  

            inputErrors:[], // guarda en arreglo los errores de validacion y los inprimen en su respectivo input      
            
            alertSuccess:false,//oculto por defecto el contendor del alerta de exito al registrarte y lo muestro cuando da respuesta positiva
            alertSuccessMessage:"",

        };
    },

    computed: {
        //filtro los productos
        searchProduct() {
            return this.products.filter((item) => {
                return item.description.toLowerCase().includes(this.search.toLowerCase()) ||
                item.value.toString().includes(this.search) || 
                item.quantity.toString().includes(this.search) ||
                item.total_value.toString().includes(this.search)
            });
        }

    },

    methods: {

        async  invoice(){
            let config = {
                headers: {                  
                    'Accept': 'application/json',
                    'Authorization': 'Bearer '+this.$store.state.token,       
                }
            }
          
            try{
                const res = await axios.get('/auth/invoice/'+this.$route.params.id,config)              
                this.noArticle = false;
                this.invoiceDetailed = res.data.invoice
                this.products = res.data.invoice.items
                this.totalToPay()

                this.number = res.data.invoice.number
                this.sellerName = res.data.invoice.seller_name
                this.sellerNit = res.data.invoice.seller_nit
                this.buyerName = res.data.invoice.buyer_name
                this.buyerNit = res.data.invoice.buyer_nit

                let date = res.data.invoice.date.split("/")
                let dateOrdened = date[2]+"-"+date[1]+"-"+date[0]
                this.date = dateOrdened
                this.hour = res.data.invoice.hour

                console.log(this.invoiceDetailed)
            }catch(error){
                if (error.response) {
                    this.noArticle = true;
                    this.noArticleMessage = error.response.data.error
                    console.log(error.response.data);  
                }
            }
        },

        totalToPay(){
            let total = 0
            for (let i = 0; i < this.products.length; i++) {
                total += parseFloat(this.products[i].total_value);           
            }
            this.total = total.toFixed(2)
            this.iva = (total*0.10).toFixed(2)
            this.totalAndIva = (parseFloat(this.total) + parseFloat(this.iva) ).toFixed(2)
             
        },

        async editInvoice(){
            let formData = new  FormData();

            let config = {
                headers: {                  
                    'Accept': 'application/json',
                    'Authorization': 'Bearer '+this.$store.state.token,       
                }
            }
            
            let date = this.date.split("-")
            let dateOrdened = date[2]+"/"+date[1]+"/"+date[0]
           
            formData.append('number', this.number)
            formData.append('seller_name', this.sellerName)
            formData.append('seller_nit', this.sellerNit)
            formData.append('buyer_name', this.buyerName)
            formData.append('buyer_nit', this.buyerNit)
            formData.append('date', dateOrdened)
            formData.append('hour', this.hour)
            formData.append('_method', 'PUT');
  
          
            try{
                const res = await axios.post('/auth/edit-invoice/'+this.$route.params.id, formData, config)              
                this.invoice() 
                this.alertSuccess = true;
                this.alertSuccessMessage = res.data.message;
                setTimeout(() => {
                    this.alertSuccess = false;    
                },7000)  
                
            }catch(error){
                if (error.response) {
                    this.alertSuccess = false;
                    //lleno un arreglo con los errores en los inputs y asi los muestro en el html
                    this.inputErrors.push(
                        error.response.data.error.number,
                        error.response.data.error.seller_name,
                        error.response.data.error.seller_nit, 
                        error.response.data.error.buyer_name,
                        error.response.data.error.buyer_nit,
                        error.response.data.error.date,
                        error.response.data.error.hour,
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
        this.invoice()
    }
}


