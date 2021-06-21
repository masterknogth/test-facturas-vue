<template>
    <div>  
        <br/>
        
        <v-layout justify-center wrap>
            <v-flex md6 style="text-align:center; margin-bottom:10px">
                <input class="table-tbody-td-input" style="width:200px" placeholder="Buscar"  v-model="search"/>
            </v-flex> 
            <v-flex md6 style="text-align:center;">
                <span class="invoice-text">Ordenar: </span>
                <select v-model="option" @change="orderBy" style="width:200px" class="table-tbody-td-input">
                    <option></option>
                    <option value="1" >Ascendente</option>
                    <option value="2" >Descendente</option>
                </select>
            </v-flex>   
        </v-layout>
        
         <br/>
        <v-layout justify-center> 
            <div class="table-invoices-x-y-scroll">           
                <table class="table-table" >
                        <thead>
                            <tr class="table-thead-tr-font">
                                <th class="text-center" style="background:re">NUMERO</th>
                                <th class="text-center" style="background:re">VENDEDOR</th>
                                <th class="text-center" style="background:blu">COMPRADOR</th>
                                <th class="text-center" style="background:gree">FECHA</th>
                                <th class="text-center" style="background:gree">HORA</th>
                                <th class="text-center" style="background:gree">VER</th>
                            </tr>
                        </thead>
                           
                        <tbody class="table-tbody">
                                      
                            <tr class="table-tbody-tr-font" v-for="item in searchInvoice" :key="item.id">
                                
                                <td class="text-center">{{ item.number }}</td>
                                <td class="text-center">{{ item.seller_name }}</td>
                                <td class="text-center">{{ item.buyer_name }}</td>
                                <td class="text-center">{{ item.date }}</td>
                                <td class="text-center">{{ item.hour }}</td>
                                <td class="text-center">
                                    <router-link :to="/invoice-detailed/+item.id" class="table-href">
                                        <v-icon style="color:#00BFA5">mdi-eye</v-icon>
                                    </router-link>
                                </td>    
                            
                            </tr>
                              
                        </tbody>
                        <!--<router-link :to="/invoice-detailed/+2" > 
                        </router-link>  -->
                </table>
            </div>    
        </v-layout>
    </div>
</template>

<style>
    @import "../../assets/css/table.css";
    @import "../../assets/css/invoice.css";
</style>
<script src="./Invoices.js"></script>