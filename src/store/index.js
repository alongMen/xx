import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //会议类型
    typesMeeting:window.localStorage.getItem('typesMeeting')||'',
    //组织树
    organizationTree:window.localStorage.getItem('organizationTree')||'',
    //会议状态
    statusMeeting:window.localStorage.getItem('statusMeeting')||'',
    //主讲人身份
    speakerIdentity:window.localStorage.getItem('speakerIdentity')||'',
    //党员列表
    PartyMemberList:window.localStorage.getItem('PartyMemberList')||'',
    //党组织类型
    organTypeList:window.localStorage.getItem('organTypeList')||'',
    //人员类别
    PersonnelCategory:window.localStorage.getItem('PersonnelCategory')||'',
    //任职方式
    ServingWay:window.localStorage.getItem('ServingWay')||'',
    //任职状态
    ServingStatus:window.localStorage.getItem('ServingStatus')||'',
    //用户列表
    sysUerList:window.localStorage.getItem('sysUerList')||'',
    //受教育程度
    educationList:window.localStorage.getItem('educationList')||'',
    //与户主关系列表
    RelationshipList:window.localStorage.getItem('RelationshipList')||'',
    //贫困村列表
    PoorValageList:window.localStorage.getItem('PoorValageList')||'',
    //贫困户列表
    PooPersonList:window.localStorage.getItem('PooPersonList')||'',

  },
  mutations: {
    setTypesMeeting(state,data){
      state.typesMeeting = data
      window.localStorage.setItem("typesMeeting", JSON.stringify(data));
    },
    setorganizationTree(state,data){
      state.organizationTree = data
      window.localStorage.setItem("organizationTree", JSON.stringify(data));
    },
    setStatusMeeting(state,data){
      state.statusMeeting = data
      window.localStorage.setItem("statusMeeting", JSON.stringify(data));
    },
    setSpeakerIdentity(state,data){
      state.speakerIdentity = data
      window.localStorage.setItem("speakerIdentity", JSON.stringify(data));
    },
    setPartyMemberList(state,data){
      state.PartyMemberList = data
      window.localStorage.setItem("PartyMemberList", JSON.stringify(data));
    },
    setOrganTypeList(state,data){
      state.organTypeList = data
      window.localStorage.setItem("organTypeList", JSON.stringify(data));
    },
    setPersonnelCategory(state,data){
      state.PersonnelCategory = data
      window.localStorage.setItem("PersonnelCategory", JSON.stringify(data));
    },
    setServingWay(state,data){
      state.ServingWay = data
      window.localStorage.setItem("ServingWay", JSON.stringify(data));
    },
    setServingStatus(state,data){
      state.ServingStatus = data
      window.localStorage.setItem("ServingStatus", JSON.stringify(data));
    },
    setSysUerList(state,data){
      state.sysUerList = data
      window.localStorage.setItem("sysUerList", JSON.stringify(data));
    },
    setEducationList(state,data){
      state.educationList = data
      window.localStorage.setItem("educationList", JSON.stringify(data));
    },
    setRelationshipList(state,data){
      state.RelationshipList = data
      window.localStorage.setItem("RelationshipList", JSON.stringify(data));
    },
    setPoorValageList(state,data){
      state.PoorValageList = data
      window.localStorage.setItem("PoorValageList", JSON.stringify(data));
    },
    setPooPersonList(state,data){
      state.PooPersonList = data
      window.localStorage.setItem("PooPersonList", JSON.stringify(data));
    }
  },
  actions: {
  },
  modules: {
  }
})
