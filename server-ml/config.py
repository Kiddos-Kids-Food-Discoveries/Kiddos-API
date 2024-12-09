import json

def load_api_key(file_path='private/key.json'):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data.get('api_key')
