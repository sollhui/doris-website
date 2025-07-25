---
{
    "title": "RPAD",
    "language": "zh-CN"
}
---

## 描述

用于在原始字符串的右侧填充指定的字符，直到达到指定的长度。

## 语法

```sql
RPAD ( <str> , <len> , <pad>)
```

## 参数

| 参数      | 说明                         |
|---------|----------------------------|
| `<str>` | 需要被填充的字符串                  |
| `<len>` | 最终结果字符串的总长度，指的是字符长度而不是字节长度 |
| `<pad>` | 用于填充的字符串                   |

:::tip
`<len>` 参数最大值为 10000，如果超过这个次数将会报错，可通过会话变量调整限制：
```sql
set repeat_max_num = 20000
```
:::

## 返回值

返回填充后的字符串。特殊情况：

- 任意参数中有一个为 NULL，则返回 NULL
- 如果`<pad>`为空且`<len>`大于`<str>`的长度，则返回值为空串。
- 如果`<len>`小于`<str>`的长度，则返回`<str>`截取至`<len>`的字符串。
- 如果`<len>`小于 0，则返回值为 NULL

## 举例

```sql
SELECT rpad('hello', 1, '');
```

```text
+----------------------+
| rpad('hello', 1, '') |
+----------------------+
| h                    |
+----------------------+
```

```sql
SELECT rpad('hello', 10, 'world');
```

```text
+----------------------------+
| rpad('hello', 10, 'world') |
+----------------------------+
| helloworld                 |
+----------------------------+
```

```sql
SELECT rpad('hello', 10, '');
```

```text
+-----------------------+
| rpad('hello', 10, '') |
+-----------------------+
|                       |
+-----------------------+
```
