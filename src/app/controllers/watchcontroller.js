const axios = require('axios')
const phims = require("../models/phims");
class watchController {
    watch(req, res, next){
        const slug = req.params.slug;
        const episode = req.query.ep;
 const get = axios.get(`https://ophim1.com/phim/${slug}`)
        .then(function(response){
       return response.data 
        
      }).catch(function(error){
          next();
        })

  const getsimilar = async function(){
  
      const phim = await get;
      const category = phim.movie.category[0].name;
     return phims.find({"movie.category.name": {$eq: `${category}`}}).limit(14)
      .then(function(response){
        const top = response.map(function (e, i){
          return e.movie;
             })
          return top;
      })
    }
      

    const data = async function(){
      try{ 
         var   currentEp;
         const detail = await get; 
         const link = detail.episodes[0].server_data
         const similar = await getsimilar();
         
         if(episode === 'Full'){
           currentEp = link[0] ;
         }else{
           currentEp = link[episode - 1]
         }
         
      res.render('partials/watch', {layout: 'layouts/main', currentEp:currentEp, link, detail, similar})
       
      }catch(e){
        next()
      }
     
      
        //  res.render('partials/watch', {layout: 'layouts/main', link})
         
      // res.send(film)
    }
      
          data()
        
        
          
        
      
    }

    LoginPage(req, res, next){


    }
}

module.exports = new watchController;