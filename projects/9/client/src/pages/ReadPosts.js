import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client';

const ReadPosts = (props) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            const {data} = await supabase
                .from('posts')
                .select()
                .order('created_at', {ascending: true})
            console.log(data);
            setPosts(data)
        }
        fetchPost();
    }, []);
    
    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                posts.map((post, index) => 
                   <Card key={post.id} id={post.id} title={post.title} author={post.author} description={post.description}/>
                ) : <h2>{'No Characters Yet 😞'}</h2>
            }
        </div>  
    )
}

export default ReadPosts;