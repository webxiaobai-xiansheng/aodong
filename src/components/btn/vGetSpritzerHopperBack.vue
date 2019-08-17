<template>
  <!-- 送空料桶回中间站功能 -->
  <div class="btn" @click="wxcButtonGetSpritzerHopperBack">
    <text class="btn-txt">送空料桶回中间站</text>
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
      containerNum:''
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
    wxcButtonGetSpritzerHopperBack (e) {
        let _this=this;

        let url = 'http://10.34.10.25:8999/delivery/sendEmptyContainer';
        let body = JSON.stringify({
            containerNumber:_this.containerNum,
            functionNumber:_this.workshopName
        });
        stream.fetch({
            method:"POST",
            url:url,
            headers:{'Content-Type':'application/json'},
            body: body,
            type:'json',
        },function(ret){
            if(ret.data.status===1){
                modal.toast({ message: ret.data.message, duration: 3 });
            }else{
               modal.toast({ message: ret.data.message, duration: 3 });
            }
            // if(ret.data.status===1){
            //     modal.toast({ message: ret.data.message, duration: 3 });
            //     _this.$router.push({name:'jurisLoginMessage'})
            // }else{
            //     modal.toast({ message: '登录失败！！！', duration: 3 });
            // }
        },function(progress) {
            // console.log(progress)
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
</style>