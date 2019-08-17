<template>
  <!-- 送料斗功能 -->
  <div>
    <div class="btn" @click="wxcButtonGetSpritzerHopper">
      <text class="btn-txt">送料斗</text>
    </div>
  </div>
</template>


<script>
export default {
  methods: {
    wxcButtonGetSpritzerHopper () {
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

.inputBox{
  display: flex;
  flex-direction: row;
  
}
.input_box {
  flex: 2;
  border-style: solid;
  border-width: 1;
  border-color: #333;
  border-radius: 10;
  margin-bottom: 40;
  padding-left: 20;
}

.input_item {
  
  height: 90px;
}

.input-title{
  flex: 1;
  text-align: center;
  font-size: 35px;
  height: 90px;
  line-height: 90px;
}
</style>