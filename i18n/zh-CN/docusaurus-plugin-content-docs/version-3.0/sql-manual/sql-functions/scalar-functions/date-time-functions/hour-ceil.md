---
{
  "title": "HOUR_CEIL",
  "language": "zh-CN"
}
---

<!-- 
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
-->

## 描述

将日期转化为指定的时间间隔周期的最近向上取整时刻。

## 语法

```sql
HOUR_CEIL(<datetime>)
HOUR_CEIL(<datetime>, <origin>)
HOUR_CEIL(<datetime>, <period>)
HOUR_CEIL(<datetime>, <period>, <origin>)
```

## 参数

| 参数 | 说明 |
| -- | -- |
| `<datetime>` | 合法的日期表达式 |
| `<period>` | 指定每个周期有多少小时组成|
| `<origin>` | 开始的时间起点，如果不填，默认是 0001-01-01T00:00:00 |

## 返回值

返回指定的时间间隔周期的最近向上取整时刻。

## 举例

```
mysql> select hour_ceil("2023-07-13 22:28:18", 5);
+------------------------------------------------------------+
| hour_ceil(cast('2023-07-13 22:28:18' as DATETIMEV2(0)), 5) |
+------------------------------------------------------------+
| 2023-07-14 02:00:00                                        |
+------------------------------------------------------------+
1 row in set (0.03 sec)
```