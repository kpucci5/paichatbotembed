//Customization Options - Edit
<script>
  document.addEventListener('DOMContentLoaded', function() {
    initPersonalAIChatbot({
      apiKey: 'user-api-key', // Enter your AI's API key
      domainName: 'domain-name', // Enter the domain of your AI - the part that comes before '.personal.ai'
      initialMessage: "Hi, how can I help you today?",  // Initial Message
      aiAvatarUrl: 'ai-image', // AI image URL
      userAvatarUrl: 'user-image', // User image URL
      chatbotName: 'AI', // Custom name for the AI
      sendButtonColor: '#FF5733', // Custom color for the send button
      messageIconColor: '#33FF57', // Custom color for the message icon
      initiatorPosition: 'top-right', // Can be 'top-left', 'top-right', 'bottom-left', or 'bottom-right'
      initialQuestion: 'What would you like to know about our products?' // This is the first message displayed by the AI in the chatbot window
    });
  });
</script>


    
//Do Not Edit    
<script>
(function() {
    window.initPersonalAIChatbot = function(config) {
        config = {
            apiKey: config.apiKey,
            domainName: config.domainName,
            initialMessage: config.initialMessage,
            aiAvatarUrl: config.aiAvatarUrl,
            userAvatarUrl: config.userAvatarUrl,
            chatbotName: config.chatbotName,
            sendButtonColor: config.sendButtonColor,
            messageIconColor: config.messageIconColor,
            initiatorPosition: config.initiatorPosition,
        };

        let positionCSS;
        switch (config.initiatorPosition) {
            case 'top-left':
                positionCSS = 'top: 20px; left: 20px;';
                break;
            case 'top-right':
                positionCSS = 'top: 20px; right: 20px;';
                break;
            case 'bottom-left':
                positionCSS = 'bottom: 20px; left: 20px;';
                break;
            case 'bottom-right':
            default:
                positionCSS = 'bottom: 20px; right: 20px;';
                break;
        }

        const style = document.createElement('style');
        style.textContent = `
            @import url('https://fonts.googleapis.com/css?family=Inter');

            #personal-ai-chat-widget {
                font-family: "Inter", sans-serif !important;
            }

            .pai-chat-initiator {
                position: fixed;
                display: flex;
                align-items: flex-end;
                z-index: 1000;
                cursor: pointer;
                transition: opacity 0.3s ease;
                ${positionCSS}
            }

            .pai-chat-avatar-wrapper {
                margin-right: 10px;
            }

            .pai-chat-avatar {
                width: 60px;
                height: 60px;
                border-radius: 20px 0px 20px 20px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }

            .pai-chat-bubble-wrapper {
                position: relative;
                cursor: pointer;
            }

            .pai-chat-bubble {
                background-color: #fff;
                border: 1px solid #EFF0F6;
                border-radius: 0 20px 20px 20px;
                padding: 10px 15px 15px 15px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.075);
                max-width: 300px;
                cursor: pointer;
            }

            .pai-chat-text {
                font-size: 14px;
                line-height: 1.4;
                min-height: 50px;
                display: flex;
                align-items: center;
            }

            .pai-chat-message-icon {
                position: absolute;
                bottom: -5px;
                right: -5px;
                width: 24px;
                height: 24px;
                opacity: 0;
                transition: opacity 0.5s ease-in-out;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .pai-chat-message-icon.fade-in {
                opacity: 1;
            }

            .pai-chat-message-icon svg {
                fill: ${config.messageIconColor};
            }

            .pai-chat-initiator-close {
                position: absolute;
                right: -8px;
                top: -12px;
                background: none;
                border: none;
                font-size: 25px;
                cursor: pointer;
                color: #2B263E;
                z-index: 1003;
                line-height: 1;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.5s ease-in-out;
            }

            .pai-chat-initiator-close.fade-in {
                opacity: 1;
            }

            .pai-chat-overlay {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(170, 160, 183, 0.50);
                backdrop-filter: blur(5px);
                z-index: 1001;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes grow {
                from {
                    width: 50px;
                    height: 50px;
                }
                to {
                    width: 300px;
                    height: 500px;
                }
            }

            .pai-chat-window {
                display: none;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 680px;
                height: 800px;
                background-color: transparent;
                border-radius: 20px;
                flex-direction: column;
                z-index: 1002;
                overflow: hidden;
                transition: all 0.3s ease-in-out;
                opacity: 0;
                animation: fadeIn 2s ease forwards;
                max-height: 90vh;
            }

            .pai-chat-open .pai-chat-window,
            .pai-chat-open .pai-chat-overlay {
                display: flex;
                opacity: 1;
            }

            .pai-chat-header {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px 10px;
                border-bottom: transparent;
                position: relative;
            }

            .pai-chat-header-content {
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .pai-chat-avatar-header {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                margin-bottom: 10px;
            }

            .pai-chat-title {
                font-size: 16px;
                font-weight: bold;
                color: #2B263E;
            }

            .pai-chat-close {
                position: absolute;
                right: 10px;
                top: 10px;
                background: none;
                border: none;
                font-size: 30px;
                cursor: pointer;
                color: #2B263E;
            }

            .pai-chat-messages {
                flex: 1 1 auto;
                overflow-y: auto;
                padding: 10px;
                background-color: transparent;
                scrollbar-width: thin;
                scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
                height: calc(100% - 180px);
                min-height: 200px;
                display: flex;
                flex-direction: column;
            }

            .pai-chat-messages::-webkit-scrollbar {
                width: 6px;
            }

            .pai-chat-messages::-webkit-scrollbar-track {
                background: transparent;
            }

            .pai-chat-messages::-webkit-scrollbar-thumb {
                background-color: rgba(0, 0, 0, 0.2);
                border-radius: 3px;
            }

            .pai-chat-message {
                display: flex;
                align-items: flex-start;
                margin-bottom: 15px;
                max-width: 80%;
                flex-shrink: 0;
            }

            .pai-chat-message.ai {
                align-self: flex-start;
                margin-right: 10%;
            }

            .pai-chat-message.user {
                align-self: flex-end;
                margin-left: 35%;
                position: relative;
                padding-right: 30px;
            }

            .pai-chat-message-avatar {
                width: 50px;
                height: 50px;
                border-radius: 10px 0px 10px 10px;
                margin: 0 8px;
            }

            .pai-chat-message-content {
                background-color: #fff;
                border-radius: 15px;
                padding: 8px 12px;
                max-width: calc(100% - 46px);
                position: relative;
            }

            .pai-chat-message.ai .pai-chat-message-content {
                border-top-left-radius: 0;
            }

            .pai-chat-message.user .pai-chat-message-content {
                border-radius: 0px 20px 20px 20px;
            }

            .pai-chat-message-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 4px;
            }

            .pai-chat-message-name {
                font-size: 12px;
                font-weight: bold;
                color: #666;
            }

            .pai-chat-message-time {
                font-size: 10px;
                margin-left: 5px;
                color: #888;
            }

            .pai-chat-message-text {
                font-size: 14px;
                line-height: 1.4;
            }

            .pai-chat-message-text p {
                margin-bottom: 10px;
            }

            .pai-chat-message-text p:last-child {
                margin-bottom: 0;
            }

            .pai-chat-input-wrapper {
                position: relative;
                display: flex;
                align-items: center;
                padding-right: 40px;
                min-height: 60px;
                background: #fff;
                border-top: 1px solid #EFF0F6;
                margin-top: auto;
            }

            .pai-chat-input {
                width: 100%;
                border: none;
                background: transparent;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #000000;
                outline: none;
                resize: none;
                overflow: hidden;
                padding: 10px 10px 10px 0;
                min-height: 40px;
            }

            .pai-chat-send-inline {
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                background: none;
                border: none;
                cursor: pointer;
                padding: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .pai-chat-send-inline svg {
                width: 20px;
                height: 20px;
                fill: ${config.sendButtonColor};
            }

            .pai-chat-input::placeholder {
                color: #CCCCCC;
                opacity: 1;
            }

            .pai-chat-typing-indicator {
                display: inline-flex;
                align-items: center;
            }

            .pai-chat-typing-indicator span {
                height: 8px;
                width: 8px;
                background-color: #6656FF;
                border-radius: 50%;
                display: inline-block;
                margin-right: 5px;
                animation: typing .5s infinite ease-in-out;
            }

            .pai-chat-typing-indicator span:nth-child(2) {
                animation-delay: 0.2s;
            }

            .pai-chat-typing-indicator span:nth-child(3) {
                animation-delay: 0.4s;
            }

            @keyframes typing {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-5px); }
                100% { transform: translateY(0px); }
            }

            @media (min-width: 992px) {
                .pai-chat-initiator {
                    flex-direction: row;
                }
            }

            @media (max-width: 991px) {
                .pai-chat-initiator {
                    flex-direction: row;
                    align-items: center;
                }

                .pai-chat-avatar-wrapper {
                    margin-right: 10px;
                    margin-bottom: 0;
                }

                .pai-chat-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px 0px 10px 10px;
                }

                .pai-chat-bubble {
                    max-width: 200px;
                    padding: 8px 25px 8px 10px;
                }

                .pai-chat-text {
                    font-size: 12px;
                    min-height: 30px;
                }

                .pai-chat-message-icon {
                    bottom: 5px;
                    right: 5px;
                    width: 15px;
                    height: 15px;
                }

                .pai-chat-initiator-close {
                    top: 0;
                    right: 0;
                    width: 20px;
                    height: 20px;
                    font-size: 18px;
                }

                .pai-chat-window {
                    width: 95%;
                    height: 90vh;
                    max-height: 90vh;
                    top: 5%;
                    left: 2.5%;
                    transform: none;
                }

                .pai-chat-messages {
                    height: calc(100% - 200px);
                }

                .pai-chat-header {
                    padding: 30px 10px 20px;
                }

                .pai-chat-close {
                    top: 20px;
                }
            }

            @media (max-width: 480px) {
                .pai-chat-bubble {
                    max-width: 150px;
                }

                .pai-chat-text {
                    font-size: 11px;
                }

                .pai-chat-window {
                    width: 100%;
                    height: 100vh;
                    max-height: 100vh;
                    top: 0;
                    left: 0;
                    border-radius: 0;
                }

                .pai-chat-messages {
                    height: calc(100% - 220px);
                }

                .pai-chat-header {
                    padding: 40px 10px 20px;
                }

                .pai-chat-close {
                    font-size: 28px;
                    right: 20px;
                    top: 25px;
                }

                .pai-chat-input-wrapper {
                    padding: 15px 40px 15px 15px;
                }

                .pai-chat-input {
                    min-height: 50px;
                }

                .pai-chat-message.user .pai-chat-message-content {
                    max-width: calc(100% - 20px);
                }
            }
        `;
        document.head.appendChild(style);

        const chatWidgetHtml = `
            <div id="personal-ai-chat-widget" class="pai-chat-closed">
                <div class="pai-chat-initiator">
                    <div class="pai-chat-avatar-wrapper">
                        <img src="${config.aiAvatarUrl}" alt="AI Avatar" class="pai-chat-avatar">
                    </div>
                    <div class="pai-chat-bubble-wrapper">
                        <div class="pai-chat-bubble">
                            <span class="pai-chat-text" id="ai-initial-message"></span>
                        </div>
                        <div class="pai-chat-message-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                            </svg>
                        </div>
                        <button class="pai-chat-initiator-close">&times;</button>
                    </div>
                </div>
                <div class="pai-chat-overlay"></div>
                <div class="pai-chat-window">
                    <div class="pai-chat-header">
                        <div class="pai-chat-header-content">
                            <img src="${config.aiAvatarUrl}" alt="AI Avatar" class="pai-chat-avatar-header">
                            <span class="pai-chat-title">Chat with ${config.chatbotName}</span>
                        </div>
                        <button class="pai-chat-close">&times;</button>
                    </div>
                    <div class="pai-chat-messages"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', chatWidgetHtml);

        const chatWidget = document.getElementById('personal-ai-chat-widget');
        const chatInitiator = chatWidget.querySelector('.pai-chat-initiator');
        const chatWindow = chatWidget.querySelector('.pai-chat-window');
        const chatOverlay = chatWidget.querySelector('.pai-chat-overlay');
        const chatClose = chatWidget.querySelector('.pai-chat-close');
        const chatMessages = chatWidget.querySelector('.pai-chat-messages');
        const aiInitialMessage = document.getElementById('ai-initial-message');
        const messageIcon = chatWidget.querySelector('.pai-chat-message-icon');
        const initiatorCloseButton = chatWidget.querySelector('.pai-chat-initiator-close');

        let sessionId = null;
        let initialMessageSent = false;

        function typeMessage(targetElement, message, callback) {
            let index = 0;
            function typeChar() {
                if (index < message.length) {
                    targetElement.textContent += message.charAt(index);
                    index++;
                    setTimeout(typeChar, 20);
                } else {
                    if (callback) callback();
                }
            }
            typeChar();
        }

        function typeInitialMessage() {
            typeMessage(aiInitialMessage, config.initialMessage, function() {
                messageIcon.classList.add('fade-in');
                initiatorCloseButton.classList.add('fade-in');
            });
        }

        function toggleChat() {
            chatWidget.classList.toggle('pai-chat-open');
            if (chatWidget.classList.contains('pai-chat-open')) {
                chatInitiator.style.opacity = '0';
                if (!initialMessageSent) {
                    addAIMessage(config.initialQuestion || `Hi, I'm ${config.chatbotName}, how can I help you?`);
                    initialMessageSent = true;
                }
                
                const existingUserInput = chatMessages.querySelector('.pai-chat-message.user:last-child .pai-chat-input');
                if (!existingUserInput) {
                    addUserInputBubble();
                } else {
                    existingUserInput.focus();
                }
        
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
                setTimeout(() => {
                    chatInitiator.style.opacity = '1';
                }, 300);
            }
        }

        function getCurrentTime() {
            const now = new Date();
            return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        function addAIMessage(message) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('pai-chat-message', 'ai');
            
            const time = getCurrentTime();
            
            messageElement.innerHTML = `
                <img src="${config.aiAvatarUrl}" alt="AI Avatar" class="pai-chat-message-avatar">
                <div class="pai-chat-message-content">
                    <div class="pai-chat-message-header">
                        <span class="pai-chat-message-name">${config.chatbotName}</span>
                        <span class="pai-chat-message-time">${time}</span>
                    </div>
                    <div class="pai-chat-message-text">${message}</div>
                </div>
            `;
            
            chatMessages.appendChild(messageElement);
            requestAnimationFrame(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            });
        }

        function addUserInputBubble() {
            const inputBubble = document.createElement('div');
            inputBubble.classList.add('pai-chat-message', 'user');
            inputBubble.innerHTML = `
                <img src="${config.userAvatarUrl}" alt="User Avatar" class="pai-chat-message-avatar">
                <div class="pai-chat-message-content">
                    <div class="pai-chat-message-header">
                        <span class="pai-chat-message-name">You</span>
                        <span class="pai-chat-message-time">${getCurrentTime()}</span>
                    </div>
                    <div class="pai-chat-input-wrapper">
                        <textarea class="pai-chat-input" rows="1" placeholder="Type your message..."></textarea>
                        <button class="pai-chat-send-inline">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
            chatMessages.appendChild(inputBubble);
            
            const textarea = inputBubble.querySelector('.pai-chat-input');
            const sendButton = inputBubble.querySelector('.pai-chat-send-inline');
            
            textarea.addEventListener('input', function() {
                this.style.height = 'auto';
                const newHeight = Math.min(this.scrollHeight, 150);
                this.style.height = newHeight + 'px';
                requestAnimationFrame(() => {
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                });
            });
            
            textarea.addEventListener('keypress', function(event) {
                if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage(this.value);
                }
            });
            
            sendButton.addEventListener('click', function() {
                sendMessage(textarea.value);
            });
            
            function focusInput() {
                textarea.focus();
                requestAnimationFrame(() => {
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                });
            }

            setTimeout(focusInput, 100);
            window.addEventListener('resize', () => {
                requestAnimationFrame(() => {
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                });
            });
        }

        async function sendMessage(message) {
            if (message.trim()) {
                const userMessageElement = chatMessages.querySelector('.pai-chat-message.user:last-child');
                userMessageElement.querySelector('.pai-chat-input-wrapper').style.display = 'none';
                userMessageElement.querySelector('.pai-chat-message-content').insertAdjacentHTML('beforeend', `<div class="pai-chat-message-text">${message}</div>`);
                
                const aiMessageElement = document.createElement('div');
                aiMessageElement.classList.add('pai-chat-message', 'ai');
                const time = getCurrentTime();
                
                aiMessageElement.innerHTML = `
                    <img src="${config.aiAvatarUrl}" alt="AI Avatar" class="pai-chat-message-avatar">
                    <div class="pai-chat-message-content">
                        <div class="pai-chat-message-header">
                            <span class="pai-chat-message-name">${config.chatbotName}</span>
                            <span class="pai-chat-message-time">${time}</span>
                        </div>
                        <div class="pai-chat-message-text">
                            <div class="pai-chat-typing-indicator">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    </div>
                `;
                chatMessages.appendChild(aiMessageElement);
                
                const aiMessageText = aiMessageElement.querySelector('.pai-chat-message-text');
                requestAnimationFrame(() => {
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                });

                try {
                    const response = await fetch('https://api.personal.ai/v1/message', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': config.apiKey
                        },
                        body: JSON.stringify({
                            Text: message,
                            UserName: "Visitor",
                            SourceName: "WebChat",
                            SessionId: sessionId,
                            DomainName: config.domainName,
                            is_draft: false
                        })
                    });

                    const data = await response.json();
                    
                    if (data.ai_message) {
                        aiMessageText.innerHTML = processMessage(data.ai_message);
                    } else {
                        aiMessageText.textContent = "Sorry, I couldn't generate a response at this time.";
                    }

                    if (data.SessionId) {
                        sessionId = data.SessionId;
                    }

                    requestAnimationFrame(() => {
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    });
                } catch (error) {
                    console.error('API Error:', error);
                    aiMessageText.textContent = "Sorry, there was an error processing your request.";
                }

                addUserInputBubble();
                
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    });
                }, 100);
            }
        }

        function processMessage(message) {
            const iframeRegex = /<iframe.*?src="(.*?)".*?><\/iframe>/g;
            message = message.replace(iframeRegex, (match, src) => {
                return `<iframe src="${src}" frameborder="0" allowfullscreen></iframe>`;
            });
        
            const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)([.,;!?]?)\s*/g;
            message = message.replace(urlRegex, (fullMatch, url, punctuation) => {
                const fullUrl = url.startsWith('http') ? url : `http://${url}`;
                return `<a href="${fullUrl}" target="_blank" rel="noopener noreferrer">${url}</a>${punctuation}`;
            });
        
            const paragraphs = message.split('\n\n');
            const formattedParagraphs = paragraphs.map(paragraph => {
                const lines = paragraph.split('\n');
                return lines.join('<br>');
            });
        
            return formattedParagraphs.map(p => `<p>${p}</p>`).join('');
        }
        
        chatInitiator.addEventListener('click', toggleChat);
        chatOverlay.addEventListener('click', toggleChat);
        chatClose.addEventListener('click', toggleChat);

        initiatorCloseButton.addEventListener('click', function(event) {
            event.stopPropagation();
            chatWidget.style.display = 'none';
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && chatWidget.classList.contains('pai-chat-open')) {
                toggleChat();
            }
        });

        typeInitialMessage();
    };
})();
</script>
