<template>
    <div class="login_content">
        <div class="login_input">
            <div class="inputBox">
                <text class="input-title">桶编号</text>
                <div class="input_box">
                    <input v-model="userName" class="input_item" disabled="disabled" placeholder="桶编号"  @focus="onBucket" />
                </div>
            </div>
            <div class="user_password input_box">
                <span>产品名称</span>
                <input v-model="userPassword" class="input_item" type="password" placeholder="密码" maxlength="8" @change="onProduct">
            </div>
            <div class="user_password input_box">
                <span>批号</span>
                <input v-model="userPassword" class="input_item" type="password" placeholder="密码" maxlength="8">
            </div>
            <div class="user_password input_box">
                <span>日期</span>
                <input v-model="userPassword" class="input_item" type="password" placeholder="密码" maxlength="8" @change="onInput">
            </div>
            <div class="user_password input_box">
                <span>状态</span>
                <input v-model="userPassword" class="input_item" type="password" placeholder="密码" maxlength="8" @change="onStatus">
            </div>
            <div class="user_password input_box">
                <span>物料名称</span>
                <input v-model="userPassword" class="input_item" type="password" placeholder="密码" maxlength="8" @change="onInput">
            </div>
            <div class="user_password input_box">
                <span>检验状态</span>
                <input v-model="userPassword" class="input_item" type="password" placeholder="密码" maxlength="8" @change="onQalified">
            </div>
        </div>
        <!-- <div class="button_box">
            <wxc-button text="选择车间" :disabled="isWorkShopDisabled" type="blue" @wxcButtonClicked="choseWorkShop"></wxc-button>
        </div> -->
        <div class="button_box">
            <wxc-button text="确定" :disabled="isLoginDisabled" type="blue" @wxcButtonClicked="login"></wxc-button>
        </div>
        <!-- 桶编号 -->
        <wxc-mask height="800" width="702" border-radius="0" duration="200" mask-bg-color="#fff" :has-animation="hasAnimation" :has-overlay="true" :show="showBucket" @wxcMaskSetHidden="wxcMaskBucket">
            <div class="content mask-content">
                <div class="mask-title">
                    <text class="title">请选择桶编号</text>
                </div>
                <div class="scroller-box">
                    <scroller class="scroller">
                        <wxc-radio :list="list" @wxcRadioListChecked="wxcRadioBucket"></wxc-radio>
                    </scroller>
                </div>
                <div class="button_box">
                    <wxc-button text="确定" type="blue" :disabled="isChoseDisabled" @wxcButtonClicked="wxcChoseBucket"></wxc-button size="small">
                </div>
            </div>
        </wxc-mask>
        <!-- 状态 -->
        <wxc-mask height="800" width="702" border-radius="0" duration="200" mask-bg-color="#fff" :has-animation="hasAnimation" :has-overlay="true" :show="showstatus" @wxcMaskSetHidden="wxcMaskstatus">
            <div class="content mask-content">
                <div class="mask-title">
                    <text class="title">请选择状态</text>
                </div>
                <div class="scroller-box">
                    <scroller class="scroller">
                        <wxc-radio :list="status" @wxcRadioListChecked="wxcRadiostatus"></wxc-radio>
                    </scroller>
                </div>
                <div class="button_box">
                    <wxc-button text="确定" type="blue" :disabled="isChoseDisabled" @wxcButtonClicked="wxcChosestatus"></wxc-button size="small">
                </div>
            </div>
        </wxc-mask>

        <!-- 合格 -->
        <wxc-mask height="800" width="702" border-radius="0" duration="200" mask-bg-color="#fff" :has-animation="hasAnimation" :has-overlay="true" :show="showqualified" @wxcMaskSetHidden="wxcMaskqualified">
            <div class="content mask-content">
                <div class="mask-title">
                    <text class="title">请选择检验合格</text>
                </div>
                <div class="scroller-box">
                    <scroller class="scroller">
                        <wxc-radio :list="qualified" @wxcRadioListChecked="wxcRadioqualified"></wxc-radio>
                    </scroller>
                </div>
                <div class="button_box">
                    <wxc-button text="确定" type="blue" :disabled="isChoseDisabled" @wxcButtonClicked="wxcChosequalified"></wxc-button size="small">
                </div>
            </div>
        </wxc-mask>

        <!-- 产品名称 -->
        <wxc-mask height="800" width="702" border-radius="0" duration="200" mask-bg-color="#fff" :has-animation="hasAnimation" :has-overlay="true" :show="showproduct" @wxcMaskSetHidden="wxcMaskproduct">
            <div class="content mask-content">
                <div class="mask-title">
                    <text class="title">请选择产品名称</text>
                </div>
                <div class="scroller-box">
                    <scroller class="scroller">
                        <wxc-radio :list="product" @wxcRadioListChecked="wxcRadioproduct"></wxc-radio>
                    </scroller>
                </div>
                <div class="button_box">
                    <wxc-button text="确定" type="blue" :disabled="isChoseDisabled" @wxcButtonClicked="wxcChoseproduct"></wxc-button size="small">
                </div>
            </div>
        </wxc-mask>
    </div>
</template>
<script>
const modal = weex.requireModule('modal');
const navigator = weex.requireModule('navigator');
import { WxcButton, WxcSearchbar, WxcIcon, WxcMask, WxcRadio } from 'weex-ui';
export default {
    components: { WxcButton, WxcSearchbar, WxcIcon, WxcMask, WxcRadio },
    data: () => ({
        userName: '',
        userPassword: '',
        isWorkShopDisabled: true,
        isLoginDisabled: true,
        isChoseDisabled: true,
        // 桶编号
        showBucket: false,
        hasAnimation: true,
        // 状态
        showstatus: false,
        // 检验合格
        showqualified: false,
        // 产品名称
        showproduct: false,
        list: [{
            title: '批料待发间',
            value: 1
        }, {
            title: '制粒间',
            value: 2
        }, {
            title: '总混间',
            value: 3
        }, {
            title: '胶囊间A',
            value: 4
        }, {
            title: '胶囊间B',
            value: 5
        }, {
            title: '压片间',
            value: 6
        }, {
            title: '包衣间',
            value: 7
        }, {
            title: '铝塑包装A',
            value: 8
        }, {
            title: '铝塑包装B',
            value: 9
        }, {
            title: '铝塑包装C',
            value: 10
        }, {
            title: '中间站',
            value: 11
        }, {
            title: '清洗间',
            value: 12
        }],
        status:[{
            title: '原辅料',
            value: 1
        }, {
            title: '未混颗粒',
            value: 2
        }, {
            title: '已混颗粒',
            value: 3
        }, {
            title: '待清洗',
            value: 4
        }, {
            title: '已清洗',
            value: 5
        }],
        qualified:[
          {
            title: '合格',
            value: 0
          },
          {
            title: '不合格',
            value: 1
          },
        ],
        product:[
          {
            title: '心脑舒通胶囊',
            value: 0
          },
          {
            title: '心脑舒通片',
            value: 1
          },
          {
            title: '复方益肝灵片',
            value: 2
          },
          {
            title: '心清脑止痛胶囊',
            value: 3
          },
          {
            title: '豨桐胶囊',
            value: 4
          },
          {
            title: '甘草锌胶囊',
            value: 5
          },
          {
            title: '清眩降压片',
            value: 6
          },
          {
            title: '通便灵胶囊',
            value: 7
          },
          {
            title: '乳酸左氧氟沙星胶囊',
            value: 8
          },
          {
            title: '六味地黄胶囊',
            value: 9
          },
          {
            title: '维格列汀片',
            value: 10
          },
          {
            title: '复方丹参片',
            value: 11
          },
        ],
        checkedInfo: { title: '选项2', value: 2 }
    }),
    methods: {
        // 桶编号
        onBucket() {
            console.log(1)
            this.showBucket=true;
            this.hasAnimation = true;
            // if (this.userName && this.userPassword) {
            //     if (this.isWorkShopDisabled) {
            //         this.isWorkShopDisabled = false
            //     }
            // } else if (!this.isWorkShopDisabled) {
            //     this.isWorkShopDisabled = true
            // }
        },
        // 产品名称
        onProduct(){
          this.showproduct=true;
          this.hasAnimation = true;
        },
        // 状态
        onStatus(){
          this.showstatus=true;
          this.hasAnimation = true;
        },
        // 校验
        onQalified(){
          this.showqualified=true;
          this.hasAnimation = true;
        },
        // 点击“车间选择”按钮
        choseWorkShop(e) {
            this.showBucket= true;
            this.hasAnimation = true;
        },

        // 选择桶号
        wxcRadioBucket(e) {
            this.checkedInfo = e;
            console.log(e.title);
            this.userName=e.title
            console.log(this.userName)
            console.log(e.title.length);
            if (e.title.length < 1) {
                this.isChoseDisabled = true;
            } else {
                this.isChoseDisabled = false;
            }
        },

        // 选择桶号--确认按钮
        wxcChoseBucket() {
            this.showBucket = false;
            this.isLoginDisabled = false;
        },

        // 关闭桶号弹窗
        wxcMaskBucket() {
            this.showBucket = false;
        },

        // 选择状态
        wxcRadiostatus(e) {
            this.checkedInfo = e;
            console.log(e.title);
            console.log(e.title.length);
            if (e.title.length < 1) {
                this.isChoseDisabled = true;
            } else {
                this.isChoseDisabled = false;
            }
        },

        // 选择状态--确认按钮
        wxcChosestatus() {
            this.showBucket = false;
            this.isLoginDisabled = false;
        },

        // 关闭状态弹窗
        wxcMaskstatus() {
            this.showBucket = false;
        },

        // 选择检验
        wxcRadioqualified(e) {
            this.checkedInfo = e;
            console.log(e.title);
            this.userName=e.title
            console.log(this.userName)
            console.log(e.title.length);
            if (e.title.length < 1) {
                this.isChoseDisabled = true;
            } else {
                this.isChoseDisabled = false;
            }
        },

        // 选择检验--确认按钮
        wxcChosequalified() {
            this.showqualified = false;
            this.isLoginDisabled = false;
        },

        // 关闭检验弹窗
        wxcMaskqualified() {
            this.showqualified = false;
        },
        
        // 选择产品名称
        wxcRadioproduct(e) {
            this.checkedInfo = e;
            console.log(e.title);
            console.log(e.title.length);
            if (e.title.length < 1) {
                this.isChoseDisabled = true;
            } else {
                this.isChoseDisabled = false;
            }
        },

        // 选择产品名称--确认按钮
        wxcChoseproduct() {
            this.showproduct = false;
            this.isLoginDisabled = false;
        },

        // 关闭产品名称弹窗
        wxcMaskproduct() {
            this.showproduct = false;
        },
        
        wxcSearchbarInputDisabledClicked () {
      },

        // 登录按钮
        login() {
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
        }
    }
}
</script>
<style scoped>
.inputBox{
    display: flex;
    flex-direction: row;
    /* justify-content: space-between; */
}
.input-title{
    flex: 1;
    line-height: 60px;
    text-align: center;
    font-size: 30px;
}
.input_box {
    flex:3;
    /* flex-direction: row; */
    border-style: solid;
    border-width: 1px;
    border-color: #333;
    border-radius: 10px;
    margin-bottom: 40px;
    padding-left: 20px;
}
.login_content {
    /* justify-content: center; */
    /* align-items: center; */
    /* flex-direction: column; */
}


.input_item {
    /* width: 670px; */
    height: 60px;
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