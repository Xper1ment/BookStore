import { 
    Box,
    Typography,
    MenuItem,
    TextField,
    Snackbar,
} from '@mui/material';
import {
    addtoBookCart,
    deletefromBookCart,
    addtoWishList,
    deletefromWishList,
    addArraytoBookCart,
    addArraytoWishList
} from '../../redux';
import MuiAlert from '@mui/material/Alert';
import { useEffect , useState } from 'react';
import { red } from '@mui/material/colors';
import BookCard from '../BookCard';
import BookCarousel from '../BookCarousel';
import { connect } from 'react-redux';
import styles from './styles';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import HomePage from '../HomePage';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const BookList = ({bookCart , wishList , addArraytoBookCart , searchedBooks = null}) =>{
    const params = useParams();
    const [List,setList] = useState([]);
    const [open,setOpen] = useState(false);
    const [sortBy, setSortBy] = useState('name');

    const sortByOptions = [
        {
            value: '-name',
            label: 'Title - Z to A ',
        },
        {
            value: 'name',
            label: 'Title - A to Z',
        },
        {
            value: 'price',
            label: 'Price - Low to High',
        },
        {
            value: '-price',
            label: 'Price - High to Low'
        },
        {
            value: 'discount',
            label: 'discount - Low to High'
        },
        {
            value: '-discount',
            label: 'discount - High to Low'
        }
      ];

    useEffect(() => {
        const getBookList = async () =>{
            const order = (sortBy[0] === '-')?-1:1;
            const orderBy = (sortBy[0] === '-')?sortBy.slice(1):sortBy;
            const result = await fetch(`/book/sort?category=${params.id}&order=${order}&orderBy=${orderBy}`)
            if(searchedBooks === null)
                setList(await result.json());
        }
        getBookList();
    }, [params.id,sortBy])

    useEffect(()=>{
        const getBookCart = async () =>{
            if(searchedBooks !== null)
                setList(searchedBooks);
            if(localStorage.getItem('token') === null)
                return;
            const response = await fetch('/api/user/cartItems',{
                                            headers : {
                                                'authorization' : localStorage.getItem('token')                
                                            },
                                            method : 'GET'
                                        })
            const result = await response.json();
            if( bookCart.length ===0 && result.length === 1)                            
                addtoBookCart(result);
            if( bookCart.length ===0 && result.length > 1)                            
                addArraytoBookCart(result);                                
        }
        getBookCart()      
    },[])


    useEffect(() => {
        const postBookCart = async() =>{
            if(localStorage.getItem('token') === null)
                return;
            const sendToCart = bookCart;   
            await fetch(`/api/user/cartItems` ,{
                            method: 'POST',
                            headers : {
                                "Content-type": "application/json; charset=UTF-8",
                                'authorization' : localStorage.getItem('token')
                            },
                            body :JSON.stringify({sendToCart})
            })
                 
        }
        postBookCart();
    }, [bookCart])
    
    useEffect(() =>{
        const postWishList = async() =>{
            const bookID = (wishList.length > 0 )?
                                        (wishList.map((book) =>(book._id)))
                                        :[];
            if( bookID.length === 0 )
                return;
            const response = await fetch('/api/user/wishList',{
                            method : 'POST',
                            headers : {
                                'Content-Type':'application/json',
                                'authorization': localStorage.getItem('token')
                            },
                            body : JSON.stringify({bookID})                
            })
            const result = await response.json();
        }
        postWishList();
    },[wishList])
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };
    const handleChange = (event) => {
        setSortBy(event.target.value);
    };

    return(
        <HomePage>
            <Box sx = {{ display : 'flex' , justifyContent : 'space-between' , mt : 6}}>
                <Typography variant='h5' sx ={{ fontWeight : 'bold'}}>{params.id}</Typography>
                <TextField
                    sx = {{ alignSelf : 'center'}}
                    id="outlined-select-currency"
                    select
                    value={sortBy}
                    onChange={handleChange}
                >
                    {sortByOptions.map((option) => (
                        <MenuItem value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
            {
                (List.length > 0 ) &&
                    List.map((book)=>{
                        return(
                            <BookCard 
                                book = { book }
                                showNameAsLink = {true}
                                showDeleteBtn = { false }
                                setOpenSnackBar = { setOpen }
                            />
                        )
                    })
            }
            <Snackbar 
                open={open} 
                autoHideDuration={3000} 
                onClose={handleClose}
                anchorOrigin = {{ vertical : 'top' , horizontal : 'center'}}
            >
                <Alert 
                    onClose={handleClose} 
                    severity="success" 
                    sx={{ width: '100%' }}
                >
                    Added to WishList
                </Alert>
            </Snackbar>
        </HomePage>
    )
}

const mapStateToProps = state => {
    return {
      bookCart: state.bookCart.item,
      wishList : state.wishList.item,
      search : state.search.item
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        addtoBookCart : (item) => dispatch(addtoBookCart),
        addArraytoBookCart: (item) =>dispatch(addArraytoBookCart(item)),
        addArraytoWishList: (item) =>dispatch(addArraytoWishList(item))
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookList)

