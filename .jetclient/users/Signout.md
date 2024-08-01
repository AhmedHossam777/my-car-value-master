```toml
name = 'Signout'
method = 'POST'
url = 'http://localhost:3000/auth/signout'
sortWeight = 4000000
id = 'c8400c0a-1bcb-44df-b6d2-0b62c805c782'

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
