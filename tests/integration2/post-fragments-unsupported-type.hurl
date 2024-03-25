# Confirm that posting an unsupported Content-Type produces a 415 error

POST http://localhost:8080/v1/fragments
# Unsupported type
Content-Type: bad/type 
[BasicAuth]
user1@email.com: password1
`This is a fragment!`

HTTP/1.1 415
[Asserts]
jsonpath "$.status" == "error"
jsonpath "$.error.code" == 415
jsonpath "$.error.message" == "Unsupported type: bad/type"
