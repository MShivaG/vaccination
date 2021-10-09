import React from "react";
import Loader from "react-loader-spinner";

export default class LoadingRender extends React.Component {
    render() {
        return(
            <Loader 
                type="Puff" 
                color="#00BFFF" 
                height={100} 
                width={100} 
                timeout={3000}
            />
        );
    }
}