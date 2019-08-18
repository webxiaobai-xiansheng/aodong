<template>
  <!-- 取空料斗功能 -->
  <div class="btn" @click="wxcButtonEmptySpritzerHopper">
    <text class="btn-txt">取空料斗</text>
  </div>
</template>


<script>
const modal = weex.requireModule('modal');
var stream = weex.requireModule('stream');
const storage = weex.requireModule('storage');
export default {
  data () {
    return {
      // 车间名字
      workshopName:'',
      containerNum:'',
      'msg':"1"
    }
  },
  created () {
      storage.getItem('workShopName', event => {
          this.workshopName = event.data;
      });
      storage.getItem('containerNum', event => {
          this.containerNum = event.data;
      });
  },
  methods: {
    wxcButtonEmptySpritzerHopper (e) {
        let _this=this;
        if(this.containerNum!=='undefined'&&this.workshopName!=='undefined'){
          let url = 'http://10.34.10.126:8999/obtain/getEmptyContainer?containerNumber='+_this.containerNum+'&functionRoomNumber='+_this.workshopName;
          stream.fetch({
              method:"GET",
              url:url,
              type:'json',
          },function(ret){
              if(ret.data.status===1){
                  modal.toast({ message: ret.data.message, duration: 3 });
                  // eventVue.$emit("myFun",_this.msg) 
              }else{
                 modal.toast({ message: ret.data.message, duration: 3 });
              }
          })
        }else{
          modal.toast({ message: '请选择桶编号', duration: 3 });
        }
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