<template>
  <!-- 清洗间 -->
  <div class="home">
    <v-cleaning class="cheBtn"></v-cleaning>
    <div class="inputBox">
      <text class="input-title">编号</text>
      <div class="input_box">
          <text class="input_item" @click="wxcButtonGetEmptySpritzerTan">{{containerNum}}</text>
      </div>
    </div>
    <div class="btns">
      <div class="btn">
        <text class="btn-txt" @click="onClack">确认</text>
      </div>
    </div>
    <div class="mask-container">
            <wxc-popup popup-color="#fff" :show="show" @wxcPopupOverlayClicked="wxcMaskSetHidden" pos="left" height="400">
                <div class="content mask-content">
                    <div class="mask-title">
                        <text class="title">请选择空料斗或空料桶</text>
                    </div>
                    <div class="scroller-box">
                        <scroller class="scroller">
                            <wxc-radio :list="emptyContainerList" @wxcRadioListChecked="wxcSelectEmptyContainer"></wxc-radio>
                        </scroller>
                    </div>
                    <div class="button_box bottom">
                        <wxc-button text="确定" type="blue" :disabled="isChoseDisabled" @wxcButtonClicked="wxcConfirmEmptyContainer"></wxc-button size="small">
                    </div>
                </div>
            </wxc-popup>
        </div>
  </div>
</template>

<script>
const modal = weex.requireModule('modal');
var stream = weex.requireModule('stream');
const storage = weex.requireModule('storage');
import { WxcPopup, WxcRadio, WxcButton } from 'weex-ui';
import vCleaning from '../../components/vCleaning';
export default {
  data () {
    return {
      // 车间名字
      workshopName:'',
      containerNum:'',
      show: false,
      isChoseDisabled: true,
      emptyContainerList: [],
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
    vCleaning,
    WxcPopup, 
    WxcRadio, 
    WxcButton
  },
  methods: {
    // onStatus(){
    //   this.show=true;
    // },
    // 打开弹窗
    wxcButtonGetEmptySpritzerTank(e) {
        let _this=this;
        let url = 'http://10.34.10.177:8200/functionRoomUseContainer/getFunctionRoomUseContainer?functionRoomNumber='+this.workshopName;
        stream.fetch({
            method:"GET",
            url:url,
            type:'json',
        },function(ret){
            if(ret.data.status===1){
                if(ret.data.data.length>0){
                    for (let i = 0; i < ret.data.data.length; i++) {
                        _this.emptyContainerList.push({title:ret.data.data[i].containerNumber,value:ret.data.data[i].containerNumber})
                    }
                    _this.show=true
                }else{
                    modal.toast({ message: '该车间没有料桶',duration: 2});
                }
            }
        })
    },
    // 关闭弹窗
    wxcMaskSetHidden() {
        this.show = false;
    },
    // 选择空料桶
    wxcSelectEmptyContainer(e) {
        // if (e.title.length < 1) {
            //     this.isChoseDisabled = true;
        // } else {
            //     this.isChoseDisabled = false;
        // }
        this.isChoseDisabled = false;
        this.containerNum=e.value
    },

    // 选择选择空料斗、料桶--确认按钮
    wxcConfirmEmptyContainer(e) {
        // let _this=this;
        // if(this.containerNum!=='undefined'&&this.workshopName!=='undefined'){
        //     let url = 'http://10.34.10.177:8999/delivery/sendContainerToCleaningRoom';
        //     let body = JSON.stringify({
        //         containerNumber:_this.containerNum,
        //         functionRoomNumber:_this.workshopName
        //     });
        //     stream.fetch({
        //         method:"POST",
        //         url:url,
        //         headers:{'Content-Type':'application/json'},
        //         body: body,
        //         type:'json',
        //     },function(ret){
        //         if(ret.data.status===1){
        //             const Steve = new BroadcastChannel('Avengers')
        //             Steve.postMessage('Assemble!')
        //             modal.toast({ message: ret.data.message,duration: 2});
        //         }else{
        //             modal.toast({ message: ret.data.message,duration: 2});
        //         }
        //     })
        // }else{
        //     modal.toast({ message: '请选择桶编号',duration: 2});
        //     // _this.show = false;
        // }
        this.show =false;
    },
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
                  modal.toast({ message: ret.data.message,duration: 2});
              }else{
                 modal.toast({ message: ret.data.message,duration: 2});
              }
          })
        }else{
          modal.toast({ message: '请输入桶编号',duration: 2});
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