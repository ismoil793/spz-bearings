import React from 'react'
import Link from 'next/link';
import axios from 'axios'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 
import url from '../url';

export default class ContactForm extends React.Component {

constructor(){
    super()
    this.state = {
        phone: '',
        name:'',
        email: '',
        message: ''
    }
}

handleChange = (e) => {
this.setState({ [e.target.name]: e.target.value})
}

    SendForm = (e) => {
        const notyf = new Notyf();
    e.preventDefault();
     axios({
         method: 'post',
         url: `${url}/api/call_request/send`,
         data: {
         phone: this.state.phone,
           name: this.state.name,
           email: this.state.email,
           info: this.state.message
           
         }
       }).then(response => {
       
         notyf.success('Спасибо, Ваше сообщение отправлено модераторам. В ближайшее время с Вами свяжутся') 
         // event.preventDefault();
 }).catch(error => {
     console.log(error);
   })
    }

    

    render() { 
        const {phone, name, message, email} = this.state
        return (
            <form onSubmit={this.SendForm} id="contact_form">
            <div className="contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between">
                <input value={name}  name="name"   onChange={this.handleChange}    type="text" id="contact_form_name" className="contact_form_name input_field" placeholder="Ваше имя" required="required" data-error="Name is required."/>
                <input value={email} name="email"  onChange={this.handleChange} type="text" id="contact_form_email" className="contact_form_email input_field" placeholder="Ваш email" required="required" data-error="Email is required."/>
                <input value={phone} name="phone"  onChange={this.handleChange} type="text" id="contact_form_phone" className="contact_form_phone input_field" placeholder="Номер телефона" required="required"/>
            </div>
            <div className="contact_form_text">
                <textarea  value={message} name="message"  onChange={this.handleChange} id="contact_form_message" className="text_field contact_form_message" name="message" rows="4" placeholder="Оставьте сообщение" required="required" data-error="Please, write us a message."></textarea>
            </div>
            <div className="contact_form_button">
                <button type="submit" className="button contact_submit_button">Отправить</button>
            </div>
        </form>
        )
    }
}