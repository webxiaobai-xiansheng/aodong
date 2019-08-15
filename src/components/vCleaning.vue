<template>
  <div class="btn-box">
    <!-- 清洁间 -->
    <div class="btns">
      <v-stop></v-stop>
      <v-start></v-start>
    </div>
  </div>
</template>

<script>
  import { WxcMask } from 'weex-ui';
  import vStop from './btn/vStop';
  import vStart from './btn/vStart.vue';
  export default {
    components: { vStop,vStart },
  };
</script>

<style scope>
.btns{
  display: flex;
  flex-direction: row;
  justify-content:space-around;
}
</style>