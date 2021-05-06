<template>
    <div class="tabal_container">
        <el-table
                :data="tableData"
                :border="true"
                row-key="id"
                @selection-change="handleSelectionChange"
                ref="multipleTable"
                :default-sort="{prop: 'date', order: 'descending'}"
                lazy
                :load="load"
                @row-dblclick="dbClick"
                @cell-click="previewImg"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                style="width: 100%">
            <template>
                <el-table-column
                        v-if="needMultiple"
                        type="selection"
                        align="center"
                />
                <el-table-column
                        label="序号"
                        type="index"
                        width="80"
                        align="center"
                />
                <el-table-column
                        show-overflow-tooltip
                        v-for="(item,index) in tableModel"
                        :key='index'
                        :prop="item.attribute"
                        :width="item.width?item.width:''"
                        :align="item.align?item.align:'center'"
                        :sortable='!item.dontSort'
                        :label="item.title">
                    <template scope="scope">
                        <span v-if="item.type === 'normal'||item.type==null">
                            {{scope.row[item.attribute]}}
                        </span>
                        <span v-if="item.type === 'isTop'">
                            <span>{{scope.row.isTop==true?'是':'否'}}</span>
                            <el-switch
                                    style="display: block"
                                    v-model="scope.row.isTop"
                                    @change="switchChange(scope.row)"
                            />

                        </span>
                        <span v-if="item.type === 'isFlag'">
                            <span v-if="!scope.row[item.attribute]">否</span>
                            <span v-else>是</span>
                        </span>
                        <div v-if="item.type === 'dict'">
                            <span v-for="(dictItem,index) in item.dictList" :key="index">
                                <span v-if="item.opKey&&dictItem[item.opKey]==scope.row[item.attribute]">{{dictItem[item.opName]}}</span>
                            </span>
                        </div>
                        <div v-if="item.type === 'data'">
                            <span v-for="(data, index) in item.dataList" :key="index">
                                <span v-if="data.key === scope.row[item.attribute]">{{data.value}}</span>
                            </span>
                        </div>
                        <div :class="item.type" v-if="item.type === 'img'">
                            <span v-if="scope.row[item.attribute]">
                                <!-- <img :src="scope.row[item.attribute]" width="30" height="30" alt="img" /> -->
                                <el-popover
                                        placement="right"
                                        title=""
                                        width="300"
                                        trigger="hover">
                                    <img :src="scope.row[item.attribute]"/>
                                    <img
                                            slot="reference"
                                            :src="scope.row[item.attribute]"
                                            :alt="scope.row[item.attribute]"
                                            style="max-height: 60px;max-width: 100px">
                                </el-popover>
                            </span>
                        </div>
                        <div v-if="item.type=='input'">
                            <span>
                                <el-input v-model='scope.row[item.attribute]' placeholder=""></el-input>
                            </span>
                        </div>
                        <div v-if="item.type=='Multiple'">
                            <span v-for="(multipleItem,multipleIndex) in scope.row[item.MultipleKey]"
                                  :key="multipleIndex">
                                {{multipleItem.name}}
                            </span>
                        </div>
                    </template>
                </el-table-column>
            </template>
            <el-table-column min-width="300" v-if="needOperationArea" label="操作" class="operationArea">
                <template scope="scope">
                    <el-button
                            v-if="needEdit"
                            @click="handleClick(scope.row,scope.$index)"
                            type="primary"
                            code="M1005"
                            size="small"
                            plain>
                        {{tableEditText}}
                    </el-button>
                    <el-button
                            v-if="needRemove"
                            @click="deleTClick(scope.row,scope.$index)"
                            code="M1006"
                            type="danger"
                            size="small">
                        {{tableDeletText}}
                    </el-button>
                    <el-button
                            v-if="needOperation"
                            @click="optionClick(scope.row)"
                            plain size="small">
                        <span> {{tableOperationText}}</span>
                    </el-button>
                    <el-button
                            v-if="needMoreOperation"
                            :key="index" v-for="(item,index) in getButtonExpands(scope.row)"
                            @click="functionCallBack(scope.row,item)"
                            :code="item.code"
                            :type="item.type" plain size="small">
                        <span>{{item.text}}</span>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                v-if='!needNotPagination'
                @size-change="handleSizeChange"
                background
                style="margin-top:10px;text-align:left;"
                @current-change="currentPage"
                :page-sizes="[5, 10, 20, 50]"
                :page-size='PSize'
                layout="sizes, prev, pager, next,total"
                :total="Tpage"
        />
    </div>
</template>
<script>
    export default {
        data() {
            return {
                multipleSelection: ''
            }
        },
        props: {
            //table表头模板
            tableModel: {
                type: Array
            },
            //table数据源
            tableData: {
                type: Array
            },
            //每页条数
            PSize: {
                type: Number
            },
            //总条数
            Tpage: {
                type: Number,
            },
            //是否显示删除按钮
            needRemove: {
                type: Boolean,
                default: () => true
            },
            //按钮
            needOperation: {
                type: Boolean,
                default: () => false
            },
            //是否显示编辑按钮
            needEdit: {
                type: Boolean,
                default: () => true
            },
            //编辑按钮显示文字
            tableEditText: {
                type: String,
                default: () => '编辑查看'
            },
            //删除按钮显示文字
            tableDeletText: {
                type: String,
                default: () => '删除'
            },
            tableOperationText: {
                type: String,
                default: () => '其他操作'
            },
            //是否需要操作区
            needOperationArea: {
                type: Boolean,
                default: true
            },
            //更多按钮
            needMoreOperation: {
                type: Boolean,
                default: false
            },
            //额外按钮组
            buttonExpands: {
                type: Array,
                default: () => []
            },
            //是否需要分页
            needNotPagination: {
                type: Boolean,
                default: false
            },
            //是否需要单选功能
            needMultiple: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            getButtonExpands(row) {
                let isAudit = row.isAudit;
                let l = this.buttonExpands.length;
                if (isAudit != null && l > 1) {
                    let b = [];
                    // 0预览 1管理 2撤回
                    b.push(this.buttonExpands[0]);
                    // 没撤回
                    if (isAudit !== "3") {
                        // 已审核
                        if (isAudit === "1") {
                            // 显示管理按钮
                            b.push(this.buttonExpands[1]);
                        }
                        // 已管理
                        if (isAudit === "2" || isAudit === "4") {
                            // 显示撤回按钮
                            b.push(this.buttonExpands[2]);
                        }
                    }
                    return b;
                }
                return this.buttonExpands;
            },
            //点击按钮组事件
            functionCallBack(row, item) {
                this.$emit('clickMoreBtnGroup', row, item)
            },
            switchChange(row) {
                this.$emit("editTop", row);
            },
            //操作按钮事件
            handleClick(row, index) {
                this.$emit("edit", row, index)
            },
            load(tree, treeNode, resolve) {
                this.$emit('loadChildMenu', tree, treeNode, resolve)
            },
            //删除按钮事件
            deleTClick(row, index) {
                this.$emit("delet", row, index)
            },
            currentPage(v) {
                this.$emit("changePage", v)
            },
            handleSelectionChangeOther(row) {
                this.selectRowList = row.map(item => ({
                    id: item.id,
                    isAudit: "1"
                }));
                this.$emit("handleSelectionChangeOther", this.selectRowList);
            },
            handleSelectionChange(val) {
                this.handleSelectionChangeOther(val);
                if (val.length > 1) {
                    this.$refs.multipleTable.clearSelection()
                    this.$refs.multipleTable.toggleRowSelection(val.pop())
                } else {
                    this.multipleSelection = val.pop()
                }
                this.$emit("choseWhich", this.multipleSelection)
            },
            optionClick(row) {
                this.$emit('clickBtnGroup', row)
            },
            //改变页码事件
            handleSizeChange(val) {
                this.$emit('handleSizeChange', val)
            },
            //单击单元格事件
            previewImg(row, column, cell, event) {
                this.$emit('clickCell', row[column.property])
            },
            //双击一行事件
            dbClick(row) {
                this.$emit('dblclick', row)
            }

        }
    }
</script>
<style lang="less">
    .tabal_container {
        width: 100%;
        height: 100%;

        .el-table {
            width: 100%;
            height: 100%;

            .el-table__header-wrapper {
                background-color: #2a58ad;

                .el-table__header {
                    background-color: #2a58ad;

                    .has-gutter {
                        background-color: #2a58ad;

                        tr {
                            background-color: #2a58ad;

                            th {
                                background-color: #2a58ad;
                                border-color: #2a58ad;
                                color: #ffffff;
                                font-size: 16px;
                                font-weight: normal;
                            }
                        }
                    }
                }
            }

            .el-table__body-wrapper {
                .el-table__body {
                    tbody {
                        .el-table__row:nth-child(even) {
                            background: #eef4ff;;
                        }

                        .el-table__row:nth-child(odd) {
                            background-color: #ffffff;
                        }

                        .el-table__row {
                            font-size: 14.5px;

                            .editBtn {
                                border: none;
                                background-color: inherit;
                                color: #666666;

                                i {
                                    font-size: 22px;
                                }
                            }

                            .editBtn:hover {
                                color: #2a58ad;;
                            }
                        }

                        .el-table__row:hover {
                            background-color: #eef4ff;
                        }
                    }
                }
            }
        }

        .el-pagination.is-background .el-pager li:not(.disabled).active {
            background-color: #2a58ad;
        }
    }
</style>
