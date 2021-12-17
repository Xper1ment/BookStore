import { useState , useEffect , useContext } from 'react';
import {Navigate} from 'react-router-dom';
import { Container, Box } from '@mui/material'
const style = {
    form :{
        display : 'flex',
        flexDirection : 'column',
        width : '15rem',
        height : '25rem',
        margin : 'auto',
        marginTop : '2rem',
        justifyContent : 'space-evenly',
        background: '#f5f5f5',
        borderRadius : '2%',
        padding : '1rem' 
    },
    error : {
        color : 'red'
    },
}
const LoginPage = () => {

    const [ userInfo , setUserInfo ] = useState({
            email : "",
            password : "",
    });
    const [confirmPassword , setConfirmPassword ] = useState('');
    const [ signedUp , setSignUp ] = useState(true);
    const [ submit , setSubmit ] = useState(false);
    const [ error , setError ] = useState('');
    const [ show , setShow ] = useState(false);
    const [ navigate , setNavigate ] = useState(false);
    
    const handleInput = (e) =>{
        const name =  e.target.name;
        const value = e.target.value;
        setUserInfo( prevState => ({
                    ...prevState,
                    [name] : '' + value
                })
        )
    }
    const handleFormSubmit = async (e) =>{
        e.preventDefault();
        const url = (signedUp)?'/signIn':'/signUp';
        const response = await fetch(url,{
                                    method : 'POST',
                                    headers : { 'Content-Type': 'application/json'},
                                    body : JSON.stringify(userInfo)     
                                    })
        const result = await response.json();
        if( result.error !== undefined ){
            setError(result.error);
        }else{
            localStorage.setItem('token',result.token);
            setNavigate(true);
        }
    }

    /*useEffect(()=>{
        setSubmit(false);
        const url = (signedUp)?'/signIn':'/signUp';
        const postUser = async() =>{
            const response = await fetch(url,{
                                        method : 'POST',
                                        headers : { 'Content-Type': 'application/json'},
                                        body : JSON.stringify(userInfo)     
                                        }
                                    )
            const result = await response.json();
            if( result.error !== undefined ){
                setError(result.error);
            }else{
                localStorage.setItem('token',result.token);
                setNavigate(true);
            }                        
        }
        postUser();                        
    },[ submit])*/
    
    
    if(navigate){    
        return <Navigate to = '/'/>
    }
    const { name , email , password } = userInfo ;
    return(
            <form 
                style = { style.form }
                onSubmit = {handleFormSubmit}
            >
                <div>       
                    <label>Email: </label>
                    <input  name = "email" 
                            onChange = {handleInput}
                            value = {email} 
                            style = {{ width : '100%'}}/>
                </div>
                <div>
                    <label>Password: </label>
                    <input  
                        name = "password"
                        type = 'password'
                        onChange = {handleInput}
                        value = {password} 
                        style = {{ width : '100%'}}/>
                </div>
            {
                (!signedUp)?(
                    <>
                        <div>
                            <label>Confirm Password: </label>
                            <input  
                                onChange = {(e)=>{setConfirmPassword(e.target.value)}}
                                style = {{ width : '100%'}}
                                value = {confirmPassword}/>
                        </div>
                    </>):''                    
                }

                <input 
                    type = 'submit'
                    style = {{ width : '5rem', margin : ' 0px auto'}}
                />
                {
                    (signedUp)?(
                        <span>
                            Don't have a account?
                            <a  style = {{ color : 'cyan' }}
                                href = '' 
                                onClick = {(e) =>{
                                                e.preventDefault();
                                                setSignUp(false);           
                                            }}
                            >SignUp</a>
                        </span>):(
                                <span>
                                    Already have an account?
                                    <a  style = {{ color : 'cyan' }}
                                        href = '' 
                                        onClick = {(e) =>{
                                                    e.preventDefault();
                                                    setSignUp(true);           
                                                    }}
                                    >Login</a>
                                </span>)
                }
                { 
                    (error !== '')?
                        (<span style = { style.error }>{ error }</span>):''
                }
                { show && <span style = { style.error }>Confirm password not matching</span> }
            </form>
        )
}

export default LoginPage;