<template>
  <div class="Login-Box">
    <divider>用户登陆</divider>
    <group>
      <x-input title="用户:" name="UserName" v-model="UserName" placeholder="请输入用户" is-type="china-name"></x-input>
      <x-input title="密码:" name="PassWord" v-model="PassWord" placeholder="请输入密码"></x-input>
      <x-button @click.native="Login" plain type="primary">登 陆</x-button>
    </group>
    <toast v-model="Toast.Show" :type="Toast.Type">{{Toast.Text}}</toast>
  </div>
</template>

<script>
  import { Divider, XInput, XButton, Group, Toast } from 'vux'

  export default {
    name: 'Login',
    data() {
      return {
        Identity: '',
        UserName: '',
        PassWord: '',
        Toast:{Text:'',Type:'text',Show:false}
      }
    },
    components: {
      Divider,
      XInput,
      XButton,
      Group,
      Toast
    },
    methods: {
      Login: function () {
        localStorage.removeItem('Identity');
        localStorage.removeItem('ApiKey');

        if (this.UserName && this.PassWord) {
          this.Identity = window.btoa(this.UserName + ':' + this.PassWord);
          let self = this;
          $.ajax({
            url: window.API_URL + '/api/user/' + this.UserName,
            type: 'GET',
            beforeSend: function (xhr) {
              //在发送请求之前调用，并且传入一个 XMLHttpRequest 作为参数。
              //xhr.setRequestHeader("U-ApiKey", "key-value"),
              //xhr.setRequestHeader("Content-Type", "application/octet-stream")
              xhr.setRequestHeader('Authorization', 'Basic ' + self.Identity)
            },

            complete: function (XHR, TS) { },

            success: function (result) {
                localStorage.setItem('Identity', self.Identity);
                localStorage.setItem('ApiKey', result.data.Ukey);
              self.$router.push({
                path: '/'
              });
            },

            error: function (err) {
              //error 和.ajax()的.fail()二选一，都是处理请求失败后的回调
              if (err.statusText == 'Unauthorized') {
                //alert("用户密码错误！")
                self.ShowToast('用户密码错误！','cancel');
              } else if (err.statusText == 'error') {
                self.ShowToast('登陆失败，请检查网络及其及配置！！','cancel');
              }

            }
          })
        } else {
          this.ShowToast('用户密码不能为空！','cancel');
        }
      },
      ShowToast(ToastText,ToastType){
        this.Toast.Type=ToastType;
        this.Toast.Text=ToastText;
        this.Toast.Show=true;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.Login-Box{
  margin:0px;
}
</style>