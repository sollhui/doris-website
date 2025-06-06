---
{
    "title": "COSINE_DISTANCE",
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

## cosine_distance

### description
#### Syntax

```sql
DOUBLE cosine_distance(ARRAY<T> array1, ARRAY<T> array2)
```

Calculates the cosine distance between two vectors (the values of the vectors are the coordinates).
Return NULL if input array is NULL or any element of array is NULL.

#### Notice
* nested type of input array support: TINYINT, SMALLINT, INT, BIGINT, LARGEINT, FLOAT, DOUBLE
* input array1 and array2 should have the same element size

### example

```
sql> SELECT cosine_distance([1, 2], [2, 3]);
+-------------------------------------------+
| cosine_distance(ARRAY(1, 2), ARRAY(2, 3)) |
+-------------------------------------------+
|                     0.0077221232863322609 |
+-------------------------------------------+
```

### keywords
	COSINE_DISTANCE,DISTANCE,COSINE,ARRAY
