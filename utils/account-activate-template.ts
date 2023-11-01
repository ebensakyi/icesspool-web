
exports.html = (firstName:string, activationLink:string) => {
  return `

  <!DOCTYPE html>
  <html lang="en">
  
      
  <head>
          <meta charset="utf-8" />
          <title>epayments</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="description" content="Premium Bootstrap 5 Landing Page Template" />
          <meta name="keywords" content="Saas, Software, multi-uses, HTML, Clean, Modern" />
      
          <meta name="Version" content="v3.0.0" />
          <!-- favicon -->
          <link rel="shortcut icon" href="images/favicon.ico">
          <!-- Font -->
          <link href="https://fonts.googleapis.com/css?family=Nunito:400,600,700&amp;display=swap" rel="stylesheet">
      </head>
  
      <body style="font-family: Nunito, sans-serif; font-size: 15px; font-weight: 400;">
          <!-- Loader -->
          <!-- <div id="preloader">
              <div id="status">
                  <div class="spinner">
                      <div class="double-bounce1"></div>
                      <div class="double-bounce2"></div>
                  </div>
              </div>
          </div> -->
          <!-- Loader -->
  
          <!-- Hero Start -->
          <div style="margin-top: 50px;">
              <table cellpadding="0" cellspacing="0" style="font-family: Nunito, sans-serif; font-size: 15px; font-weight: 400; max-width: 600px; border: none; margin: 0 auto; border-radius: 6px; overflow: hidden; background-color: #fff; box-shadow: 0 0 3px rgba(60, 72, 88, 0.15);">
                  <thead>
                      <tr style="background-color: #2f55d4; padding: 3px 0; line-height: 68px; text-align: center; color: #fff; font-size: 24px; font-weight: 700; letter-spacing: 1px;">
                          <th scope="col"><img src="https://icesspool.net/logo1.png" height="24" alt=""></th>
                      </tr>
                  </thead>
  
                  <tbody>
                      <tr>
                          <td style="padding: 48px 24px 0; color: #161c2d; font-size: 18px; font-weight: 600;">
                              Hello, ${firstName}
                          </td>
                      </tr>
                      <tr>
                          <td style="padding: 15px 24px 15px; color: #8492a6;">
                              To activate your WAEC epyaments account, please click the button below :
                          </td>
                      </tr>
  
                      <tr>
                          <td style="padding: 15px 24px;">
                              <a href="${activationLink}" style="padding: 8px 20px; outline: none; text-decoration: none; font-size: 16px; letter-spacing: 0.5px; transition: all 0.3s; font-weight: 600; border-radius: 6px; background-color: #2f55d4; border: 1px solid #2f55d4; color: #ffffff;">Activate account</a>
                          </td>
                      </tr>
  
                    
                      <tr>
                          <td style="padding: 15px 24px 15px; color: #8492a6;">
                          <a href="https://epayments.waecgh.org">Visit epayments portal</a>.
                          </td>
                      </tr>
  
                      <tr>
                          <td style="padding: 16px 8px; color: #8492a6; background-color: #f8f9fc; text-align: center;">
                              © <script>document.write(new Date().getFullYear())</script>    <a href="https://waecgh.org">WAEC Ghana</a>.
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <!-- Hero End -->
      </body>
  
  </html>`

}

