<template>
  <div class="btn-box">
    <!-- 胶囊间和压片间 -->
    <div class="btns">
      <div class="btn" @click="openMask">
        <text class="btn-txt">业务</text>
      </div>
      <div class="btn" @click="openNoAnimationMask">
        <text class="btn-txt">功能</text>
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
          <v-empty-spritzer-tank class="contentBox-btn"></v-empty-spritzer-tank>
          <v-get-spritzer-tank-hopper class="contentBox-btn"></v-get-spritzer-tank-hopper>
          <v-spritzer-hopper class="contentBox-btn"></v-spritzer-hopper>
          <v-get-empty-spritzer-hopper class="contentBox-btn"></v-get-empty-spritzer-hopper>
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
  // 送空料斗
  import vGetEmptySpritzerHopper from './btn/vGetEmptySpritzerHopper.vue';
  export default {
    components: { WxcMask,vStop,vStart,vGetSpritzerTankHopper,vEmptySpritzerTank,vSpritzerHopper,vGetEmptySpritzerHopper},
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
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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