<template>
  <div class="btn-box">
    <!-- 胶囊填充室和压片室 -->
    <div class="btns">
      <div class="btn" @click="openMask">
        <text class="btn-txt">桶管理</text>
      </div>
      <div class="btn" @click="openNoAnimationMask">
        <text class="btn-txt">车辆控制</text>
      </div>
    </div>
    <wxc-mask height="500"
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
          <v-empty-spritzer-tank class="contentBox-btn"></v-empty-spritzer-tank>
          <v-get-spritzer-tank-hopper class="contentBox-btn"></v-get-spritzer-tank-hopper>
          <v-spritzer-hopper class="contentBox-btn"></v-spritzer-hopper>
          <v-get-empty-spritzer-hopper-rinse class="contentBox-btn"></v-get-empty-spritzer-hopper-rinse>
          <v-reset-container class="contentBox-btn"></v-reset-container>
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
  // 送料斗或料桶
  import vGetSpritzerTankHopper from './btn/vGetSpritzerTankHopper.vue';
  // 取空料桶
  import vEmptySpritzerTank from './btn/vEmptySpritzerTank.vue';
  // 取料斗
  import vSpritzerHopper from './btn/vSpritzerHopper.vue';
  // 送空料斗清洗
  import vGetEmptySpritzerHopperRinse from './btn/vGetEmptySpritzerHopperRinse.vue';
  import vResetContainer from './btn/vResetContainer.vue';
  const Stark = new BroadcastChannel('Avengers');
  export default {
    components: { WxcMask,vStop,vStart,vGetSpritzerTankHopper,vEmptySpritzerTank,vSpritzerHopper,vGetEmptySpritzerHopperRinse,vResetContainer},
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
.content{
  height: 300px;
  flex-direction: row;
  justify-content: center;
}
.contentBox{
  height: 500px;
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