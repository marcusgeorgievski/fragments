# Health Check Test
GET http://localhost:8080/error

# We should get back an HTTP 1.1 404 response
HTTP/1.1 404

# Extra checks to perform against the response
[Asserts]
# We expect to get back a JSON response with { "status":"error","error":{"code":404,"message":"cannot find the requested resource" } }
jsonpath "$.status" == "error"
jsonpath "$.error.code" == 404
jsonpath "$.error.message" == "cannot find the requested resource"
