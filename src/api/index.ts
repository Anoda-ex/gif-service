import { baseUrl, limitForLoading, apiKey } from "../config/apiConfig" 
import { type IGifData, type IGifDataResponse, type IUser } from '../types';

export const getRandomGifs = () => {
    return new Promise((resolve, reject) => {
        let fetches = []
        for(let i = 0; i<25; i++){
            let localFetch = fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&rating=g`)
            .then(res=>{
                return res.json()
            })
        
            fetches.push(localFetch)
        }
        Promise.all(fetches)
            .then(results => {
                let res:IGifData[]= results.map(item=>{
                    if(item.meta.status===200){
                        return item.data
                    }else{
                        return null
                    }
                }).filter(item=>item)
                if(res.length===0){
                    reject(null)
                }else{
                    resolve(res)                   
                }
            })


    })
}
export const getSearchGifs = (offset:number = 0, search:string) => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}&limit=${limitForLoading}&offset=${offset}&rating=g&bundle=messaging_non_clips`)
        .then(res=>{
            return res.json()
        }).then(res=>{
            console.log('getTrendGifs 2', res);
            if(res.meta.status===200){
                resolve(res)
            }else{
                reject(null)
            }
        })
    })
}
export const getGifById = (id:string) => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=${apiKey}&rating=g`)
        .then(res=>{
            return res.json();
        }).then(res=>{
            console.log('getGifById', res);
            if(res.meta.status===200){
                resolve(res)
            }else{
                reject(null)
            }
        })
    })
}
export const getNotFoundGif = () => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&rating=g&limit=${25}&offset=${0}&q=not+found+result`)
        .then(res=>{
            return res.json();
        }).then(res=>{
            // console.log('getGifById', res);
            if(res.meta.status===200){
                resolve(res.data[0])
            }else{
                reject(null)
            }
        })
    })
}

export const getUser = (username:string) => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.giphy.com/v1/channels/search?api_key=${apiKey}&limit=${25}&offset=${0}&q=${username}`)
        .then(res=>{
            return res.json();
        }).then(res=>{
            // console.log('getGifById', res);
            if(res.meta.status===200){
                let findedUser = res.data.find((user:{user:IUser})=>user.user.username===username)
                if(findedUser){
                    resolve(findedUser.user)
                }else{
                    reject(null)
                }
                resolve(res.data[0].user)
            }else{
                reject(null)
            }
        })
    })
}

// sessionStorage.setItem("key", "value");

// // Get saved data from sessionStorage
// let data = sessionStorage.getItem("key");