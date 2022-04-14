import Header from "../header/header.component.jsx";
import Footer from "../footer/footer.componenet";
import React from "react";
import HeaderSecondary from "../header/headersecondary";

class Layout extends React.Component {

   state = {
      cartNumber: 0,
      compareNumber: 0
   };

   componentDidMount() {
   }

   render() {

      return (
          <>
             <Header
                 isHome={this.props.isHome ? this.props.isHome : false}
                 isLoading={this.props.isLoading} locale={this.props.locale}
             />
             {this.props.isHome || this.props.hideBreadCrumbs ? null :
                 <HeaderSecondary title={this.props.title} pageInfo={this.props.pageInfo}/>}
             {/* <YMInitializer accounts={[61408678]} options={{webvisor: true}}/> */}
             {this.props.children}
             <Footer locale={this.props.locale}/>
          </>
      );
   }
}


export default Layout