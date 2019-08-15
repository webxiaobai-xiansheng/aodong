<template>
  <!-- 取料斗功能 -->
  <!-- <wxc-button text="取料斗" type="blue" size="small"
              @wxcButtonClicked="wxcButtonSpritzerHopper"></wxc-button> -->
  <div class="btn" @click="wxcButtonSpritzerHopper">
    <text class="btn-txt">取料斗</text>
  </div>
</template>


<script>
// import { WxcButton } from 'weex-ui'
export default {
  // components: { WxcButton },
  methods: {
    wxcButtonSpritzerHopper (e) {
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
  font-size: 35px;
}
</style>