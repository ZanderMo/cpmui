<template>
    <div class="NodeNum-Box">
        
            <group class="Node-Info">
                <cell :title="'ID：'+$route.query.Node.Id + ' 名称：'+$route.query.Node.Title + '\n'+' ['+$route.query.Node.Tags +']'" :inline-desc="$route.query.Node.About"></cell>
            </group>

            <group>
            <datetime v-model="StTime" format="YYYY-MM-DD HH:mm" @on-change="" title="开始时间" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="完成" cancel-text="取消"></datetime>
            <datetime v-model="EndTime" format="YYYY-MM-DD HH:mm" @on-change="" title="结束时间" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="完成" cancel-text="取消"></datetime>
            <x-button @click.native="GetGps" type="primary" >查询数据</x-button>
            </group>

            <group>
            <div id="Map-box" style="width:100%;height:200px"><h3>节点在所选时间段没有数据</h3></div>
            </group>
            <toast v-model="Toast.Show" :type="Toast.Type">{{Toast.Text}}</toast>
        </div>
    </div>
</template>


<script>
    import moment from 'moment'
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
            GetGps() {
                let StTime = this.StTime.replace(' ', 'T') + ':00.000Z';
                let EndTime = this.EndTime.replace(' ', 'T') + ':00.000Z';
                let self = this;
                let map = new BMap.Map("Map-box"); // 定义地图
                map.addControl(new BMap.NavigationControl()); //增加左上角缩放
                map.addControl(new BMap.ScaleControl({
                    anchor: BMAP_ANCHOR_BOTTOM_LEFT
                })); //增加左下角标尺

                $.ajax({
                    url: window.API_URL + '/api/hub/' + self.$route.query.HubID + '/node/' + self.$route.query.Node.Id + '/json?start=' + StTime + '&end=' + EndTime + '&interval=0&page=10',
                    dataType: 'json',
                    type: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'U-ApiKey': self.ApiKey
                    },
                    success: function (result) {
                        //success 和.ajax()的.done()二选一，都是处理成功后的回调。
                        if (result.ok == 1) {
                            /*alert("添加成功!");*/
                            let startPoint = new BMap.Point(result.data[0].Lng, result.data[0].Lat);
                            map.centerAndZoom(startPoint, 15);
                            for (let i = 0; i < result.data.length; i++) {
                                let val = result.data[i];
                                let point = new BMap.Point(val.Lng, val.Lat);
                                let marker = new BMap.Marker(point);
                                map.addOverlay(marker);
                                //marker.setAnimation(BMAP_ANIMATION_BOUNCE); 跳跳图标
                                var opts = {
                                    width: 160,     // 信息窗口宽度
                                    height: 80,     // 信息窗口高度
                                }
                                let infoWindow = new BMap.InfoWindow("时间：" + val.TimeStamp.substring(0, 19).replace('T', ' ') + "<br/> 位置：" + val.Lng + "," + val.Lat + "<br/> 速度：" + val.Speed + "<br/> 修正：" + val.Offset, opts);
                                marker.addEventListener("click", function () {
                                    map.openInfoWindow(infoWindow, point); //开启信息窗口
                                });

                            }

                        } else {
                            self.ShowToast(result.err,'cancel');
                        }
                    },
                    error: function (err) {
                        this.ShowToast(err,'cancel');
                    }
                })
            },
            IsHasNode(){
                if(!this.$route.query.Node.Id)
                {
                    this.$router.push({path: '/Hubs'});
                }else{
                    this.GetGps();
                }
            }
           
        },
        mounted() {
            this.IsHasNode();

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