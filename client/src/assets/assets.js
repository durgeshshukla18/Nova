// // // import BinIcon from "./BinIcon.svg";
// import user from "../public/images/user.png";

// export const assets = {
//     // BinIcon: {BinIcon},
//     user: {user}
// }

export const BinIcon = "./images/delete.png";


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
            {'role': 'user', 'content': 'Hello!', 'timestamp': '2023-10-01T12:00:00Z'},
            {'role': 'assistant', 'content': 'Hi there!How can I assist you today?', 'timestamp': '2023-10-01T12:00:00Z'}
        ],
        'createdAt': '2023-10-01T12:00:00Z',
        'updatedAt': '2023-10-01T12:00:00Z'
    },  
    {
        'id': 'chat2', 
        'userId': '1', 
        'messages': [
            {'role': 'user', 'content': 'What is AI?', 'timestamp': '2023-10-02T15:30:00Z'},
            {'role': 'assistant', 'content': 'Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems.', 'timestamp': '2025-08-02T15:30:00Z'}
        ],
        'createdAt': '2023-10-02T15:30:00Z',
        'updatedAt': '2023-10-02T15:30:00Z'
    },
    {
        'id': 'chat3', 
        'userId': '1',
        'messages': [
            {'role': 'user', 'content': 'Explain quantum computing in simple terms.', 'timestamp': '2023-10-03T09:45:00Z'},
            {'role': 'assistant', 'content': 'Quantum computing is a type of computing that uses quantum bits (qubits) instead of regular bits. Qubits can be in multiple states at once, allowing quantum computers to process complex problems much faster than traditional computers.', 'timestamp': '2023-10-03T09:45:00Z'}
        ],
        'createdAt': '2023-10-03T09:45:00Z',
        'updatedAt': '2023-10-03T09:45:00Z'
    }
]