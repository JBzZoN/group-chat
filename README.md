# AI Group Chat

A real-time group chat application built with React and Spring Boot. The application uses WebSockets with the STOMP protocol to provide instant message delivery and includes AI-powered chat assistance directly inside group conversations.

## Features

* Real-time group messaging using WebSockets and STOMP
* Multiple users connected simultaneously
* AI assistant integrated into chat rooms
* Ask questions to the AI without leaving the conversation
* Instant message broadcasting
* Responsive React frontend
* Spring Boot backend for chat and AI services
* Persistent chat architecture support
* Scalable publish-subscribe messaging model

## Technology Stack

### Frontend

* React
* JavaScript
* HTML5
* CSS3

### Backend

* Spring Boot
* Spring WebSocket
* STOMP Protocol
* Spring Messaging

### AI Integration

* AI API integration for conversational responses
* Group-wide AI interactions

## Architecture

The application follows a client-server architecture:

```text
React Client
      |
      |
   WebSocket
      |
      |
Spring Boot Server
      |
      +---- STOMP Message Broker
      |
      +---- AI Service
```

Users connect to the Spring Boot server through WebSockets. Messages are published and distributed using STOMP destinations. AI requests are routed to the AI service and the generated responses are delivered back to the chat room in real time.

## How It Works

1. Users join a chat room.
2. A WebSocket connection is established with the server.
3. Messages are sent through STOMP endpoints.
4. The server broadcasts messages to all subscribed users.
5. Any participant can ask the AI a question.
6. The AI response is generated on the backend.
7. The response is broadcast to the group chat for all participants to view.

## Project Structure

```text
project-root/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/main/java/
│   ├── src/main/resources/
│   └── pom.xml
│
└── README.md
```
