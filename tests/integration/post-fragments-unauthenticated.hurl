# Confirm that posting a fragment when not authenticated produces a 401 error

POST http://localhost:8080/v1/fragments
Content-Type: text/plain; charset=utf-8
[BasicAuth]
# Incorrect credentials
user@bademail.com: password1
`This is a fragment!`


HTTP/1.1 401 # Unauthorized
[Asserts]
jsonpath "$.status" == "error"
jsonpath "$.error.code" == 401
jsonpath "$.error.message" == "Unauthorized"
