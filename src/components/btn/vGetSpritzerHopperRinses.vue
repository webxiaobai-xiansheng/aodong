<template>
  <!-- 送过期料斗和料桶清洗功能 -->
  <div class="btn" @click="wxcButtonGetSpritzerHopperRinses">
    <text class="btn-txt">送过期料斗和料桶清洗</text>
  </div>
</template>


<script>
export default {
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
  font-size: 35px;
}
</style>