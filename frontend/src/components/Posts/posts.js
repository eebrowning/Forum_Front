import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllPosts } from '../../store/posts';
import timeAgo from '../../utils/timeAgo';

function Posts() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => Object.values(state.posts));



    useEffect(() => {
        dispatch(thunkGetAllPosts());
    }, [])

    return (
        <>
            <div id='posts'>
                waaaaah
                {posts.map(post => (
                    <div key={post._id} id={post._id} className='post'>
                        <div className='post-pic'>
                            <img
                                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/669dbabb-d4c5-4170-bbe6-1fffd7b4bb09/d1hqao6-65cb92af-df90-4453-883f-9969721d6e40.png/v1/fill/w_894,h_894,q_75,strp/strawhat_sail_flag__by_zerocustom1989.png?token=yourTokenHere"
                                alt=""
                                className='profile-pic'
                            />
                        </div>
                        <div className='post-content'>
                            <h3 className='post-title'>{post.title}</h3>
                            <p className='post-body'>{post.body}</p>
                            <div className='post-extras'>
                                <p className='post-time'>{timeAgo(post.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Posts;
