import { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import QrReader from 'react-qr-reader';

export interface IReaderProps {

}
export interface IReaderState {
    qrScanneredData: string;
}

class Reader extends Component<IReaderProps, IReaderState> {

    constructor(props: IReaderProps) {
        super(props);
        this.state = {
            qrScanneredData: ''
        }
    }

    handleError(err: string) {
        console.log('## Error' + err)
    }

    handleScan(data: any) {
        console.log("## else " + data)
        // if (data) {
        //     this.setState({
        //         qrScanneredData: data
        //     });
        // } else {
        //     console.log("## else " + data)
        // }
    }


    render() {

        return (

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div>
                    <QrReader
                        delay={0}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        style={{ width: '100%' }}
                    />
                    <p>{this.state.qrScanneredData}</p>

                    <div>
                        Product Info - {this.state.qrScanneredData}
                    </div>
                </div>
            </Container>
        )
    }
}
export default Reader;