<template>
    <div class="chartbox">
        <div class="chartbox-top">
            热力图
        </div>
        <div class="chartbox-bottom">
            <div class="chartbox-bottom_left">
                <div class="chartbox-bottom_item-one">
                    <div class="chartbox-bottom_item-one_title">
                        分析
                    </div>
                    <div class="chartbox-bottom_item-one_chartbox">
                        图表
                    </div>
                </div>
                <div class="chartbox-bottom_item-two">
                    
                </div>
                <div class="chartbox-bottom_item-three">
                    <div class="chartbox-bottom_item-three_title">
                        商户活跃趋势
                    </div>
                    <div class="chartbox-bottom_item-three_chartbox">
                        图表
                    </div>
                </div>
            </div>
            <div class="chartbox-bottom_center">
                <div class="chartbox-bottom_center-positionboxone">
                    <div class="chartbox-bottom_center-positionboxone_item">
                        <div class="chartbox-bottom_center-positionboxone_item-title">xx</div>
                        <div class="chartbox-bottom_center-positionboxone_item-content">
                            <div class="chartbox-bottom_center-positionboxone_item-content_left">3690</div>
                            <div class="chartbox-bottom_center-positionboxone_item-content_right">
                                <span>相比上升</span>
                                <span>40.36%</span>
                            </div>
                        </div>
                    </div>
                    <div class="chartbox-bottom_center-positionboxone_item centeritem"></div>
                    <div class="chartbox-bottom_center-positionboxone_item"></div>
                </div>
                <div class="chartbox-bottom_center-positionboxtwo">
                    <div class="chartbox-bottom_center-positionboxtwo_title">
                        活跃数据
                    </div>
                    <div class="chartbox-bottom_center-positionboxtwo_chartbox">
                        <div class="chartbox-bottom_center-positionboxtwo_chartbox-item">
                            <div class="chartbox-bottom_center-positionboxtwo_chartbox-item_radio">
                                <span>xx</span>
                                <span>
                                33.6
                                </span>
                                <span>(万)</span>
                            </div>
                            <div class="chartbox-bottom_center-positionboxtwo_chartbox-item_desc">
                                <span>相比上升</span>
                                <span>40.36%</span>
                            </div>
                        </div>
                        <div class="chartbox-bottom_center-positionboxtwo_chartbox-item">
                            <div class="chartbox-bottom_center-positionboxtwo_chartbox-item_radio">
                                <span>xx</span>
                                <span>
                                33.6
                                </span>
                                <span>(万)</span>
                            </div>
                            <div class="chartbox-bottom_center-positionboxtwo_chartbox-item_desc">
                                <span>相比上升</span>
                                <span>40.36%</span>
                            </div>
                        </div>
                        <div class="chartbox-bottom_center-positionboxtwo_chartbox-item">
                            <div class="chartbox-bottom_center-positionboxtwo_chartbox-item_radio">
                                <span>xx</span>
                                <span>
                                33.6
                                </span>
                                <span>(万)</span>
                            </div>
                            <div class="chartbox-bottom_center-positionboxtwo_chartbox-item_desc">
                                <span>相比上升</span>
                                <span>40.36%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chartbox-bottom_right">
                <div class="chartbox-bottom_item-one">
                    <div class="chartbox-bottom_item-one_title">
                        xx
                    </div>
                    <div class="chartbox-bottom_item-one_chartbox">
                        图表
                    </div>
                </div>
                <div class="chartbox-bottom_item-two">
                    
                </div>
                <div class="chartbox-bottom_item-three">
                    <div class="chartbox-bottom_item-three_title">
                        xxx
                    </div>
                    <div class="chartbox-bottom_item-three_chartbox">
                        图表
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>

<style lang="less" scoped>
.chartbox{
    width: 100%;
    height: 100%;
    background-color: #00043A;
    display: flex;
    flex-direction: column;
    &-top{
        width: 70%;
        margin:  0 auto;
        height: 60px;
        background:  url('../assets/head_pic_titel.png') no-repeat center center;
        background-size: cover;
        font-size: 0.3rem;
        text-align: center;
        color: rgba(14, 239, 255, 1);
        font-weight: bold;
        line-height: 60px;
    }
    &-bottom{
        width: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        padding: 0 15px;
        .chartbox-bottom_item-one{
                flex: 6.5;
                background: url('../assets/left_1bj.png') no-repeat center center;
                background-size:100% 100%; 
                display: flex;
                flex-direction: column;
                &_title{
                    width: 100%;
                    height: 50px;
                    text-align: center;
                    line-height: 40px;
                    color: rgba(51, 242, 255, 1);
                    font-size: 0.2rem;
                    font-weight: bold;              
                }
                &_chartbox{
                    display: flex;
                    flex: 1;
                    align-items: center;
                    justify-content: center;
                    color: #ffffff;
                }
            }
            .chartbox-bottom_item-two{
                flex: 5;
                background: url('../assets/left_2di.png') no-repeat center center;
                background-size:100% 100%;
                margin-top: 20px;
                margin-bottom: 15px;
            }
            .chartbox-bottom_item-three{
                flex: 4.5;
                background: url('../assets/left_3di.png') no-repeat center center;
                background-size:100% 100%; 
                display: flex;
                flex-direction: column;
                &_title{
                    width: 100%;
                    height: 50px;
                    text-align: center;
                    line-height: 40px;
                    color: rgba(51, 242, 255, 1);
                    font-size: 0.2rem;
                    font-weight: bold                
                }
                &_chartbox{
                    display: flex;
                    flex: 1;
                    align-items: center;
                    justify-content: center;
                    color: #ffffff;
                }
            }
        &_left{
            width: 21%;
            height: 100%;
            display: flex;
            flex-direction: column;
            
        }
        &_right{
            width: 21%;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        &_center{
            flex: 1;
            height: 100%;
            position: relative;
            &-positionboxone{
                width: 100%;
                height: 102px;
                position: absolute;
                left: 0;
                top: 23px;
                padding: 0 2%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                &_item{
                    width: 32%;
                    height: 100%;
                    background: url('../assets/head_3di.png') no-repeat center center;
                    background-size:100% 100%;
                    display: flex;
                    flex-direction: column;
                    &-title{
                        width:100%;
                        padding: 0 20px;
                        line-height: 35px;
                        color: rgba(20, 237, 252, 1);
                        font-size: 0.195rem;
                        letter-spacing: 1.5px;
                    }
                    &-content{
                        width: 100%;
                        flex: 1;
                        padding: 0 20px;
                        display: flex;
                        margin-top: 5px;
                        &_left{
                            width: 50%;
                            height:70%;
                            border:1px solid rgba(62, 159, 255, 1);
                            font-size: 0.3rem;
                            color: rgba(253, 192, 6, 1);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-weight: bold;
                        }
                        &_right{
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            padding-left: 20px;
                            // align-items: center;
                            span:nth-child(1){
                                font-size: 0.16rem;
                                color:rgba(255, 255, 255, 1);
                            }
                            span:nth-child(2){
                                font-size: 0.24rem;
                                color:rgba(255, 0, 5, 1);
                                font-weight: bold;
                                background: url('../assets/icon_up.png') no-repeat right center;
                                background-size: 18% 70%;
                            }
                        }
                    }
                }
                .centeritem{
                    margin: 0 2%;
                }
            }
            &-positionboxtwo{
                width: 96%;
                height: 26.8%;
                position: absolute;
                left: 0;
                bottom: 0;
                margin: 0 2%;
                background: url('../assets/center_bj.png') no-repeat center center;
                background-size:100% 100%;
                display: flex;
                flex-direction: column;
                &_title{
                    width: 100%;
                    height: 50px;
                    text-align: center;
                    line-height: 40px;
                    color: rgba(51, 242, 255, 1);
                    font-size: 0.2rem;
                    font-weight: bold                
                }
                &_chartbox{
                    display: flex;
                    flex: 1;
                    align-items: center;
                    justify-content: center;
                    color: #ffffff;
                    padding: 0 35px;
                    &-item:nth-child(2){
                        margin: 0 20px;
                    }
                    &-item{
                        display: flex;
                        flex: 1;
                        height: 100%;
                        justify-content: center;
                        &_desc{
                            flex: 1;
                            height: 1.8rem;
                            display: flex;
                            padding-left: 15px;
                            flex-direction: column;
                            justify-content: center;
                            span:nth-child(1){
                                color: rgba(255, 255, 255, 1);
                                font-size: 0.2rem;
                            }
                            span:nth-child(2){
                                color: rgba(255, 0, 5, 1);
                                font-size: 0.28rem;
                            }
                        }
                        &_radio{
                            width: 1.7rem;
                            height: 1.7rem;
                            margin-top: 10px;
                            border:0.12rem solid rgba(20,237,252,1);
                            border-radius:50%;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            padding: 15px 0;
                            box-shadow: inset 1px 1px 10px 2px #11D2E7;
                            span:nth-child(1){
                                color: rgba(255, 255, 255, 1);
                                font-size: 0.19rem;
                            }
                            span:nth-child(2){
                                color: rgba(253, 192, 6, 1);
                                font-size: 0.38rem;
                                font-weight: bold;
                            }
                            span:nth-child(3){
                                color: rgba(253, 192, 6, 1);
                                font-size: 0.18rem;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
