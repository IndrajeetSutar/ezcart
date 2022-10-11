
import { Box, Container, LinearProgress } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Component } from 'react';
export interface IDefaultProps {

}
class Default extends Component {
    constructor(props: IDefaultProps) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <LinearProgress color='secondary' />
            </div>
        );
    }
}

export default Default;
