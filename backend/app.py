from langchain.prompts import SystemMessagePromptTemplate, PromptTemplate
from langchain.memory import ConversationBufferWindowMemory
from langchain.chat_models import ChatOpenAI
from langchain.embeddings import OpenAIEmbeddings
from fastapi.middleware.cors import CORSMiddleware
from langchain.chains import ConversationChain
from langchain.schema import HumanMessage
from fastapi import FastAPI, Request
from dotenv import load_dotenv
import uvicorn
import os

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
  
embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)
chat = ChatOpenAI(model="gpt-3.5-turbo-1106", temperature=0.1)
memory = ConversationBufferWindowMemory(k=5)
conversation = ConversationChain(llm=chat, memory=memory, verbose=False)

prompt_template = """You are a helpful asssitant that responds to user's 
query in a precise manner, in only less than 20 words. Query: {query}. Answer:"""

prompt = PromptTemplate(template=prompt_template, input_variables=["query"])
system_message_prompt = SystemMessagePromptTemplate(prompt=prompt)

def reply(message):
    formatted_prompt = system_message_prompt.format(query=message)
    message = [formatted_prompt, HumanMessage(content=message)]
    return conversation.predict(input=message)

@app.post("/chat")
async def chat(request: Request):
    try:
        data = await request.json()
        message = data.get("message", "")
        return {"response": reply(str(message))}
    except Exception as e:
        return {"error": f"Error Occured: {str(e)}"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8006)
