```toml
name = 'Get-User-By-Id'
method = 'GET'
url = 'http://localhost:3000/auth/1'
sortWeight = 5000000
id = '5f746e6d-7add-4a5b-869f-141b403a55fd'

[[headers]]
key = 'Content-Type'
value = 'application/json'

[body]
type = 'JSON'
raw = '''
{
  "email": "test2@test.com",
  "password": "123456"
}'''
```
