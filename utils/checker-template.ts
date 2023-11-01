export const template = (pdfText:string) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
    <title>CSS Template</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
    * {
      box-sizing: border-box;
    }
    
    body {
      font-family: Arial, Helvetica, sans-serif;
    }
  
    
   
    

    /* Responsive layout - makes the two columns/boxes stack on top of each other instead of next to each other, on small screens */
    @media (max-width: 600px) {
      nav, article {
        width: 100%;
        height: auto;
      }
    }
    </style>
    </head>
    <body>`+
    
    pdfText
   + `</body>
    </html>
    `;
};
