# Instagram API Setup Guide

This guide will walk you through setting up the Instagram Graph API to automatically fetch posts for your gallery.

## Prerequisites

- Instagram Business or Creator account (not a personal account)
- Facebook Page connected to your Instagram account
- Facebook Developer account

---

## Step 1: Convert to Instagram Business/Creator Account

1. Open the Instagram app on your phone
2. Go to **Settings** → **Account** → **Switch to Professional Account**
3. Choose either **Creator** or **Business**
4. Complete the setup process

---

## Step 2: Create/Link Facebook Page

Your Instagram Business account must be linked to a Facebook Page.

1. Go to [Facebook Pages](https://www.facebook.com/pages/create)
2. Create a new page or use an existing one
3. Link your Instagram account to this page:
   - Go to your Facebook Page
   - Click **Settings** → **Instagram**
   - Connect your Instagram account

---

## Step 3: Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **My Apps** → **Create App**
3. Select **Business** as the app type
4. Fill in the app details:
   - **App Name**: "Lucia Herranz Gallery" (or any name)
   - **App Contact Email**: Your email
5. Click **Create App**

---

## Step 4: Configure Instagram Basic Display

1. In your app dashboard, click **Add Product**
2. Find **Instagram Graph API** and click **Set Up**
3. In the left sidebar, go to **Instagram Graph API** → **Basic Display**
4. Click **Create New App** (under Instagram Basic Display)
5. Add your website URL (e.g., `https://yourusername.github.io/lucia-herranz-soprano`)

---

## Step 5: Get Access Token

### Option A: Using Graph API Explorer (Easier)

1. Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your app from the dropdown
3. Click **Generate Access Token**
4. Grant permissions: `instagram_basic`, `pages_show_list`, `pages_read_engagement`
5. You'll get a **Short-lived Access Token** (valid for ~1 hour)

### Convert to Long-lived Token:

Run this command in your terminal (replace the placeholders):

```bash
curl -X GET "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=YOUR_SHORT_LIVED_TOKEN"
```

This returns a **Long-lived Access Token** (valid for 60 days).

### Option B: Manual API Call

1. Get your App ID and App Secret from your Facebook App dashboard
2. Use the Graph API Explorer to get a short-lived token
3. Exchange it for a long-lived token using the curl command above

---

## Step 6: Get Instagram User ID

Run this command with your access token:

```bash
curl -X GET "https://graph.facebook.com/v18.0/me/accounts?access_token=YOUR_LONG_LIVED_TOKEN"
```

This returns your Facebook Page ID. Then get your Instagram Business Account ID:

```bash
curl -X GET "https://graph.facebook.com/v18.0/PAGE_ID?fields=instagram_business_account&access_token=YOUR_LONG_LIVED_TOKEN"
```

The `instagram_business_account.id` is your **Instagram User ID**.

---

## Step 7: Add Secrets to GitHub

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add two secrets:

   **Secret 1:**
   - Name: `INSTAGRAM_ACCESS_TOKEN`
   - Value: Your long-lived access token

   **Secret 2:**
   - Name: `INSTAGRAM_USER_ID`
   - Value: Your Instagram Business Account ID

---

## Step 8: Test the Workflow

1. Go to your repository on GitHub
2. Click **Actions** tab
3. Select **Fetch Instagram Posts** workflow
4. Click **Run workflow** → **Run workflow** (manual trigger)
5. Wait for the workflow to complete
6. Check if `src/data/instagram-posts.json` was updated with your posts

---

## Step 9: Refresh Access Token (Every 60 Days)

Long-lived tokens expire after 60 days. You have two options:

### Option A: Manual Refresh
Repeat Step 5 every 60 days to get a new token.

### Option B: Automatic Refresh (Recommended)
Use Facebook's token refresh endpoint before expiration:

```bash
curl -X GET "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=YOUR_CURRENT_TOKEN"
```

---

## Troubleshooting

### Error: "Invalid OAuth access token"
- Your token has expired. Generate a new one (Step 5)
- Make sure you're using a long-lived token, not a short-lived one

### Error: "Permissions error"
- Ensure your Instagram account is a Business/Creator account
- Check that your Facebook Page is properly linked
- Verify you granted the correct permissions

### No posts showing up
- Check that your Instagram posts are public
- Verify the workflow ran successfully in GitHub Actions
- Check the workflow logs for error messages

### Posts not updating
- The workflow runs daily at 6 AM UTC
- You can manually trigger it from the Actions tab
- Check GitHub Actions usage limits (2000 minutes/month for free accounts)

---

## Testing Locally

To test the fetch script locally before pushing:

1. Create a `.env` file in the project root:
```
INSTAGRAM_ACCESS_TOKEN=your_token_here
INSTAGRAM_USER_ID=your_user_id_here
```

2. Run the script:
```bash
node .github/scripts/fetch-instagram.js
```

3. Check `src/data/instagram-posts.json` for the fetched posts

---

## Additional Resources

- [Instagram Graph API Documentation](https://developers.facebook.com/docs/instagram-api)
- [Facebook Access Tokens](https://developers.facebook.com/docs/facebook-login/guides/access-tokens)
- [Instagram Basic Display API](https://developers.facebook.com/docs/instagram-basic-display-api)

---

## Need Help?

If you encounter issues:
1. Check the GitHub Actions logs for detailed error messages
2. Verify your Instagram account type (must be Business/Creator)
3. Ensure your Facebook Page is properly connected
4. Test your access token using the Graph API Explorer

Good luck! 🎭
