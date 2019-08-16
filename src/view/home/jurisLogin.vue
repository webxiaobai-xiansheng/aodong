<template>
    <div class="login_content">
        <div class="login_input">
            <div class="user_name input_box">
                <input v-model="userName" class="input_item" type="text" placeholder="用户名称"/>
            </div>
            <div class="user_password input_box">
                <input v-model="userPassword" class="input_item" type="password" placeholder="密码">
            </div>
        </div>
        <!-- <div class="button_box">
            <wxc-button text="选择车间" :disabled="isWorkShopDisabled" type="blue" @wxcButtonClicked="choseWorkShop"></wxc-button>
        </div> -->
        <div class="button_box">
            <wxc-button text="登录" type="blue" @wxcButtonClicked="onLogin"></wxc-button>
        </div>
        <div class="button_box">
            <wxc-button text="返回" type="blue" @wxcButtonClicked="onBlack"></wxc-button>
        </div>
        <!-- <wxc-mask height="800" width="702" border-radius="0" duration="200" mask-bg-color="#fff" :has-animation="hasAnimation" :has-overlay="true" :overlay-can-close="overlayCanClose" :show="show" @wxcMaskSetHidden="wxcMaskSetHidden">
            <div class="content mask-content">
                <div class="mask-title">
                    <text class="title">请选择车间</text>
                </div>
                <div class="scroller-box">
                    <scroller class="scroller">
                        <wxc-radio :list="list" @wxcRadioListChecked="wxcRadioListChecked"></wxc-radio>
                    </scroller>
                </div>
                <div class="button_box">
                    <wxc-button text="确定" type="blue" :disabled="isChoseDisabled" @wxcButtonClicked="wxcChoseWorkShop"></wxc-button size="small">
                </div>
            </div>
        </wxc-mask> -->
    </div>
</template>
<script>
const modal = weex.requireModule('modal');
const navigator = weex.requireModule('navigator');
import { WxcButton} from 'weex-ui';
export default {
    components: { WxcButton},
    data: () => ({
        userName: '',
        userPassword: '',
    }),
    methods: {
        // 账号、密码输入框输入内容后显示 “选择车间按钮”
        // onInput() {
        //     if (this.userName && this.userPassword) {
        //         if (this.isWorkShopDisabled) {
        //             this.isWorkShopDisabled = false
        //         }
        //     } else if (!this.isWorkShopDisabled) {
        //         this.isWorkShopDisabled = true
        //     }
        // },

        // 点击“车间选择”按钮
        // choseWorkShop(e) {
        //     this.show = true;
        //     this.hasAnimation = true;
        // },

        // 选择车间
        // wxcRadioListChecked(e) {
        //     this.checkedInfo = e;
        //     console.log(e.title);
        //     console.log(e.title.length);
        //     if (e.title.length < 1) {
        //         this.isChoseDisabled = true;
        //     } else {
        //         this.isChoseDisabled = false;
        //     }
        // },

        // 选择车间--确认按钮
        // wxcChoseWorkShop() {
        //     this.show = false;
        //     this.isLoginDisabled = false;
        // },

        // 关闭弹窗
        // wxcMaskSetHidden() {
        //     this.show = false;
        // },

        // 登录按钮
        onLogin() {
            if (this.userName.length < 1) {
                modal.toast({ message: '请输入账号' });
            } else if (this.userPassword.length < 1) {
                modal.toast({ message: '请输入密码' })
            } else {
                modal.toast({ message: '登录成功', duration: 3 });
                this.$router.push({name:'batch'})
                // navigator.push({
                //         url: 'batch.html',
                //         animated: 'true'
                //     },
                //     event => {
                //         modal.toast({
                //             message: 'callback:' + event
                //         })
                //     }
                // )
            }
        },
        // 返回按钮
        onBlack(){

        }
    }
}
</script>
<style scoped>
.login_content {
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.input_box {
    flex-direction: row;
    border-style: solid;
    border-width: 1;
    border-color: #333;
    border-radius: 10;
    margin-bottom: 40;
    padding-left: 20;
}

.input_item {
    width: 670px;
    height: 90px;
}

.button_box {
    margin-top: 20px;
}

.mask-content {
    padding-top: 20;
}

.mask-title {
    align-items: center;
}

.title {
    font-size: 28px;
}

.mask-btns {
    align-items: center;
    justify-content: center;
    flex-direction: row;
}

.scroller-box {
    height: 606;
    position: absolute !important;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
}

.workShop-confirm {
    margin-top: 10px;
}
</style>