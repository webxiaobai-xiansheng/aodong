<template>
  <div class="btn-box">
    <!-- 包衣间 -->
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
          <v-spritzer-tank class="contentBox-btn"></v-spritzer-tank>
          <v-get-empty-spritzer-tank class="contentBox-btn"></v-get-empty-spritzer-tank>
          <v-get-spritzer-tank class="contentBox-btn"></v-get-spritzer-tank>
          <v-empty-spritzer-tank class="contentBox-btn"></v-empty-spritzer-tank>
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
  // 送空料桶
  import vGetEmptySpritzerTank from './btn/vGetEmptySpritzerTank.vue';
  // 取空料桶
  import vEmptySpritzerTank from './btn/vEmptySpritzerTank.vue';
  // 取料桶
  import vSpritzerTank from './btn/vSpritzerTank.vue';
  // 送料桶
  import vGetSpritzerTank from './btn/vGetSpritzerTank.vue';
  export default {
    components: { WxcMask,vStop,vStart,vGetEmptySpritzerTank,vEmptySpritzerTank,vSpritzerTank,vGetSpritzerTank},
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