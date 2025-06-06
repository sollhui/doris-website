---
{
    "title": "MICROSECOND_TIMESTAMP",
    "language": "en"
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

## Description
The  function converts a `DATETIME` value into a Unix timestamp (in microseconds) starting from `1970-01-01 00:00:00 UTC`.


## Syntax

```sql
MICROSECOND_TIMESTAMP(<datetime>)
```
## Parameters

| Parameter    | Description                                                         |
|--------------|---------------------------------------------------------------------|
| `<datetime>` | Required. The DATETIME value to be converted into a Unix timestamp. |

## Return Value

- Returns an integer representing the Unix timestamp (in microseconds) corresponding to the input datetime value.
- If `<datetime>` is NULL, the function returns NULL.
- If `<datetime>` is out of valid range, the function may return an error or unexpected value.

## Example

```sql
SELECT MICROSECOND_TIMESTAMP('2025-01-23 12:34:56.123456');
```

```text
+----------------------------------------------------------------------------+
| microsecond_timestamp(cast('2025-01-23 12:34:56.123456' as DATETIMEV2(6))) |
+----------------------------------------------------------------------------+
|                                                           1737606896123456 |
+----------------------------------------------------------------------------+
```