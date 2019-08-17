<template>
  <!-- 送料桶功能 -->
  <div class="btn" @click="wxcButtonGetSpritzerTank">
    <text class="btn-txt">送料桶</text>
  </div>
</template>


<script>
export default {
  methods: {
    wxcButtonGetSpritzerTank (e) {
      this.$router.push({name:'popUp'})
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