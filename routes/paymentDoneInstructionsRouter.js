module.exports.route = app => {
   
  
    app.get("/paymentDoneInstruction",async (req, res, next) =>{
     
            res.render("paymentDoneInstruction");
    
     
    });
  };
  