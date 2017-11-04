<template>
  <div>
    <div>
      <span>计划名称</span>
      <input type="text" v-model="planName">
    </div>
    <div class="row">
      <span>开始日期：</span>
      <date-picker :date="startTime" :option="option" :limit="limit"></date-picker>
    </div>
    <div>
      <span>list名称：</span>
      <input type="text" v-model="listName">
    </div>
    <div>
      <span>每天list数：</span>
      <input type="text" v-model="numPerDay">
    </div>
    <div>
      <span>list总数</span>
      <input type="text" v-model="totalList">
    </div>
    <!-- <div class="gaoji">
      <div>
        <input type="text">
      </div>
      <button>+</button>
    </div> -->
    <textarea name="" v-model="remarks" id="" cols="30" rows="10" placeholder="填写备注..."></textarea>
    <button @click="newPlan">新增</button>
  </div>  
</template>

<script>
import moment from "moment";
import datePicker from "@/components/vue-datepicker-es6";
export default {
  name: "new",
  data() {
    return {
      planName: "plan",
      listName: "L",
      numPerDay: "2",
      totalList: "6",
      remarks: '',

      startTime: {
        time: ""
      },
      endtime: {
        time: ""
      },

      option: {
        type: "day",
        week: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        month: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        format: "YYYY-MM-DD",
        placeholder: "when?",
        inputStyle: {
          display: "inline-block",
          padding: "6px",
          "line-height": "22px",
          "font-size": "16px",
          border: "2px solid #fff",
          "box-shadow": "0 1px 3px 0 rgba(0, 0, 0, 0.2)",
          "border-radius": "2px",
          color: "#5F5F5F"
        },
        color: {
          header: "#89c997",
          headerText: "#fff"
        },
        buttons: {
          ok: "Ok",
          cancel: "Cancel"
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      },
      timeoption: {
        type: "min",
        week: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        month: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        format: "YYYY-MM-DD HH:mm"
      },
      multiOption: {
        type: "multi-day",
        week: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        month: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        format: "YYYY-MM-DD HH:mm"
      },
      limit: [
        {
          type: "weekday",
          available: [0, 1, 2, 3, 4, 5, 6]
        },
        {
          type: "fromto",
          from: new moment().subtract(1, "d").format("YYYY-MM-DD")
          // to: "2099-01-01"
        }
      ]
    };
  },
  created(){
    
  },
  methods: {
    newPlan() {
      let obj = {
        planName: this.planName,
        listName: this.listName,
        numPerDay: parseInt(this.numPerDay),
        totalList: parseInt(this.totalList),
        startTime: this.startTime.time,
        remarks: this.remarks
      }
      localStorage.setItem("vocabularyPlan", JSON.stringify(obj));
    }
  },
  components: {
    datePicker
  }
};
</script>
<style>

</style>
