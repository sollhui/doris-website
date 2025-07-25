---
{
    "title": "DATEDIFF",
    "language": "zh-CN"
}
---

## datediff
## 描述
## 语法

`DATETIME DATEDIFF(DATETIME expr1, DATETIME expr2)`


计算expr1 - expr2，结果精确到天。

expr1 和 expr2 参数是合法的日期或日期/时间表达式。

注释：只有值的日期部分参与计算。

## 举例

```
mysql> select datediff(CAST('2007-12-31 23:59:59' AS DATETIME), CAST('2007-12-30' AS DATETIME));
+-----------------------------------------------------------------------------------+
| datediff(CAST('2007-12-31 23:59:59' AS DATETIME), CAST('2007-12-30' AS DATETIME)) |
+-----------------------------------------------------------------------------------+
|                                                                                 1 |
+-----------------------------------------------------------------------------------+

mysql> select datediff(CAST('2010-11-30 23:59:59' AS DATETIME), CAST('2010-12-31' AS DATETIME));
+-----------------------------------------------------------------------------------+
| datediff(CAST('2010-11-30 23:59:59' AS DATETIME), CAST('2010-12-31' AS DATETIME)) |
+-----------------------------------------------------------------------------------+
|                                                                               -31 |
+-----------------------------------------------------------------------------------+
```
### keywords
DATEDIFF
