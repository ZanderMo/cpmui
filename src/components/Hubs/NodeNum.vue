<template>
    <div class="NodeNum-Box">
        
            <group class="Node-Info">
                <cell :title="'ID：'+$route.query.Node.Id + ' 名称：'+$route.query.Node.Title + '\n'+' ['+$route.query.Node.Tags +']'" :inline-desc="$route.query.Node.About"></cell>
            </group>

            <group>
            <datetime v-model="StTime" format="YYYY-MM-DD HH:mm" @on-change="" title="开始时间" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="完成" cancel-text="取消"></datetime>
            <datetime v-model="EndTime" format="YYYY-MM-DD HH:mm" @on-change="" title="结束时间" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="完成" cancel-text="取消"></datetime>
            <popup-picker title="值间间隔 /秒" :data="[[1,2,3]]" :columns="1" v-model="value3" ref="picker3" style="padding:10px 0px;"></popup-picker>
            <x-button @click.native="GetNum" type="primary" >查询数据</x-button>
            </group>

            <group>
            <div id="numChart-box" style="width:100%;height:200px"><h3>节点在所选时间段没有数据</h3></div>
            </group>
            <toast v-model="Toast.Show" :type="Toast.Type">{{Toast.Text}}</toast>
        </div>
    </div>
</template>


<script>
    import moment from 'moment'
    import echarts from '../../assets/js/echarts.min.js'
    import { XButton, Group, Toast, Cell, Datetime,XInput,PopupPicker} from 'vux'
    
    export default {
        name: 'Login',
        data() {
            return {
                ApiKey: localStorage.getItem('ApiKey'),
                StTime: moment().format("YYYY-MM-DD 00:00"),
                EndTime: moment().format("YYYY-MM-DD HH:mm"),
                Toast: { Text: '', Type: 'text', Show: false },    
            }
        },
        components: {
            Datetime,
            Group,
            Toast,
            Cell,
            XButton,
            XInput,PopupPicker
        },
        methods: {
            ShowToast(ToastText, ToastType) {
                this.Toast.Type = ToastType;
                this.Toast.Text = ToastText;
                this.Toast.Show = true;
            },
            GetNum() {
                let StTime = this.StTime.replace(' ', 'T') + ':00.000Z';
                let EndTime = this.EndTime.replace(' ', 'T') + ':00.000Z';
                var numChart = echarts.init(document.getElementById('numChart-box'));
                let self = this;
                    $.ajax({
                        url: window.API_URL + '/api/hub/' + self.$route.query.HubID + '/node/' + self.$route.query.Node.Id + '/json?start=' + StTime + '&end=' + EndTime + '&interval=0&page=10',
                        dataType: 'json',
                        type: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                            'U-ApiKey': self.ApiKey
                        },
                        success: function(result) {
                            if (result.ok == 1) {
                                numChart.setOption({
                                    title: {
                                        text: '所选时间段的数值',
                                    },
                                    tooltip: {
                                        trigger: 'axis'
                                    },
                                    legend: {
                                        data: ['数值']
                                    },
                                    toolbox: {
                                        feature: {
                                            saveAsImage: {}
                                        }
                                    },
                                    grid: {
                                        left: '3%',
                                        right: '4%',
                                        bottom: '3%',
                                        containLabel: true
                                    },
                                    xAxis: [{
                                        type: 'category',
                                        boundaryGap: false,
                                        axisTick: [{
                                            interval: 0
                                        }],
                                        data: result.data.map((Value) => Value.TimeStamp.substring(0, 19).replace('T', '\n'))
                                    }],
                                    yAxis: [{
                                        type: 'value'
                                    }],
                                    series: [{
                                        name: '值：',
                                        type: 'line',
                                        stack: '总量',
                                        areaStyle: {
                                            normal: {}
                                        },
                                        data: result.data.map((Value) => Value.Value)
                                    }]
                                });
                            } else {
                                self.ShowToast(result.err,'cancel');
                                /*let numChart = echarts.init(self.$el.children['numChart-box']);*/
                                numChart.setOption({data:[]})
                            }
                        },
                        error: function(err) {
                            this.ShowToast('请求出错！','cancel');
                        }
                    })
                
            }
           
        },
        mounted() {
            this.GetNum();
            console.log();
        }
    }
</script>

<style lang="less">
.NodeNum-Box{
    .weui_cells{
        margin-top:10px;
        .weui_cell{
            padding:1px 15px;
            margin-top:0;
            p{
                margin:10px 0px;
            } 
        }
    }
}
  </style>