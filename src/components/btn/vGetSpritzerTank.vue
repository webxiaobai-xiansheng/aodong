<template>
    <!-- 送料桶功能 -->
    <!-- <div class="btn" @click="wxcButtonGetSpritzerTank">
    <text class="btn-txt">送料桶</text>
  </div> -->
    <div class="btn">
        <wxc-button text="送料桶" type="blue" :disabled="isDisabled" :btn-style="btnStyle" :text-style="textStyle" @wxcButtonClicked="wxcButtonGetSpritzerTank"></wxc-button>
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
            workshopName: '',
            isDisabled: false,
            btnStyle: {
                width: '200px',
                height: '100px',
                borderRadius: '10px'
            },
            textStyle: {
                fontSize: '35px',
                color: '#ffffff',
                textAlign: 'center'
            }
        }
    },
    created() {
        storage.getItem('workShopName', event => {
            this.workshopName = event.data;
        });
    },
    methods: {
        wxcButtonGetSpritzerTank(e) {
            let _this = this;
            _this.isDisabled = true;
            if (e.disabled) {
                _this.isDisabled = true;
                return;
            } else {
                let url = 'http://10.34.10.177:8200/functionRoomUseContainer/getFunctionRoomUseContainer?functionRoomNumber=' + this.workshopName;
                stream.fetch({
                    method: "GET",
                    url: url,
                    type: 'json',
                }, function(ret) {
                    _this.isDisabled = false;
                    if (ret.data.status === 1) {
                        if (ret.data.data.length > 0) {
                            _this.$router.push({ name: 'popUp' })
                        } else {
                            modal.toast({ message: '该车间没有料桶，请尝试其他操作', duration: 2 });
                        }
                    }
                })
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