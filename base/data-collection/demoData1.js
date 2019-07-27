const dataArray = [
  {
    "data":{
      "gid":"sh601009",				/*股票编号*/
      "increPer": "9.91",     /*涨跌百分比*/
      "increase": "43.99",    /*涨跌额*/
      "name":"南京银行",				/*股票名称*/
      "todayStartPri":"8.26",				/*今日开盘价*/
      "yestodEndPri":"8.26",				/*昨日收盘价*/
      "nowPri":"8.37",				/*当前价格*/
      "todayMax":"8.55",				/*今日最高价*/
      "todayMin":"8.25",				/*今日最低价*/
      "competitivePri":"8.37",			/*竞买价*/
      "reservePri":"8.38",				/*竞卖价*/
      "traNumber":"34501453",				/*成交量*/
      "traAmount":"290889560",			/*成交金额*/
      "buyOne":"10870",				/*买一*/
      "buyOnePri":"8.37",				/*买一报价*/
      "buyTwo":"177241",				/*买二*/
      "buyTwoPri":"8.36",				/*买二报价*/
      "buyThree":"92600",				/*买三*/
      "buyThreePri":"8.35",				/*买三报价*/
      "buyFour":"87200",				/*买四*/
      "buyFourPri":"8.34",				/*买四报价*/
      "buyFive":"113700",				/*买五*/
      "buyFivePri":"8.42",				/*买五报价*/
      "sellOne":"47556",				/*卖一*/
      "sellOnePri":"8.38",				/*卖一报价*/
      "sellTwo":"103057",				/*卖二*/
      "sellTwoPri":"8.39",				/*卖二报价*/
      "sellThree":"186689",				/*卖三*/
      "sellThreePri":"8.40",				/*卖三报价*/
      "sellFour":"49000",				/*卖四*/
      "sellFourPri":"8.41",				/*卖四报价*/
      "sellFive":"214535",				/*卖五*/
      "sellFivePri":"15.21",				/*卖五报价*/
      "date":"2012-12-11",				/*日期*/
      "time":"15:03:06",				/*时间*/
    },
    "dapandata":{/*大盘数据可通过字段type单独查询*/
    },
    "gopicture":{

      "minurl":"http://image.sinajs.cn/newchart/min/n/sh601009.gif",/*分时K线图*/
      "dayurl":"http://image.sinajs.cn/newchart/daily/n/sh601009.gif",/*日K线图*/
      "weekurl":"http://image.sinajs.cn/newchart/weekly/n/sh601009.gif",/*周K线图*/
      "monthurl":"http://image.sinajs.cn/newchart/monthly/n/sh601009.gif"/*月K线图*/
    }
  }];

const xData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const yData = [0, 1, 2, 3, 4, 3, 2, 1, 0, 0];

// 初始化数据

// 周期
const PERIOD = 10;
const HAF_PERIOD = Number.parseInt(PERIOD / 2);

