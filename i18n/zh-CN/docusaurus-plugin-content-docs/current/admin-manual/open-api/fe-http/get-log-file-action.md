---
{
    "title": "Get FE log file",
    "language": "zh-CN"
}
---

## Request

`HEAD /api/get_log_file`

`GET /api/get_log_file`

## Description

用户可以通过该 HTTP 接口获取 FE 的日志文件。

其中 HEAD 请求用于获取指定日志类型的日志文件列表。GET 请求用于下载指定的日志文件。
    
## Path parameters

无

## Query parameters

* `type`

    指定日志类型，支持如下类型：
    
    * `fe.audit.log`：FE 审计日志

* `file`

    指定的文件名。

## Request body

无

## Response

* `HEAD`

    ```
    HTTP/1.1 200 OK
    file_infos: {"fe.audit.log":24759,"fe.audit.log.20190528.1":132934}
    content-type: text/html
    connection: keep-alive
    ```
    
    返回的 header 中罗列出了当前所有指定类型的日志文件，以及每个文件的大小。
    
* `GET`

    以文本形式下载指定日志文件
    
## Examples

1. 获取对应类型的日志文件列表

    ```
    HEAD /api/get_log_file?type=fe.audit.log
    
    Response:
    
    HTTP/1.1 200 OK
    file_infos: {"fe.audit.log":24759,"fe.audit.log.20190528.1":132934}
    content-type: text/html
    connection: keep-alive
    ```
    
    在返回的 header 中，`file_infos` 字段以 json 格式展示文件列表以及对应文件大小（单位字节）
    
2. 下载日志文件
    
    ```
    GET /api/get_log_file?type=fe.audit.log&file=fe.audit.log.20190528.1
    
    Response:
    
    < HTTP/1.1 200
    < Vary: Origin
    < Vary: Access-Control-Request-Method
    < Vary: Access-Control-Request-Headers
    < Content-Disposition: attachment;fileName=fe.audit.log
    < Content-Type: application/octet-stream;charset=UTF-8
    < Transfer-Encoding: chunked
    
    ... File Content ...
    ```
