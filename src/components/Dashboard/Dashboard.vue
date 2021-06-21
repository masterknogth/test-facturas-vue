<template>
    <v-container>
        <br/>
        <v-layout justify-center> 
            <div class="table-x-y-scroll">           
                <table class="table-table" >
                        <thead>
                            <tr class="table-thead-tr-font">
                                <th class="text-center" style="background:re">Id</th>
                                <th class="text-center" style="background:re">DESCRIPCION</th>
                                <th class="text-center" style="background:blu">PRECIO/UNIDAD</th>
                                <th class="text-center" style="background:gree">CANTIDAD DESEADA</th>
                            </tr>
                        </thead>   
                        <tbody class="table-tbody">          
                            <tr class="table-tbody-tr-font" v-for="item in products" :key="item.id">
                                <td class="text-center">{{ item.id }}</td>
                                <td class="text-center">{{ item.description }}</td>
                                <td class="text-center">{{ item.price }}</td>
                                <td class="text-center"><input type="text" class="table-tbody-td-input"  :id="'item'+item.id" /></td>
                            </tr>    
                        </tbody>  
                </table>
            </div>    
        </v-layout>
        <br/>
        <v-layout justify-center>
            <button class="table-button" @click="addProducts">Agregar Productos</button>
        </v-layout>
        <br/>
        <v-layout wrap justify-center >
            <v-flex xs12 sm6 md3 >
                <p class="table-error-inputs">{{inputErrors[0]}}</p>
                <div style="text-align:center;margin-bottom:10px">
                    <input  style="width:220px" class="table-tbody-td-input" placeholder="Nombre del comprador"  v-model="name"/>
                </div>
            </v-flex>
            <br/>
            <v-flex xs12 sm6 md3>
                <p class="table-error-inputs">{{inputErrors[1]}}</p>
                <div style="text-align: center">
                    <input style="width:220px" class="table-tbody-td-input justify-center" placeholder="NIT del comprador"  v-model="nit"/>
                </div>
            </v-flex>
        </v-layout> 
        <br/>

        <v-layout justify-center> 
            <div class="table-x-y-scroll">           
                <table class="table-table" >
                        <thead>
                            <tr class="table-thead-tr-font">
                                <th class="text-center" style="background:re">DESCRIPCION</th>
                                <th class="text-center" style="background:blu">PRECIO/UNIDAD</th>
                                <th class="text-center" style="background:gree">CANTIDAD</th>
                                <th class="text-center" style="background:gree">TOTAL</th>
                            </tr>
                        </thead>   
                        <tbody class="table-tbody">          
                            <tr class="table-tbody-tr-font" v-for="addedProduct, index in addedProduct" :key="index">
                                <td class="text-center">{{ addedProduct.description }}</td>
                                <td class="text-center">{{ addedProduct.value }}</td>
                                <td class="text-center">{{ addedProduct.quantity }}</td>
                                <td class="text-center">{{ addedProduct.total_value }}</td>
                                <td class="text-center"><v-icon class="table-icon-delete" @click="removeProduct(index)">mdi-delete</v-icon></td>
                               
                            </tr>    
                        </tbody>  
                </table>
            </div>    
        </v-layout>
        <br/>
        <v-layout justify-center v-if="alertSuccess"> 
           <v-alert color="green" type="success">{{generateInvoiceMessage}}</v-alert>
        </v-layout> 
        <br/>   
        <v-layout justify-center> 
            <div class="table-total-container">           
                <table class="table-total" >
                        <thead>
                            <tr class="table-thead-tr-font">
                                <th class="text-center" style="background:re">TOTAL</th>
                                <th class="text-center" style="background:re">IVA</th>
                                <th class="text-center" style="background:re">TOTAL + IVA</th>
                            </tr>
                        </thead>   
                        <tbody class="table-tbody">          
                            <tr class="table-tbody-tr-font" >
                                <td class="text-center">{{total}}</td> 
                                <td class="text-center">{{iva}}</td> 
                                <td class="text-center">{{totalAndIva}}</td>                       
                            </tr>    
                        </tbody>  
                </table>
            </div>    
        </v-layout>

        <br/>

         <v-layout justify-center v-if="buttonInvoice">
            <button class="table-button" :disabled="disableButton"  @click="generateInvoice()">Generar factura
            <v-progress-circular v-if="loader" indeterminate color="grey lighten-5"></v-progress-circular>
            </button>
            
        </v-layout>

    </v-container>
</template>


<style>
    @import "../../assets/css/form.css";
    @import "../../assets/css/table.css";
</style>
<script src="./Dashboard.js"></script>