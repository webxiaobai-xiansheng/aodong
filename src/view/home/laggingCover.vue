<template>
  <!-- 包衣间 -->
  <div class="home">
    <v-popover-inside></v-popover-inside>
    <v-table class="table"></v-table>
    <v-page></v-page>
  </div>
</template>

<script>
import vPopoverInside from '../../components/vPopoverInside';
import vTable from '../../components/vTable';
import vPage from '../../components/btn/vPage';
export default {
  data () {
    return {
      
    }
  },
  components: {
    vPopoverInside,
    vTable,
    vPage
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