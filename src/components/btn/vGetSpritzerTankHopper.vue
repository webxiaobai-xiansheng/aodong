<template>
  <!-- 送料斗或料桶功能 -->
  <div class="btn" @click="wxcButtonGetSpritzerTankHopper">
    <text class="btn-txt">送料斗或料桶</text>
  </div>
</template>


<script>
const modal = weex.requireModule('modal');
var stream = weex.requireModule('stream');
const storage = weex.requireModule('storage');
export default {
  data () {
    return {
      workshopName:''
    }
  },
  created () {
      storage.getItem('workShopName', event => {
          this.workshopName = event.data;
      });
  },
  methods: {
    wxcButtonGetSpritzerTankHopper () {
      let _this=this;
      let url = 'http://10.34.10.126:8200/functionRoomUseContainer/getFunctionRoomUseContainer?functionRoomNumber='+this.workshopName;
      stream.fetch({
          method:"GET",
          url:url,
          type:'json',
      },function(ret){
          if(ret.data.status===1){
            if(ret.data.data.length>0){
              _this.$router.push({name:'popUp'})
            }else{
              modal.toast({ message: '该车间没有料斗和料桶', duration: 3 });
            }
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