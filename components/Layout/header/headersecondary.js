import React from "react";

import "../../../plugins/axios";
 class HeaderSecondary extends React.Component {

  render() {

    return (
      <>
        <section class="breadcrumb_area">
            <div class="container">
                <div class="d-flex justify-content-between">
                    <div class="left">
                        <h4>{this.props.title}</h4>
                    </div>
                    <div class="right">
                        <ul class="nav">
                            <li><a href="#">{this.props.pageInfo? this.props.pageInfo[0] : ''}</a></li>
                            <li><a href="#">{this.props.pageInfo ? this.props.pageInfo[1] : ''}</a></li>
                            <li><a href="#">{this.props.pageInfo ? this.props.pageInfo[2] : ''}</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>                    
      </>
    );
  }
}

export default HeaderSecondary