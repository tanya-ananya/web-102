import React, { useState, useEffect } from 'react';
import './Home.css'
import { supabase } from '../client';
import carImg from './car.webp'

const Home = (props) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select()
                .order('created_at', { ascending: true });
        
            if (error) {
                console.error("Supabase fetch error:", error);
            } else {
                console.log("Supabase data:", data);
                setPosts(data);
            }
        };        
        fetchPost();
    }, [props]);
    
    return (
        <div className="Home">
            <img className="carImg" alt="" src={carImg} />
        </div>  
    )
}

export default Home;