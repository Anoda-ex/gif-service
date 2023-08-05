export interface IGifData{
    id:string,
    images:{
        original:{
            url:string
        },
        fixed_width_small:{
            url:string
        }
    },
    title: string,
    embed_url:string,
    user: IUser
}
export interface meta {
    msg:string,
    response_id:string,
    status: 200
}
export interface IGifDataResponse{
   data: IGifData,
   meta: meta
}
export interface IPagination{
    count:number
    offset:number
    total_count:number
}

export interface IResponse {
    pagination:IPagination,
    meta: meta,
    data: IGifData[]
}
export interface IUser{
    avatar_url: string,
    profile_url: string,
    username: string,
    display_name: string
}
