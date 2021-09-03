import React from 'react'
import { connect } from "react-redux"
import { deleteFromCart } from "../../redux/actions/cart"
import { notifyError } from "../../helpers/NotyfBtn/NotyBtn";
 class DeleteButtonCart extends React.Component {

    deleteCart = (e) => {
      e.preventDefault();
      notifyError('Ваш товар удален с корзины');
      this.props.deleteFromCart(this.props.item_shop_id)
    };


    render() { 
       return (
          <>
            <button  onClick={(e) => this.deleteCart(e)}  className="deleteButton cart_item_text"><img style={{width: '100%'}}  src="/static/assets/img/delete.png" alt="error"/></button>
           
              <style jsx>{`
                    .deleteButton {
                        background: transparent;
                      border: none;
                      cursor:pointer;
                      width: 25px;
                      margin-top: 30px;
                        }
                  `}</style> 
     </>
           
        )
      }
    }
    const mapDispatchToProps = dispatch => ({
      deleteFromCart: (id) => dispatch(deleteFromCart(id))
    });
    
    export default connect(null, mapDispatchToProps)(DeleteButtonCart)