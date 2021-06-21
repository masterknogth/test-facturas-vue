<template>
    <v-container>
        <template v-if="noArticle">
            <NotFound  :message="noArticleMessage" ></NotFound>
        </template>
        <template v-if="!noArticle">
            <br/>
            <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="cyan" dark v-bind="attrs" v-on="on">
                            Editar Factura
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title class="justify-center">
                            <span class="headline">Editar Dashboard</span>
                        </v-card-title>
                        
                        
                        <v-card-text>
                            <v-container>
                                <v-row> 
                                        
                                    <v-col cols="12">
                                        <span class="form-input-errors">{{inputErrors[0]}}</span>
                                        <v-text-field label="Numero de factura*" :counter="255" v-model="number"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <span class="form-input-errors">{{inputErrors[1]}}</span>
                                        <v-text-field label="Nombre del vendedor*" :counter="255" v-model="sellerName"> </v-text-field>
                                    </v-col> 
                                    <v-col cols="12">
                                        <span class="form-input-errors">{{inputErrors[2]}}</span>
                                        <v-text-field label="NIT del vendedor*" :counter="255" v-model="sellerNit"> </v-text-field>
                                    </v-col> 
                                    <v-col cols="12">
                                        <span class="form-input-errors">{{inputErrors[3]}}</span>
                                        <v-text-field label="Nombre del comprador*" :counter="255" v-model="buyerName"> </v-text-field>
                                    </v-col> 
                                    <v-col cols="12">
                                        <span class="form-input-errors">{{inputErrors[4]}}</span>
                                        <v-text-field label="NIT del comprador*" :counter="255" v-model="buyerNit"> </v-text-field>
                                    </v-col> 
                                    <v-col cols="12">
                                        <span class="form-input-errors">{{inputErrors[5]}}</span>
                                        <v-text-field type="date" label="Fecha*" :counter="255" v-model="date"> </v-text-field>
                                    </v-col>

                                    <v-col cols="12">
                                        <span class="form-input-errors">{{inputErrors[6]}}</span>
                                        <v-text-field type="time" label="Hora*" :counter="255" v-model="hour"> </v-text-field>
                                    </v-col> 

                                </v-row>
                            </v-container>
                            
                        </v-card-text>
                        <v-card-title class="justify-center" v-if="alertSuccess">
                            <v-alert  dense text type="success" >{{alertSuccessMessage}}</v-alert>  
                        </v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-grey" text @click="dialog = false">
                                Cerrar
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="editInvoice">
                                Editar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>


            <br/>
            <v-layout justify-center class="invoice-title">  
                <h3>Factura</h3>
            </v-layout>
            <br/><br/>
            <v-layout  wrap  justify-center >          
                <v-flex md6>
                    <p  class="invoice-text"><strong>Factura:</strong> {{invoiceDetailed.number}}</p>
                </v-flex>
                <v-flex md6 >
                    <p   class="invoice-text"><strong>Fecha</strong> {{invoiceDetailed.date}}, <strong>Hora</strong> {{invoiceDetailed.hour}}</p>
                </v-flex>
            </v-layout>

            <v-layout justify-center wrap>  
                <v-flex md6>
                    <p class="invoice-text"><strong>Vendedor:</strong> {{invoiceDetailed.seller_name}}</p>
                </v-flex>
                <v-flex md6>
                    <p class="invoice-text"><strong>Comprador:</strong> {{invoiceDetailed.buyer_name}}</p>
                </v-flex>

            </v-layout>

            <v-layout justify-center wrap>  
                <v-flex md6>
                    <p class="invoice-text"><strong>NIT Vendedor:</strong> {{invoiceDetailed.seller_nit}}</p>
                </v-flex>
                <v-flex md6>
                    <p class="invoice-text"><strong>NIT Comprador:</strong> {{invoiceDetailed.buyer_nit}}</p>
                </v-flex>
            </v-layout>
            <br/>
            <v-layout justify-center class="invoice-div-line">      
            </v-layout >
            <br/>
            <v-layout justify-center>
                <input class="table-tbody-td-input" placeholder="Buscar"  v-model="search"/>
            </v-layout>
            <br/>
            <v-layout justify-center> 
                <div class="table-x-y-scroll">           
                    <table class="table-table" >
                            <thead>
                                <tr class="table-thead-tr-font">
                                    <th class="text-center">DESCRIPCION</th>
                                    <th class="text-center">PRECIO/UNIDAD</th>
                                    <th class="text-center">CANTIDAD</th>
                                    <th class="text-center">TOTAL</th>
                                </tr>
                            </thead>   
                            <tbody class="table-tbody">          
                                <tr class="table-tbody-tr-font" v-for="products, index in searchProduct" :key="index">
                                    <td class="text-center">{{ products.description }}</td>
                                    <td class="text-center">{{ products.value }}</td>
                                    <td class="text-center">{{ products.quantity }}</td>
                                    <td class="text-center">{{ products.total_value }}</td>
                                                        
                                </tr>    
                            </tbody>  
                    </table>
                </div>    
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
        </template>    
    </v-container>
</template>

<style>
    @import "../../assets/css/invoice.css";
    @import "../../assets/css/table.css";
</style>
<script src="./InvoiceDetailed.js"></script>