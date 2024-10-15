<script src="path/to/embeddable-chatbot-script.js"></script>


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
      initialQuestion: "What would you like to know about our products?" // This is the first message displayed by the AI in the chatbot window
    });
  });
