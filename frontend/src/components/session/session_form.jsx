import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
class SessionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handle: '',
            email: '',
            password: '',
            password2: '', 
            errors: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.formType === "Log In") {
            if (nextProps.currentUser === true) {
                this.props.history.push('/tweets');
            }
        } else {
            if (nextProps.isSignedIn === true) {
                this.props.history.push('/login');
            }
        }
        // Set or clear errors
        this.setState({ errors: nextProps.errors })
    }

    handleSubmit(e) {
        e.preventDefault();
        const { login, signup, formType, history } = this.props;
        const { handle, email, password, password2 } = this.state;
        if (formType === "Sign Up") {
            signup({
                handle,
                email,
                password,
                password2
            }, history);
        } else {
            login({
                email,
                password
            });
        }
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value })
    }

    renderErrors() {
        return (
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }
    renderConfirmPassword() {
        if (this.props.formType === "Sign Up") {
            return (
                <label>
                    Confirm Password:
                    <input type="password"
                        onChange={this.update('password2')} />
                </label>
            )
        }
    }
    renderHandle() {
        if (this.props.formType === "Sign Up") {
            return (
                <label>
                    Handle:
                    <input type="text"
                        onChange={this.update('handle')} />
                </label>
            )
        }
    }

    render() {
        return (
            <div>
                <h3>{this.props.formType}</h3>
                {this.renderErrors()}
                <form onSubmit={this.handleSubmit}>
                    {this.renderHandle()}
                    <label>
                        Email:
                        <input type="text"
                            onChange={this.update('email')} />
                    </label>
                    
                    <label>
                        Password:
                        <input type="password"
                            onChange={this.update('password')} />
                    </label>
                    {this.renderConfirmPassword()}
                    <input type="submit" value={this.props.formType}/>
                </form>
            </div>
        )
    }
}

export default withRouter(SessionForm);