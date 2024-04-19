'use strict'

module.exports.up = function (db) {
  let users = [
    {
        "name": "John Doe",
        "zipcode": "12345",
        "lat": 40.7128,
        "long": -74.0060,
        "email": "john.doe@example.com",
        "phone": "123-456-7890",
        "mobile": "987-654-3210",
        "password": "$2b$10$HLcQ3UNYsPNkwHrrKJTHOuYLMbXe.3AYfkY71l3kqUZz9NR6jlB7O"
    },
    {
        "name": "Alice Smith",
        "zipcode": "54321",
        "lat": 34.0522,
        "long": -118.2437,
        "email": "alice.smith@example.com",
        "phone": "456-789-0123",
        "mobile": "876-543-2109",
        "password": "$2b$10$HLcQ3UNYsPNkwHrrKJTHOuYLMbXe.3AYfkY71l3kqUZz9NR6jlB7O"
    },
    {
        "name": "Michael Johnson",
        "zipcode": "67890",
        "lat": 51.5074,
        "long": -0.1278,
        "email": "michael.johnson@example.com",
        "phone": "789-012-3456",
        "mobile": "765-432-1098",
        "password": "$2b$10$HLcQ3UNYsPNkwHrrKJTHOuYLMbXe.3AYfkY71l3kqUZz9NR6jlB7O"
    },
    {
        "name": "Emily Wilson",
        "zipcode": "13579",
        "lat": 37.7749,
        "long": -122.4194,
        "email": "emily.wilson@example.com",
        "phone": "890-123-4567",
        "mobile": "654-321-0987",
        "password": "$2b$10$HLcQ3UNYsPNkwHrrKJTHOuYLMbXe.3AYfkY71l3kqUZz9NR6jlB7O"
    },
    {
        "name": "David Brown",
        "zipcode": "24680",
        "lat": 35.6895,
        "long": 139.6917,
        "email": "david.brown@example.com",
        "phone": "901-234-5678",
        "mobile": "543-210-9876",
        "password": "$2b$10$HLcQ3UNYsPNkwHrrKJTHOuYLMbXe.3AYfkY71l3kqUZz9NR6jlB7O"
    },
    {
        "name": "Sophia Lee",
        "zipcode": "98765",
        "lat": 22.3193,
        "long": 114.1694,
        "email": "sophia.lee@example.com",
        "phone": "012-345-6789",
        "mobile": "432-109-8765",
        "password": "$2b$10$HLcQ3UNYsPNkwHrrKJTHOuYLMbXe.3AYfkY71l3kqUZz9NR6jlB7O"
    },
    {
        "name": "Daniel Martinez",
        "zipcode": "56789",
        "lat": 41.8781,
        "long": -87.6298,
        "email": "daniel.martinez@example.com",
        "phone": "123-456-7890",
        "mobile": "321-098-7654",
        "password": "$2b$10$HLcQ3UNYsPNkwHrrKJTHOuYLMbXe.3AYfkY71l3kqUZz9NR6jlB7O"
    },
    {
        "name": "Olivia Taylor",
        "zipcode": "11223",
        "lat": 51.5074,
        "long": -0.1278,
        "email": "olivia.taylor@example.com",
        "phone": "234-567-8901",
        "mobile": "210-987-6543",
        "password": "$2b$10$HLcQ3UNYsPNkwHrrKJTHOuYLMbXe.3AYfkY71l3kqUZz9NR6jlB7O"
    },
    {
        "name": "James Rodriguez",
        "zipcode": "33445",
        "lat": 34.0522,
        "long": -118.2437,
        "email": "james.rodriguez@example.com",
        "phone": "345-678-9012",
        "mobile": "109-876-5432",
        "password": "$2b$10$HLcQ3UNYsPNkwHrrKJTHOuYLMbXe.3AYfkY71l3kqUZz9NR6jlB7O"
    },
    {
        "name": "Emma Garcia",
        "zipcode": "55443",
        "lat": 37.7749,
        "long": -122.4194,
        "email": "emma.garcia@example.com",
        "phone": "456-789-0123",
        "mobile": "987-654-3210",
        "password": "$2b$10$HLcQ3UNYsPNkwHrrKJTHOuYLMbXe.3AYfkY71l3kqUZz9NR6jlB7O"
    }
]

console.log(db)
  db.collection('users').insertMany(users)
  next()
}

module.exports.down = function (db) {
  next()
}
