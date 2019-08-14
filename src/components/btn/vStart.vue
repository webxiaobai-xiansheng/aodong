<template>
  <!-- 开车功能 -->
  <!-- <wxc-button text="车辆继续" type="blue" size="small"
              @wxcButtonClicked="wxcButtonStart"></wxc-button> -->
  <div class="btn" @click="wxcButtonStart">
    <text class="btn-txt">车辆继续</text>
  </div>
</template>


<script>
// import { WxcButton } from 'weex-ui'
export default {
  // components: { WxcButton },
  methods: {
    wxcButtonStart (e) {
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