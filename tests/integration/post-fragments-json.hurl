
POST http://localhost:8080/v1/fragments
Content-Type: application/json
[BasicAuth]
user1@email.com: password1
```
{
  "type": "json type",
  "content": "Hello, world!"
}
```

HTTP/1.1 201
[Asserts]
jsonpath "$.status" == "ok"
[Captures]
url: header "Location"

GET {{url}}
[BasicAuth]
user1@email.com: password1

HTTP/1.1 200
Content-Type: application/json
Content-Length: 56
[Asserts]
body == ```
{
  "type": "json type",
  "content": "Hello, world!"
}
```
