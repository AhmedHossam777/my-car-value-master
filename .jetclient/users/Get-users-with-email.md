```toml
name = 'Get-users-with-email'
method = 'GET'
url = 'http://localhost:3000/auth?email=ahmed@gmail.com'
sortWeight = 6000000
id = '69621dda-b748-4351-a695-5769fbe9f490'

[[queryParams]]
key = 'email'
value = 'ahmed@gmail.com'

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
