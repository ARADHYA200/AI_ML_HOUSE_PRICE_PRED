import requests
print(requests.post('http://127.0.0.1:5000/predict', json={'area':1500,'bedrooms':3,'bathrooms':2}).text)
