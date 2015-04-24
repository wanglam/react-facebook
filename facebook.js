var FaceBookLoginButton = React.createClass({displayName: "FaceBookLoginButton",
    propTypes: {
        onConnected: React.PropTypes.func,
        appId:React.PropTypes.bool.isRequired
    },
    getInitialState:function(){
        return {};
    },
    allowLoginTimes:1,
    componentDidMount: function() {
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            document.body.appendChild(js);
        }(document, 'script', 'facebook-jssdk'));
        if(!window.fbAsyncInit){
            window.fbAsyncInit = function() {
                FB.init({
                    appId      : this.props.appId,
                    status: true,
                    cookie: true,
                    xfbml: true,
                    oauth: true,
                    version:"v2.3"
                });

            }.bind(this);
        }
    },
    render:function(){
        return (
            React.createElement("div", null, 
                React.createElement("div", {onClick: this._doLoginRequest}, "Facebook Login")
            )
        );
    },
    _doLoginRequest:function(){
        FB.getLoginStatus(function(response) {
            this.loginStatusCallback(response);
        }.bind(this));
    },
    loginStatusCallback:function(response){
        if (response.status === 'connected') {
            this.props.onConnected(response);
        } else {
            FB.login(function(response) {
                if (response.authResponse) {
                    this.loginCallback(response);
                } else {
                    this.props.onCanceled&&this.props.onCanceled(response);
                }
            }.bind(this));
        }
    },
    loginCallback:function(response){
        if(response.status === "connected"){
            this.props.onConnected(response);
        }else if( response.status === 'not_authorized'){
            this.props.onNotAuthorized&&this.props.onNotAuthorized(response);
        }else{
            this.props.onNotLogin&&this.props.onNotLogin(response);
        }
    }
});