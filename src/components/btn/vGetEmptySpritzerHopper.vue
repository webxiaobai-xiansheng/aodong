<template>
  <!-- 送空料斗功能 -->
  <div class="btn" @click="wxcButtonGetEmptySpritzerHopper">
    <text class="btn-txt">送空料斗</text>
  </div>
</template>


<script>
export default {
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
  font-size: 35px;
}
</style>