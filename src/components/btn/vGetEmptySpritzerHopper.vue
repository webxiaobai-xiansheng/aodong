<template>
  <!-- 送空料斗功能 -->
  <!-- <wxc-button text="送空料斗" type="blue" size="small"
              @wxcButtonClicked="wxcButtonGetEmptySpritzerHopper"></wxc-button> -->
  <div class="btn" @click="wxcButtonGetEmptySpritzerHopper">
    <text class="btn-txt">送空料斗</text>
  </div>
</template>


<script>
// import { WxcButton } from 'weex-ui'
export default {
  // components: { WxcButton },
  methods: {
    wxcButtonGetEmptySpritzerHopper (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>
.btn{
  display: flex;
  justify-content: center;
  background-color:#0099ff;
  width: 200px;
  height: 100px;
  border-radius: 10px;
}
.btn-txt{
  text-align: center;
  margin: 0 auto;
  color: #fff;
}
</style>