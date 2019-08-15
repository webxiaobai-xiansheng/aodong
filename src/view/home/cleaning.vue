<template>
  <!-- 清洗间 -->
  <div class="home">
    <v-cleaning class="cheBtn"></v-cleaning>
    <div class="inputBox">
      <text class="input-title">编号</text>
      <div class="input_box">
        <input class="input_item" type="text" placeholder="编号" maxlength="6"/>  
      </div>
    </div>
    <div class="btns">
      <div class="btn">
        <text class="btn-txt">确认</text>
      </div>
    </div>
  </div>
</template>

<script>
import vCleaning from '../../components/vCleaning';
export default {
  data () {
    return {
      
    }
  },
  components: {
    vCleaning
  },
  methods: {
    
  }
}
</script>

<style scoped>
.home{
  padding: 30px;
}
.cheBtn{
  margin-bottom: 80px;
}
.inputBox{
  margin-bottom: 80px;
}
.btns{
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content:space-around;
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