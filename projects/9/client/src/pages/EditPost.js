import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css';
import { supabase } from '../client';

const EditPost = ({data}) => {

    const updatePost = async (event) => {
        event.preventDefault();
    
        const { error } = await supabase
            .from('posts')
            .update({
                title: post.title,
                author: post.author,
                description: post.description
            })
            .eq('id', id);
    
        if (error) {
            console.error('Update failed:', error.message);
        } else {
            console.log('Post updated successfully!');
        }
    };    

    const deletePost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('posts')
          .delete()
          .eq('id', id); 
      
        window.location = "http://localhost:3000/";
    }

    const {id} = useParams();
    const [post, setPost] = useState({id: null, title: "", author: "", description: ""});

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
                <label for="title">Name</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br/>

                <label for="author">Speed</label><br />
                <input type="text" id="author" name="author" value={post.author} onChange={handleChange} /><br />
                <br/>

                <label for="description">Color</label><br />
                <textarea rows="5" cols="50" id="description" value={post.description} onChange={handleChange} >
                </textarea>
                <br/>
                <input type="submit" value="Submit" onClick={updatePost}/>
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default EditPost