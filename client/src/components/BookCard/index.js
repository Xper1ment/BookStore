import { useState } from 'react';
import { 
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Modal,
    Fade,
    Backdrop,
    Badge
} from '@mui/material';
import { Navigate , useNavigate } from 'react-router-dom';
import UserBookCart from '../UserBookCart';
import {
    addtoBookCart,
    deletefromBookCart,
    addtoWishList,
    deletefromWishList
} from '../../redux';
import { connect } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const styles = {
    cardContent : {
        body :{
            display : 'flex',
        },
        price : {
            borderRight : '1px solid gray',
            pr : 2,
        }
    },
    hr : {
        width : '10px',
        float : 'left'
    },
    btn :{
        padding : '0.7rem',
        background : '#d32f2f',
        border : '0px',
        marginRight : '0.5rem',
        borderRadius : '5%',
        color : 'white',
        fontWeight : 'bold'
    },
    link :{
        '&.MuiTypography-root':{
            ':hover':{
                color:'red',
                'text-decoration' : 'underline'
            }
        }
    }
}
const BookCard = ({ book,
                    addtoBookCart, 
                    addtoWishList,
                    deletefromWishList,
                    showDeleteBtn = false,
                    bookCart,
                    wishList,
                    showNameAsLink = false,
                    setOpenSnackBar = null,
                    enlargeImg = false
                }) => {
    const navigate = useNavigate();
    const [show , setShow ] = useState(false);
    const [open, setOpen] = useState(false);
    const [ redirectToLogin , setRedirect ] = useState(false);
    const { image:url,
            price,
            name,
            author,
            format:paperBack,
            currency, 
            discount, 
            _id:bookID
    } = book;

    const handleAddToCart = () => {
        if(localStorage.getItem('token') !== null){
            setOpen(true);
            setShow(true);
            if(bookCart.filter((itm) => itm.bookID === bookID ).length > 0)
                return;
            addtoBookCart({
                url,
                name,
                author,
                price,
                currency,
                bookID,
                quantity : 1
            });
        }
        else{
            setRedirect(true);
        }
    }
    const handleClose = () => {
        setOpen(false);
        setShow(false);    
    }
    
    const handleAddtoWishList = () =>{
        if(localStorage.getItem('token') !== null ){
            if(wishList.filter((itm) => itm._id === bookID ).length > 0)
                return;    
            addtoWishList(book);
            setOpenSnackBar(true);
        }
        else
            setRedirect(true);
    }
    const handleDeletefromWishList = () =>{
        deletefromWishList(book);
    }
    
    if(redirectToLogin)
        return <Navigate to ='/login'/>
    return (
        <>
            <Card variant = 'outlined' sx={{ display: 'flex' , borderWidth : '0px' , mt : 3 , mb : 3 }}>
                <Badge 
                    badgeContent = {(parseInt(discount))?`${parseInt(discount)}%`:null} 
                    sx = {{ right : -3 , top : 13 }} 
                    color = "primary"
                >
                    <CardMedia
                        component="img"
                        sx={{ width: (enlargeImg)?'10rem':'6rem' , pl : 1 }}
                        image={url}
                        alt="Live from space album cover"
                    />
                </Badge>  
                <Box sx={{ display: 'flex', flexDirection: 'row' , width : '100%'}}>
                    <CardContent sx={{ width : '50%' }}>
                        {
                            (showNameAsLink)?
                                <Typography 
                                    sx = {styles.link}
                                    onClick = {()=>navigate(`/description/${bookID}`)}
                                >
                                    {name}
                                </Typography>:
                                <Typography>
                                    {name}
                                </Typography>
                        }
                        <Typography variant="subtitle1" color="text.secondary" sx = {{ fontSize : '1rem'}}>
                            {author}
                        </Typography>
                        <Box sx = { styles.cardContent.body }>
                            <Box sx = { styles.cardContent.price}>
                                <Typography sx ={{ color : 'red' }}>{price}{currency}</Typography>
                            </Box>
                            <Box sx = {{ pl : 3}}>
                                <Typography>{paperBack}</Typography>
                            </Box>
                        </Box>
                    </CardContent>
                    <Box sx = {{ height : '80%' , borderLeft : '1px solid gray' , pl : 1 , mt : 3 }}>
                        <Typography sx = {{ fontSize : 14 , color : 'green' }}>Available</Typography>
                        <Typography sx = {{ fontSize : 11 }}>
                            Ships within 1-2 Days
                            ₹39 shipping in India per item and low cost Worldwide
                        </Typography>
                        <Box sx ={{ display : 'flex'}}>
                            <button style = { styles.btn } onClick={handleAddToCart}>
                                Buy Now
                            </button>
                            {
                              (!showDeleteBtn)?
                                <button style = { { ...styles.btn , background : '#616161' } } 
                                        onClick={ handleAddtoWishList }>
                                    Add to Wishlist
                                </button>:
                                <button style = { { ...styles.btn , background : '#616161' } } 
                                        onClick={ handleDeletefromWishList }>
                                    Delete
                                </button>
                            }
                        </Box>
                    </Box>
                </Box>
            </Card>
            <hr/>
            {/* BookCart Modal*/}
            { show && 
                <UserBookCart
                    open = {open}
                    handleClose = {handleClose}
                    BackDrop = {Backdrop}               
                />
            }
        </>
    );
}


const mapStateToProps = state => {
    return {
      bookCart: state.bookCart.item,
      wishList : state.wishList.item
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        addtoWishList: (item) =>dispatch(addtoWishList(item)),
        deletefromWishList: (idx) =>dispatch(deletefromWishList(idx)),
        addtoBookCart: (item) =>dispatch(addtoBookCart(item)),
        deletefromBookCart: (idx) =>dispatch(deletefromBookCart(idx))
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookCard)