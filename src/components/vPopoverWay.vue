<template>
  <div class="btn-box">
    <!-- 中间站 -->
    <div class="btns">
      <div class="btn" @click="openMask">
        <text class="btn-txt">桶管理</text>
      </div>
      <div class="btn" @click="openNoAnimationMask">
        <text class="btn-txt">车辆控制</text>
      </div>
    </div>
    <wxc-mask height="400"
              width="500"
              border-radius="0"
              duration="200"
              mask-bg-color="rgba(255,255,255,0)"
              :has-animation="hasBusiness"
              :has-overlay="true"
              :show-close="true"
              :show="showBusiness"
              @wxcMaskSetHidden="wxcMaskBusiness">
      <div class="contentBox">
          <div class="btnNss" @click="onJurisLogin">
            <text class="btn-txtNSS">初始化界面</text>
          </div>
          <v-weigh class="contentBox-btn"></v-weigh>
          <v-get-spritzer-hopper-rinses class="contentBox-btn"></v-get-spritzer-hopper-rinses>
          <div class="btnNss" @click="onContainerLogin">
            <text class="btn-txtNSS">桶/库位绑定</text>
          </div>
          <v-manual-storage class="contentBox-btn"></v-manual-storage>
      </div>
    </wxc-mask>
    <wxc-mask height="300"
              width="500"
              border-radius="0"
              duration="200"
              mask-bg-color="rgba(255,255,255,0)"
              :has-animation="hasFunction"
              :has-overlay="true"
              :show-close="true"
              :show="showFunction"
              @wxcMaskSetHidden="wxcMaskFunction">
      <div class="content">
        <div class="content-btn">
          <v-stop></v-stop>
          <v-start></v-start>
        </div>
      </div>
    </wxc-mask>
  </div>
</template>

<script>
  import { WxcMask } from 'weex-ui';
  import vStop from './btn/vStop';
  import vStart from './btn/vStart.vue';
  // 送过期料斗和料桶清洗
  import vGetSpritzerHopperRinses from './btn/vGetSpritzerHopperRinses.vue';
  // 称重
  import vWeigh from './btn/vWeigh.vue';
  // 人工入库
  import vManualStorage from './btn/vManualStorage.vue'
  const Stark = new BroadcastChannel('Avengers');
  export default {
    components: { WxcMask,vStop,vStart,vGetSpritzerHopperRinses,vWeigh,vManualStorage },
    data: () => ({
      showBusiness: false,
      showFunction:false,
      overlayCanClose: true,
      isFalse: false,
      hasBusiness: true,
      hasFunction:true
    }),
    methods: {
      openMask (e) {
        this.showBusiness = true;
        this.hasBusiness = false;
      },
      wxcMaskBusiness () {
        this.showBusiness = false;
      },
      wxcMaskFunction(){
        this.showFunction = false;
      },
      openNoAnimationMask (e) {
        this.showFunction = true;
        this.hasFunction = false;
      },
      onJurisLogin(){
        this.$router.push({name:'jurisLogin'})
      },
      onContainerLogin() {
        this.$router.push({name:'containerLogin'})
      }
    },
    mounted() {
        let self = this;
        Stark.onmessage = function (event) { 
           if(event.data==='Assemble!'){
                self.showBusiness=false
           }
        }
    }
  };
</script>

<style scope>
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
  width: 150px;
  height: 80px;
  border-radius: 10px;
}
.btn-txt{
  text-align: center;
  margin: 0 auto;
  color: #fff;
  font-size: 35px;
}

.btnNss{
  display: flex;
  justify-content: center;
  background-color:#0099ff;
  width: 200px;
  height: 100px;
  border-radius: 10px;
}
.btn-txtNSS{
  text-align: center;
  margin: 0 auto;
  color: #fff;
  font-size: 35px;
}

.content{
  height: 300px;
  flex-direction: row;
  justify-content: center;
}
.contentBox{
  height: 400px;
  width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.contentBox-btn{
  margin-bottom: 40px;
}
.content-btn{
  display: flex;
  height: 300px;
  flex-direction: column;
  justify-content: space-around;
}
</style>