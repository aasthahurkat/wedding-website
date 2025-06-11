# RSVP Phone Notification Setup Guide

Your website now supports instant phone notifications when someone submits an RSVP! Here are several options:

## Option 1: SMS Text Messages (Most Direct) 📱

**Why:** Direct SMS to your phone - no apps needed, works on any phone, most reliable

**Setup Steps:**
1. Sign up for free Twilio account at [twilio.com](https://www.twilio.com)
2. Get your free trial phone number (comes with $15 credit)
3. Go to Console Dashboard and note:
   - Account SID
   - Auth Token  
   - Your Twilio Phone Number
4. Add to your `.env.local` file:
   ```
   TWILIO_ACCOUNT_SID=your_account_sid_here
   TWILIO_AUTH_TOKEN=your_auth_token_here
   TWILIO_PHONE_NUMBER=+1234567890
   YOUR_PHONE_NUMBER=+1your_actual_number
   ```

**What you'll get:** Text messages directly to your phone like:
> RSVP Alert: "John Smith" responded YES to your wedding! (friends)

**Cost:** Free trial includes $15 credit (~500+ SMS). After that, ~$0.0075 per SMS (very cheap!)

---

## Option 2: Pushbullet (App Notifications)

**Why:** Super simple setup, works on iPhone & Android, instant push notifications

**Setup Steps:**
1. Download Pushbullet app on your phone
2. Create account at [pushbullet.com](https://www.pushbullet.com)
3. Go to Settings → Account → Create Access Token
4. Add to your `.env.local` file:
   ```
   PUSHBULLET_ACCESS_TOKEN=your_token_here
   ```

**What you'll get:** Push notifications directly to your phone like:
> 🎉 RSVP Alert: "John Smith" has responded YES to the wedding! (Group: friends)

---

## Option 3: Telegram Bot (Messaging App)

**Why:** Free, reliable, works worldwide, can also notify a group chat

**Setup Steps:**
1. Open Telegram app
2. Search for "BotFather" and start a chat
3. Send `/newbot` and follow instructions to create your bot
4. Copy the bot token you receive
5. Start a chat with your new bot, send any message
6. Visit: `https://api.telegram.org/bot<YourBotToken>/getUpdates`
7. Find your chat_id in the response
8. Add to your `.env.local` file:
   ```
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   TELEGRAM_CHAT_ID=your_chat_id_here
   ```

**What you'll get:** Telegram messages on your phone/computer

---

## Option 4: Discord Webhook (If You Use Discord)

**Why:** Great if you already use Discord, can notify a dedicated wedding channel

**Setup Steps:**
1. Create a Discord server or use existing one
2. Create a channel for wedding notifications
3. Go to Channel Settings → Integrations → Webhooks
4. Create New Webhook, copy the URL
5. Add to your `.env.local` file:
   ```
   DISCORD_WEBHOOK_URL=your_webhook_url_here
   ```

**What you'll get:** Formatted Discord messages with colored indicators

---

## Multiple Options

You can set up multiple notification methods! The system will send to all configured services.

## Your `.env.local` File

Add your chosen option(s) to your environment file:

```env
# Existing variables
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_key
# ... other existing vars

# RSVP Notifications (choose one or more)

# Option 1: SMS (Most direct)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token  
TWILIO_PHONE_NUMBER=+1234567890
YOUR_PHONE_NUMBER=+1your_actual_number

# Option 2: Push notifications
PUSHBULLET_ACCESS_TOKEN=your_pushbullet_token

# Option 3: Telegram
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id

# Option 4: Discord
DISCORD_WEBHOOK_URL=your_discord_webhook_url
```

## Twilio Setup (For SMS) - Step by Step

1. **Sign up:** Go to [twilio.com](https://www.twilio.com) → "Sign up for free"
2. **Verify your phone:** Enter your real phone number for verification
3. **Get phone number:** Choose "Get a phone number" → Select any available number
4. **Find credentials:** 
   - Go to Console Dashboard
   - Copy "Account SID" and "Auth Token"
   - Note your Twilio phone number (starts with +1)
5. **Add to environment:** Use the format above in your `.env.local`

## Testing

After setup:
1. Deploy your changes with the new environment variables
2. Submit a test RSVP to verify notifications work
3. You should receive notifications within seconds!

## Notification Format

All notifications include:
- Guest name
- Response (YES/NO) 
- Group (bride/groom/friends)
- Timestamp

**SMS Example:** `RSVP Alert: "Sarah Johnson" responded YES to your wedding! (friends)`

---

**Recommendation:** **SMS via Twilio** is the most reliable and direct - you'll get text messages instantly on any phone! The free trial gives you plenty of credits for your wedding. 