import {
    addtoBookCart,
    deletefromBookCart,
    addtoWishList,
    deletefromWishList
} from '../../redux';
import { connect } from 'react-redux';
import { useEffect } from 'react'; 
import BookCard from '../BookCard';
const WishList = ({addtoWishList , wishList }) =>{
    useEffect(() =>{
        const postWishList = async() =>{
            const bookID = (wishList.length > 0 )?
                                        (wishList.map((book) =>(book._id)))
                                        :[];
            await fetch('/api/user/wishList',{
                            method : 'POST',
                            headers : {
                                'Content-Type':'application/json',
                                'authorization': localStorage.getItem('token')
                            },
                            body : JSON.stringify({bookID})
                            
            })
        }
        postWishList();
    },[wishList])
    
    return(
        <>
            {
                (wishList.length > 0) && wishList.map((book)=>{
                    return(
                        <BookCard
                            book = {book}
                            showDeleteBtn = { true }/>
                    )        
                })
            }
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
        deletefromWishList: (idx) =>dispatch(deletefromWishList(idx))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WishList)