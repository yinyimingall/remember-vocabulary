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
          <td class="date-box" v-for="el in item">{{el.day}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
// 输入 年，月 返回当月日期
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
      dates: []
    };
  },
  created(){
    this.dates = this.get(this.year, this.month + 1)
  },
  methods: {
    prev(){
      this.month -= 1
      if(this.month == -1) {
        this.year -= 1
        this.month = 11
      }
      this.dates = this.get(this.year, this.month + 1)
    },
    next(){
      this.month += 1
      if(this.month == 12) {
        this.year += 1
        this.month = 0
      }
      this.dates = this.get(this.year, this.month + 1)
    },
    transform(arr) {
      console.log(arr);
      let target = [];
      for (let j = 0; j < 42; j++) {
        if (j % 7 == 0) {
          target.push(arr.slice(j, j + 7));
        }
      }
      console.log(target);
      return target;
    },
    get(year, month) {
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
        if (currentDate <= 0) {
          currentMonth -= 1;
          currentDate = lastDayOfPreMonth + tempDate;
        } else if (currentDate > lastDay) {
          currentMonth += 1;
          currentDate -= lastDay;
        }
        if (currentMonth == 0) currentMonth = 12;
        if (currentMonth == 13) currentMonth = 1;
        target.push({
          day: currentDate
        });
      }
      return this.transform(target);
    }
  }
};
</script>
<style>
/* 通用 */
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
  height: 60px;
}
.date-box {
  border: 1px solid #d3d0cf;
  width: 14.28571428571429%;
  word-break: break-all;
}
</style>

