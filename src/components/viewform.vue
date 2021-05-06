<template>
    <div class="searchlabel-container">

        <div class="content-box">

            <div class="top-container">

                <el-form :label-position="'top'"
                         :class="`${styleType==='one'?'innerForm':'formbox'} ${styleType==='two'?'twoslide':'formbox'}`"
                         :model="form" :disabled="form.status!=null&&form.status=='1005005'">

                    <el-form-item v-for="item in modelP" :key="item.modelP" :label="item.title"
                                  :required='item.required' :class="item.type===0.9?'AllLine':'formitem'">

                        <el-input v-if="item.type===0 && item.isAna===true" v-model="form[item.modelP]"
                                  autocomplete="off" @blur="idCardAna()"></el-input>
                        <el-input v-else-if="item.type===0" v-model="form[item.modelP]" autocomplete="off"></el-input>

                        <el-input type="number" v-if="item.type===0.1" v-model="form[item.modelP]"
                                  autocomplete="off"></el-input>

                        <el-select :disabled="item.disable==1" v-if="item.type===1||item.type===1.2||item.type=='visitUser'"
                                   :multiple="item.type==1.2||item.type=='visitUser'" v-model="form[item.modelP]" clearable placeholder="请选择">

                            <el-option v-if="item.dependent==='status'" v-for="list in statusMeeting"
                                       :key="list.dictName" :label="list.dictName" :value="list.code">

                            </el-option>

                            <el-option v-if="item.dependent==='type'" v-for="list in typesMeeting" :key="list.dictName"
                                       :label="list.dictName" :value="list.code">

                            </el-option>

                            <el-option v-if="item.dependent==='person'" v-for="list in PartyMemberList" :key="list.name"
                                       :label="list.name" :value="list.id">

                            </el-option>
                            <el-option v-if="item.type=='visitUser'" v-for="list in PartyMemberList" :key="list.name"
                                       :label="list.name" :value="list.name">

                            </el-option>

                            <el-option v-if="item.dependent==='identity'" v-for="list in speakerIdentity"
                                       :key="list.dictName" :label="list.dictName" :value="list.code">

                            </el-option>

                            <el-option v-if="item.dependent==='organType'" v-for="list in organTypeList" :key="list.id"
                                       :label="list.dictName" :value="list.code">

                            </el-option>

                            <el-option v-if="item.dependent==='boolean'" v-for="list in booleanList" :key="list.id"
                                       :label="list.name" :value="list.code">

                            </el-option>

                            <el-option v-if="item.dependent==='PersonnelCategory'" v-for="list in PersonnelCategoryList"
                                       :key="list.id" :label="list.dictName" :value="list.code">

                            </el-option>

                            <el-option v-if="item.dependent==='ModelWay'" v-for="list in ModelWayList" :key="list.id"
                                       :label="list.name" :value="list.id">

                            </el-option>

                            <el-option v-if="item.dependent==='Enable'" v-for="list in isEnableList" :key="list.id"
                                       :label="list.name" :value="list.id">

                            </el-option>
                            <el-option v-if="item.dependent=='serving'" v-for="list in servingList" :key="list.code"
                                       :label="list.dictName" :value="list.code">

                            </el-option>

                            <el-option v-if="item.dependent=='servingStatus'" v-for="list in servingStatusList"
                                       :key="list.code" :label="list.dictName" :value="list.code">

                            </el-option>

                            <el-option v-if="item.dependent=='user'" v-for="list in sysUerList" :key="list.id"
                                       :label="list.name" :value="list.id">

                            </el-option>

                            <el-option v-if="item.dependent=='maritalStatus'" v-for="list in marryList" :key="list.code"
                                       :label="list.name" :value="list.code">

                            </el-option>
                            <el-option v-if="item.dependent=='sex'" v-for="list in sexList" :key="list.code"
                                       :label="list.name" :value="list.code">

                            </el-option>
                            <el-option v-if="item.dependent=='education'" v-for="list in educationList" :key="list.code"
                                       :label="list.dictName" :value="list.code">

                            </el-option>

                            <el-option v-if="item.dependent=='relationship'" v-for="list in RelationshipList"
                                       :key="list.code" :label="list.dictName" :value="list.code">

                            </el-option>

                            <el-option v-if="item.dependent=='visitType'" v-for="list in visitDependentList"
                                       :key="list.code" :label="list.name" :value="list.code">

                            </el-option>

                            <el-option v-if="item.dependent=='interviewType'" v-for="list in interviewObjList"
                                       :key="list.id" :label="list.name" :value="list.id">

                            </el-option>
                        </el-select>

                        <el-cascader v-if="item.type===6" v-model="form[item.modelP]" :options="organizationTree"
                                     :show-all-levels="false"
                                     :props="{ value:'uid',label:'label',emitPath: false,checkStrictly: true }">

                        </el-cascader>

                        <el-cascader v-if="item.type===6.1" v-model="form[item.modelP]" :options="organizationTree"
                                     :show-all-levels="false"
                                     :props="{ value:'pid',label:'label',emitPath: false,checkStrictly: true }">

                        </el-cascader>
                        <el-cascader
                                v-if="item.type===6.2"
                                v-model="form[item.modelP]"
                                placeholder="请选择"
                                :options="postList"
                                :show-all-levels="false"
                                :props="{value:'code', label:'dictName', emitPath: false,checkStrictly: true }"
                        ></el-cascader>

                        <el-upload v-if="item.type===3" :action="fileServer" :on-preview="handlePreview"
                                   :on-remove="handleRemove" :before-remove="beforeRemove" :data="fileBusinessId"
                                   name="file" multiple=false  :on-change="handleFromChange" :limit="5"
                                   :on-exceed="handleExceed" :file-list="fileList">

                            <el-button size="small" type="primary">点击上传</el-button>

                        </el-upload>


                        <el-input v-if="item.type===4 && item.isWr===true" v-model="form[item.modelP]"
                                  autocomplete="off" readonly="true"></el-input>
                        <el-date-picker v-else-if="item.type===4" v-model="form[item.modelP]" align="right" type="date"
                                        value-format="yyyy-MM-dd" placeholder="选择日期"/>
                        <el-date-picker v-else-if="item.type==='datatime'" v-model="form[item.modelP]" format="yyyy-MM-dd HH:mm" align="right" type="datetime"
                                        value-format="yyyy-MM-dd HH:mm" placeholder="选择时间"/>
                        <el-input v-if="item.type===0.9" type="textarea" v-model="form[item.modelP]"></el-input>
                    </el-form-item>

                    <div class="finishedBox">

                        <el-form class="finishedForm"
                                 v-if="(form.status=='1005004'&&threeAttendee.partyId==null)||form.status=='1005005'"
                                 :disabled="form.status=='1005005'||form.status=='1005003'" :label-position="left"
                                 :model="summary">

                            <el-form-item class="textArea" label="会议纪要">

                                <el-input type="textarea" v-model="summary.summary"></el-input>

                            </el-form-item>

                            <el-form-item label="附件" label-width="105px">

                                <el-upload :action="fileServer" :on-preview="handlePreview" :on-remove="handleRemove"
                                           :before-remove="beforeRemove" :data="fileBusinessId" name="file"
                                           multiple=false  :on-change="handleChange" :limit="5"
                                           :on-exceed="handleExceed"
                                           :file-list="fileList">

                                    <el-button size="small" type="primary">点击上传</el-button>

                                </el-upload>

                            </el-form-item>

                        </el-form>

                    </div>

                    <el-form v-if="threeAttendee.partyId!=null&&form.status!='1005003'" :label-position="left"
                             :model="threeAttendee">

                        <el-form-item label="原因">

                            <el-input type="textarea" v-model="threeAttendee.comment"></el-input>

                        </el-form-item>

                        <el-form-item label="是否参会">

                            <el-select v-model="threeAttendee.isAttend" placeholder="请选择">

                                <el-option v-for="item in isAttendList" :key="item.id" :label="item.name"
                                           :value="item.id">

                                </el-option>

                            </el-select>

                        </el-form-item>

                    </el-form>

                </el-form>

            </div>

            <div class="buttonarea">

                <el-button v-if="formType==='normal'" type='primary' @click="saveForm">保存</el-button>
                <el-button v-if="formType==='normal'" @click="goBackListPage">返回</el-button>

                <el-button v-if="DontUseSubmit==false" @click="goBackListPage">返回</el-button>

                <el-button type="primary" v-if="threeAttendee.partyId==null&&DontUseSubmit==false"
                           :disabled="form.status=='1005003'||form.status=='1005005'" @click="goSave">保存
                </el-button>

                <el-button type="primary" v-if="threeAttendee.partyId==null&&isthreemeeting==true"
                           :disabled="form.status=='1005003'||form.status=='1005004'||form.status=='1005005'"
                           @click="goSure">提交
                </el-button>

                <el-button type="primary" v-if="form.status=='1005004'" @click="placeOfFile">归档</el-button>

                <el-button type="primary" v-if="form.status=='1005002'&&threeAttendee.partyId==null"
                           @click="goSureMeeting">确认开会
                </el-button>

                <el-button type="primary" v-if="form.status=='1005002'&&threeAttendee.partyId==null"
                           @click="goCancelMeeting">取消会议
                </el-button>

                <el-button type="primary" v-if="threeAttendee.partyId!=null&&form.status!='1005003'"
                           @click="makeSureEnter">确认
                </el-button>

                <el-button type="primary" v-if="form.status=='1005003'" @click="makeCancelSureEnter">确认</el-button>

            </div>

        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                fileServer: this.$fileServer + "/upload",
                isAttendList: [{id: "0", name: "请选择"}, {id: "2", name: "无法参会"}, {id: "1", name: "参会"}],
                fileBusinessId: {businessId: ""},
                count: 0,
                fileList: [],
                interviewObjList: [],
                birthday: ''
                // partyName:''
            }
        },
        mounted() {
            console.log("fileType:" + this.fileType)

            this.getFileList()
        },
        watch: {
            'form.visitType': {
                deep: true,
                handler: function (newV, oldV) {
                    if (newV == 1) {
                        this.interviewObjList = this.$store.state.PooPersonList
                    }
                    else if (newV == 2) {
                        this.interviewObjList = this.$store.state.PoorValageList
                    }

                }
            }
        },
        computed: {
            //会议状态选择依赖
            statusMeeting() {
                return this.$store.state.statusMeeting
            },
            //会议类型选择依赖
            typesMeeting() {
                return this.$store.state.typesMeeting
            },
            //选择组织依赖
            organizationTree() {
                return this.$store.state.organizationTree
            },
            //党员列表依赖
            PartyMemberList() {
                return this.$store.state.PartyMemberList
            },
            //主讲人依赖
            speakerIdentity() {
                return this.$store.state.speakerIdentity
            },
            //组织类型选择依赖
            organTypeList() {
                return this.$store.state.organTypeList
            },
            //人员类别选择依赖
            PersonnelCategoryList() {
                return this.$store.state.PersonnelCategory
            },
            //布尔值选择依赖
            booleanList() {
                return [{name: "是", code: "1"}, {name: "否", code: "0"}]
            },
            //产生方式选择依赖
            ModelWayList() {
                return [{id: "10012001", name: "差额"}, {id: "10012002", name: "等额"}, {id: "10012003", name: "其他"}]
            },
            //是否启用状态依赖
            isEnableList() {
                return [{id: '1', name: "启用"}, {id: '0', name: "不启用"}]
            },
            //职务依赖
            postList() {
                return [
                    {
                        code: '1001',
                        dictName: '党委书记'
                    },
                    {
                        code: '1002',
                        dictName: '党委副书记'
                    },
                    {
                        code: '1003',
                        dictName: '党委常委'
                    },
                    {
                        code: '1004',
                        dictName: '党委委员'
                    },
                    {
                        code: '1005',
                        dictName: '党委后补委员'
                    },
                    {
                        code: '1006',
                        dictName: '党组书记'
                    },
                    {
                        code: '1007',
                        dictName: '党组副书记'
                    },
                    {
                        code: '1008',
                        dictName: '党组织书记'
                    },
                    {
                        code: '1009',
                        dictName: '党总支副书记'
                    },
                    {
                        code: '1010',
                        dictName: '党总支委员'
                    },
                    {
                        code: '1011',
                        dictName: '党支部书记'
                    },
                    {
                        code: '1012',
                        dictName: '党支部副书记'
                    },
                    {
                        code: '1013',
                        dictName: '党支部委员',
                        children: [{
                            code: '1013001',
                            dictName: '党支部组织委员'
                        },
                            {
                                code: '1013002',
                                dictName: '党支部纪检委员'
                            }, {
                                code: '1013003',
                                dictName: '党支部宣传委员'
                            }, {
                                code: '1013004',
                                dictName: '党支部群工委员'
                            }
                        ]
                    },
                    {
                        code: '1014',
                        dictName: '纪委书记'
                    },
                    {
                        code: '1015',
                        dictName: '纪委副书记'
                    },
                    {
                        code: '1016',
                        dictName: '纪委常委'
                    },
                    {
                        code: '1017',
                        dictName: '纪委委员'
                    },
                    {
                        code: '1018',
                        dictName: '纪委候补委员'
                    },
                    {
                        code: '1019',
                        dictName: '党小组长'
                    },
                    {
                        code: '1020',
                        dictName: '纪检组长'
                    },
                    {
                        code: '1021',
                        dictName: '工委书记'
                    },
                    {
                        code: '1022',
                        dictName: '工委副书记'
                    },
                    {
                        code: '1023',
                        dictName: '工委委员'
                    }
                ]
            },
            //任职方式依赖
            servingList() {
                return this.$store.state.ServingWay
            },
            //任职状态依赖
            servingStatusList() {
                return this.$store.state.ServingStatus
            },
            //系统用户依赖
            sysUerList() {
                return this.$store.state.sysUerList
            },
            //性别选择依赖
            sexList() {
                return [{name: "男", code: "1"}, {name: "女", code: "0"}]
            },
            //婚姻状况依赖
            marryList() {
                return [{name: "已婚", code: "1"}, {name: "未婚", code: "0"}]
            },
            //受教育程度依赖
            educationList() {
                return this.$store.state.educationList
            },
            //与户主关系依赖
            RelationshipList() {
                return this.$store.state.RelationshipList
            },
            //走访类型依赖
            visitDependentList() {
                return [{name: "贫困户", code: "1"}, {name: "贫困地区", code: "2"}]
            },
            //走访对象依赖（根据走访类型变化改变）

            partyName() {
                return this.PartyMemberList.find(item => (item.id == this.form.partyId)).name
            },
            postName() {
                return this.postList.find(item => (item.code == this.form.post)).dictName
            },
            appointmentWayName() {
                return this.servingList.find(item => (item.code == this.form.appointmentWay)).dictName
            },
            statusName() {
                return this.servingStatusList.find(item => (item.code == this.form.status)).dictName
            },
        },
        props: {
            form: {
                type: Object,
                default: {}
            },
            modelP: {
                type: Array,
                default: []
            },
            fileType: {
                type: String,
                default: ''
            },
            threeAttendee: {
                type: Object,
                default: {}
            },
            summary: {
                type: Object,
                default: ''
            },
            isthreemeeting: {
                type: Boolean,
                default: false
            },
            styleType: {
                type: String,
                default: 'three'
            },
            DontUseSubmit: {
                type: Boolean,
                default: null
            },
            formType: {
                type: String,
                default: ''
            },
        },
        methods: {
            goBackListPage() {
                if (this.styleType == 'one' || this.styleType == 'two') {
                    this.$emit('hiddenModal')
                }
                else {
                    this.$router.back()
                }
            },
            //保存表单
            saveForm() {
                let formData=JSON.parse(JSON.stringify(this.form))
                this.$emit('save',formData )
            },
            //保存
            goSave() {
                console.log("this.summary:" + this.summary)
                //主讲人插入参会人
                let formData=JSON.parse(JSON.stringify(this.form))
                let summaryData=JSON.parse(JSON.stringify(this.summary))
                this.$emit('save', formData, summaryData)
            },
            placeOfFile() {

                let formData=JSON.parse(JSON.stringify(this.form))
                formData.status = '1005005'
                let summaryData=JSON.parse(JSON.stringify(this.summary))
                this.$emit('save', formData, summaryData)
            },
            //确认开会
            goSureMeeting() {
                let formData=JSON.parse(JSON.stringify(this.form))
                formData.status = '1005004'
                this.$emit('save', formData, null)
            },
            //取消会议
            goCancelMeeting() {
                let formData=JSON.parse(JSON.stringify(this.form))
                formData.status = '1005003'
                this.$emit('save', formData, null)
            },
            goSure() {
                //提交会议
                let formData=JSON.parse(JSON.stringify(this.form))
                formData.status = '1005002'
                this.$emit('save', formData)
            },
            //通知后确认取消会议
            makeCancelSureEnter() {
                this.threeAttendee.isAttend = '4'
                this.$emit('cencel', this.threeAttendee)
            },
            //上传附件相关方法
            //删除
            handleRemove(file) {
                this.$http.deleteFileById(file.id).then(res => {
                    console.log("删除附件成功：", res)
                })
            },
            //下载
            handlePreview(file) {
                // let url=file.
                window.open(this.$fileServer + "/download/" + file.id);
                //console.log(file.id);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定删除 ${ file.name }？`);
            },
            //附件list改变
            handleChange(file, fileList) {
                if (this.summary.businessId == null) {
                    this.summary.businessId = fileList.length > 0 ? fileList[fileList.length - 1].response != null ? fileList[fileList.length - 1].response.businessId : null : null;
                    this.fileBusinessId.businessId = this.summary.businessId;
                }
            },
            //附件通用组件list改变
            handleFromChange(file, fileList) {
                console.log("handleFromChange--fileType:" + this.fileType)
                if (this.fileType === 'appendix') {
                    this.handleAppendixChange(file, fileList)
                } else if (this.fileType === 'businessId') {
                    this.handleBusinessIdChange(file, fileList)
                }

            },
            //fileType=businessId
            handleBusinessIdChange(file, fileList) {
                if (this.form.businessId == null) {
                    this.form.businessId = fileList.length > 0 ? fileList[fileList.length - 1].response != null ? fileList[fileList.length - 1].response.businessId : null : null;
                    this.fileBusinessId.businessId = this.form.businessId;
                }
            },
            //fileType=appendix
            handleAppendixChange(file, fileList) {
                if (this.form.appendix == null) {
                    this.form.appendix = fileList.length > 0 ? fileList[fileList.length - 1].response != null ? fileList[fileList.length - 1].response.businessId : null : null;
                    this.fileBusinessId.businessId = this.form.appendix;
                }
            },
            getFileList() {
                if (this.fileType === "appendix") {
                    if (this.form.appendix) {
                        this.$http.findFileBybusinessIdList(this.form.appendix).then(res => {
                            this.fileList = res
                        })

                    } else {
                        this.fileList = null;
                    }
                } else if (this.fileType === "businessId") {
                    if (this.form.businessId) {
                        this.$http.findFileBybusinessIdList(this.form.businessId).then(res => {
                            this.fileList = res
                        })

                    } else {
                        this.fileList = null;
                    }
                }
            },
            idCardAna() {
                this.birthday = this.form.idNumber.substring(6, 10) + "-" + this.form.idNumber.substring(10, 12) + "-" + this.form.idNumber.substring(12, 14);
//                console.log(this.birthday);
                this.form.birthday = this.birthday;
//                console.log(this.form.birthday);
                this.$forceUpdate()
            }
        }
    }
</script>
<style lang="less">
    .searchlabel-container {
        width: 100%;
        height: 100%;
        overflow: auto;
        label {
            background-color: #ffffff !important;
        }
        .content-box {
            width: 100%;
            height: 100%;
            // display: flex;
            // align-items: center;
            // justify-content: space-between;
            // flex-direction: column;
            .top-container {
                width: 100%;
                flex: 1;
            }
            .formbox {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex-wrap: wrap;
                .formitem {
                    width: 30%;
                    margin-left: 2%;
                }
                .AllLine {
                    width: 90%;
                    margin-left: 2%;
                    min-height: 90px;
                    .el-form-item__content {
                        height: 100%;
                        .el-textarea__inner {
                            min-height: 100px !important;
                        }
                    }
                }
            }
            .innerForm {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex-wrap: wrap;
                .formitem {
                    width: 80%;
                    margin: 0px auto;
                }
                .AllLine {
                    width: 90%;
                    margin-left: 2%;
                    min-height: 80px;
                    .el-form-item__content {
                        height: 100%;
                        .el-textarea__inner {
                            min-height: 100px !important;
                        }
                    }
                }
            }
            .twoslide {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex-wrap: wrap;
                .formitem {
                    width: 45%;
                }
                .AllLine {
                    width: 90%;
                    margin-left: 2%;
                    min-height: 80px;
                    .el-form-item__content {
                        height: 100%;
                        .el-textarea__inner {
                            min-height: 100px !important;
                        }
                    }
                }
            }
            .finishedBox {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                width: 100%;
                .finishedForm {
                    width: 100%;
                }
            }
            .buttonarea {
                width: 100%;
                height: 80px!important;
                padding: 30px 20px;
                button {
                    float: right;
                }
                button:nth-child(1) {
                    margin-left: 10px;
                }
            }
        }
    }
</style>

