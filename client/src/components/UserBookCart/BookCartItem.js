import { 
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Modal,
    Fade,
    Backdrop,
    Badge,
    IconButton,
    Tooltip
} from '@mui/material';
import {
    addtoBookCart,
    deletefromBookCart,
    addtoWishList,
    deletefromWishList,
    updateBookinBookCart
} from '../../redux';
import { connect } from 'react-redux';
import { useState } from 'react';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const BookCartItem = ({   
                        book, 
                        idx, 
                        bookCart,
                        setCalculate,
                        addtoBookCart,
                        updateBookinBookCart, 
                        deletefromBookCart}) =>{
    
    const { 
        url,
        name,
        author,
        price,
        bookID,
        quantity,
        currency
    } = book;
    const [ currquantity , setCurrQuantity ] = useState(quantity||1);
    const handleDeleteBtn = () =>{ 
        deletefromBookCart(book);
        setCalculate(true);
    }
    const handleInputChange = (e) =>{
        let { max , min , value } = e.target;
        value = Math.max(min, Math.min(max,value));
        setCurrQuantity(value);        
    }
    const handleClicktoConfirm = ()=>{
        if(currquantity > 0){
            setCalculate(true);
            updateBookinBookCart({ ...book , quantity : currquantity });
        }                
    }
    return(
            <Box sx = {{ border : '1px solid black' , mb : 1 , p : 1}}>
                <Card   
                    variant = 'outlined' 
                    sx={{ 
                            display: 'flex',
                            borderWidth : '0px',
                            mt : 3,
                            mb : 3,
                            justifyContent : 'space-evenly' 
                        }}
                >
                    <Typography variant ='h6'>
                        {idx + 1}
                    </Typography>
                    <CardMedia
                        component="img"
                        sx={{ width: '2.5rem', height : '3rem', pl : 1 }}
                        image={url}
                        alt="No Image"
                    />
                    <Box sx={{ 
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent : 'space-evenly',
                            width : '100%'}}>
                        <CardContent sx={{ width : '50%' }}>
                            <Typography>
                                {name}
                            </Typography>
                            <Typography 
                                variant="subtitle1" 
                                color="text.secondary" 
                                sx = {{ fontSize : '1rem'}}
                            >
                                {`by ${author}`}
                            </Typography>
                        </CardContent>
                        <input
                            style = {{height: '1rem'}}
                            type = 'number'
                            min = {1}
                            max = {100}
                            value = { currquantity } 
                            onChange = {(e) => handleInputChange(e)}
                        />
                        <Tooltip title = 'Update'>                            
                            <AutorenewIcon 
                                style ={{ color : 'green'}}
                                onClick = {() => handleClicktoConfirm()}
                            />
                        </Tooltip>
                        <span>${price}</span>
                        <span>${(currquantity*price).toFixed(2)||price}</span>
                        <button
                            style = {{ height : '2rem'}} 
                            onClick = {()=>handleDeleteBtn()}>
                            x
                        </button>
                    </Box>
                </Card>
            </Box>
        )
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
        deletefromBookCart: (item) =>dispatch(deletefromBookCart(item)),
        updateBookinBookCart: (item) =>dispatch(updateBookinBookCart(item)),
        
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookCartItem)