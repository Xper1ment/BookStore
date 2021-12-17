import { Divider }  from '@mui/material';
import { useEffect , useState } from 'react';
import { Link as link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { red } from '@mui/material/colors'
const styles = {
    ul : {
        'list-style-type': 'none',
        margin: '1rem 0rem 0rem 3rem',
        padding: 0,
    },
    head : {
        color : 'red',
        ml : '3rem',
        mt : '1rem'
    },
    link:{
        '&.MuiTypography-root':{
            marginBottom : '0.5rem',
            fontSize : '0.7rem',
            ':hover':{
                color : 'red'
            }
        }
    }
}

const SideBar = () =>{
    const navigate = useNavigate();
    const [categories , setCategories ] = useState([]);
    useEffect(() => {
        try{
            const getCategories = async() =>{
                const result = await fetch('/book/categories');
                setCategories( await result.json())
            }
            getCategories();
        }catch(e){
            console.warn(e);
        }    
    }, [])
    return(
        <div>
            <Typography variant = 'h6' sx = { styles.head }>Browse by Category</Typography>
            <ul style = { styles.ul }>
                {
                    (categories.length !== 0) && categories.map((item)=>(
                        <li>
                            <Typography onClick = {()=>( navigate(`/category/${item}`))} sx = { styles.link }>    
                                {item}
                            </Typography>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
export default SideBar;