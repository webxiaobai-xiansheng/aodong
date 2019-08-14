<template>
  <!-- 页码功能 -->
  <div class="pageBtn">
    <div class="btn" @click="wxcButtonStart">
      <text class="btn-txt">上一页</text>
    </div>
    <div class="btn">
      <text class="page-txt">1/4</text>
    </div>
    <div class="btn" @click="wxcButtonStart">
      <text class="btn-txt">下一页</text>
    </div>
  </div>
</template>


<script>
export default {
  methods: {
    wxcButtonStart (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>
.pageBtn{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
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