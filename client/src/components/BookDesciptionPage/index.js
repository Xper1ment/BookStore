import { 
    Box,
    Typography,
    Grid,
    Snackbar,
    Container,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import BookCard from '../BookCard';
import { useParams } from 'react-router-dom';
import { useEffect , useState } from 'react';
import * as React from 'react';

//Page about describing the book , the user click on the HomePage 
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BookDescriptionPage = () =>{
    const params = useParams();
    const [ book , setBook ] =  useState({});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const getDescription = async() =>{
            const result = await fetch(`/book?id=${params.id}`);
            setBook(await result.json());
        }
        getDescription();
    }, [])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };
    return(
        <Container>
            <Grid container spacing = {2}>
                <Grid item sm = {1}>
                </Grid>
                <Grid item sm = {7}>
                    {(book !== {})?
                        <BookCard 
                            book = {book}
                            enlargeImg = {true}
                            setOpenSnackBar = { setOpen }
                        />:
                        ''
                    }
                </Grid>
                <Grid item sm = {3}>
                        <Typography sx ={{ mt : 2}}>{'Safe & Secure Shopping'}</Typography>
                        <Box sx ={{ display : 'flex'}}>
                            <img src= 'https://www.bookswagon.com/images/safe-shopping-ico.gif'/>
                            <Typography sx ={{ fontSize : 12 }}>
                                Payment accepted by All Major Credit and Debit cards, lnternet banking, Paypal, Cash-on-Delivery.
                            </Typography>
                        </Box>
                </Grid>
            </Grid>
            <Grid container spacing = {2}>
                <Grid item sm = {1}>
                </Grid>
                <Grid item sm = {8}>
                    <Box sx = {{ width : '40rem'}}>
                        <Typography>About the Book</Typography>                        
                        <Typography variant = 'body2'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Orci dapibus ultrices in iaculis nunc sed augue lacus viverra. 
                            Vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. 
                            Elit pellentesque habitant morbi tristique. 
                            Quam id leo in vitae turpis massa sed. 
                            Consequat semper viverra nam libero justo laoreet sit amet. 
                            Iaculis nunc sed augue lacus viverra vitae. 
                            Rhoncus urna neque viverra justo nec ultrices dui sapien eget. 
                            Dapibus ultrices in iaculis nunc. Felis imperdiet proin fermentum leo. 
                            Massa eget egestas purus viverra accumsan in. 
                            Eget nunc lobortis mattis aliquam faucibus. 
                            Tristique et egestas quis ipsum suspendisse ultrices gravida. 
                            Ultricies integer quis auctor elit sed vulputate mi sit. 
                            Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque. 
                            Pharetra diam sit amet nisl. Facilisis volutpat est velit egestas dui id ornare.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
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
        </Container>
    )
}
export default BookDescriptionPage;