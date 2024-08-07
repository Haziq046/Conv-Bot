class Chatbox {
    constructor() {
      this.elements = {
        openButton: document.querySelector(".chatbox__button button"),
        chatBox: document.querySelector(".chatbox__support"),
        sendButton: document.querySelector(".send__button"),
        textField: document.querySelector(".chatbox__support input"),
        startButton: document.getElementById("startButton"),
        chatMessages: document.querySelector(".chatbox__messages"),
        expandButton: document.querySelector(".expand-button"),
        removeExpandButton: document.querySelector(".remove-expand"),
        reloadButton: document.querySelector(".chatbox__reload")
      };
      this.state = false;
      this.messages = [];
    }
  
    display() {
      this.elements.openButton.addEventListener("click", () =>
        this.toggleChatBox()
      );
      this.elements.sendButton.addEventListener("click", () =>
        this.handleSendButtonClick()
      );
      this.elements.textField.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
          this.handleSendButtonClick();
        }
      });
      this.elements.expandButton.addEventListener("click", () =>
        this.expandChatBox()
      );
      this.elements.removeExpandButton.addEventListener("click", () =>
        this.collapseChatBox()
      );
      this.elements.reloadButton.addEventListener("click", () =>
        this.reloadChat()
      );
    }
  
    toggleChatBox() {
      this.state = !this.state;
      this.elements.chatBox.classList.toggle("chatbox--active", this.state);
    }
  
    handleSendButtonClick() {
      const message = this.elements.textField.value.trim();
      if (message) {
        this.handleMessage(message);
      }
    }
  
    handleMessage(messageText) {
      this.addMessage("User", messageText);
      this.elements.textField.value = "";
      this.displayLoading(true);
  
      const startTime = new Date();
  
      fetch(`http://127.0.0.1:8000/chat`, {
  
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.displayLoading(false);
  
          const endTime = new Date();
          const responseTime = (endTime - startTime) / 1000;
          console.log(`Response time: ${responseTime} s`);
  
          const reply = data?.response;
          if (reply) {
            this.addMessageWithTypingEffect("Sam", reply);
          }
        })
        .catch(error => {
          console.error("Error:", error);
          this.displayLoading(false);
        });
    }
  
  addMessage(sender, message) {
    const messageObject = { name: sender, message: message };
    this.messages.push(messageObject); // Add new messages at the end of the array
    if (sender === "User") {
      this.updateChatDirectly(messageObject); // For user messages, update directly
    }
  }
  
  updateChatWithoutTypingEffect(messageObject) {
    const container = document.createElement("div");
    container.className = `messages__item messages__item--${messageObject.name === "Sam" ? "visitor" : "operator"
      }`;
    container.innerHTML = `
          <img src="./images/${messageObject.name === "Sam" ? "avatar" : "user-avatar"
      }.png" alt="image">
          <div>${messageObject.message}</div>
      `;
    this.elements.chatMessages.appendChild(container);
    this.scrollToBottom();
  }
  
  addMessageWithTypingEffect(sender, message) {
    const messageObject = { name: sender, message: message };
    this.messages.push(messageObject); // Add new messages at the end of the array
    this.typeMessage(messageObject); // For API responses, use typing effect
  }
  
  typeMessage(messageObject) {
    const container = document.createElement("div");
    container.className = `messages__item messages__item--${messageObject.name === "Sam" ? "visitor" : "operator"
      }`;
    container.innerHTML = `
          <img src="./images/${messageObject.name === "Sam" ? "avatar" : "user-avatar"
      }.png" alt="image">
          <div></div>
      `;
  
    this.elements.chatMessages.appendChild(container); // Append the container at the end
    const messageDiv = container.lastElementChild;
    let charIndex = 0;
  
    const typeChar = () => {
      if (charIndex < messageObject.message.length) {
        messageDiv.textContent += messageObject.message[charIndex];
        charIndex++;
        setTimeout(typeChar, 50); // Typing effect speed
        this.scrollToBottom(); // Can be changed, still confused about this
      }
    };
    typeChar();
  }
  
  updateChatDirectly(messageObject) {
    const container = document.createElement("div");
    container.className = `messages__item messages__item--${messageObject.name === "Sam" ? "visitor" : "operator"
      }`;
    container.innerHTML = `
          <img src="./images/${messageObject.name === "Sam" ? "avatar" : "user-avatar"
      }.png" alt="image">
          <div>${messageObject.message}</div>
      `;
    this.elements.chatMessages.appendChild(container); // Append the container at the end
    this.scrollToBottom();
  }
  
  displayLoading(isLoading) {
    if (isLoading) {
      this.elements.sendButton.disabled = true;
      this.elements.textField.disabled = true;
    } else {
      this.elements.sendButton.disabled = false;
      this.elements.textField.disabled = false;
    }
  }
  
  scrollToBottom() {
    this.elements.chatMessages.scrollTop =
      this.elements.chatMessages.scrollHeight;
  }
  
  updateChat() {
    const container = document.createElement("div");
    container.className = `messages__item messages__item--${messageObject.name === "Sam" ? "visitor" : "operator"
      }`;
    container.innerHTML = `
          <img src="./images/${messageObject.name === "Sam" ? "avatar" : "user-avatar"
      }.png" alt="image">
          <div>${messageObject.message}</div>
      `;
    this.elements.chatMessages.appendChild(container);
    this.scrollToBottom();
  }
  
  expandChatBox() {
    this.elements.chatBox.classList.add("expand-chat");
    this.elements.expandButton.style.display = "none";
    this.elements.removeExpandButton.style.display = "block";
  }
  
  collapseChatBox() {
    this.elements.chatBox.classList.remove("expand-chat");
    this.elements.expandButton.style.display = "block";
    this.elements.removeExpandButton.style.display = "none";
  }
  
  reloadChat() {
    this.messages = [];
    this.updateChat();
  }
  }
  
  const chatbox = new Chatbox();
  chatbox.display();
  
  $(document).ready(function () {
    $(".expand-button").click(function () {
      $(".chatbox").addClass("expand-chat");
      $(".expand-button").hide();
      $(".remove-expand").show();
    });
    $(".remove-expand").click(function () {
      $(".chatbox").removeClass("expand-chat");
      $(".expand-button").show();
      $(".remove-expand").hide();
    });
  });
  