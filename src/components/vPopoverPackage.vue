<template>
  <div class="btn-box">
    <!-- 内包间 -->
    <div class="btns">
      <div class="btn" @click="openMask">
        <text class="btn-txt">取/送桶</text>
      </div>
      <div class="btn" @click="openNoAnimationMask">
        <text class="btn-txt">车辆控制</text>
      </div>
    </div>
    <wxc-mask height="300"
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
          <v-spritzer-tank class="contentBox-btn"></v-spritzer-tank>
          <v-get-spritzer-hopper-back class="contentBox-btn"></v-get-spritzer-hopper-back>
          <v-get-spritzer-tank class="contentBox-btn"></v-get-spritzer-tank>
          <v-get-spritzer-hopper-rinse class="contentBox-btn"></v-get-spritzer-hopper-rinse>
          <v-reset-container class="contentBox-btn"></v-reset-container>
          <v-container-location class="contentBox-btn"></v-container-location>
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
  // 送空料桶回中间站
  import vGetSpritzerHopperBack from './btn/vGetSpritzerHopperBack.vue';
  // 送空料桶清洗
  import vGetSpritzerHopperRinse from './btn/vGetSpritzerHopperRinse.vue';
  // 取料桶
  import vSpritzerTank from './btn/vSpritzerTank.vue';
  // 送料桶
  import vGetSpritzerTank from './btn/vGetSpritzerTank.vue';
  export default {
    components: { WxcMask,vStop,vStart,vGetSpritzerHopperBack,vGetSpritzerHopperRinse,vSpritzerTank,vGetSpritzerTank},
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
        this.hasBusiness = true;
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
  height: 300px;
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