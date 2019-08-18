<template>
  <!-- 停车功能 -->
  <div class="btn" @click="wxcButtonStop">
    <text class="btn-txt">车辆暂停</text>
  </div>
</template>


<script>
const modal = weex.requireModule('modal');
var stream = weex.requireModule('stream');
export default {
  methods: {
    wxcButtonStop () {
      let _this=this;
      let url = 'http://10.34.10.56:8088/agv/stopOrStart/1';
      stream.fetch({
          method:"GET",
          url:url,
          type:'json',
      },function(ret){
          if(ret.data.status===1){
              modal.toast({ message: ret.data.message, duration: 3 });
          }else{
            modal.toast({ message: ret.data.message, duration: 3 });
          }
      })
      
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