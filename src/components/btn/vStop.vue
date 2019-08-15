<template>
  <!-- 停车功能 -->
  <!-- <wxc-button text="车辆暂停" type="blue" size="small"
              @wxcButtonClicked="wxcButtonStop"></wxc-button> -->
  <div class="btn" @click="wxcButtonStop">
    <text class="btn-txt">车辆暂停</text>
  </div>
</template>


<script>
// import { WxcButton } from 'weex-ui'
export default {
  // components: { WxcButton },
  methods: {
    wxcButtonStop (e) {
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