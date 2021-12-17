import LoopIcon from '@mui/icons-material/Loop';
import { useState , useEffect } from 'react';
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
import {
    addtoBookCart,
    deletefromBookCart,
    addtoWishList,
    deletefromWishList
} from '../../redux';
import { connect } from 'react-redux';
import BookCartItem from './BookCartItem'
const style = {
    header : {
        background : 'red',
        display : 'flex',
        justifyContent : 'space-between',
        p: 1
    },
    bground : {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    },
    parentBox : {
        height : 200,
        bgColor : 'grey',
        overflow : 'scroll',
        mt : 2
    }  
}

const UserBookCart = ({ open,
                        handleClose, 
                        bookCart, 
                        addtoBookCart, 
                        deletefromBookCart}) =>{

    const [ totalGross , setTotalGross ] = useState(0);
    const [calculate , setCalculate ] = useState(false);
    useEffect(() => {
        setCalculate(false);
        if(bookCart.length!==0){
            let total = 0.0;
            bookCart.map((book) =>{
                total+=(parseFloat(book.quantity)*parseFloat(book.price));
            })
            setTotalGross(total.toFixed(3));
        }
    }, [calculate])
    return(
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={style.bground}>
                    <Box sx={ style.header }>
                        <Typography>{`My Shopping Cart`}</Typography>
                        <button onClick = {handleClose}>x</button>
                    </Box>
                    <Box 
                        sx ={{  
                                display : 'flex', 
                                justifyContent : 'space-around',
                                mt : 1
                            }}
                    >
                        <Typography>Sr.#</Typography>
                        <Typography>Item Description</Typography>
                        <Typography>Quantity</Typography>
                        <Box 
                            sx ={{ 
                                    display : 'flex', 
                                    justifyContent : 'space-between'
                                }}
                        >
                            <Typography>Item Price</Typography>
                            <Typography sx ={{ ml : 1}}>Total Price</Typography>
                        </Box>
                    </Box>
                    {
                        (bookCart.length !== 0 )?
                            (<>
                                <Box sx = {style.parentBox}>
                                    {
                                        bookCart.map((book ,idx)=>{
                                                return(
                                                    <BookCartItem
                                                        setCalculate = {setCalculate}
                                                        book = {book}
                                                        idx = {idx} 
                                                    />
                                                )
                                            }
                                        )
                                    }
                                </Box>
                                <Box 
                                    sx = {{ 
                                            display : 'flex', 
                                            flexDirection : 'column', 
                                            alignItems : 'flex-end', 
                                            m : 3 
                                        }}
                                >
                                    <span>{`Total Gross : $${totalGross}`}</span>
                                    <span>Shipping (India) : Free</span>
                                    <span style = {{ color : 'green'}}>Amount Payable : ${totalGross}</span>                                                
                                </Box>
                            </>):
                            <Typography variant = 'h6'>No items in Cart</Typography>
                    }
                </Box>
            </Fade>
        </Modal>
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
        deletefromBookCart: (idx) =>dispatch(deletefromBookCart(idx))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserBookCart)
