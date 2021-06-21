<template>
  <div>
    
    <v-app > 
      <Header/>
      <router-view/>  
    </v-app>
    
    
  </div>

</template>

<script>
import Header from './components/Header/Header.vue';

export default {
  name: 'App',

  components: {
      Header,
  },

  data: () => ({
    //
  }),
};
</script>
