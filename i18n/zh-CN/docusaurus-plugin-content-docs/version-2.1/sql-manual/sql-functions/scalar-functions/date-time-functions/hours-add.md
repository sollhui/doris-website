---
{
    "title": "HOURS_ADD",
    "language": "zh-CN"
}
---

## 描述

返回一个新的日期时间值，该值是在输入的日期时间上增加指定的小时数。

## 语法

```sql
HOURS_ADD(<date>, <hours>)
```

## 参数

| 参数 | 说明 |
| ---- | ---- |
| `<date>` | 输入的日期时间值，类型为 DATETIME 或 DATE |
| `<hours>` | 要增加的小时数，类型为 INT |

## 返回值

返回类型为 DATETIME，返回以输入日期时间为基准，增加指定小时数后的时间值。

## 举例

```sql
SELECT HOURS_ADD('2020-02-02 02:02:02', 1);
```

```text
+------------------------------------------------------------+
| hours_add(cast('2020-02-02 02:02:02' as DATETIMEV2(0)), 1) |
+------------------------------------------------------------+
| 2020-02-02 03:02:02                                        |
+------------------------------------------------------------+
```
