<template>
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
                        <td class="table_td"><text>{{item.productDate}}</text></td>
                    </tr>
                </tbody>
            </table>
        </scroller>
    </div>
</template>
<script>
const modal = weex.requireModule('modal');
var stream = weex.requireModule('stream');
const storage = weex.requireModule('storage');
import { WxcGridSelect } from 'weex-ui';
export default {
    components: { WxcGridSelect },
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
        //批料待发间
        radio1: [{
            title: '显示空料斗',
            value: '空料斗'
        }],
        //制粒间、胶囊间、压片间
        radio2: [{
            title: '显示料斗',
            value: '料斗'
        }, {
            title: '显示空料桶',
            value: '空料桶'
        }],
        //总混间
        radio3: [{
            title: '显示料斗',
            value: '料斗'
        }, {
            title: '显示空料斗',
            value: '空料斗'
        }],
        // 包衣间
        radio4: [{
            title: '显示料桶',
            value: '料桶'
        }, {
            title: '显示空料桶',
            value: '空料桶'
        }],
        // 内包间
        radio5: [{
            title: '显示料桶',
            value: '料桶'
        }],
        // 中间站
        radio6: [{
            title: '显示过期料斗、料桶',
            value: '过期料斗、料桶'
        }]
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
            let url = 'http://10.34.10.53:8200/containerInformation/getContainerInformation';
            let body = JSON.stringify({
                init: ''
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
                    } else {
                        modal.toast({ message: ret.data.message });
                    }
                }
            });
        },

        // 筛选---选择
        onSelect({ selectIndex, checked, checkedList }) {
            let that = this;
            let url = 'http://10.34.10.53:8200/containerInformation/getContainerInformation';
            that.tableBodyData = [];
            let body = {};
            if (checked === true) {
                let containerName = checkedList[0].value;
                if (containerName === '空料桶' || containerName === '空料斗') {
                    body = JSON.stringify({
                        emptyContainer: containerName,
                    });
                }
                if (containerName === '料桶' || containerName === '料斗') {
                    body = JSON.stringify({
                        container: containerName,
                    });
                }
                if (containerName === '过期料斗、料桶') {
                    body = JSON.stringify({
                        outdatedContainers: containerName,
                    });
                }
            } else {
                body = JSON.stringify({
                    init: '',
                });
            }
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
                that.name = '制粒间';
                if (that.name === '批料待发间') {
                    that.list = that.radio1;
                }
                if (that.name === '制粒间' || that.name === '胶囊间1' || that.name === '胶囊间2' || that.name === '压片间') {
                    that.list = that.radio2;
                }
                if (that.name === '总混间') {
                    that.list = that.radio3;
                }
                if (that.name === '包衣间') {
                    that.list = that.radio4;
                }
                if (that.name === '瓶装' || that.name === '铝塑包装1' || that.name === '铝塑包装2') {
                    that.list = that.radio5;
                }
                if (that.name === '中间站') {
                    that.list = that.radio6;
                    that.customStyles.width = '280px';
                }
            });
        }
    },
    created() {
        this.initTable(); //初始化table
        this.showFilterButton(); //筛选按钮
    }

}
</script>
<style src='../styles/style.css'></style>