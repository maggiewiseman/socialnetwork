import React from 'react';
import ReactDOM from 'react-dom';
import {ProfilePic, PicUploader} from './profile-pic';
import Logo from './logo';
import {Link} from 'react-router';
import axios from './axios';
import Logout from './logout';
import {Wrapper, Nav} from './styledComponents/wrapper';
import SearchNames  from './searchNames';
import SearchBios  from './searchBios';
import { saveSearchResults } from './actions';

import {Socket} from './socket';
import { connect } from 'react-redux';
import { saveCurrUser } from './actions';


class App extends React.Component {
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
        this.updateProfile = this.updateProfile.bind(this);
        this.handleInput = this.handleInput.bind(this);

    }
    componentWillReceiveProps() {
        console.log('app will receive props');
        if(this.props.children) {
            console.log('setting state to remove serach results');
            this.props.dispatch(saveSearchResults(null, ''));
        }
    }
    componentDidMount() {
        //runs immediately after the component gets put in the DOM
        //make axios request here.


        axios.get('/api/user').then((res)=> {
            var { id, first_name, last_name, profile_pic, bio} = res.data.userInfo;
            this.setState({ id, first_name, last_name, profile_pic, bio}, () => {
            });
            this.props.dispatch(saveCurrUser(res.data.userInfo));

        }).catch((e) =>{
            this.setState({
                error: e
            });
            console.error(e)
        });
    }
    showUpLoader(e) {
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
        var formData = new FormData;
        formData.append('file', this.state.profilePicToUpload);

        axios.post('/profilepic', formData ).then(res => {
            if(res.data.success) {
                this.setState({
                    profile_pic: res.data.profile_pic
                });
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
    updateProfile(e) {
        const { first_name, last_name, bio } = this.state;
        axios.post('/update/profile', { first_name, last_name, bio }).then(res => {
            if(res.data.success) {
                console.log('Update Profile Successful');
            } else {
                console.log('Update Profile Pic error', res.data.error);
                let errorMsg = res.data.error.detail || res.data.error;
                this.setState({
                    error: errorMsg
                });
            }
        }).catch(e => {
            console.error(e);
        });
    }
    handleInput(e) {
        this.setState({
            bio: e.target.value
        });
    }
    getFile(e) {
        this.setState({
            profilePicToUpload : e.target.files[0]
        });
    }
    render() {
        Socket(this.props.dispatch);
        if(!this.state.profile_pic) {
            return <div className='loading'>Loading...</div>;
        } else {
            const children = React.cloneElement(this.props.children, {
                info: this.state,
                events : {
                    updateProfile: this.updateProfile,
                    handleInput: this.handleInput
                }
            });

            return (
                <Wrapper>
                    <Nav>
                        <div>
                            <Logo location={'nav'} url={'/img/dogBookLogoBW.png'}/>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Logout /></li>
                            </ul>
                            <SearchNames />
                            <SearchBios />
                        </div>
                        <ProfilePic nav={true} showUpLoader={this.showUpLoader}
                                    imgsrc={this.state.profile_pic}
                                    first_name={this.state.first_name}
                                    last_name={this.state.last_name}/>
                    </Nav>
                    {this.state.showUploadToggle && <PicUploader hideUploader={this.hideUploader}
                                                                setImage={this.setImage}
                                                                error={this.state.error}
                                                                getFile={this.getFile}/>}

                    {children}
                </Wrapper>
            );
        }
    }
}

{/********* CONNECTED COMPONENT ********/}

export default connect()(App);
