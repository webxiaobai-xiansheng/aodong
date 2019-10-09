<template>
    <!-- 取料斗功能 -->
    <!-- <div class="btn" @click="wxcButtonSpritzerHopper">
    <text class="btn-txt">取料斗</text>
  </div> -->
    <div class="btn">
        <wxc-button text="取料斗" type="blue" :disabled="isDisabled" :btn-style="btnStyle" @wxcButtonClicked="wxcButtonSpritzerHopper"></wxc-button>
    </div>
</template>
<script>
const modal = weex.requireModule('modal');
var stream = weex.requireModule('stream');
const storage = weex.requireModule('storage');
import { WxcButton } from 'weex-ui';
export default {
    components: { WxcButton },
    data() {
        return {
            // 车间名字
            workshopName: '',
            containerNum: '',
            isDisabled: false,
            btnStyle: {
                width: '200px',
                height: '100px',
                borderRadius: '10px'
            }
        }
    },
    created() {
        storage.getItem('workShopName', event => {
            this.workshopName = event.data;
        });
        storage.getItem('containerNum', event => {
            this.containerNum = event.data;
        });
    },
    methods: {
        wxcButtonSpritzerHopper(e) {
            let _this = this;
            _this.isDisabled = true;
            if (e.disabled) {
                _this.isDisabled = true;
                return;
            } else {
                if (this.containerNum !== 'undefined' && this.workshopName !== 'undefined') {
                    let url = 'http://10.34.10.177:8999/obtain/getStripContainer';
                    let body = JSON.stringify({
                        containerNumber: _this.containerNum,
                        functionRoomNumber: _this.workshopName
                    });
                    stream.fetch({
                        method: "POST",
                        url: url,
                        headers: { 'Content-Type': 'application/json' },
                        body: body,
                        type: 'json',
                    }, function(ret) {
                        _this.isDisabled = false;
                        if (ret.data.status === 1) {
                            const Steve = new BroadcastChannel('Avengers')
                            Steve.postMessage('Assemble!')
                            modal.toast({ message: ret.data.message, duration: 2 });
                        } else {
                            modal.toast({ message: ret.data.message, duration: 2 });
                        }
                    })
                } else {
                    modal.toast({ message: '请选择桶编号', duration: 2 });
                    _this.isDisabled = false;
                }
            }
        }
    }
}
</script>
<style scoped>
.btn {
    display: flex;
    justify-content: center;
    background-color: #0099ff;
    width: 200px;
    height: 100px;
    border-radius: 10px;
}

.btn-txt {
    text-align: center;
    margin: 0 auto;
    color: #fff;
    font-size: 35px;
}
</style>