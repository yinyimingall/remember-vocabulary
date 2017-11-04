<template>
  <div id="calendar">
    <div class="calendar-head">
      <h1 class="head-month-title">{{monthTypeZh[month]}}</h1>
      <h2 class="head-year-title">{{year}}</h2>
      <div class="head-tool-container">
      <div class="head-tool">
        <button class="btn btn-circle" @click="prev"><</button>
        <button class="btn btn-circle" @click="next">></button>
      </div>
      </div>
    </div>
     <div class="calendar-week">
      <div class="week-title" v-for="item in weekTypeZh">
        {{item}}
      </div>
    </div>
    <div class="calendar-date">
      <table class="calendar-table">
        <tr class="date-tr" v-for="(item, index) in dates">
          <td class="date-box" v-for="el in item" :class="{'date-active': el.date == date && month+1 == el.month, 'not-this-month': el.month != month+1}">
            <h1 class="day-title">{{el.day}}</h1>  
            <p class="plan-item" :class="{'new-plan': e.status == 1, 'set-gray': el.month!= month+1}" v-for="(e, i) in el.plan">{{e.content}}</p>
          </td>
        </tr>
      </table>
    </div>
    <div class="remarks">
      <h1>备注：</h1>
      <h2 v-html="planName"></h2>
      <p v-html="remarks"></p>
      <p></p>
    </div>
  </div>
</template>
<script>
// 输入 年，月 返回当月日期
import moment from "moment";
import bus from "@/eventBus";
export default {
  name: "calendar",
  data() {
    return {
      weekTypeZh: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
      weekTypeEn: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      monthTypeEn: [
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
      monthTypeZh: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ],
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDay(),
      date: new moment().format("YYYY-MM-DD"),
      dates: [],
      planData: null,
      remarks: "",
      planName: ""
    };
  },
  created() {
    this.init();
    bus.$on("goto-today", () => {
      this.init();
    });
  },
  methods: {
    init() {
      let d = new Date();
      this.dates = [];
      this.planData = null;
      this.year = d.getFullYear();
      this.month = d.getMonth();
      this.day = d.getDay();
      this.date = new moment().format("YYYY-MM-DD");
      let planDataOrigin = JSON.parse(localStorage.getItem("vocabularyPlan"));
      if (planDataOrigin) {
        this.remarks = planDataOrigin.remarks.replace(/\n/g, "<br>");
        this.planName = planDataOrigin.planName
        this.planData = this.generatePlan(
          planDataOrigin.numPerDay,
          planDataOrigin.totalList,
          planDataOrigin.startTime,
          planDataOrigin.listName
        );
      }

      console.log(this.planData);
      this.dates = this.generateDate(
        new Date().getFullYear(),
        new Date().getMonth() + 1
      );
      console.log(this.dates);
    },
    prev() {
      this.month -= 1;
      if (this.month == -1) {
        this.year -= 1;
        this.month = 11;
      }
      this.dates = this.generateDate(this.year, this.month + 1);
    },
    next() {
      this.month += 1;
      if (this.month == 12) {
        this.year += 1;
        this.month = 0;
      }
      this.dates = this.generateDate(this.year, this.month + 1);
    },
    transform(arr) {
      let target = [];
      for (let j = 0; j < 42; j++) {
        if (j % 7 == 0) {
          target.push(arr.slice(j, j + 7));
        }
      }
      // console.log(target);
      return target;
    },
    generateDate(year, month) {
      var target = [];
      if (!year || !month) {
        let today = new Date();
        year = today.getFullYear();
        month = today.getMonth() + 1;
      }
      var firstDayWeek = new Date(year, month - 1, 1).getDay(); // 本月第一天是星期几
      if (firstDayWeek === 0) firstDayWeek = 7;
      var lastDayOfPreMonth = new Date(year, month - 1, 0).getDate(); // 上个月最后一天是几号
      var preCount = firstDayWeek - 1; // 上个月有几天

      var lastDay = new Date(year, month, 0).getDate(); // 本月最后一天是几号

      for (let i = 1; i <= 42; i++) {
        let tempDate = i - preCount;
        let currentMonth = month;
        let currentDate = tempDate;
        let date = "";
        if (currentDate <= 0) {
          currentMonth -= 1;
          currentDate = lastDayOfPreMonth + tempDate;
        } else if (currentDate > lastDay) {
          currentMonth += 1;
          currentDate -= lastDay;
        }
        if (currentMonth == 0) currentMonth = 12;
        if (currentMonth == 13) currentMonth = 1;
        currentMonth = currentMonth < 10 ? "0" + currentMonth : currentMonth;
        currentDate = currentDate < 10 ? "0" + currentDate : currentDate;
        date = `${year}-${currentMonth}-${currentDate}`;

        if (this.planData) {
          target.push({
            date: date,
            month: currentMonth,
            day: currentDate,
            plan: this.planData[date] ? this.planData[date].list : []
          });
        } else {
          target.push({
            date: date,
            month: currentMonth,
            day: currentDate,
            plan: []
          });
        }
      }
      return this.transform(target);
    },
    generatePlan(numPer, total, startTime, listName) {
      let target = {};
      let ruleArr = [1, 2, 4, 8, 15, 30];
      let newItemDays = Math.ceil(total / numPer); // 出现全部新模块需要的天数
      // let lastDay = Math.ceil(total / numPer) + ruleArr[ruleArr.length - 1] - 1; // 最后一天距离第一天的天数
      let targetArr = [];
      for (let i = 0; i < newItemDays; i++) {
        let j = i * numPer + 1;
        let k = j + numPer - 1;
        if (i == newItemDays - 1) {
          k = total;
        }
        if (!targetArr[i]) {
          targetArr[i] = [];
          targetArr[i].push({
            content: listName + "" + j + "~" + listName + "" + k,
            status: 1,
            flag: "new"
          });
        } else {
          targetArr[i].splice(0, 0, {
            content: listName + "" + j + "~" + listName + "" + k,
            status: 1,
            flag: "new"
          });
        }
        ruleArr.forEach((el, index, array) => {
          if (!targetArr[i + el - 1]) {
            targetArr[i + el - 1] = [];
          }
          targetArr[i + el - 1].push({
            content: listName + "" + j + "~" + listName + "" + k,
            status: 2,
            flag: "old"
          });
        });
      }
      // console.log(targetArr);
      for (let i = 0; i < targetArr.length; i++) {
        if (targetArr[i] !== undefined) {
          let m = moment(startTime);
          m = m.add(i, "d").format("YYYY-MM-DD");
          // console.log("加" + i + "天后，为 " + m);
          target[m] = {
            list: targetArr[i]
          };
        }
      }
      target.start = startTime;
      target.end = moment(startTime)
        .add(targetArr.length - 1, "d")
        .format("YYYY-MM-DD");
      target.duration = targetArr.length;
      // console.log("targetArr", targetArr.length);
      // console.log(target);
      return target;
    }
  }
};
</script>
<style>
/* 通用 */
* {
  box-sizing: border-box;
}
.btn {
  border: none;
  outline: 0;
}
.btn:hover {
  cursor: pointer;
}

/* 日历头部 */
.calendar-head {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
}
.head-month-title {
  /* margin: 0; */
  width: 180px;
  font-size: 36px;
  color: #adabaa;
  align-self: center;
  margin: 0;
}
.head-year-title {
  margin: 0;
  color: #adabaa;
  align-self: center;
}
.head-tool-container {
  width: 180px;
  display: flex;
  justify-content: flex-end;
}
.head-tool {
  display: flex;
  justify-content: space-between;
  width: 90px;
}
.btn-circle {
  border-radius: 50%;
  width: 36px;
  height: 36px;
  color: #fff;
  background-color: #ffcc74;
  align-self: flex-end;
}

/* 星期标题 */
.calendar-week {
  width: 100%;
  height: 60px;
  /* border: 1px solid #454; */
  color: #adabaa;
  font-weight: 600;
  display: flex;
  justify-content: space-around;
}
.week-title {
  align-self: center;
  width: 14.28571428571429%;
  text-align: center;
}

/* 日历主体 */
.calendar-date {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.calendar-table {
  margin-top: 15px;
  margin: 0;
  border-collapse: collapse;
  width: 100%;
  /* border: 1px solid #777; */
}
.date-tr {
  height: 120px;
}
.day-title {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
  padding: 5px 20px;
}
.plan-item {
  border: 1px solid;
  width: 90%;
  padding: 5px 8px;
  margin: 0 auto 10px;
  border-radius: 6px;
}
.date-box {
  border: 1px solid rgba(211, 208, 207, 0.562);
  width: 14.28571428571429%;
  word-break: break-all;
  vertical-align: top;
}
.date-active {
  background-color: #fffbec;
}
.not-this-month {
  background-color: rgba(228, 228, 228, 0.49);
}

/* 一个计划块的样式*/
.plan-item {
  background-color: #fcf2f4;
  border: 1px solid #fae9ed;
  color: #e67e96;
}
.new-plan {
  background-color: #f3f8ec;
  border: 1px solid #e4f0d3;
  color: #8bbf43;
}
.set-gray {
  background-color: #eee;
  color: #ddd;
  border: 1px solid #ddd;
}
.remarks {
  min-height: 20px;
  margin: 15px 0 120px;
}
.remarks h1 {
  font-size: 32px;
  color: #d3f0c2;
  line-height: 28px;
}
</style>

