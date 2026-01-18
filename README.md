# Let’s Shyp – Hyperlocal Booking & Courier Allocation Backend

## Overview

This project implements a deterministic, concurrency-safe backend for a hyperlocal logistics platform similar to Let’s Shyp.
It models the complete booking lifecycle from order creation to courier assignment, movement simulation, and delivery with strict state management.

The focus is on **correctness, predictability, data safety, and real-world edge cases** rather than infrastructure.

---

## Tech Stack

* Node.js + NestJS
* TypeScript
* In-memory persistence (Maps)
* No external services

---

## Architecture

```
Orders → Assignment Engine → Couriers → Movement Simulator → State Machine
                    ↑
                 Mutex Lock
```

### Key Components

| Component        | Purpose                                          |
| ---------------- | ------------------------------------------------ |
| OrdersModule     | Order lifecycle & state machine                  |
| CouriersModule   | Courier pool management                          |
| AssignmentModule | Nearest-courier auto-assignment with constraints |
| MovementModule   | Simulated courier movement & order progression   |
| LocksModule      | Concurrency safety (mutex)                       |

---

## Order Lifecycle

```
CREATED → ASSIGNED → PICKED_UP → IN_TRANSIT → DELIVERED
                    ↘
                   CANCELLED
```

Invalid transitions are rejected with `400 Bad Request`.

---

## API Documentation

### Seed Couriers

```
POST /couriers/seed
```

---

### List Couriers

```
GET /couriers
```

---

### Create Order

```
POST /orders
{
  "pickup": { "x": 2, "y": 2 },
  "drop": { "x": 10, "y": 10 },
  "type": "EXPRESS | NORMAL",
  "packageDetails": "Laptop"
}
```

**Response**

```
{
  "orderId": "...",
  "state": "ASSIGNED | CREATED",
  "courierId": "... | null",
  "reason": "No courier within express distance | null"
}
```

---

### Progress Order

```
POST /orders/{id}/progress
```

---

### Cancel Order

```
POST /orders/{id}/cancel
```

---

### Simulate Courier Movement

```
POST /simulate/move
```

Moves couriers step-by-step and progresses order state only when logical conditions are met.

---

## Assignment Logic

* Manhattan distance
* Nearest available courier
* Express distance threshold
* Atomic assignment using mutex

---

## Concurrency Safety

A mutex lock ensures:

* No courier is assigned to multiple orders
* Deterministic behavior under concurrent requests

---

## How To Run

```
npm install
npm run start:dev
```

---

## Testing Checklist

1. Seed couriers
2. Create order → auto-assign
3. Progress order
4. Simulate movement
5. Cancel order
6. Express distance rejection
7. Concurrent order creation

---

## Design Decisions

* In-memory store for simplicity
* Strict state machine for correctness
* Deterministic assignment for predictability
* Movement simulator for realistic progression
* Mutex for concurrency safety

---

## Summary

This backend demonstrates:

* API design
* Business logic modeling
* Data consistency
* Edge-case handling
* Concurrency control

It mirrors real-world hyperlocal logistics challenges in a simplified but production-grade manner.

