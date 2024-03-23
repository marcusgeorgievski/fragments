# Confirm that posting a fragment Content-Type that includes a charset (e.g., text/plain; charset=utf-8) works, and is returned as the fragment's type when doing a GET

POST http://localhost:8080/v1/fragments
# Type with charset included
Content-Type: text/plain; charset=utf-8
[BasicAuth]
user1@email.com: password1
`This is a fragment!`


HTTP/1.1 201
[Asserts]
jsonpath "$.status" == "ok"
# charset removed from type
jsonpath "$.fragment.type" == "text/plain" 

header "Location" matches "^http:\/\/localhost:8080\/v1\/fragments\/[A-Za-z0-9_-]+$"
jsonpath "$.fragment.id" matches "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
jsonpath "$.fragment.ownerId" matches "^[0-9a-fA-F]+$"
jsonpath "$.fragment.created" isString 
jsonpath "$.fragment.updated" isString
jsonpath "$.fragment.size" == 19
