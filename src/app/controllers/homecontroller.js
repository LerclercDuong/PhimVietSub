// const users = require('../models/users')
const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb('2c6f79941461abf6df2d3d5cabfc9f81')
const axios = require('axios').default;
const phims = require('../models/phims')
const phimchieuraps = require('../models/phimchieuraps')
const phimbos = require('../models/phimbos')
const singles = require('../models/singles')
class homecontroller {
  homepage(req, res, next) {

    const getSingleFilm = phimchieuraps.find({ "movie.type": { $eq: "single" }, "movie.chieurap": { $eq: true } }).limit(21)
      .then(function (response) {
        const top = response.map(function (e, i) {
          return e.movie;
        })
        return top;
      })

    const getthumb = async function () {
      const singlemovie = await getSingleFilm;
      const thumbnail = []
      try {
        for (var i = 0; i < 21; i++) {
          await moviedb.searchMovie({ query: singlemovie[i].origin_name })
            .then((res) => {

              thumbnail.push(res.results[0])
            })
        }
        return thumbnail;
      } catch (e) {
        console.error(e)
      }

    }




    //  const actionfilm = phims.find({"movie.category.name": {$eq:"Hành Động"}, "movie.type": {$ne: "hoathinh" }}).limit(5)
    //      .then(function (response){
    //               const data = response.map(function (e){
    //                  return e.movie;
    //                  })
    //                  return data[Math.floor(Math.random() *5)];

    //                 }).catch(function (error){
    //                  next(error);
    //                 })



    async function getdata() {
      const thumbnail = await getthumb();
      const single = await getSingleFilm;
      const thumb = single[Math.floor(Math.random() * 15)]

      res.render('partials/home', { layout: 'layouts/main', thumb: thumb, top: single, thumbnail: thumbnail });


    }
    getdata()


  }





  search(req, res, next) {
    const searchresult = req.body.result;
    const getResult = phims.find({ "movie.name": { $regex: searchresult, $options: 'i' } }).sort({ timestamp: -1 })
      .then(function (response) {
        const result = response.map(function (e) {
          return e.movie;
        })
        return result;
      }).catch(function (error) {
        next(error);
      })

    const getthumb = async function () {
      const result = await getResult;
      const thumbnail = []
      try {
        for (let i = 0; i < result.length; i++) {
          await moviedb.searchMovie({ query: result[i].origin_name })
            .then((res) => {

              thumbnail.push(res.results[0])
            })

        }
        return thumbnail;

      } catch (e) {
        console.error(e)
      }
    }
    async function render() {
      const searchresult = req.body.result;
      const thumbnail = await getthumb();
      const result = await getResult;
      res.render('partials/search', { layout: 'layouts/main', result, thumbnail, searchresult });
    }
    render()
  }



  add(req, res, next) {
    async function getdata() {
      phims.find({}).limit(1)
        .then(function (data) {
          console.log(data);

        })
      for (let i = 0; i < 707; i++) {
        await axios.get(`https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${i}`)
          .then(function (response) {
            const data = response.data.items;
            for (let j = 0; j < data.length; j++) {
              axios.get(`https://ophim1.com/phim/${data[j].slug}`)
                .then(function (response) {
                  const filmdata = []
                  const data2 = response.data;

                  phims.insertMany(data2)
                  console.log(data2)
                })

            }
          })
      }

    }
    getdata()
    res.send('thanhcong')
  }

  update(req, res, next) {
    async function getdata() {
      for (let i = 0; i < 40; i++) {
        await axios.get(`https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${i}`)
          .then(function (response) {
            const data = response.data.items;
            for (let j = 0; j < data.length; j++) {
              axios.get(`https://ophim1.com/phim/${data[j].slug}`)
                .then(function (response) {
                  const filmdata = []
                  const data2 = response.data;

                  phimUpdates.insertMany(data2)
                  console.log(data2)
                })

            }
          })
      }

    }
    getdata()
    res.send('thanhcong')
  }

  phimchieurap(req, res, next) {
    const getSingleFilm = phims.find({ "movie.type": { $eq: "single" }, "movie.chieurap": { $eq: true } })
      .then(function (response) {
        const top = response.map(function (e, i) {
          return e;
        })
        return top;
      })
    async function getdata() {
      const singlefilm = await getSingleFilm;
      phimchieuraps.insertMany(singlefilm)


    }
    getdata()
    res.send('thanhcong')
    // console.log(data)
  }

  phimbo(req, res, next) {
    const getSeries = phims.find({ "movie.type": { $eq: "series" } })
      .then(function (response) {
        const top = response.map(function (e, i) {
          return e;
        })
        return top;
      })
    async function getdata() {
      const seriesmovies = await getSeries;
      phimbos.insertMany(seriesmovies)


    }
    getdata()
    res.send('thanhcong')
  }
  updateSingle(req, res, next) {
    async function getdata() {
      for (let i = 0; i < 1033; i++) {
        await axios.get(`https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${i}`)
          .then(function (response) {
            const data = response.data.items;
            for (let j = 0; j < data.length; j++) {
              
              axios.get(`https://ophim1.com/phim/${data[j].slug}`)
                .then(function (response) {
                  
                  const movie = response.data;
                  const type =  response.data.movie.type;
                  if(type =='single'){
                    singles.insertMany(movie);

                    
                    console.log(movie);
                  }
                  
                })

            }
          })
      }

    }
    getdata();
    res.send('thanhcong')
  }
}

module.exports = new homecontroller;