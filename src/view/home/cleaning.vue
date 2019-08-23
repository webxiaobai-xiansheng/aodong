<template>
  <!-- 清洗间 -->
  <div class="home">
    <v-cleaning class="cheBtn"></v-cleaning>
    <div class="inputBox">
      <text class="input-title">编号</text>
      <div class="input_box">
        <input class="input_item" type="text" placeholder="编号" maxlength="6" v-model="containerNum"/>  
      </div>
    </div>
    <div class="btns">
      <div class="btn">
        <text class="btn-txt" @click="onClack">确认</text>
      </div>
    </div>
  </div>
</template>

<script>
const modal = weex.requireModule('modal');
var stream = weex.requireModule('stream');
const storage = weex.requireModule('storage');
import vCleaning from '../../components/vCleaning';
export default {
  data () {
    return {
      // 车间名字
      workshopName:'',
      containerNum:''
    }
  },
  created () {
      storage.getItem('workShopName', event => {
          this.workshopName = event.data;
      });
      // storage.getItem('containerNum', event => {
      //     this.workshopName = event.data;
      // });
  },
  components: {
    vCleaning
  },
  methods: {
    onClack(){
      let _this=this;
        if(this.containerNum!=='undefined'&&this.workshopName!=='undefined'){
          let url = 'http://10.34.10.177:8999/delivery/sendEmptyContainer';
          let body = JSON.stringify({
              containerNumber:_this.containerNum,
              functionRoomNumber:_this.workshopName
          });
          stream.fetch({
              method:"POST",
              url:url,
              headers:{'Content-Type':'application/json'},
              body: body,
              type:'json',
          },function(ret){
              if(ret.data.status===1){
                  const Steve = new BroadcastChannel('Avengers')
                  Steve.postMessage('Assemble!')
                  modal.toast({ message: ret.data.message, duration: 3 });
              }else{
                 modal.toast({ message: ret.data.message, duration: 3 });
              }
          })
        }else{
          modal.toast({ message: '请输入桶编号', duration: 3 });
        }
    }
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