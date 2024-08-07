# Conv-Bot
Conv-Bot is an AI-powered conversational bot designed to facilitate seamless and natural human-computer interactions.

## Features

- AI-powered chatbot using OpenAI's GPT-4o-mini
- Simple web interface for interacting with the chatbot.
- Real-time messaging with typing effect and loading indicator.
- Expandable and collapsible chatbox interface.

## Prerequisites

- Python 3.8+
- Node.js
- npm

## Backend Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>

2. **Set up a virtual environment:**:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`

3. **Install backend dependencies**:
   ```bash
   cd backend
   pip install -r requirements.txt

4. **Create a .env file**:
   ```bash
   OPENAI_API_KEY=your_openai_api_key

5. 4. **Run the backend server**:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8006


## Frontend Setup
  
1. **Navigate to the frontend directory**:
   ```bash
   cd frontend

2. **Run the frontend server**:
   ```bash
   node app.js
   The frontend server will start on http://localhost:3000.
