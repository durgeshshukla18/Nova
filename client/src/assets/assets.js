


export const dummyUserData = {
    'id': '1',
    'name': 'John Doe',
    'email': 'john@example.com',
    'password': 'hashed_password',
    'credits': 100,
    'createdAt': '2023-10-01T12:00:00Z',
    'updatedAt': '2023-10-01T12:00:00Z'
}


export const dummyUserChats = [
    {
        'id': 'chat1', 
        'userId': '1', 
        'messages': [
            {'role': 'user', 'content': 'Hello!'},
            {'role': 'assistant', 'content': 'Hi there!How can I assist you today?'}
        ],
        'createdAt': '2023-10-01T12:00:00Z',
        'updatedAt': '2023-10-01T12:00:00Z'
    },  
    {
        'id': 'chat2', 
        'userId': '1', 
        'messages': [
            {'role': 'user', 'content': 'What is AI?'},
            {'role': 'assistant', 'content': 'Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems.'}
        ],
        'createdAt': '2023-10-02T15:30:00Z',
        'updatedAt': '2023-10-02T15:30:00Z'
    }
]