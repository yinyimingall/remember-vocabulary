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
          <td class="date-box" v-for="el in item">{{el}}</td>
        </tr>
      </table>

    </div>
  </div>
</template>
<script>
export default {
  name: "calendar",
  data() {
    return {
      weeks: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]
    };
  },
  computed: {
    dates(){
      return [
        ['12131222222sdgdgdfsfddfsgfdgchxfhfdghghgfdhfg2222222222222222222222',2,3,4,5,6,7],
        [8,9,10,11,12,13,14]
      ]
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
  word-break:break-all;
}
</style>

