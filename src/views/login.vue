<template>
    <div class="loginbox">
        <div class="centerbox">
            <div class="titlebox">
                <div class="titlebox_content">
                  <span class="title">
                    智慧环保系统管理平台
                  </span>
                </div>
            </div>
            <div class="formbox">
                <div class="welecome">
                    欢迎登录!
                </div>
                <el-form class="submitform" action="">
                    <el-form-item>
                        <el-input placeholder="请输入用户名" type="text" v-model="username"/>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="请输入密码" type="password" v-model="password"/>
                    </el-form-item>
                </el-form>
            </div>
            <div class="buttonbox">
                <el-button class="submitbutton" @click="login">登录</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "login",
        data() {
            return {
                username: '',
                password: '',
                code: ''
            }
  },
  mounted(){
    if(window.sessionStorage.getItem("token")){
      this.$router.push({path:'/'})
    }
  },
  created() {
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.login();// 登录方法名
        return false;
      }
    };
  },
  components: {},
  methods: {
    login() {
        if(this.username==''){
            this.$message({
                message: '用户名不能为空',
                type: 'error'
            });
        }
        else{
          let data = {
            username:this.username,
            password:this.password
          }
          this.$http.loginByUserName(data).
          then(resp=>{
            console.log(resp)
            if(resp.code==200){
              window.sessionStorage.setItem("token", resp.data.token);
              this.$router.push({path:'/'})
            }
            else{
              this.$message({
                message: resp.msg,
                type: 'error'
              });
            }
          })
        }
    }
  }}
</script>
<style lang="less" scoped>
    .loginbox {
        width: 100%;
        height: 100%;
        background: #2A58AD url("../assets/load_bj.jpg") no-repeat 32% 40%;
        background-size: 23% 58%;

        .centerbox {
            position: absolute;
            left: 30%;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            width: 26%;
            height: 47%;
            background: #ffffff;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: space-around;
            min-width: 420px;
            min-height: 350px;
            max-height: 420px;

            .titlebox {
                width: 100%;
                height: 100px;
                padding: 0 30px;
                box-sizing: border-box;

                &_content {
                    width: 100%;
                    height: 100%;
                    color: rgba(51, 51, 51, 1);
                    text-align: center;
                    font-weight: bold;
                    display: flex;
                    align-items: flex-end;
                    padding: 15px 0;
                    justify-content: center;
                    border-bottom: 1px solid rgba(220, 220, 220, 1);
                    font-family: MicrosoftYaHei-Bold;
                    font-size: 23px;
                    font-stretch: normal;
                    line-height: 19px;
                    letter-spacing: 1px;
                    color: #123bad;

                    img {
                        width: 40px;
                        height: 37px;
                    }
                }
            }

            .formbox {
                flex: 1;
                width: 100%;
                padding: 0 35px;
                display: flex;
                flex-direction: column;
                padding-top: 10px;

                .welecome {
                    font-size: 15px;
                    height: 50px;
                    color: rgba(102, 102, 102, 1);
                }

                .submitform {
                    flex: 1;
                }
            }

            .buttonbox {
                width: 100%;
                height: 120px;
                display: flex;
                align-items: flex-start;
                justify-content: center;
                padding: 15px 35px;

                .submitbutton {
                    width: 100%;
                    background: #123bad;
                    border-radius: 3px;
                    font-family: MicrosoftYaHei;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 1px;
                    color: #ffffff;
                }
            }
        }
    }

    input::-webkit-input-placeholder {
        font-size: 13px;
        padding-bottom: 10px;
        padding-left: 15px;
    }
</style>
