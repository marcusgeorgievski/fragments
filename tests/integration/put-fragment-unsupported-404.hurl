# Create fragment

POST http://localhost:8080/v1/fragments
Content-Type: text/plain
[BasicAuth]
user1@email.com: password1
`Fragment v1`

HTTP/1.1 201
[Asserts]
jsonpath "$.status" == "ok"
jsonpath "$.fragment.type" == "text/plain"
jsonpath "$.fragment.updated" isString
jsonpath "$.fragment.size" == 11
[Captures]
url: header "Location"
id: jsonpath "$.fragment.id"

# Update fragment with different type

PUT {{url}}
Content-Type: text/html
[BasicAuth]
user1@email.com: password1
`Fragment v2`

HTTP/1.1 400
[Asserts]
jsonpath "$.status" == "error"
# jsonpath "$.error.code" == 400
# jsonpath "$.error.message" == "New type does not match existing type: text/csv"

# Update fragment with different type

PUT {{url}}-43hj2g
Content-Type: text/plain
[BasicAuth]
user1@email.com: password1
`Fragment v2`

HTTP/1.1 404
[Asserts]
jsonpath "$.status" == "error"
# jsonpath "$.error.code" == 404
# jsonpath "$.error.message" includes "Error fetching fragment byId for ownerID"
