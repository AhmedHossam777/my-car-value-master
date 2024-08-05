```toml
name = 'create-report'
method = 'POST'
url = 'http://localhost:3000/reports'
sortWeight = 1000000
id = '1baaf6f1-3f2c-4431-aa12-fa2b5890a43d'

[[headers]]
key = 'Content-Type'
value = 'application/json'

[body]
type = 'JSON'
raw = '''
{
  price: 10000,
  make: 'BMW',
  model: 'X6',
  year: 2007,
  mileage: 250000,
  lat: 0,
  lng : 0
}'''
```
