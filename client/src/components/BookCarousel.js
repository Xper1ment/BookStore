import { useState , useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typography } from '@mui/material';
import HomePage from './HomePage';
import React from "react";
import Carousel from "react-slick";
import { useNavigate } from 'react-router-dom';
const styles = {
    link :{
        '&.MuiTypography-root':{
            ':hover':{
                color:'red',
                'text-decoration' : 'underline'
            }
        }
    }
}
const BookCarousel = () =>{
    const [MedBooks , setMedBooks] = useState([]);
    const [SportBooks, setSportBooks ] = useState([]);
    const [RomanceBooks,setRomanceBooks ] = useState([]);
    const navigate = useNavigate();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay : true
      };
    useEffect(()=>{
        const getBooks = async (category , setState) =>{
            const response = await fetch(`/book/sort?category=${category}&order=-1&orderBy=name`)
            setState(await response.json());
        }
        getBooks('Medical',setMedBooks);
        getBooks('Sport',setSportBooks);
        getBooks('Romance',setRomanceBooks);
    },[])

    return(
        <HomePage>
            <div style= {{marginTop : '2rem'}}>
                <Typography variant = 'h6'>Medical</Typography>
                <Carousel {...settings}>
                    {
                        (MedBooks.length>0) &&
                            MedBooks.map((book)=>(
                                <div>
                                    <img 
                                        src = {book.image||null}
                                        style = {{
                                            width : '5rem',
                                            height : '7rem'
                                        }}
                                    />
                                    <Typography
                                        sx = {styles.link}
                                        onClick = {()=>navigate(`/description/${book._id}`)}
                                    >
                                        {book.name}
                                    </Typography>
                                    <Typography variant = 'body2'>by {book.author}</Typography>
                                    <Typography variant = 'body2'>{book.price}{book.currency}</Typography>
                                </div>
                            ))
                    }
                </Carousel>
                
                <Typography variant = 'h6' sx ={{ mt : 6}}>Sport</Typography>
                <Carousel {...settings}>
                    {
                        (SportBooks.length>0) &&
                            SportBooks.map((book)=>(
                                <div>
                                    <img 
                                        src = {book.image||null}
                                        style = {{
                                            width : '5rem',
                                            height : '7rem'
                                        }}
                                    />
                                    <Typography
                                        variant = 'subtitle1'
                                        sx = {styles.link}
                                        onClick = {()=>navigate(`/description/${book._id}`)}
                                    >
                                        {book.name}
                                    </Typography>
                                    <Typography variant = 'body2'>by {book.author}</Typography>
                                    <Typography variant = 'body2'>{book.price}{book.currency}</Typography>
                                </div>
                            ))
                    }
                </Carousel>
                
                <Typography variant = 'h6' sx ={{ mt : 6 }}>Romance</Typography>
                <Carousel {...settings} >
                    {
                        (RomanceBooks.length>0) &&
                            RomanceBooks.map((book)=>(
                                <div>
                                    <img 
                                        src = {book.image||null}
                                        style = {{
                                            width : '5rem',
                                            height : '7rem'
                                        }}
                                    />
                                    <Typography
                                        variant = 'subtitle1'
                                        sx = {styles.link}
                                        onClick = {()=>navigate(`/description/${book._id}`)}
                                    >
                                        {book.name}
                                    </Typography>
                                    <Typography variant = 'body2'>by {book.author}</Typography>
                                    <Typography variant = 'body2'>{book.price}{book.currency}</Typography>
                                </div>
                            ))
                    }
                </Carousel>
            </div>
        </HomePage>
    )
}
export default BookCarousel;

