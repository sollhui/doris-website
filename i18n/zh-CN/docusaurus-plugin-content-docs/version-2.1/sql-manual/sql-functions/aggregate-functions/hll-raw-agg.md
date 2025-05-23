---
{
    "title": "HLL_RAW_AGG",
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

HLL_RAW_AGG 函数是一种聚合函数，主要用于将多个 HyperLogLog 数据结构合并成一个

## 别名

- HLL_UNION

## 语法

```sql
HLL_RAW_AGG(<hll>)
```

## 参数

| 参数 | 说明 |
| -- | -- |
| `<hll>` | 需要被计算HyperLogLog类型表达式 |

## 返回值

返回被聚合后的 HLL 类型。

## 举例
```sql
select HLL_CARDINALITY(HLL_RAW_AGG(uv_set)) from test_uv;
```

```text
+------------------------------------------+
|   HLL_CARDINALITY(HLL_RAW_AGG(`uv_set`)) |
+------------------------------------------+
|                                    17721 |
+------------------------------------------+
```