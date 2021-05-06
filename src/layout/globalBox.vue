<template>
    <div class="global-box">
        <div class="header-box">
            <i class="el-icon-s-unfold" @click="changeShow"/>
            <span class="top-title">智慧环保系统管理平台</span>

            <div class="logout">
                <div class="right">
                    <el-dropdown trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link" style="color: #ffffff">
                            {{userInfo.nickname}}
                            <i class="el-icon-arrow-down el-icon--right"/>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="updatePassword" class="clearfix">修改密码</el-dropdown-item>
                            <el-dropdown-item command="updateUserInfo" class="clearfix">修改用户信息</el-dropdown-item>

                            <el-dropdown-item command="loginOut" class="clearfix">
                                退出
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div style="float:right;font-size:14px;margin-top:5px;color:#fece37;min-width:180px;text-align:right">
                </div>
                <Modal
                        :dialogFormVisible='dialogFormVisible'
                        title="修改用户信息"
                        v-on:ListenChild='modalCancel'
                        v-on:ListenChild1='handlerSure'
                        :form='form'
                        :modelP='modelP1'
                />
            </div>

        </div>
        <div class="main-box">
            <div :class="isCollapse?'main-box_slide_Collapse':'main-box_slide'">
                <el-menu v-if="menus" :unique-opened="true" background-color='#123bad'
                         text-color='#85a3d9'
                         active-text-color="#fffddd"
                         class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                    <el-submenu :index="index+''" v-for="(menu,index) in menus[0].children" :key="menu.id">
                        <template slot="title">
                            <i :class="
                            menu.label==='系统设置'?
                            'iconfont icon-xitong':
                            menu.label==='商城管理'?
                            'iconfont icon-xuexipindao':''"/>
                            <span slot="title">{{menu.label}}</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item class="testbgc" :index="item.id" v-for="item in menu.children" :key="item.id">
                                <router-link :to="item.path">{{item.label}}</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </div>
            <div :class="isCollapse?'main-box_cotent_Collapse':'main-box_cotent'">
                <router-view/>
            </div>
        </div>

        <el-dialog :title="'修改密码:'" :visible="showUpdatePassword" @close="modalCancel">
            <el-form :model="form" autocomplete="off" ref="rulesForm" label-width="80px" :rules="rules">
                <el-form-item label="旧密码:" prop="oldPassword">
                    <el-input type="password" autocomplete="off" v-model="form.oldPassword"/>
                </el-form-item>
                <el-form-item label="新密码:" prop="newPassword">
                    <el-input :type="pwdType" autocomplete="off" v-model="form.newPassword" @keyup.enter.native="login">
                        <i slot="suffix" class="el-icon-view" @click="showPwd"></i>
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="dialog-footer" slot="footer">
                <el-button @click="modalCancel">取 消</el-button>
                <el-button @click="modalSure" type="primary">修改</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
    import Modal from "@/components/modal.vue";

    export default {
        data() {
            return {
                modelP1: [
                    {modelP: 'username', type: 0, title: '用户名'},
                    {modelP: 'nickname', type: 0, title: '姓名'},
                    {modelP: 'mobile', type: 0.1, min: 1, title: '电话'},
                ],
                dialogFormVisible: false,
                isCollapse: false,
                menus: [{children: ''}],
                userInfo: {},
                form: {},
                showUpdatePassword: false,
                pwdType: 'password',
                rules: {
                    oldPassword: [
                        {required: true, message: '请输入旧密码', trigger: 'blur'}
                    ],
                    newPassword: [
                        {required: true, message: '请输入新密码', trigger: 'blur'}
                    ]
                }
            };
        },
        components: {
            Modal,
        },
        watch: {
            dialogFormVisible: {
                handler: function (val) {
                    if (val) {
                        this.queryUser();
                    }
                },
            }
        },
        mounted() {
            let isLogin = window.sessionStorage.getItem("token");
            if (isLogin) {
                this.getUserInfo()
            } else {
                this.$router.push("/login")
            }
        },
        methods: {
            showPwd() {
                this.pwdType === 'password' ? this.pwdType = '' : this.pwdType = 'password';
                let e = document.getElementsByClassName('el-icon-view')[0];
                this.pwdType === '' ? e.setAttribute('style', 'color: #c8cbd6')
                    : e.setAttribute('style', 'color: #8c929c');
            },
            queryUser() {
                this.$http.queryUser().then(res => {
                    if (res.code === 200) {
                        this.form = res.data;
                    }
                });
            },
            //取消按钮回调函数，隐藏模态框
            modalCancel() {
                this.showUpdatePassword = false
                this.dialogFormVisible = false
                this.form = {};
            },
            //确认按钮回调函数
            modalSure() {
                this.$refs.rulesForm.validate((valid) => {
                    if (valid) {
                        let newPassword = this.form.newPassword;
                        if (newPassword.length < 8 || newPassword.length > 18) {
                            this.$message({
                                type: 'info',
                                message: '请将密码长度设置在8到18位之间！'
                            });
                            return;
                        }
                        let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
                        if (!pattern.test(newPassword)) {
                            this.$message({
                                type: 'info',
                                message: '密码中必须含有特殊字符！'
                            });
                            return;
                        }
                        pattern = new RegExp("[A-Z]+")
                        if (!pattern.test(newPassword)) {
                            this.$message({
                                type: 'info',
                                message: '密码中必须含有大写字母！'
                            });
                            return;
                        }
                        pattern = new RegExp("[a-z]+")
                        if (!pattern.test(newPassword)) {
                            this.$message({
                                type: 'info',
                                message: '密码中必须含有小字母！'
                            });
                            return;
                        }
                        pattern = new RegExp("[0-9]+")
                        if (!pattern.test(newPassword)) {
                            this.$message({
                                type: 'info',
                                message: '密码中必须含有数字！'
                            });
                            return;
                        }

                        this.$http.updatePassword(this.form).then(resp => {
                                if (resp.code === 200) {
                                    this.$message({
                                        type: 'success',
                                        message: resp.msg
                                    });
                                    this.modalCancel()
                                } else {
                                    this.$message({
                                        type: 'error',
                                        message: resp.msg
                                    });
                                }
                            }
                        )
                    } else {
                        return false;
                    }
                });
            },
            handlerSure() {

                if (this.form.username == null) {
                    this.$message({
                        type: 'info',
                        message: '请填写用户名!'
                    });
                    return;
                }
                if (this.form.nickname == null) {
                    this.$message({
                        type: 'info',
                        message: '请填写姓名!'
                    });
                    return;
                } else if (!/^[\u4e00-\u9fa5]{0,}$/.test(this.form.nickname)) {
                    this.$message({
                        type: 'info',
                        message: '姓名只能是汉字!'
                    });
                    return;
                }
                if (this.form.mobile == null) {
                    this.$message({
                        type: 'info',
                        message: '请填写电话号码!'
                    });
                    return;
                } else if (!/^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/.test(this.form.mobile)) {
                    this.$message({
                        type: 'info',
                        message: '请正确填写电话号码!'
                    });
                    return;
                }

                this.$http.updateUser({
                    username: this.form.username,
                    nickname: this.form.nickname,
                    mobile: this.form.mobile,
                    id: this.form.id
                }).then(res => {
                    if (res.code === 200) {
                        this.modalCancel();
                        this.$message({
                            message: '保存成功！',
                            type: 'success'
                        });
                        return;
                    }
                    this.$message({
                        type: 'info',
                        message: res.msg
                    });
                })
            },
            getUserInfo() {
                let _this = this;
                this.$http.getUserInfo().then(resp => {
                    if (resp.code === 200) {
                        this.userInfo = resp.data;
                        if (resp.data.sysMenus) {
                            _this.menus = resp.data.sysMenus;
                            // 去掉智慧环保审核菜单
                            let sysMenus = JSON.parse(JSON.stringify(resp.data.sysMenus));
                            let arr = [];
                            window.localStorage.setItem("userAuthData", "");
                            sysMenus[0].children.forEach(data => {
                                let children = data.children.filter(item => {
                                    let flag = item.path.indexOf("audit-article") === -1;
                                    if (!flag) window.localStorage.setItem("userAuthData", "audit-article");
                                    return flag;
                                });
                                if (data.path.indexOf("audit-article") === -1) {
                                    if (children) {
                                        data.children = children;
                                    }
                                    arr.push(data);
                                }
                            });
                            _this.menus[0].children = arr.sort((a, b) => b.uid - a.uid);
                        } else {
                            _this.$message({
                                type: 'warning',
                                message: '你没有权限访问该系统!'
                            });
                            _this.$router.push("/blank");
                        }
                    } else if (resp.code === 401 || resp.code === 405) {
                        window.sessionStorage.removeItem("token");
                        _this.$router.push("/login");
                    }
                })
            },
            handleCommand(data) {
                if (data === "loginOut") {
                    this.goOut();
                }
                if (data === "updatePassword") {
                    this.showUpdatePassword = true;
                }
                if (data === "updateUserInfo") {
                    this.dialogFormVisible = true;
                }

            },
            /**
             * 退出
             */
            goOut() {
                let _this = this;
                _this.$http.loginOut().then(resp => {
                    if (resp.code === 200) {
                        window.sessionStorage.removeItem("token");
                        _this.$router.push("/login");
                    } else {
                        _this.$message({
                            type: 'warning',
                            message: '退出失败，请重试'
                        });
                    }
                })
            },
            handleOpen(key, keyPath) {

            },
            handleClose(key, keyPath) {

            },
            changeShow() {
                this.isCollapse = !this.isCollapse
            }
        }
    }
</script>
<style lang="less">
    @import './../assets/css/public.css';

    .global-box {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        .header-box {
            width: 100%;
            height: 73px;
            background: #2a58ad;
            background-size: cover;
            display: flex;
            align-items: center;
            color: #fff;
            font-size: 36px;
            box-shadow: 0px 3px 10px 0px rgba(18, 59, 173, 0.5);

            .top-title {
                margin-left: 32px;
                font-size: 22px;
            }

            .el-icon-s-unfold {
                padding-left: 22px;
                cursor: pointer;
                font-size: 30px;
            }

            .logout {
                flex: 1;

                .right {
                    width: 110px;
                    margin-left: 20px;
                    margin-right: 2%;
                    float: right;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    font-size: 16px;
                    color: #fece37;
                    // background: url('../assets/head_ge.jpg') no-repeat 1px center;
                    background-size: 2px 100%;
                    cursor: pointer;

                    div {
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        font-size: 16px;

                        i {
                            padding-bottom: 5px;
                            font-size: 17px;
                        }
                    }
                }
            }
        }

        .main-box {
            flex: 1;
            width: 100%;
            display: flex;
            align-items: center;
            overflow: hidden;

            .el-submenu__title {
                font-size: 18px !important;
            }

            .el-menu-vertical-demo:not(.el-menu--collapse) {
                width: 100%;
                min-height: 400px;
                height: 100%;
                color: #fff;
            }

            .el-menu--collapse {
                height: 100%;
            }

            .el-submenu .el-menu-item-group ul {
                width: 176px;
                padding-left: 70px;

                li:hover {
                    a:before {
                        content: "·";
                        font-size: 20px;
                        position: absolute;
                        left: -20px;
                    }

                    a {
                        font-weight: bolder;
                        color: #999999;
                    }
                }

                li {
                    border-left: 1px solid #2fb0f4;
                    padding-left: 15px !important;
                    min-width: 176px !important;

                    // max-width: 178px!important;
                    a {
                        font-size: 16px;
                        height: 100%;
                        text-decoration: none;
                        letter-spacing: 1.5px;
                        position: relative;
                        color: #b6b6b6;
                    }
                }
            }

            .el-menu-item:hover {
                background-color: #002897 !important;
            }

            .el-submenu__title {
                span {
                    padding-left: 30px;
                    font-size: 18px;
                }

                i {
                    font-size: 20px;
                }

                .el-icon-arrow-down {
                    display: none;
                }
            }

            .el-submenu .el-submenu__title:hover {
                background-color: #002897 !important;
            }

            .el-submenu__title:hover span {
                color: #ffffff !important;
            }

            .el-submenu__title:hover i {
                color: #ffffff !important;
            }

            .el-submenu .el-submenu__title {
                font-size: 18px !important;
                padding-left: 87px;
            }

            .el-submenu .el-menu--inline {
                overflow-y: hidden;

                .el-submenu .el-submenu__title span {
                    padding-left: 50px;
                }
            }

            .el-submenu .el-menu--inline .el-submenu .el-menu--inline .el-menu-item {
                color: #85a3d9;;
                padding-left: 12px;
            }

            .el-menu-item {
                .router-link-exact-active.router-link-active {
                    color: #fff !important;
                }
            }

            .el-badge__content.is-fixed {
                top: 14px;
            }

            .el-badge__content {
                width: 25px;
                height: 14px;
                line-height: 14px;
                // background-color: #ff0000;
            }

            .el-menu-vertical-demo, .el-menu {
                overflow: auto;

                .iconfont {
                    color: #85a3d9;;
                }
            }

            .user-box .table-box .rightContent .el-tabs--border-card .el-tabs__content .el-tab-pane div {
                height: 100% !important;
            }

            .main-box_slide {
                width: 270px;
                height: 100%;
            }

            .main-box_slide_Collapse {
                width: 5%;
                height: 100%;
            }

            .main-box_cotent {
                flex: 1;
                background-color: #F2F2F2;
                height: 100%;
                overflow: scroll;

                > div {
                    height: 100%;
                }
            }

            .main-box_cotent_Collapse {
                width: 95%;
                background-color: #F2F2F2;
                height: 100%;
                overflow: scroll;

                > div {
                    height: 100%;
                }
            }

            .testbgc:hover {
                background-color: #123bad !important;
            }
        }

        .el-tabs__header {
            height: 50px;

            .el-tabs__nav-wrap {
                height: 100%;

                .el-tabs__nav-scroll {
                    height: 100%;

                    .el-tabs__nav {
                        height: 100%;
                        display: flex;
                        align-items: center;
                    }
                }
            }
        }
    }

    .el-menu--popup-right-start {
        .el-menu-item-group {
            ul {
                .is-active {
                    text-align: center;
                    font-size: 16px;

                    a {
                        letter-spacing: 1.5px;
                    }

                    a:hover {
                        color: #fff;
                        font-weight: bold;
                        text-decoration: none;
                    }
                }

                .is-active:hover {
                    // background-color: rgba(83, 189, 151, 1) !important;
                }
            }
        }
    }

    label {
        margin-bottom: 0;
    }
</style>