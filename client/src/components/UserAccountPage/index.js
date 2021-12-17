import { 
    Box,
    Container,
    Typography,
    Button,
    ButtonGroup,
    Grid
} from '@mui/material';
import {
    addtoBookCart,
    deletefromBookCart,
    addtoWishList,
    deletefromWishList,
    addArraytoWishList
} from '../../redux';
import { connect } from 'react-redux';
import { useState , useEffect } from 'react';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import BookCard from '../BookCard';
import WishList from './WishList';

const styles = {
    passwordForm : {
        box :{
            display : 'flex',
            flexDirection : 'column',
            height : '10rem',            
            justifyContent : 'space-evenly',
            background: '#f5f5f5',
            borderRadius : '2%',
            alignItems : 'center' 
        }
    }
}

const ChangePasswordForm = () =>{
    const [ password , setPassWord ] = useState('');
    const [ confirmPassword , setConfirmPassword ] = useState('');
    const [ error , setError ] = useState('');

    const handleOnSubmit = async (e)=>{
        e.preventDefault();
        if(password.length === 0){
            setError('Password cannot be empty');
            return;
        }
        if(confirmPassword !== password){
            setError('Confirm Password not matching');
            return;    
        }
        
         await fetch('/api/user',{
                        method: 'PUT',
                        headers:{
                            'Content-Type':'application/json',
                            'authorization':localStorage.getItem('token')
                        },
                        body : JSON.stringify({password})
            });
        setError('');
    }

    return(
        <form onSubmit = {(e)=>{handleOnSubmit(e)}}>
            <Box style = { styles.passwordForm.box }>
                <div>
                    <label>New Password :</label>
                    <input 
                        value = {password} 
                        onChange = {(e)=>setPassWord(e.target.value)}
                    />
                </div>
                <div>
                    <label>Confirm Password :</label>
                    <input 
                        value = {confirmPassword} 
                        onChange = {(e)=>setConfirmPassword(e.target.value)}
                    />
                </div>
                <Typography sx ={{ color : 'red' , fontSize : '12px'}}>{error}</Typography>
            </Box>
            <input type = 'submit' style = {{ marginLeft : 'calc((100% - 100px)/2)' , width : '100px'}}/>
        </form>
    )
}

//Form to User Details
const PersonalSettings=() =>{
    const [ email , setEmail ] = useState('');
    const [ error , setError ] = useState('');

    const handleOnSubmit = async (e)=>{
        e.preventDefault();
        if(email === ''){
            setError('Email cannot be empty');
        }
        const response = await fetch('/api/user',{
                                        method : 'PUT',
                                        headers : {
                                            'Content-Type' : 'application/json',
                                            'authorization' : localStorage.getItem('token')
                                        },
                                        body : JSON.stringify({email})
                                });
        
    }

    return(
        <form onSubmit = {(e)=>{handleOnSubmit(e)}}>
            <Box sx = {{ ...styles.passwordForm.box , height : '5rem'}}>
                <div>
                    <label>Email :</label>
                    <input 
                        value = {email} 
                        onChange = {(e)=>setEmail(e.target.value)}
                    />
                </div>
                <Typography sx ={{ color : 'red' , fontSize :'12px'}}>{error}</Typography>
            </Box>
            <input type = 'submit' style = {{ marginLeft : 'calc((100% - 100px)/2)' , width : '100px'}}/>
        </form>
    )
}

const MyAccount = ({userInfo}) =>{
    return(
        <div style = {{ display : 'flex', marginTop : '1rem'}}>
            <Typography sx = {{ mr : 1}}>Email:</Typography>
            <Typography sx ={{ fontSize : '14px' , color : 'grey'}}>{userInfo.email}</Typography>
        </div>
    )
}



const UserAccountPage = ({addtoWishList , wishList , addArraytoWishList }) =>{
    const [ activeBtn , setActiveBtn ] = useState(0);
    const [ userInfo , setUserInfo ] = useState();
    
    const btnNames = [
        ['MyAccount',(userInfo)?<MyAccount userInfo = {userInfo}/>:''],
        ['PersonalSettings',<PersonalSettings/>],
        ['MyWishlist',<WishList/>],
        ['ChangePassword',<ChangePasswordForm/>]
    ]; 
    
    const handleClick = (idx) =>{
        setActiveBtn(idx);
    }
    useState(()=>{
        const getUserDetail = async () =>{
                const response = await fetch('/api/user',{
                                            headers :{
                                                authorization : localStorage.getItem('token')
                                            },
                                            method : 'GET'
                });
                const result = await response.json();
                setUserInfo(result);
                
                if(wishList.length === 0 && result.wishlist.length === 1) 
                    addtoWishList(result.wishlist)

                if(wishList.length === 0 && result.wishlist.length > 1 ) 
                    addArraytoWishList(result.wishlist)
                
        }
        getUserDetail();
        
    },[])

    
    const buttons = btnNames.map((item,idx)=>{
        return( 
            <Button key = {idx}
                    variant ='outlined' 
                    endIcon = {(activeBtn === idx)?<ArrowForwardIosRoundedIcon/>:null} 
                    disableRipple
                    sx = {{ 'text-transform' : 'none' , width : '15rem'}}
                    onClick = {(e)=> handleClick(idx)}>
                {item[0]}
            </Button>
        )
    })
    
    const arr = new Array(10).fill(<Typography>dasds</Typography>);
    return(
        <>
            <Typography sx ={{ ml : 13 , mt : 2 }}>My Account</Typography>    
            <Grid container spacing = {1}>
                <Grid item sm = {1}>
                </Grid>
                <Grid item sm = {3} sx = {{ mt : 1 }}>
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical contained button group"
                        variant="contained"
                    >
                        {buttons}
                    </ButtonGroup>
                </Grid>
                <Grid item sm = {6}>
                    <Box sx = {{ border : '1px solid gray'  ,  display : 'flex' , flexDirection : 'column' , p : 2}}>
                        <Typography>{btnNames[activeBtn][0]}</Typography>
                        {btnNames[activeBtn][1]}
                    </Box>
                </Grid>
            </Grid>       
        </>
    )

}

const mapStateToProps = state => {
    return {
      wishList : state.wishList.item
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
        addtoWishList: (item) =>dispatch(addtoWishList(item)),
        deletefromWishList: (idx) =>dispatch(deletefromWishList(idx)),
        addArraytoWishList: (item) =>dispatch(addArraytoWishList(item))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserAccountPage)