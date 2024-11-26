//Customization Options - Edit
<script>
document.addEventListener('DOMContentLoaded', function() {
    initPersonalAIChatbot({
        apiKey: 'your-api-key',
        domainName: 'your-domain-name',
        initialMessage: "Hi, welcome to our website. Chat now?",
        aiAvatarUrl: 'path/to/your/image',
        userAvatarUrl: 'path/to/your/image',
        chatbotName: 'AI Chatbot',
        sendButtonColor: '#6656FF',
        messageIconColor: '#6656FF',
        startChatButtonColor: '#6656FF',
        initiatorPosition: 'bottom-right',
        initialQuestion: 'Hi how are you today?',
        overlayColor: 'rgba(170, 160, 183, 0.50)',
        overlayBlur: '5px',
        aiMessageColor: '#FFFFFF',
        aiMessageTextColor: '#000000',
        userMessageColor: '#6656FF',
        userMessageTextColor: '#FFFFFF',
        typingIndicatorColor: '#6656FF'  // Add typing indicator color
    });
});
</script>

//Do not edit below this line unless adjustments to the positioning are needed
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
            sendButtonColor: config.sendButtonColor || '#6656FF',
            messageIconColor: config.messageIconColor || '#6656FF',
            startChatButtonColor: config.startChatButtonColor || '#6656FF',
            initiatorPosition: config.initiatorPosition || 'bottom-right',
            initialQuestion: config.initialQuestion,
            overlayColor: config.overlayColor || 'rgba(170, 160, 183, 0.50)',
            overlayBlur: config.overlayBlur || '5px',
            // Add new color options with defaults
            aiMessageColor: config.aiMessageColor || '#FFFFFF',
            aiMessageTextColor: config.aiMessageTextColor || '#000000',
            userMessageColor: config.userMessageColor || '#6656FF',
            userMessageTextColor: config.userMessageTextColor || '#FFFFFF',
            typingIndicatorColor: config.typingIndicatorColor || '#6656FF'
        };

        let positionCSS;
        switch (config.initiatorPosition) {
            case 'top-left':
                positionCSS = 'top: 40px; left: 40px;'; // Increased from 20px
                break;
            case 'top-right':
                positionCSS = 'top: 40px; right: 40px;'; // Increased from 20px
                break;
            case 'bottom-left':
                positionCSS = 'bottom: 40px; left: 40px;'; // Increased from 20px
                break;
            case 'bottom-right':
            default:
                positionCSS = 'bottom: 40px; right: 40px;'; // Increased from 20px
                break;
        }
        // Add additional styles for message icon and transitions
        const additionalStyles = `
        .pai-chat-message-icon.expanded {
            position: fixed !important;
            z-index: 9999 !important;
            cursor: pointer !important;
            ${positionCSS}
            width: 32px !important;
            height: 32px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            transform: scale(1.8) !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            background: ${config.messageIconColor} !important;
            padding: 0 !important;
            border-radius: 50% !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
            pointer-events: auto !important;
        }

        .pai-chat-message-icon.expanded svg {
            width: 16px !important;
            height: 16px !important;
            fill: white !important;
        }

        .pai-chat-message-icon.expanded:hover {
            transform: scale(2) !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
            filter: brightness(1.1);
        }

            @media (max-width: 991px) {
                .pai-chat-message-icon.expanded {
                    transform: scale(1.5) !important;
                    bottom: 30px !important;
                    right: 30px !important;
                }

                .pai-chat-message-icon.expanded:hover {
                    transform: scale(1.7) !important;
                }
                
                .pai-chat-window {
                    width: 90% !important;
                    height: 80vh !important;
                    max-height: 80vh !important;
                }
            }

            @media (max-width: 480px) {
                .pai-chat-message-icon.expanded {
                    transform: scale(1.3) !important;
                    bottom: 25px !important;
                    right: 25px !important;
                }
                
                .pai-chat-message-icon.expanded:hover {
                    transform: scale(1.5) !important;
                }
                
                .pai-chat-window {
                    width: 100% !important;
                    height: 100vh !important;
                    max-height: 100vh !important;
                    top: 0 !important;
                    left: 0 !important;
                    transform: none !important;
                    border-radius: 0 !important;
                }
            }

            @media (max-resolution: 150dpi) {
                .pai-chat-window {
                    max-width: 90vw;
                    max-height: 90vh;
                }
                
                .pai-chat-message-icon.expanded {
                    transform: scale(2) !important;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = additionalStyles;
        document.head.appendChild(styleSheet);

        const style = document.createElement('style');
        style.textContent = `
            @import url('https://fonts.googleapis.com/css?family=Inter');

            #personal-ai-chat-widget {
                font-family: "Inter", sans-serif !important;
            }

            .pai-chat-initiator {
                position: fixed;
                display: flex;
                align-items: flex-start;
                z-index: 1000;
                cursor: pointer;
                opacity: 1;
                transform: translateY(0);
                transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
                ${positionCSS}
            }

            .pai-chat-initiator.fade-out {
                opacity: 0;
                transform: translateY(10px);
            }

            .pai-chat-avatar-wrapper {
                margin-right: 10px;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .pai-chat-bubble {
                background-color: #fff;
                border: 1px solid #EFF0F6;
                border-radius: 0 20px 20px 20px;
                padding: 10px 15px 15px 15px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.075);
                max-width: 300px;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
                background: ${config.messageIconColor};
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .pai-chat-message-icon:hover {
                transform: scale(1.1);
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
        
            .pai-chat-message-icon svg {
                width: 12px;
                height: 12px;
                fill: white;
            }
        

            .pai-chat-message-icon.fade-in {
                opacity: 1;
            }

            .pai-chat-initiator-close {
                position: absolute;
                right: -5px;
                top: -5px;
                background: white;
                border: none;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                font-size: 16px;
                line-height: 1;
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #666;
                opacity: 0;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 1003;
            }

            .pai-chat-initiator-close:hover {
                transform: scale(1.1);
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
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
                background-color: ${config.overlayColor};
                backdrop-filter: blur(${config.overlayBlur});
                z-index: 1001;
                opacity: 0;
                transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .pai-chat-open .pai-chat-overlay {
                opacity: 1;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            .pai-chat-window {
                display: none;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -45%) scale(0.95);
                width: 680px;
                height: 800px;
                background-color: transparent;
                border-radius: 20px;
                flex-direction: column;
                z-index: 1002;
                overflow: hidden;
                opacity: 0;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                max-height: 90vh;
            }

            .pai-chat-open .pai-chat-window {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
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
                width: 40px;
                height: 40px;
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
                background-color: ${config.aiMessageColor};
                color: ${config.aiMessageTextColor};
                border-top-left-radius: 0;
            }

            .pai-chat-message.ai .pai-chat-message-name {
                color: ${config.aiMessageTextColor}80;  /* Add some transparency for the name */
            }

            .pai-chat-message.ai .pai-chat-message-time {
                color: ${config.aiMessageTextColor}80;  /* Add some transparency for the time */
            }

            .pai-chat-message.user .pai-chat-message-content {
                background-color: ${config.userMessageColor};
                color: ${config.userMessageTextColor};
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

            .pai-chat-message.user .pai-chat-message-name,
            .pai-chat-message.user .pai-chat-message-time {
                color: ${config.userMessageTextColor}80;  /* Add some transparency for header text */
            }

            .pai-chat-message.user .pai-chat-input {
                color: ${config.userMessageTextColor};
            }
    
            .pai-chat-message.user .pai-chat-input::placeholder {
                color: ${config.userMessageTextColor}80;
            }
    
            .pai-chat-message.user .pai-chat-send-inline svg {
                fill: ${config.userMessageTextColor};
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
                padding: 0 40px 0 0 !important;
                min-height: 60px;
                background: transparent !important;
                border-top: none !important;
                margin-top: 0 !important;
            }

            .pai-chat-input {
                width: 100%;
                border: none;
                background: transparent !important;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                line-height: 1.4;
                color: white !important;
                outline: none;
                resize: none;
                overflow: hidden;
                padding: 8px 0 !important;
                min-height: 40px;
            }

            .pai-chat-input::placeholder {
                color: rgba(255, 255, 255, 0.6) !important;
                opacity: 1;
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
                fill: white;
            }

            .pai-chat-typing-indicator {
                display: inline-flex;
                align-items: center;
            }

            .pai-chat-typing-indicator span {
                height: 8px;
                width: 8px;
                background-color: ${config.typingIndicatorColor};
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
                    align-items: flex-start;
                }

                .pai-chat-avatar-wrapper {
                    margin-right: 10px;
                    margin-bottom: 0;
                }

                .pai-chat-avatar {
                    width: 40px;
                    height: 40px;
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
            }

            @media (max-width: 480px) {
                .pai-chat-bubble {
                    max-width: 150px;
                }

                .pai-chat-text {
                    font-size: 11px;
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

        function showMessageIcon() {
            if (messageIcon.parentNode) {
                messageIcon.parentNode.removeChild(messageIcon);
            }
        
            messageIcon.style.cssText = `
                display: flex !important;
                position: fixed !important;
                z-index: 9999 !important;
                ${positionCSS}
                width: 32px !important;
                height: 32px !important;
                background: ${config.messageIconColor} !important;
                border-radius: 50% !important;
                align-items: center !important;
                justify-content: center !important;
                transform: scale(1.8) !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
                pointer-events: auto !important;
                cursor: pointer !important;
                opacity: 0 !important;
            `;
        
            messageIcon.classList.add('expanded');
            document.body.appendChild(messageIcon);
        
            requestAnimationFrame(() => {
                messageIcon.style.opacity = '1';
            });
        }

        function typeMessage(targetElement, message, callback) {
            let index = 0;
            targetElement.textContent = '';
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
            if (!chatWidget.classList.contains('pai-chat-open')) {
 
                if (messageIcon.classList.contains('expanded')) {
                    messageIcon.style.opacity = '0';
                    messageIcon.style.display = 'none';
                    messageIcon.classList.remove('expanded');
                } else {
                    chatInitiator.classList.add('fade-out');
                    setTimeout(() => {
                        chatInitiator.style.display = 'none';
                    }, 300);
                }
                

                chatWindow.style.display = 'flex';
                chatOverlay.style.display = 'flex';
                

                chatWindow.offsetHeight;
                

                requestAnimationFrame(() => {
                    chatWidget.classList.add('pai-chat-open');
                    
                    setTimeout(() => {
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
                    }, 300);
                });
            } else {

                chatWidget.classList.remove('pai-chat-open');
                document.body.style.overflow = '';
                

                setTimeout(() => {
                    chatWindow.style.display = 'none';
                    chatOverlay.style.display = 'none';
                    showMessageIcon();
                }, 400); 
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
        }

        async function sendMessage(message) {
            if (message.trim()) {
                const userMessageElement = chatMessages.querySelector('.pai-chat-message.user:last-child');
                userMessageElement.querySelector('.pai-chat-input-wrapper').style.display = 'none';
                userMessageElement.querySelector('.pai-chat-message-content').insertAdjacentHTML('beforeend', 
                    `<div class="pai-chat-message-text">${message}</div>`
                );
                
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
        
                try {
                    const response = await fetch('https://api.personal.ai/v1/message/stream', {
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
        
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder();
                    let isFirstChunk = true;
                    let accumulatedMessage = '';
        
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        
                        const chunk = decoder.decode(value);
                        const lines = chunk.split('\n');
                        
                        for (const line of lines) {
                            if (line.startsWith('data:')) {
                                try {
                                    const jsonData = JSON.parse(line.slice(5));
                                    if (jsonData.ai_message) {
                                        if (isFirstChunk) {
                                            // Remove typing indicator on first chunk
                                            const typingIndicator = aiMessageText.querySelector('.pai-chat-typing-indicator');
                                            if (typingIndicator) {
                                                typingIndicator.remove();
                                            }
                                            isFirstChunk = false;
                                        }
                                        accumulatedMessage += jsonData.ai_message;
                                        aiMessageText.innerHTML = processMessage(accumulatedMessage);
                                        chatMessages.scrollTop = chatMessages.scrollHeight;
                                    }
                                    if (jsonData.SessionId) {
                                        sessionId = jsonData.SessionId;
                                    }
                                } catch (e) {
                                    console.warn('Error parsing JSON chunk:', e);
                                }
                            }
                        }
                    }
        
                } catch (error) {
                    console.error('API Error:', error);
                    aiMessageText.textContent = "Sorry, there was an error processing your request.";
                }
        
                addUserInputBubble();
                
                requestAnimationFrame(() => {
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                });
            }
        }

        function processMessage(message) {
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

        // Event Listeners
        chatInitiator.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            toggleChat();
        });
        
        messageIcon.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            toggleChat();
        });
        
        chatOverlay.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            toggleChat();
            showMessageIcon();
        });
        
        chatClose.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            toggleChat();
            showMessageIcon();
        });
        
        initiatorCloseButton.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            const initiator = chatWidget.querySelector('.pai-chat-initiator');
            initiator.classList.add('fade-out');
            showMessageIcon(); // Call immediately instead of in setTimeout
        });

        function isElementVisible(element) {
            return element && (element.offsetParent !== null);
        }

        window.addEventListener('resize', function() {
            if (messageIcon.classList.contains('expanded')) {
                showMessageIcon();
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && chatWidget.classList.contains('pai-chat-open')) {
                toggleChat();
                showMessageIcon();
            }
        });

        typeInitialMessage();
    };
})();
</script>
