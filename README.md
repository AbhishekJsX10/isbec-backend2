# ISBEC Backend API Documentation

## Overview
Backend API for ISBEC website handling mail services, contact forms, and demo scheduling.

## Base URL
```
http://localhost:8080/api/mail
```

## Features
- Email notifications
- Contact form submissions
- Demo scheduling system with availability checking
- Booking management
- General mail service

## Available Routes

### 1. Contact Form API
#### Submit Contact Form
```http
POST /contact
Content-Type: application/json

{
    "name": "Abhishek",
    "email": "avishekchaturvedi0@gmail.com",
    "phone": "7504929200",
    "message": "I would like to know more about ISBEC's services"
}
```
**Success Response:**
```json
{
    "message": "Contact form submitted successfully",
    "teamMailId": "string",
    "userMailId": "string"
}
```

### 2. Demo Booking System

#### Check Slot Availability
```http
GET /demo/check-slot?date=2024-12-25&time=14:30
```
**Success Response:**
```json
{
    "available": true,
    "message": "Slot is available"
}
```
**Error Response:**
```json
{
    "available": false,
    "error": "Slot is already booked"
}
```

#### Get Available Slots for a Date
```http
GET /demo/slots?date=2024-12-25
```
**Success Response:**
```json
{
    "date": "2024-12-25",
    "workingHours": {
        "start": 9,
        "end": 18
    },
    "availableSlots": [
        {
            "time": "09:00",
            "datetime": "2024-12-25T09:00:00.000Z"
        },
        {
            "time": "10:00",
            "datetime": "2024-12-25T10:00:00.000Z"
        }
    ]
}
```

#### Book a Demo
```http
POST /demo
Content-Type: application/json

{
    "name": "Abhishek",
    "email": "avishekchaturvedi0@gmail.com",
    "phone": "7504929200",
    "company": "ISBEC",
    "requirements": "Need a complete product demo",
    "preferredDate": "2024-12-25",
    "preferredTime": "14:30"
}
```
**Success Response:**
```json
{
    "message": "Demo scheduled successfully",
    "appointmentDateTime": "Wednesday, December 25, 2024 at 02:30 PM",
    "demoId": "507f1f77bcf86cd799439011"
}
```

#### View All Bookings
```http
GET /demo/bookings
```
**Success Response:**
```json
{
    "bookings": [
        {
            "id": "507f1f77bcf86cd799439011",
            "name": "Abhishek",
            "email": "avishekchaturvedi0@gmail.com",
            "phone": "7504929200",
            "company": "ISBEC",
            "requirements": "Need a complete product demo",
            "status": "scheduled",
            "appointmentDateTime": "Wednesday, December 25, 2024 at 02:30 PM",
            "createdAt": "2024-12-24T12:30:00.000Z",
            "updatedAt": "2024-12-24T12:30:00.000Z"
        }
    ]
}
```

#### Update Booking Status
```http
PATCH /demo/booking/507f1f77bcf86cd799439011/status
Content-Type: application/json

{
    "status": "completed"
}
```
**Success Response:**
```json
{
    "message": "Booking status updated successfully",
    "booking": {
        "id": "507f1f77bcf86cd799439011",
        "status": "completed",
        "appointmentDateTime": "Wednesday, December 25, 2024 at 02:30 PM"
    }
}
```

### 3. General Mail API
#### Send Email
```http
POST /mail
Content-Type: application/json

{
    "to": "avishekchaturvedi0@gmail.com",
    "subject": "Welcome to ISBEC",
    "text": "Thank you for your interest in ISBEC"
}
```
**Success Response:**
```json
{
    "message": "Email sent successfully",
    "messageId": "string"
}
```

## Demo Booking Rules
1. **Working Hours:**
   - Available between 9:00 AM and 6:00 PM (IST)
   - Monday through Sunday

2. **Slot Duration:**
   - Each slot is 1 hour long
   - Slots start at the beginning of each hour (e.g., 9:00, 10:00)

3. **Booking Restrictions:**
   - Cannot book slots in the past
   - Cannot book already booked slots
   - Must book within working hours

4. **Status Types:**
   - scheduled: Initial state of booking
   - completed: Demo has been conducted
   - cancelled: Demo was cancelled
   - rescheduled: Demo was rescheduled

## Error Handling
All endpoints return appropriate error messages with status codes:

### 400 Bad Request
```json
{
    "error": "Detailed error message"
}
```

### 500 Internal Server Error
```json
{
    "error": "Failed to process request",
    "details": "Detailed error message"
}
```

## Environment Setup
1. Create a `.env` file with:
```env
EMAIL=isbecabhishek@gmail.com
PASSWORD=your-app-specific-password
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node server.js
```

## Testing Guide

### 1. Check Slot Availability
**Request:**
```bash
curl "http://localhost:8080/api/mail/demo/check-slot?date=2024-12-25&time=14:30"
```
**Response if Available:**
```json
{
    "available": true,
    "message": "Slot is available"
}
```
**Response if Not Available:**
```json
{
    "available": false,
    "error": "Slot is already booked"
}
```
**Response if Outside Working Hours:**
```json
{
    "available": false,
    "error": "Booking is only available between 9:00 and 18:00"
}
```

### 2. Get Available Slots
**Request:**
```bash
curl "http://localhost:8080/api/mail/demo/slots?date=2024-12-25"
```
**Response:**
```json
{
    "date": "2024-12-25",
    "workingHours": {
        "start": 9,
        "end": 18
    },
    "availableSlots": [
        {
            "time": "09:00",
            "datetime": "2024-12-25T09:00:00.000Z"
        },
        {
            "time": "10:00",
            "datetime": "2024-12-25T10:00:00.000Z"
        },
        {
            "time": "14:30",
            "datetime": "2024-12-25T14:30:00.000Z"
        }
    ]
}
```

### 3. Book a Demo
**Request:**
```bash
curl -X POST http://localhost:8080/api/mail/demo \
-H "Content-Type: application/json" \
-d '{
    "name": "Abhishek",
    "email": "avishekchaturvedi0@gmail.com",
    "phone": "7504929200",
    "company": "ISBEC",
    "requirements": "Need a complete product demo",
    "preferredDate": "2024-12-25",
    "preferredTime": "14:30"
}'
```
**Success Response:**
```json
{
    "message": "Demo scheduled successfully",
    "appointmentDateTime": "Wednesday, December 25, 2024 at 02:30 PM",
    "demoId": "507f1f77bcf86cd799439011"
}
```
**Error Response (Slot Already Booked):**
```json
{
    "error": "This time slot is already booked",
    "suggestion": "Please check available slots using the /demo/slots endpoint"
}
```
**Error Response (Invalid Time):**
```json
{
    "error": "Booking is only available between 9:00 and 18:00"
}
```

### 4. View All Bookings
**Request:**
```bash
curl http://localhost:8080/api/mail/demo/bookings
```
**Response:**
```json
{
    "bookings": [
        {
            "id": "507f1f77bcf86cd799439011",
            "name": "Abhishek",
            "email": "avishekchaturvedi0@gmail.com",
            "phone": "7504929200",
            "company": "ISBEC",
            "requirements": "Need a complete product demo",
            "status": "scheduled",
            "appointmentDateTime": "Wednesday, December 25, 2024 at 02:30 PM",
            "createdAt": "2024-12-24T12:30:00.000Z",
            "updatedAt": "2024-12-24T12:30:00.000Z"
        }
    ]
}
```

### 5. Update Booking Status
**Request:**
```bash
curl -X PATCH http://localhost:8080/api/mail/demo/booking/507f1f77bcf86cd799439011/status \
-H "Content-Type: application/json" \
-d '{
    "status": "completed"
}'
```
**Success Response:**
```json
{
    "message": "Booking status updated successfully",
    "booking": {
        "id": "507f1f77bcf86cd799439011",
        "status": "completed",
        "appointmentDateTime": "Wednesday, December 25, 2024 at 02:30 PM"
    }
}
```
**Error Response (Invalid Status):**
```json
{
    "error": "Invalid status"
}
```
**Error Response (Booking Not Found):**
```json
{
    "error": "Booking not found"
}
```

### 6. Submit Contact Form
**Request:**
```bash
curl -X POST http://localhost:8080/api/mail/contact \
-H "Content-Type: application/json" \
-d '{
    "name": "Abhishek",
    "email": "avishekchaturvedi0@gmail.com",
    "phone": "7504929200",
    "message": "I would like to know more about ISBEC services"
}'
```
**Success Response:**
```json
{
    "message": "Contact form submitted successfully",
    "teamMailId": "<random-id-1@email.com>",
    "userMailId": "<random-id-2@email.com>"
}
```
**Error Response:**
```json
{
    "error": "Failed to submit contact form",
    "details": "Error details here"
}
```

### 7. Send General Mail
**Request:**
```bash
curl -X POST http://localhost:8080/api/mail/mail \
-H "Content-Type: application/json" \
-d '{
    "to": "avishekchaturvedi0@gmail.com",
    "subject": "Welcome to ISBEC",
    "text": "Thank you for your interest in ISBEC"
}'
```
**Success Response:**
```json
{
    "message": "Email sent successfully",
    "messageId": "<random-id@email.com>"
}
```
**Error Response:**
```json
{
    "error": "Failed to send email",
    "details": "Error details here"
}
```

## Dependencies
- express
- nodemailer
- mongoose
- cors
- helmet
- compression
- morgan
- dotenv

## Security Features
- CORS protection
- Rate limiting
- HTTP security headers (Helmet)
- Request logging
- Input validation
- Error handling

## Best Practices
1. Always check slot availability before booking
2. Use ISO date format (YYYY-MM-DD)
3. Use 24-hour time format (HH:mm)
4. Handle all API responses appropriately
5. Implement proper error handling in your frontend

## Support
For any queries, contact:
- Email: isbecabhishek@gmail.com
- Phone: 7504929200
