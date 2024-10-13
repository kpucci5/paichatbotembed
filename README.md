# Embeddable AI Chatbot Implementation Guide

This guide provides step-by-step instructions for implementing the AI Chatbot on your website across various platforms.

## Table of Contents

1. [Regular Website Implementation](#regular-website-implementation)
2. [Platform-Specific Implementations](#platform-specific-implementations)
   - [WordPress](#wordpress)
   - [Webflow](#webflow)
   - [Other Website Builders (Wix, Squarespace, Weebly)](#other-website-builders-wix-squarespace-weebly)
3. [Customization](#customization)
4. [Troubleshooting](#troubleshooting)

## Regular Website Implementation

This method works for most self-hosted websites and websites on managed hosting platforms.

1. Download the `embeddable-chatbot-script.js` file.

2. Upload the `embeddable-chatbot-script.js` file to your web server:
   - If you have FTP access, use an FTP client to upload the file.
   - If you're using cPanel, use the File Manager to upload the file.
   - Make note of the directory where you upload the file.

3. Add the following code to your HTML file, just before the closing `</body>` tag:

   ```html
   <script src="path/to/embeddable-chatbot-script.js"></script>
   <script>
     document.addEventListener('DOMContentLoaded', function() {
       initPersonalAIChatbot({
         apiKey: 'YOUR_API_KEY',
         domainName: 'YOUR_DOMAIN_NAME',
         initialMessage: "Hi, I'm your AI assistant. How can I help you today?",
         aiAvatarUrl: 'URL_TO_AI_AVATAR',
         userAvatarUrl: 'URL_TO_USER_AVATAR',
         chatbotName: 'AI Assistant',
         sendButtonColor: '#FF5733',
         messageIconColor: '#33FF57',
         initiatorPosition: 'bottom-right'
       });
     });
   </script>
   ```

4. Replace `'path/to/embeddable-chatbot-script.js'` with the actual path where you uploaded the script on your server. This typically looks like `/js/embeddable-chatbot-script.js` or `/scripts/embeddable-chatbot-script.js`.

5. Replace `'YOUR_API_KEY'`, `'YOUR_DOMAIN_NAME'`, and other placeholder values with your specific details.

6. Save the changes to your HTML file.

## Platform-Specific Implementations

### WordPress

#### Method 1: Using a Plugin (Recommended for most users)

1. Install and activate the "Insert Headers and Footers" plugin.
2. Go to Settings > Insert Headers and Footers.
3. In the "Scripts in Footer" section, paste the entire content of `embeddable-chatbot-script.js`.
4. After the pasted script, add the initialization code (see Regular Website Implementation step 3).
5. Replace placeholder values and save.

#### Method 2: Editing Theme Files

1. Go to Appearance > Theme Editor.
2. Select the `footer.php` file.
3. Just before the closing `</body>` tag, paste the entire content of `embeddable-chatbot-script.js`.
4. After the pasted script, add the initialization code.
5. Click "Update File" to save.

#### Method 3: Using a Child Theme

1. In your child theme's `functions.php`, add:

   ```php
   function enqueue_chatbot_script() {
       wp_enqueue_script('embeddable-chatbot', get_stylesheet_directory_uri() . '/path/to/embeddable-chatbot-script.js', array(), '1.0.0', true);
       wp_add_inline_script('embeddable-chatbot', '
           document.addEventListener("DOMContentLoaded", function() {
               initPersonalAIChatbot({
                   apiKey: "YOUR_API_KEY",
                   domainName: "YOUR_DOMAIN_NAME",
                   initialMessage: "Hi, I\'m your AI assistant. How can I help you today?",
                   aiAvatarUrl: "URL_TO_AI_AVATAR",
                   userAvatarUrl: "URL_TO_USER_AVATAR",
                   chatbotName: "AI Assistant",
                   sendButtonColor: "#FF5733",
                   messageIconColor: "#33FF57",
                   initiatorPosition: "bottom-right"
               });
           });
       ');
   }
   add_action('wp_enqueue_scripts', 'enqueue_chatbot_script');
   ```

2. Place the `embeddable-chatbot-script.js` file in your child theme directory.
3. Replace placeholder values and save.

### Webflow

1. Copy the entire content of the `embeddable-chatbot-script.js` file.

2. In your Webflow project:
   - Go to the "Pages" panel.
   - Click on the gear icon next to "Site settings" for site-wide implementation.
   - In the settings panel, scroll down to "Custom Code".
   - Paste the copied script into the "Footer Code" section.

3. After the pasted script, add the following initialization code:

   ```html
   <script>
     document.addEventListener('DOMContentLoaded', function() {
       initPersonalAIChatbot({
         apiKey: 'YOUR_API_KEY',
         domainName: 'YOUR_DOMAIN_NAME',
         initialMessage: "Hi, I'm your AI assistant. How can I help you today?",
         aiAvatarUrl: 'URL_TO_AI_AVATAR',
         userAvatarUrl: 'URL_TO_USER_AVATAR',
         chatbotName: 'AI Assistant',
         sendButtonColor: '#FF5733',
         messageIconColor: '#33FF57',
         initiatorPosition: 'bottom-right'
       });
     });
   </script>
   ```

4. Replace `'YOUR_API_KEY'`, `'YOUR_DOMAIN_NAME'`, and other placeholder values with your specific details.

5. Click "Save Changes" and then "Publish" your Webflow site to apply the changes.

Notes for Webflow:
- This adds the chatbot to all pages. For specific pages only, add the code to individual page settings.
- Be aware of Webflow's custom code limits.
- Changes are only live after publishing the site.

### Other Website Builders (Wix, Squarespace, Weebly)

The process is similar to Webflow for most website builders:

1. Find the option to add custom HTML or JavaScript. This is often in:
   - Wix: Dashboard > Settings > Custom Code
   - Squarespace: Pages > Website Header > Advanced > Code Injection
   - Weebly: Settings > SEO > Header Code or Footer Code

2. Copy the entire content of `embeddable-chatbot-script.js` and paste it into the custom code area.

3. After the pasted script, add the initialization code (same as in the Webflow section).

4. Replace placeholder values and save changes.

5. Publish or update your site to apply the changes.

Note: The exact steps and locations may vary depending on your specific website builder and plan. Consult your platform's documentation for detailed instructions on adding custom code.

## Customization

Customize the chatbot by modifying the configuration object in `initPersonalAIChatbot()`. Options include:

- `apiKey`: Your Personal AI API key
- `domainName`: Your Personal AI domain name
- `initialMessage`: First message displayed by the chatbot
- `aiAvatarUrl`: URL to AI's avatar image
- `userAvatarUrl`: URL to default user avatar image
- `chatbotName`: Name of the chatbot
- `sendButtonColor`: Color of the send button (e.g., '#FF5733')
- `messageIconColor`: Color of the message icon (e.g., '#33FF57')
- `initiatorPosition`: Position of the chat initiator ('top-left', 'top-right', 'bottom-left', or 'bottom-right')

## Troubleshooting

If you encounter issues:

1. Check the browser's console for error messages (usually accessible by pressing F12).
2. Ensure all placeholder values have been replaced with your actual details.
3. Verify that the script has been correctly pasted and is not truncated.
4. For WordPress, try deactivating other plugins to check for conflicts.
5. For website builders, ensure your plan supports custom code insertion.
6. Always test on the live/published version of your site, not just in editors or preview modes.

Platform-Specific Troubleshooting:
- WordPress: Check if your theme is compatible or if it's overriding footer scripts.
- Webflow/Website Builders: If using the visual editor, custom code changes may not be visible. Always check the published site.

For further assistance, please contact katelyn.pucci@personal.ai.
