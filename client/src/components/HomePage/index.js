import SideBar from './SideBar';
import { Grid , Box }  from '@mui/material';
import { useParams } from 'react-router-dom';

const HomePage = ({ children }) =>{
    return(
        <Box sx = {{ height : '100vh'}}>
            <Grid container spacing={2} sx = {{ height : '100%'}}>
                <Grid item sm={3}>
                    <SideBar/>
                </Grid>
                <Grid item sm={7}>
                    {children}
                </Grid>
            </Grid>
        </Box>
    )
}

export default HomePage;