# Registration
* using a library that is just for ajax b/c we aren't using jquery called Axios. It's promised-based.

```javascript
import axios from 'axios';
//theresponse object will have lots of fields that we don't want.  The response we want is res.data.
axios.get('/profile').then(res => {

});

this.handleChange = this.handleChange.bind(this);
///in component
submit() {
    axios.post('/register', {
        first: this.firstName,
        last: this.lastName
    }).then(resp => {
        const data = resp.data;

        if(!data.success){
            this.setState(error.true)
        }
    })
}
handleChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    })
}
render() {
    return (
        {this.state.error && <div>Error</div>}
        <input name="first" onChange={e => this.handleChange(e)}
        <input name="last" onChange={this.handleChange} />
        <button name="submit" onChange={(e) => this.submit()}
    )
}

```
* we need three components:
    * Welcome Component with Logo with registration component
    * Registration Component
        * needs to be a class, can't be a function
    *


START JS MUST KNOW IF THE USER IS LOGGED IN OR NOT because it has to figure out what to render
Yes: logged in: render Logo
No: send error

Once you know if they are logged in:
location.replace('/')
