import axios from "axios"
axios.defaults.baseURL = process.env.VUE_APP_API_URL

export default {
    data() {
        return {    
            invoices:[], 
            option:'',
            search:'',
        };
    },
    
    computed: {

        // filtro las facturas
        searchInvoice() {
            return this.invoices.filter((item) => {
                return item.number.toString().includes(this.search) ||
                item.seller_name.toLowerCase().includes(this.search.toLowerCase()) || 
                item.buyer_name.toLowerCase().includes(this.search.toLowerCase()) ||
                item.date.toString().includes(this.search) ||
                item.hour.toString().includes(this.search)
            });
        },


    },

    methods: {
        
        // listo todas las facturas
        async  listInvoices(){
            let config = {
                headers: {                  
                    'Accept': 'application/json',
                    'Authorization': 'Bearer '+this.$store.state.token,       
                }
            }
          
            try{
                const res = await axios.get('/auth/invoices',config)              
                this.invoices = res.data.invoices
            }catch(error){
                if (error.response) {
                    console.log(error.response.data);  
                }
            }
        },
        
        //ordeno la lista acendente y descendentemente
        orderBy(){
            if(this.option == 1){
                this.invoices.sort(function (a, b) {
                    if (a.number > b.number) {
                        return 1;
                    }
                    if (a.number < b.number) {
                        return -1;
                    }
                    return 0;
                });
            }
            if(this.option == 2){  
                this.invoices.reverse(function (a, b) {
                    if (a.number > b.number) {
                        return 1;
                    }
                    if (a.number < b.number) {
                        return -1;
                    }
                    return 0;
                });
            }

        }

           
    },
    mounted() {
        if(!this.$store.state.auth){
            return this.$router.replace('/');    
        } 
        this.listInvoices()
    }
}


