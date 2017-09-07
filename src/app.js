import React from 'react';
import ReactDOM from 'react-dom';
import {ProfilePic, PicUploader} from './profile-pic';
import Logo from './logo';
import {Link} from 'react-router';
import axios from 'axios';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showUploadToggle : false,
            error: ''
        };
        this.showUploader = this.showUploader.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
        this.setImage = this.setImage.bind(this);
    }
    componentDidMount() {
        //runs immediately after the component gets put in the DOM
        //make axios request here.
        console.log('making axios call');
        axios.get('/user').then((res)=> {
            console.log('APP after mounting: res is:', res);
            if(res.data.userInfo) {
                console.log('user info received');
                this.setState({
                    userInfo: res.data.userInfo
                });
            } else {
                console.log('Mount error', res);
                // let errorMsg = res.data.error.detail || res;
                // this.setState({
                //     error: errorMsg
                // });
            }

        }).catch((e) =>{
            this.setState({
                error: e
            });
            console.error(e)
        });
    }
    showUploader(e) {
        this.setState({
            showUploadToggle : true
        });
    }
    hideUploader(e) {
        this.setState({
            showUploadToggle : false
        })
    }
    setImage() {
        axios.post('/profilepic', this.state.userInfo).then(res => {
            if(res.data.success) {
                console.log('Save Profile Pic Successful');
                this.hideUploader();
            } else {
                console.log('Save Profile Pic error', res.data.error.detail);
                let errorMsg = res.data.error.detail || res.data.error;
                this.setState({
                    error: errorMsg
                });
            }
        }).catch(e => {
            this.setState({
                error: e
            });
            console.error(e)
        });
    }
    render(props) {

        if(!this.state.userInfo) {
            return <div className='loading'>Loading...</div>;
        }
        return (
            <div>
                <nav>
                    <Logo />
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </ul>
                    <ProfilePic showUpLoader={this.showUploader}
                                imgsrc={this.state.userInfo.imgsrc}
                                first_name={this.state.userInfo.first_name}
                                last_name={this.state.userInfo.last_name}/>
                </nav>
                {this.state.showUploadToggle && <PicUploader hideUploader={this.hideUploader}
                                                            setImage={this.setImage}
                                                            error={this.state.error}/>}
                {this.props.children}
            </div>
        );
    }
}
