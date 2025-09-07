# Dealer Evaluation Microservices Project

<div align="center">
  <img width="85%" alt="Project Screenshot" src="https://github.com/user-attachments/assets/a0a2e3ef-002a-4dd1-aa80-1be3f874a637" />
</div>

This project demonstrates a microservices architecture with three services:
1. Product Details Service (Python/Flask)
2. Dealer Pricing Service (Node.js/Express)
3. Frontend Service (HTML/CSS/JS)

## Project Structure
```
dealer-evaluation-microservices/
├── product-details-service/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
├── dealer-pricing-service/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── frontend-service/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── Dockerfile
├── docker-compose.yml
└── kubernetes/
    ├── product-details-deployment.yaml
    ├── dealer-pricing-deployment.yaml
    └── frontend-deployment.yaml
```

## Services

### 1. Product Details Service (Python)
- **Port**: 5000
- **Endpoints**: 
  - GET `/products` - Returns list of products
- **Technology**: Flask, Python

### 2. Dealer Pricing Service (Node.js)
- **Port**: 3000
- **Endpoints**: 
  - GET `/dealers/:productId` - Returns dealers for a product
  - GET `/price/:dealerId/:productId` - Returns price for dealer-product combination
- **Technology**: Express.js, Node.js

### 3. Frontend Service
- **Port**: 8080
- **Description**: Web interface for dealer evaluation
- **Technology**: HTML, CSS, JavaScript, Nginx

## Setup Instructions

### Prerequisites
- Docker Desktop installed
- Git installed
- kubectl installed (for Kubernetes deployment)

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd dealer-evaluation-microservices
```

### Step 2: Build and Run with Docker Compose
```bash
docker-compose up --build
```

### Step 3: Access Application
- Frontend: http://localhost:8080
- Product Service: http://localhost:5000/products
- Dealer Service: http://localhost:3000/dealers/1

## Kubernetes Deployment

### Deploy to Kubernetes
```bash
kubectl apply -f kubernetes/
```

### Check Deployments
```bash
kubectl get deployments
kubectl get services
kubectl get pods
```

## API Documentation

### Product Details Service
```
GET /products
Response: [
  {"id": 1, "name": "Laptop", "category": "Electronics"},
  {"id": 2, "name": "Phone", "category": "Electronics"}
]
```

### Dealer Pricing Service
```
GET /dealers/:productId
Response: [
  {"id": 1, "name": "Tech Store", "location": "New York"},
  {"id": 2, "name": "Electronics Hub", "location": "California"}
]

GET /price/:dealerId/:productId
Response: {
  "dealerId": 1,
  "productId": 1,
  "price": 899.99,
  "dealerName": "Tech Store"
}
```

## Testing the Application

1. Open the frontend at http://localhost:8080
2. Select a product from the dropdown
3. View the dealers that supply the product
4. Select a dealer to view pricing
5. Select "All Dealers" to view all dealer prices for the product

