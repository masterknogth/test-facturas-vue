<template>
    <!--
        AQUI IMPORTO EL COMPONENTE Y LE AGREGO EL MENSAJE DE PAGINA NO ENCONTRADA
    -->
    <NotFound message="Página no encontrada"></NotFound> 
</template>

<script>
import NotFound from './NotFound.vue'

export default {
    
    components: {
        NotFound
    },

}
</script>
