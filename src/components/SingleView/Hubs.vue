<template>
    <div class="Hub-Box">
        <divider>设备</divider>
        <group>
            <x-switch title="开关"></x-switch>
        </group>
        <group>
            <x-input title="指令：" placeholder="填入指令" class="weui_vcode">
                <x-button slot="right">发送指令</x-button>
            </x-input>
        </group>
        <group>
            <cell inline-desc="'value is: '+data6" primary="content">
                <range  :min="7" :max="77"></range>
            </cell>
        </group>
        <group>
            <cell primary="content">
                查看数值
            </cell>
        </group>
        <group>
            <cell primary="content">
                查看GPS
            </cell>
        </group>
        <group>
            <cell primary="content">
                查看泛型
            </cell>
        </group>
        <group>
            <cell primary="content">
                查看图片
            </cell>
        </group>
    </div>
</template>


<script>
    import { Divider, XInput, XButton, Group, Toast, XSwitch, Range, Cell } from 'vux'

    export default {
        name: 'Login',
        data() {
            return {
                Identity: '',
                UserName: '',
                PassWord: '',
                Toast: { Text: '', Type: 'text', Show: false }
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
            Cell
        },
        methods: {
            ShowToast(ToastText, ToastType) {
                this.Toast.Type = ToastType;
                this.Toast.Text = ToastText;
                this.Toast.Show = true;
            }
        }
    }
</script>

<style lang="less">
.Hub-Box{
    .weui_cells{
        margin-top:5px;
        border-top:none;
    }
}
  </style>