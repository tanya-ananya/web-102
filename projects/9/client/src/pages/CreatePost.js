import React from 'react';
import './CreatePost.css'
import { useState } from 'react';
import { supabase } from '../client';

const CreatePost = () => {

    const createPost = async (event) => {
        event.preventDefault();
        await supabase
            .from('posts')
            .insert({title: post.title, author: post.author, description: post.description})
            .select();
        window.location='/'
        console.log('print')
    }

    const [post, setPost] = useState({title: "", author: "", description: ""})

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    return (
        <div>
            <form>
                <label for="title">Name:</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br/>

                <label for="author">Speed</label><br />
                <input type="text" id="author" name="author" onChange={handleChange} /><br />
                <br/>

                <label for="description">Color</label><br />
                <input type="text" id="description" name="description" onChange={handleChange} /><br />
                <br/>

                <input type="submit" value="Submit" onClick={createPost}/>
            </form>
        </div>
    )
}

export default CreatePost