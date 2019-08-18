<template>
  <!-- 中间站 -->
  <div class="home">
    <v-popover-way></v-popover-way>
    <v-table class="table"></v-table>
    <!-- <v-page></v-page> -->
  </div>
</template>

<script>
import vPopoverWay from '../../components/vPopoverWay';
import vTable from '../../components/vTable';
import vPage from '../../components/btn/vPage';
export default {
  data () {
    return {
      
    }
  },
  components: {
    vPopoverWay,
    vTable,
    // vPage
  },
  methods: {
    
  }
}
</script>

<style scoped>
.table{
  margin-bottom: 40px;
}
</style>