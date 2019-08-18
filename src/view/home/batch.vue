<template>
  <!-- 批料待发间 -->
  <div class="home">
    <v-popover-batch></v-popover-batch>
    <v-table class="table"></v-table>
    <!-- <v-page></v-page> -->
  </div>
</template>

<script>
import vPopoverBatch from '../../components/vPopoverBatch';
import vTable from '../../components/vTable';
// import vPage from '../../components/btn/vPage';
export default {
  data () {
    return {
      
    }
  },
  components: {
    vPopoverBatch,
    vTable,
    // vPage
  },
  methods: {
    
  }
}
</script>

<style scoped>
.table{
  /* margin-bottom: 40px; */
}
</style>