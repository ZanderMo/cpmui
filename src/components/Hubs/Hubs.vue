<template>
    <div class="Hub-Box">
          <div v-for="Hub in Hubs">
                <divider>{{Hub.Title+'：'+Hub.About}}</divider>
                <div v-for="Device in Hub.RNodes"> 
                        <group v-if="Device.Type==1">
                            <!--<button style="height:58px;width:50px;padding:0px;background-color: #288af0;border:none;color:white;float:left;">修 改<br />设 备</button>-->
                            <cell :title="Device.Title" >
                            <x-switch title=" " ></x-switch>
                            </cell>
                        </group>
                        <group v-if="Device.Type==2">
                            <cell :title="Device.Title" >
                            <!--<x-input   placeholder="填入指令" class="weui_vcode">
                                <x-button  slot="right" type="primary">发 送</x-button>
                            </x-input>-->
                            <!--<button style="line-height: 45px;background-color:#09BB07;border:1px solid #09BB07;color:#fff;">发送指令</button>-->
                            <x-button type="primary" @click.native="PopUpShow=true">指 令</x-button>
                            </cell>
                            <popup v-model="PopUpShow" >
                                <div >
                                  <divider>{{Device.Title}}</divider>
                                    <group><x-input   placeholder="填入指令" class="weui_vcode" style="margin:0px 10px;padding:0px">
                                <x-button  slot="right" type="primary">发 送</x-button>
                                    </x-input>
                                    </group>
                                    <divider>.</divider>
                                  <group>
                                  <div style="text-align: center;display: block;line-height: 50px;font-size: 20px;color:#666" @click="PopUpShow=false">取 消</div>
                                 </group>
                                </div>
                            </popup>
                            
                        </group>
                        <group v-if="Device.Type==3">
                            <cell primary="content" >
                                <span style="margin:50px 0px;">{{Device.Title}}值：{{data11}}</span><br />
                                <span>{{Device.CtrlerVal.split(',')[1]}}</span>
                                <input type="range"  v-model="data11" :step="Device.CtrlerVal.split(',')[3]" :min="Device.CtrlerVal.split(',')[1]" :max="Device.CtrlerVal.split(',')[2]" @change="RangeChange(Hub.Id,Device.Id)">
                                <span style="float:right;">{{Device.CtrlerVal.split(',')[2]}}</span>
                              </cell>
                        </group>

                        <group>
                        <cell is-link v-if="Device.Type==4">
                            <img slot="icon" width="40" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
                            <router-link :to="{path:'/NodeNum',query: {HubID:Hub.Id,Node:Device}}">{{Device.Title}}</router-link>
                        </cell>
                        <cell  is-link v-if="Device.Type==5">
                            <img slot="icon" width="40" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
                            GPS<router-link :to="{path:'/NodeGps',query: {HubID:Hub.Id,Node:Device}}">{{Device.Title}}</router-link>
                        </cell>
                        <cell is-link v-if="Device.Type==6">
                            <img slot="icon" width="40" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
                            {{Device.Title}}
                        </cell>
                        <cell title="" is-link v-if="Device.Type==7">
                            <img slot="icon" width="40" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
                            {{Device.Title}}
                        </cell>
                    </group>
                </div>
          </div>
    </div>
</template>


<script>
    import { Divider, XInput, XButton, Group, Toast, XSwitch, Range, Cell,Popup } from 'vux'

    export default {
        name: 'Login',
        data() {
            return {
                ApiKey: localStorage.getItem('ApiKey'),
                Identity: localStorage.getItem('Identity'),
                UserName: '',
                PassWord: '',
                Toast: { Text: '', Type: 'text', Show: false },
                Hubs:[],
                PopUpShow:false,
                data11:100,
                Step:8
            }
        },
        components: {
            Divider,
            XInput,
            XButton,
            Group,
            Toast,
            XSwitch,
            Range,
            Cell,
            Popup
        },
        methods: {
            
            ShowToast(ToastText, ToastType) {
                this.Toast.Type = ToastType;
                this.Toast.Text = ToastText;
                this.Toast.Show = true;
            },
            GetHubs() {
                let self = this;
                $.ajax({
                    url: window.API_URL + '/api/hubs/all',
                    type: 'GET',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Basic ' + self.Identity)
                    },
                    success: function (result) {
                        self.Hubs = result.data;
                    },
                    error: function (err) {
                        self.ShowToast(err.responseText,'cancel');
                    }
                });
            },
            RangeChange(hub_id,node_id){
                let self=this;
                let Rdata=JSON.stringify({"Rvalue": Number(window.event.target.value)})
                 $.ajax({
                    url: window.API_URL + '/api/hub/'+hub_id+'/node/'+node_id+'/datapoint',
                    type: 'PUT',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('U-ApiKey', self.ApiKey)
                    },
                    data:Rdata,
                    success: function (result) {
                        
                    },
                    error: function (err) {
                        self.ShowToast(err.responseText,'cancel');
                    }
                });
            }
        },
        mounted(){
            this.GetHubs();
        }
    }
</script>

<style lang="less">
.Hub-Box{
    .weui_cell{
        padding:5px 20px;height:50px;
        .weui_cell_ft{ text-align: left;}
        input[type="range"] {
                width:80%;
                margin: 2px 2px 20px 3px;
                background-color: #04BE02;
                border-radius: 15px;
                -webkit-appearance: none;
                height:2px;
            }
            input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                cursor: default;
                top: -5px;
                height: 30px;
                width: 30px;
                transform: translateY(0px);
                background: none repeat scroll 0 0 #fff;
                border-radius: 30px;
                -webkit-box-shadow: 0 -1px 1px #999 inset;
            }
    }
    .weui_cells{
        padding-top:0px;
        margin:3px 0px; 
    }

}
  </style>