import React, { Component } from 'react';

import { ClipLoader, RingLoader, GridLoader, ScaleLoader } from 'react-spinners';

class Spinner extends Component {
    render() {
        return (
            <GridLoader
                className={"override"}
                sizeUnit={"px"}
                size={15}
                color={'#35B4CF'}
                loading={true}
            />
        );
    }
}

export default Spinner;