import { useState , useEffect } from 'react';
import { Typography } from '@mui/material';
import BookList from './BookList';
import { useParams } from 'react-router-dom';
import HomePage from './HomePage';
import CircularProgress from '@mui/material/CircularProgress';

const SearchPage = () =>{
    const { name } = useParams();
    const [ books , setBooks ] = useState();
    useEffect(()=>{
        const getBookList = async () =>{
            const response  = await fetch(`/book?search=${name}`);
            const result = await response.json();
            await setBooks(result.bookByName);   
        }
        getBookList();        
    },[name])

    if(!books)
        return <CircularProgress sx = {{ m :  'auto'}}/>
    return(
        <>
            {
                (books.length > 0)?
                    <BookList searchedBooks = { books }/>:
                    <HomePage>
                        <Typography sx = {{ p : 6 }}>No books found as searched.</Typography>
                    </HomePage>
            }
        </>
    )
}

export default SearchPage;