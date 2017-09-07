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
        this.showUpLoader = this.showUpLoader.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
        this.setImage = this.setImage.bind(this);
        this.getFile = this.getFile.bind(this);
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
    showUpLoader(e) {
        console.log('show uploader called');
        this.setState({
            showUploadToggle : true
        });
    }
    hideUploader(e) {
        this.setState({
            showUploadToggle : false
        });
    }
    setImage(e) {
        console.log('APP setImage', e.target);
        var formData = new FormData;
        formData.append('file', this.state.profilePicToUpload);

        axios.post('/profilepic', formData ).then(res => {
            if(res.data.success) {
                console.log('Save Profile Pic Successful', res.data);
                this.setState({
                    userInfo: {
                        profile_pic: res.data.profile_pic
                    }
                });
                console.log(this.state);
                this.hideUploader();
            } else {
                console.log('Save Profile Pic error', res.data.error);
                let errorMsg = res.data.error.detail || res.data.error;
                this.setState({
                    error: errorMsg
                });
            }
        }).catch(e => {
            // this.setState({
            //     error: e
            // });
            console.error(e)
        });
    }
    getFile(e) {
        console.log('APP: get file', e.target.files[0]);
        this.setState({
            profilePicToUpload : e.target.files[0]
        })
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
                    <ProfilePic showUpLoader={this.showUpLoader}
                                imgsrc={this.state.userInfo.profile_pic}
                                first_name={this.state.userInfo.first_name}
                                last_name={this.state.userInfo.last_name}/>
                </nav>
                {this.state.showUploadToggle && <PicUploader hideUploader={this.hideUploader}
                                                            setImage={this.setImage}
                                                            error={this.state.error}
                                                            getFile={this.getFile}/>}
                {this.props.children}
            </div>
        );
    }
}
