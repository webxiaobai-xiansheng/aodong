<template>
  <!-- 胶囊间 -->
  <div class="home">
    <v-popover-capsule></v-popover-capsule>
    <v-table class="table"></v-table>
    <v-page></v-page>
  </div>
</template>

<script>
import vPopoverCapsule from '../../components/vPopoverCapsule';
import vTable from '../../components/vTable';
import vPage from '../../components/btn/vPage';
export default {
  data () {
    return {
      
    }
  },
  components: {
    vPopoverCapsule,
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