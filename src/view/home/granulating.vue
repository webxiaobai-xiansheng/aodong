<template>
  <!-- 制粒间和总混间 -->
  <div class="home">
    <v-popover-mark></v-popover-mark>
    <v-table class="table"></v-table>
    <!-- <v-page></v-page> -->
  </div>
</template>

<script>
import vPopoverMark from '../../components/vPopoverMark';
import vTable from '../../components/vTable';
// import vPage from '../../components/btn/vPage';
export default {
  data () {
    return {
      
    }
  },
  components: {
    vPopoverMark,
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