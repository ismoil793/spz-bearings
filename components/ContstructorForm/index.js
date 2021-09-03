import React, { useState, useEffect } from 'react'
import { Notyf } from 'notyf';
import { connect } from "react-redux";
import { useRouter } from 'next/router'
import InputMask from "react-input-mask";
import * as actions from "./modules/actions/assemblyFeatures";
import { submitAssemblyFormData } from "./modules/api";

const mapStateToProps = state => ({
  assemblyFeaturesData: state.assemblyFeatures.features
});

const mapDispatchToProps = dispatch => ({
  fetchSetAssemblyFeatures: () => dispatch(actions.fetchSetAssemblyFeatures()),
  resetAssemblyFeatures: () => dispatch(actions.resetAssemblyFeatures)
});

const inputTextHandler = (event, setState) => {
  setState(event.target.value)
}

const featureInputHandler = (event, assemblyFeatures, featureId, setAssemblyFeatures) => {
  setAssemblyFeatures(
    assemblyFeatures.map((item) => item.id === featureId ? {id: featureId, name: item.name, value: event.target.value} : item)
  )
}

const checkBoxHandler = (event, setValue) => {
  setValue(event.target.checked)
}

const ContstructorForm = (props) => {
  const {assemblyFeaturesData, fetchSetAssemblyFeatures, resetAssemblyFeatures} = props;
  const router = useRouter()

  const [assemblyFeatures, setAssemblyFeatures] = useState([])
  const [comment, setComment] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState()
  const [email, setEmail] = useState('')
  const [phoneCheckbox, setPhoneCheckbox] = useState(false)
  const [telegramCheckbox, setTelegramCheckbox] = useState(false)
  const [whatsAppCheckbox, setWhatsAppCheckbox] = useState(false)
  const [mailCheckbox, setMailCheckbox] = useState(false)
  
  useEffect(() => {
    if (!assemblyFeaturesData.length) {
      fetchSetAssemblyFeatures()
    } 

    return () => {
      resetAssemblyFeatures()
    }
  }, [])
  
  useEffect(() => {
    if (assemblyFeaturesData.length) {
      const temp = []
      assemblyFeaturesData.forEach(feature => {
        temp.push({id: feature.id, name: feature.name, value: ''})
      });
      
      setAssemblyFeatures(temp)
    } 
  }, [assemblyFeaturesData.length])

  const sendForm = (e) => {
    e.preventDefault();
    const notyf = new Notyf();
    const formData = new FormData();
    const tempArr = [];

    formData.append("info", comment);
    formData.append("name", name);
    formData.append("phone", phone.replace(/\s/g, "").replace("+", ""));
    formData.append("email", email);

    if(phoneCheckbox) tempArr.push("phone")
    if(mailCheckbox) tempArr.push("email")
    if(whatsAppCheckbox) tempArr.push("whatsapp")
    if(telegramCheckbox) tempArr.push("telegram")
    
    if (tempArr.length) {
      for(let i = 0; i < tempArr.length; i++) {
        formData.append(`links[${i}]`, tempArr[i]);
      }
    }

    assemblyFeatures.forEach(elem => {
      formData.append(`features[${elem.id}][value]`, elem.value);
    })
    
    submitAssemblyFormData(formData)
    .then(response => {
      // setAssemblyFeatures(initialAssemblyFeatures)
      // setComment('')
      // setName('')
      // setPhone('')
      // setEmail('')
      // setPhoneCheckbox(false)
      // setTelegramCheckbox(false)
      // setWhatsAppCheckbox(false)
      // setMailCheckbox(false)
      router.push('/').then(() => window.scrollTo(0, 0));
      notyf.success('Спасибо, Ваша сборка принят.') 
    }).catch(error => {
      if(error.response.status === 422) {
        Object.keys(error.response.data.errors).forEach(elem => {
          notyf.error(error.response.data.errors[elem][0]) 
        })
      }
    })
  }

  return (
    <form onSubmit={sendForm} id="constructor_form">
      <div className="row mb-4">
        {assemblyFeatures.length ? 
        assemblyFeatures.map(assemblyFeature => {
          return (
            <div className="col-sm-6 col-md-4 mb-4">
              <h6 className="mb-1">{assemblyFeature.name}</h6>
              <input value={assemblyFeature.value} onChange={(event) => featureInputHandler(event, assemblyFeatures, assemblyFeature.id, setAssemblyFeatures)} type="text" className="input_field"/>
          </div>
          )
        }): null }
      </div>

      <h4>Комментария к запросу</h4>

      <div className="constructor_form_text mb-4">
        <textarea  value={comment} onChange={(e) => inputTextHandler(e, setComment)} className="text_field"rows="4"></textarea>
      </div>

      <h4 className="mb-3">Ваши контакты</h4>

      <div className="row mb-4">
        <div className="col-sm-6 col-md-4 mb-4">
          <h6 className="mb-1">Ваше Имя <span style={{color: "red"}}>*</span></h6>
          <input value={name} name="name" onChange={(e) => inputTextHandler(e, setName)} type="text" className="input_field"  data-error="Обязательное поле" required/>
        </div>
        <div className="col-sm-6 col-md-4 mb-4">
          <h6 className="mb-1">Номер телефона <span style={{color: "red"}}>*</span></h6>
          <InputMask mask="+999 99 999 99 99" onChange={(e) => inputTextHandler(e, setPhone)} name="phone" value={phone}className="input_field" required/>
        </div>
        <div className="col-sm-6 col-md-4 mb-4">
          <h6 className="mb-1">Почта <span style={{color: "red"}}>*</span></h6>
          <input value={email} name="email"  onChange={(e) => inputTextHandler(e, setEmail)} type="text" className="input_field"  data-error="Обязательное поле" required/>
        </div>
      </div>

      <h4 className="mb-3 pb-0">Укажите удобное вами сбосоп связи</h4>

      <div className="row">
        <div className="col-auto">
          <input type="checkbox" id="telephone" name="telephone" checked={phoneCheckbox} onClick={(e) => checkBoxHandler(e, setPhoneCheckbox)}/>
          <label className="ml-2" htmlFor="telephone">По номеру телефона</label>
        </div>
        <div className="col-auto">
          <input type="checkbox" id="telegram" name="telegram" checked={telegramCheckbox} onClick={(e) => checkBoxHandler(e, setTelegramCheckbox)}/>
          <label className="ml-2" htmlFor="telegram">Через Телеграм</label>
        </div>
        <div className="col-auto">
          <input type="checkbox" id="whatsapp" name="whatsapp" checked={whatsAppCheckbox} onClick={(e) => checkBoxHandler(e, setWhatsAppCheckbox)}/>
          <label className="ml-2" htmlFor="whatsapp">Через Whatsapp</label>
        </div>
        <div className="col-auto">
          <input type="checkbox" id="mail" name="mail" checked={mailCheckbox} onClick={(e) => checkBoxHandler(e, setMailCheckbox)}/>
          <label className="ml-2" htmlFor="mail">Через email</label>
        </div>
      </div>

      <div className="contact_form_button">
          <button type="submit" className="button contact_submit_button">Отправить</button>
      </div>
    </form>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ContstructorForm)