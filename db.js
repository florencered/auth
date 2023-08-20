const users=[
    {
        email:"iamdhriti13@hotmail.com",
        password:"12345677"
    }
]  
//protecting routes,all users will have access to public posts,only few users will have access to privateposts 
const publicPosts=[
    {
        title:"this is a public post",
        content:"all the users who logged in will have access to it"
    },
    {
        title:"we are practising protected routes",
        content:"there will be different post which would only be available to authenticated users"
    },
    {
        title:"middleware integration",
        content:"we are practicing protected routes via middleware functions"
    },
] 
const privatePosts=[
    {
        title:"this is  post for private posts",
        content:"ONLY PRIVATE POSTS content here all the users who logged in will have access to it"
    },
    {
        title:" for private postswe are practising protected routes",
        content:"ONLY PRIVATE POSTS content here there will be different post which would only be available to authenticated users"
    },
    {
        title:"middleware integration for private posts",
        content:"ONLY PRIVATE POSTS content here we are practicing protected routes via middleware functions"
    },
] 


module.exports={users,publicPosts,privatePosts} 
