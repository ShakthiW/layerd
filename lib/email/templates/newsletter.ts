export const getNewsletterTemplate = () => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Layerd</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #000000;
          color: #ffffff;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 40px 20px;
          background-color: #000000;
        }
        .header {
          text-align: center;
          padding-bottom: 30px;
          border-bottom: 1px solid rgba(212, 168, 83, 0.2);
        }
        .logo {
          font-size: 24px;
          font-weight: 300;
          letter-spacing: 4px;
          color: #ffffff;
          text-decoration: none;
        }
        .content {
          padding: 40px 0;
          text-align: center;
        }
        h1 {
          font-size: 28px;
          font-weight: 300;
          margin-bottom: 20px;
          color: #ffffff;
        }
        .accent {
          color: #d4a853;
          font-style: italic;
        }
        p {
          font-size: 16px;
          line-height: 1.6;
          color: #a1a1aa;
          margin-bottom: 30px;
        }
        .btn {
          display: inline-block;
          padding: 14px 32px;
          background-color: #d4a853;
          color: #000000;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 30px;
        }
        .footer {
          text-align: center;
          padding-top: 30px;
          border-top: 1px solid rgba(212, 168, 83, 0.2);
          font-size: 12px;
          color: #71717a;
        }
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212, 168, 83, 0.5), transparent);
          margin: 10px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">LAYERD</div>
        </div>
        
        <div class="content">
          <div class="divider"></div>
          <h1>Welcome to the <span class="accent">Journey</span></h1>
          
          <p>
            Thank you for subscribing to our newsletter. You're now on the list to be the first to know about new drops, exclusive collections, and behind-the-scenes looks at our creative process.
          </p>
          
          <p>
            We craft premium 3D printed realities, layer by layer. Stay tuned for what's coming next.
          </p>
          
          <a href="https://layerd.com" class="btn">Explore Collections</a>
        </div>
        
        <div class="footer">
          <p>You received this email because you subscribed to the Layerd newsletter.</p>
          <p>&copy; ${new Date().getFullYear()} Layerd. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
