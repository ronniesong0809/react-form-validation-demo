class App extends React.Component {
  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateField = this.validateField.bind(this);
    this.errorClass = this.errorClass.bind(this);
    this.state = {
      phone: '',
      email: '',
      message: '',
      errors: {phone: '', email: '', message: ''},
      phoneValid: false,
      emailValid: false,
      messageValid: false,
      formValid: false
    };
  }
  handleChange(e) {
    let tar = e.target;
    this.setState(
      {[tar.name]: tar.value},
      () => {this.validateField(tar.name, tar.value)}
    );
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      phone: '',
      email: '',
      message: '',
      formValid: false
    });
    console.log('submitted');
  }
  validateField(fieldName, value) {
    let errors = this.state.errors;
    let phoneValid = this.state.phoneValid;
    let emailValid = this.state.emailValid;
    let messageValid = this.state.messageValid;

    switch(fieldName) {
      case 'phone':
        phoneValid = value.match(/^[0-9]{3}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im);
        errors.phone = phoneValid ? '' : ' ✗ Please enter a vaild phone number. Usage: 1234567890 or 123-456-7890';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        errors.email = emailValid ? '' : ' ✗ Please enter a valid email.';
        break;
      case 'message':
        messageValid = value.length >= 2;
        errors.message = messageValid ? '' : ' ✗ Message must be longer than two characters.';
        break;
      default:
        break;
    }

    this.setState(
      {
        errors,
        phoneValid,
        emailValid,
        messageValid
      },
      this.validateForm
    );
  }
  validateForm() {
    this.setState({formValid: this.state.phoneValid && this.state.emailValid && this.state.messageValid});
  }
  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={`input-wrapper ${this.errorClass(this.state.errors.phone)}`}>
          <input ref="phone" name="phone" placeholder="Phone" onChange={this.handleChange} value={this.state.phone}/>
          <span>{this.state.errors.phone || ' ✓'}</span>
        </div>
        <div className={`input-wrapper ${this.errorClass(this.state.errors.email)}`}>
          <input ref="email" name="email" placeholder="Email" onChange={this.handleChange} value={this.state.email}/>
          <span>{this.state.errors.email || ' ✓'}</span>
        </div>
        <div className={`input-wrapper ${this.errorClass(this.state.errors.message)}`}>
          <textarea ref="message" name="message" placeholder="Message" onChange={this.handleChange} value={this.state.message}></textarea>
          <span>{this.state.errors.message || ' ✓'}</span>
        </div>
        <input name="submit" type="submit" disabled={!this.state.formValid}/>
      </form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
