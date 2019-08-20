<template>
    <div>
        <div class="table_container">
            <div class="radio_box">
                <wxc-grid-select class="radio_item" :single="true" :cols="5" :customStyles="customStyles" :list="list" @select="params => onSelect(params)">
                </wxc-grid-select>
            </div>
            <scroller class="table_scroller" scroll-direction="horizontal">
                <table class="table">
                    <thead>
                        <tr class="table_tr">
                            <th class="table_th" v-for="theadItem in tableHeadData"><text>{{theadItem}}</text></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="table_tr" v-for="(item,index) in tableBodyData" :key="index" @click="selectContainer(index)" :class="[currentIndex === index ? 'active' : '']">
                            <td class="table_td"><text>{{item.containerNumber}}</text></td>
                            <td class="table_td"><text>{{item.productName}}</text></td>
                            <td class="table_td"><text>{{item.lotNumber}}</text></td>
                            <td class="table_td"><text>{{item.status}}</text></td>
                            <td class="table_td"><text>{{item.inspectionStatus}}</text></td>
                            <td class="table_td"><text>{{item.materialName}}</text></td>
                            <td class="table_td"><text>{{item.containerVolume}}</text></td>
                            <td class="table_td"><text>{{item.containerWeight}}</text></td>
                            <!-- <td class="table_td"><text>{{item.productDate}}</text></td> -->
                            <td class="table_td"><text>{{(item.productDate).slice(0,11)}}</text></td>
                        </tr>
                    </tbody>
                </table>
            </scroller>
        </div>
        <!-- 页码功能 -->
        <div class="pageButton_box">
            <wxc-button text="上一页" type="blue" size="medium" :disabled="isPreviewDisabled" @wxcButtonClicked="wxcButtonPreview"></wxc-button>
            <div class="text_box">
                <text class="page-txt pageNum">{{currentPage}}/{{pages}}</text>
            </div>
            <wxc-button text="下一页" type="blue" size="medium" :disabled="isNextDisabled" @wxcButtonClicked="wxcButtonNext"></wxc-button>
        </div>
    </div>
</template>
<script>
const modal = weex.requireModule('modal');
var stream = weex.requireModule('stream');
const storage = weex.requireModule('storage');
const Stark = new BroadcastChannel('Avengers')
import { WxcGridSelect, WxcButton } from 'weex-ui';
export default {
    components: { WxcGridSelect, WxcButton },
    data: () => ({
        currentIndex: -1,
        tableHeadData: ['编号', '产品名称', '批号', '状态', '检验状态', '物料名称', '容积容量', '桶重', '日期'],
        tableBodyData: [],
        name: '',
        customStyles: {
            icon: '',
            height: '50px',
            backgroundColor: '#ccc',
            checkedBackgroundColor: '#ffb200',
        },
        list: [],
        emptyContainer: '',
        container: '',
        outdatedContainers: '',
        // 中间站
        radio6: [{
            title: '显示过期料斗、料桶',
            value: '过期料斗、料桶'
        }],
        isPreviewDisabled: false,
        isNextDisabled: false,
        currentPage: 1,
        pageSize: 10,
        pages: 0,
        pageNum: 1,
        btext:''
    }),
    methods: {
        
        // 点击table选择桶或者料斗
        selectContainer(index) {
            let that = this;
            let containerNum;
            if (index != this.currentIndex) {
                this.currentIndex = index;
                containerNum = that.tableBodyData[index].containerNumber;
                storage.setItem('containerNum', containerNum, event => {
                    console.log(event.data); //undefined表示设置成功
                });
            } else {
                this.currentIndex = -1;
                storage.removeItem('containerNum', event => {
                    console.log(event.data); //undefined表示删除成功
                });
            }
        },

        // 初始化table和筛选table
        initTable() {
            let that = this;
            let url = 'http://10.34.10.126:8200/containerInformation/getAllContainerInformation';
            let body = JSON.stringify({
                init: '',
                page: that.currentPage,
                size: that.pageSize
            });
            stream.fetch({
                method: "POST",
                type: 'json',
                url: url,
                headers: { 'Content-Type': 'application/json' },
                body: body
            }, function(ret) {
                console.log(ret)
                let data = ret.data.data;
                if (ret.status === 200) {
                    if (ret.data.status === 1) {
                        modal.toast({ message: ret.data.message });
                        that.tableBodyData = data.list;
                        that.pages = data.pages; //页数
                        that.currentPage = data.pageNum; //当前页
                        if (data.pageNum > 1) {
                            if (data.pageNum === data.pages) {
                                that.isPreviewDisabled = false;
                                that.isNextDisabled = true;
                            }
                        }
                        if (data.pageNum === 1) {
                            that.isPreviewDisabled = true;
                            that.isNextDisabled = false;
                            if (data.pageNum === data.pages) {
                                that.isPreviewDisabled = true;
                                that.isNextDisabled = true;
                            }
                        }
                        if (data.list.length === 0) {
                            that.currentPage = 0;
                            that.pages = 0;
                            that.isPreviewDisabled = true;
                            that.isNextDisabled = true;
                        }
                    } else {
                        modal.toast({ message: ret.data.message });
                    }
                }
            });
        },

        // 筛选---选择
        onSelect({ selectIndex, checked, checkedList }) {
            let that = this;
            let url = 'http://10.34.10.126:8200/containerInformation/getContainerInformation';
            that.tableBodyData = [];
            let body = {};
            if (checked === true) {
                let containerName = checkedList[0].value;
                if (containerName === '空料桶' || containerName === '空料斗') {
                    console.log(that.currentPage)
                    body = JSON.stringify({
                        emptyContainer: containerName,
                        page: that.currentPage,
                        size: that.pageSize
                    });
                }
                if (containerName === '料桶' || containerName === '料斗') {
                    body = JSON.stringify({
                        container: containerName,
                        page: that.currentPage,
                        size: that.pageSize
                    });
                }
                if (containerName === '过期料斗、料桶') {
                    body = JSON.stringify({
                        outdatedContainers: containerName,
                        page: that.currentPage,
                        size: that.pageSize
                    });
                }
            } else {
                body = JSON.stringify({
                    init: '',
                    page: that.currentPage,
                    size: that.pageSize
                });
            }
            stream.fetch({
                method: "POST",
                type: 'json',
                url: url,
                headers: { 'Content-Type': 'application/json' },
                body: body
            }, function(ret) {
                let data = ret.data.data;
                if (ret.status === 200) {
                    if (ret.data.status === 1) {
                        modal.toast({ message: ret.data.message });
                        that.tableBodyData = data.list;
                        that.pages = data.pages; //页数
                        that.currentPage = data.pageNum; //当前页
                        if (data.pageNum > 1) {
                            if (data.pageNum === data.pages) {
                                that.isPreviewDisabled = false;
                                that.isNextDisabled = true;
                            }
                        }
                        if (data.pageNum === 1) {
                            that.isPreviewDisabled = true;
                            that.isNextDisabled = false;
                            if (data.pageNum === data.pages) {
                                that.isPreviewDisabled = true;
                                that.isNextDisabled = true;
                            }
                        }
                        if (data.list.length === 0) {
                            that.currentPage = 0;
                            that.pages = 0;
                            that.isPreviewDisabled = true;
                            that.isNextDisabled = true;
                        }
                    } else {
                        modal.toast({ message: ret.data.message });
                    }
                }
            })
        },
        // 筛选按钮
        showFilterButton() {
            let that = this;
            storage.getItem('workShopTitle', event => {
                that.name = event.data;
                if (that.name === '中间站') {
                    that.list = that.radio6;
                    that.customStyles.width = '280px';
                }
            });
        },
        // 分页按钮--上一页
        wxcButtonPreview(e) {
            let that = this;
            if (e.disabled) {
                return;
            } else {
                that.currentPage -= 1;
                that.initTable();
            }
        },
        // 分页按钮--下一页
        wxcButtonNext(e) {
            let that = this;
            if (e.disabled) {
                return;
            } else {
                that.currentPage += 1;
                that.initTable();
            }
        },
    },
    created() {
        this.initTable(); //初始化table
        this.showFilterButton(); //筛选按钮
        this.$nextTick(function () {
            this.time=setInterval(this.timer, 20000);
        })
        storage.getItem('workShopName', event => {
            this.btext = event.data;
        });
    },
    mounted() {
        let self = this;
        Stark.onmessage = function (event) { 
           if(event.data==='Assemble!'){
                self.initTable()
           }
        }
    }
}
</script>
<style src='../styles/style.css'></style>
<style scoped>
.pageButton_box {
    flex-direction: row;
    justify-content: space-around;
    justify-content: center;
    /* padding-left: 30px; */
    /* padding-right: 30px; */
}

.text_box {
    width: 100px;
    height: 60px;
    background-color: #0f8ee8;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
}
.radio_box{
    width:702;
    flex-direction: row;
}
</style>