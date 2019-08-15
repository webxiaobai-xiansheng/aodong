<template>
  <!-- 内包间 -->
  <div class="home">
    <v-popover-package></v-popover-package>
    <v-table class="table"></v-table>
    <v-page></v-page>
  </div>
</template>

<script>
import vPopoverPackage from '../../components/vPopoverPackage';
import vTable from '../../components/vTable';
import vPage from '../../components/btn/vPage';
export default {
  data () {
    return {
      
    }
  },
  components: {
    vPopoverPackage,
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