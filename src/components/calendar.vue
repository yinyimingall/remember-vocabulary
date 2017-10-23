<template>
  <div id="calendar">
    <div class="calendar-head">

    </div>
     <div class="calendar-week">
      <div class="week-title" v-for="item in weeks">
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
      weeks: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDay()
    };
  },
  computed: {
    dates() {
      return this.get(2017, 10);
    }
  },
  methods: {
    transform(arr) {
      console.log(arr);
      let target = [];
      for (let j = 0; j < 42; j++) {
        if (j % 7 == 0) {
          target.push(arr.slice(j, j+7));
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
.calendar-head {
  width: 100%;
  height: 60px;
  /* border: 1px solid #454; */
}

.calendar-week {
  width: 100%;
  height: 60px;
  /* border: 1px solid #454; */

  display: flex;
  justify-content: space-around;
}
.week-title {
  align-self: center;
}

.calendar-date {
  width: 100%;
  height: 340px;
  /* border: 1px solid #454; */
  display: flex;
  flex-wrap: wrap;
}
.calendar-table {
  margin-top: 15px;
  margin: 0;
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #777;
}
.date-tr {
  height: 60px;
}
.date-box {
  border: 1px solid #777;
  width: 14.28571428571429%;
  word-break: break-all;
}
</style>

