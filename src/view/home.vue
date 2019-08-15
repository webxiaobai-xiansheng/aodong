<template>
  <div class="home">
    <v-header></v-header>
    <router-view/>
  </div>
</template>

<script>
import vHeader from '../components/vHeader';
export default {
  components: { vHeader },
  data () {
    return {
      
    }
  },
  methods: {
    // minibarLeftButtonClick () {
    // },
    // minibarRightButtonClick () {
    //   modal.toast({ 'message': '退出成功', 'duration': 1 });
    //   this.$router.push({name:'login'})
    // }
  }
}
</script>

<style scoped>
/* .demo{
  margin-bottom: 20px;
} */
</style>
