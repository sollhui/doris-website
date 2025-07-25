---
{
"title": "INET_NTOA",
"language": "en"
}
---

## INET_NTOA



INET_NTOA



### description

#### Syntax

`VARCHAR INET_NTOA(BIGINT ipv4_num)`

Takes a Int16, Int32, Int64 number. Interprets it as an IPv4 address in big endian. Returns a string containing the corresponding IPv4 address in the format A.B.C.d (dot-separated numbers in decimal form).
### notice

`will return NULL if the input parameter is negative or larger than 4294967295(num value of '255.255.255.255')`

### example

```
mysql> select inet_ntoa(3232235521);
+-----------------------------+
| IPV4_NUM_TO_STRING(3232235521) |
+-----------------------------+
| 192.168.0.1                 |
+-----------------------------+
1 row in set (0.01 sec)

mysql> select num,inet_ntoa(num) from ipv4_bi;
+------------+------------------------+
| num        | IPV4_NUM_TO_STRING(`num`) |
+------------+------------------------+
|         -1 | NULL                   |
|          0 | 0.0.0.0                |
| 2130706433 | 127.0.0.1              |
| 4294967295 | 255.255.255.255        |
| 4294967296 | NULL                   |
+------------+------------------------+
7 rows in set (0.01 sec)
```

### keywords

INET_NTOA, IP