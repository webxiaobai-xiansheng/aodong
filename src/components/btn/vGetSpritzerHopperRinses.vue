<template>
  <!-- 送过期料斗和料桶清洗功能 -->
  <!-- <wxc-button text="取料桶" type="blue" size="small"
              @wxcButtonClicked="wxcButtonGetSpritzerTank"></wxc-button> -->
  <div class="btn" @click="wxcButtonGetSpritzerHopperRinses">
    <text class="btn-txt">送过期料斗和料桶清洗</text>
  </div>
</template>


<script>
// import { WxcButton } from 'weex-ui'
export default {
  // components: { WxcButton },
  methods: {
    wxcButtonGetSpritzerHopperRinses (e) {
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