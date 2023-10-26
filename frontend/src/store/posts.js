
// import api from "../api";
const BASE_URI = "https://philly-outreach-67a8895e1869.herokuapp.com";

const CREATE_POST = 'create/createPost'//create
const GET_POSTS = 'posts/getPosts'//read
const GET_POST = 'posts/getPost'//read

const UPDATE_POST = 'posts/updatePost'//update
const DELETE_POST = 'posts/deletePost'//delete


//THUNK ACTION CREATOR
const actionCreatePost = (post) => {
    return {
        type: CREATE_POST,
        post
    }
}
const actionGetPosts = (posts) => {
    return {
        type: GET_POSTS,
        posts
    }
}
const actionGetPost = (post) => {
    return {
        type: GET_POST,
        post
    }
}
const actionUpdatePost = (post) => {
    return {
        type: UPDATE_POST,
        post
    }
}
const actionDeletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
}

//THUNKS one per route
//tested, good
export const thunkGetAllPosts = () => async dispatch => {
    // let res = await api.getAllPosts();//TODO
    const res_0 = await fetch(`${BASE_URI}/api/posts`)
    const res = await res_0.json()
    console.log('THUNK, GET ALL POSTS: ')
    console.log(res.data, 'res test')
    if (res.data) {
        let posts = await res.data.posts;
        // posts = JSON.stringify(posts)
        console.log(posts, 'posts in thunk')
        dispatch(actionGetPosts(posts))
        return posts;
    }
}

//todo
export const thunkGetPost = (postId) => async dispatch => {
    console.log('post in thunkGetPost')

    const res = await fetch(`/api/posts/${postId}`)
    // console.log(postId, `THUNK, GET POST(): `)
    if (res.ok) {
        const post = await res.json();
        dispatch(actionGetPost(post))
        return post;
    }
}
//good
export const thunkCreatePost = (post) => async dispatch => {


    // const res = await api.insertPost(post);//TODO
    let res;
    if (res.status >= 200 && res.status < 400) {
        const post = await res.data.data;

        dispatch(actionCreatePost(post))
        return post;
    }
    else {

        return res.errors;
    }

}
//todo
export const thunkUpdatePost = post => async dispatch => {
    console.log(post, '\n\n\n', 'in thunkUpdatePost');

    const res = await fetch(`/api/posts/${post.id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    })
    if (res.ok) {
        const updatedPost = await res.json();
        dispatch(actionUpdatePost(updatedPost))
        return updatedPost;
    }
}

//good
export const thunkDeletePost = (postId) => async dispatch => {

    // let res = await api.deletePostById(postId);//TODO
    let res;
    console.log(res.data, 'in thunkDeletePost')
    if (res.data) {

        const newId = await res.data.data._id;
        console.log('Thunk, delete Post: ', newId, 'should be newID')
        dispatch(actionDeletePost(newId))
    }
}

//REDUCER
const iState = {};
const postsReducer = (state = iState, action) => {
    let newState;
    switch (action.type) {
        case CREATE_POST:
            newState = { ...state, [action.post._id]: action.post };
            // console.log(action, state, "...CREATE_POST... in postsReducer")
            return newState;
        case GET_POSTS:
            newState = {};
            // console.log(action.posts.profiles, 'in GET_')
            action.posts.forEach(post => {
                newState[post._id] = post;
            })
            // console.log(action, "...GET_POSTS... in postsReducer")
            return newState;
        case GET_POST:
            newState = { ...state };
            // console.log(action, "action...GET_POST... in postsReducer")
            newState[action.post.id] = action.post;
            return newState;
        case UPDATE_POST:
            newState = { ...state }
            // console.log(action.post, "action...UPDATE_POST... in postsReducer")
            newState[action.post.id] = action.post;
            return newState;
        case DELETE_POST:
            // console.log(action, 'action...DELETE_POST...')
            newState = { ...state }
            delete newState[action.postId]
            return newState;
        default:
            // console.log('yer a default, harry')
            return state;
    }
}

export default postsReducer;
