import React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import "../../plugins/axios";
import Link from "next/link";

import Echo from "laravel-echo";
import Socketio from "socket.io-client";

import { css } from "glamor";
import url from "../url";

const ROOT_CSS = css({
  height: "100%",
  width: "100%"
});

const PopularLink = props => (
  <Link
    href={{
      pathname: `/shop/${props.name}`,
      query: { category_id: props.popularCategoryID }
    }}
  >
    <li>
      {" "}
      <a href="shop.html">{props.name}</a>{" "}
    </li>
  </Link>
);

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      openToggle: false,
      message: "",
      image: null,
      messages: []
    };
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  OpenChat = () => {
    this.setState(prevState => ({
      openToggle: !prevState.openToggle
    }));
  };

  SendMessage = e => {
    const notyf = new Notyf();
    const warning = new Notyf({
      types: [
        {
          type: 'warning',
          backgroundColor: 'orange',
          icon: false
        }
      ]
    });
    let formData = new FormData();
    formData.append("text", this.state.message);
    if (this.state.image) {
      formData.append("image", this.state.image);
    }

    e.preventDefault();

    axios
      .post(`${url}/api/user/messages/send`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        notyf.success("Вы отправили сообщение");
        this.setState({
          message: "",
          image: null
        });

        this.getChat();
      })
      .catch(error => {
        warning.open({
          type: 'warning',
          message: 'Пожалуйста авторизуйтесь, чтобы отправить сообщение'
        });
        console.log(error);
        this.setState({
          message: "",
          image: null
        });
      });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  changeImageHandler = e => {
    this.setState({ image: e.target.files[0] });
  };

  getChat = () => {
   
    axios
      .get(`${url}/api/user/messages`)
      .then(response => {
        this.setState({ messages: response.data.data.reverse() });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentDidMount() {
    this.scrollToBottom();
    this.getChat();
    const cookie = new Cookies();

    let echo = new Echo({
      broadcaster: "socket.io",
      host: `${url}:6001`,
      client: Socketio,
      auth: {
        headers: {
          Authorization: `Bearer ${cookie.get("access_token")}`
        }
      }
    });

    if (cookie.get("user_id")) {
      echo
        .private(`User.${cookie.get("user_id")}`)
        .listen(".App\\Events\\User\\MessageCreate", event => {
          var sound = new Audio(
            "/static/assets/template/avtech/voices/just-saying.mp3"
          );
          sound.play();
          const notyf = new Notyf();
          notyf.success("Вам пришло новое сообщение");
          this.getChat();
        });
    }
  }

  render() {
    return (
      <>
        <div className="fabs">
          <div className={this.state.openToggle ? "chat is-visible" : "chat"}>
            <div className="chat_header">
              <div className="chat_option">
                <div className="header_img">
                  <img src="/static/assets/img/call.png" 
                  alt="call" />
                </div>
                <span id="chat_head">Малика</span> <br />{" "}
                <span className="agent">Менеджер Консультант</span>
                <span
                  id="chat_fullscreen_loader"
                  className="chat_fullscreen_loader"
                >
                  <i className="fullscreen zmdi zmdi-window-maximize"></i>
                </span>
              </div>
            </div>

            <div id="chat_fullscreen" className="chat_conversion chat_converse">
              {this.state.messages
                ? this.state.messages.map(mess =>
                    mess.is_sender === 0 ? (
                      <>
                        <span className="chat_msg_item chat_msg_item_admin">
                          <div className="chat_avatar">
                            <img src="/static/assets/img/call.png" alt="call"/>
                          </div>
                          {mess.image ? <img src={mess.image} /> : null}
                          {mess.text}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="chat_msg_item chat_msg_item_user">
                          {mess.image ? <img src={mess.image} alt="image" /> : null}
                          {mess.text}
                        </span>
                        <div className="status">{mess.created_at}</div>
                      </>
                    )
                  )
                : null}
              <div
                style={{ float: "left", clear: "both" }}
                ref={el => {
                  this.messagesEnd = el;
                }}
              ></div>
            </div>

            <div className="fab_field">
              <form onSubmit={this.SendMessage}>
                {/* <input
                  type="file"
                  onChange={this.changeImageHandler}
                  id="fab_camera"
                />
                 */}
                <label id="fab_camera" htmlFor="ava">
                  <img
                    style={{
                      width: "60%",
                      marginTop: "5px",
                      marginLeft: "10px"
                    }}
                    src="/static/assets/img/file.png"
                    alt="file"
                  />
                </label>
                <input
                  type="file"
                  id="ava"
                  onChange={this.changeImageHandler}
                  name="ava"
                />

                <label id="fab_send" htmlFor="lol">
                  <img
                    style={{
                      width: "60%",
                      marginTop: "5px",
                      marginRight: "10px"
                    }}
                    src="/static/assets/img/send_message.png"
                    alt="send"
                  />
                </label>
                <input type="submit" id="lol" />

                <input
                  type="text"
                  id="chatSend"
                  name="message"
                  value={this.state.message}
                  onChange={this.handleChange}
                  placeholder="Напишите сообщение"
                  className="chat_field chat_message"
                />
              </form>
            </div>
          </div>
          <a onClick={this.OpenChat} id="prime" className="fab">
            <i className="prime zmdi zmdi-comment-outline">
              <img
                style={{ width: "60%" }}
                src="/static/assets/img/chat.png"
                alt="chat"
              />
            </i>
          </a>
        </div>

        <style jsx>{`
          @import url(
            https://fonts.googleapis.com/css?family=Roboto:400,
            100,
            100italic,
            300,
            300italic,
            400italic,
            500,
            500italic,
            700,
            700italic,
            900,
            900italic&subset=latin,
            cyrillic
          );
          // @import url(https://zavoloklom.github.io/material-design-iconic-font/css/docs.md-iconic-font.min.css);

          #ava {
            display: none;
          }

          #lol {
            display: none;
          }

          label {
            cursor: pointer;
          }
          img {
            width: 100%;
          }
          ul li {
            list-style: none;
          }
          .fabs {
            bottom: 0;
            position: fixed;
            margin: 1em;
            right: 0;
            z-index: 998;
          }
          .image-upload > input {
            display: none;
          }

          .image-upload > input {
            display: none;
          }

          .image-upload img {
            width: 80px;
            cursor: pointer;
          }

          .fab {
            display: block;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            text-align: center;
            color: #f0f0f0;
            margin: 25px auto 0;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.14),
              0 4px 8px rgba(0, 0, 0, 0.28);
            cursor: pointer;
            -webkit-transition: all 0.1s ease-out;
            transition: all 0.1s ease-out;
            position: relative;
            z-index: 1;
            overflow: hidden;
            background: #c8be63;
          }

          .fab > i {
            font-size: 2em;
            line-height: 55px;
            -webkit-transition: all 0.2s ease-out;
            -webkit-transition: all 0.2s ease-in-out;
            transition: all 0.2s ease-in-out;
            color: white;
          }

          .fab:not(:last-child) {
            width: 0;
            height: 0;
            margin: 20px auto 0;
            opacity: 0;
            visibility: hidden;
            line-height: 40px;
          }

          .fab:not(:last-child) > i {
            font-size: 1.4em;
            line-height: 40px;
          }

          .fab:not(:last-child).is-visible {
            width: 40px;
            height: 40px;
            margin: 15px auto 10;
            opacity: 1;
            visibility: visible;
          }

          .fab:nth-last-child(1) {
            -webkit-transition-delay: 25ms;
            transition-delay: 25ms;
          }

          .fab:not(:last-child):nth-last-child(2) {
            -webkit-transition-delay: 20ms;
            transition-delay: 20ms;
          }

          .fab:not(:last-child):nth-last-child(3) {
            -webkit-transition-delay: 40ms;
            transition-delay: 40ms;
          }

          .fab:not(:last-child):nth-last-child(4) {
            -webkit-transition-delay: 60ms;
            transition-delay: 60ms;
          }

          .fab:not(:last-child):nth-last-child(5) {
            -webkit-transition-delay: 80ms;
            transition-delay: 80ms;
          }

          .fab(:last-child):active,
          .fab(:last-child):focus,
          .fab(:last-child):hover {
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.16),
              0 6px 12px rgba(0, 0, 0, 0.32);
          }
          /*Chatbox*/

          .chat {
            visibility: hidden;
            position: fixed;
            right: 85px;
            bottom: 20px;
            width: 400px;
            font-size: 12px;
            line-height: 22px;
            font-family: Roboto, sans-serif;
            font-weight: 500;
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
            opacity: 0;
            box-shadow: 1px 1px 100px 2px rgba(0, 0, 0, 0.22);
            border-radius: 10px;
            -webkit-transition: all 0.2s ease-out;
            -webkit-transition: all 0.2s ease-in-out;
            transition: all 0.2s ease-in-out;
            z-index: -1 !important;
          }

          .chat_fullscreen {
            position: fixed;
            right: 0px;
            bottom: 0px;
            top: 0px;
          }
          .chat_header {
            /* margin: 10px; */
            font-size: 13px;
            font-family: Roboto, sans-serif;
            font-weight: 500;
            color: #f3f3f3;
            height: 55px;
            background: #c8be63;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            padding-top: 8px;
          }
          .chat_header2 {
            /* margin: 10px; */
            border-top-left-radius: 0px;
            border-top-right-radius: 0px;
          }
          .chat_header .span {
            float: right;
          }

          .chat_fullscreen_loader {
            display: none;
            float: right;
            cursor: pointer;
            /* margin: 10px; */
            font-size: 20px;
            opacity: 0.5;
            /* padding: 20px; */
            margin: -10px 10px;
          }

          .chat.is-visible {
            visibility: visible;
            opacity: 1;
            -webkit-animation: zoomIn 0.2s cubic-bezier(0.42, 0, 0.58, 1);
            animation: zoomIn 0.2s cubic-bezier(0.42, 0, 0.58, 1);
          }
          .is-hide {
            opacity: 0;
          }

          .chat_option {
            float: left;
            font-size: 15px;
            list-style: none;
            position: relative;
            height: 100%;
            width: 100%;
            text-align: relative;
            margin-right: 10px;
            letter-spacing: 0.5px;
            font-weight: 400;
          }

          .chat_option img {
            border-radius: 50%;
            width: 55px;
            float: left;
            margin: -30px 20px 10px 20px;
            border: 4px solid rgba(0, 0, 0, 0.21);
          }

          .change_img img {
            width: 35px;
            margin: 0px 20px 0px 20px;
          }
          .chat_option .agent {
            font-size: 12px;
            font-weight: 300;
          }
          .chat_option .online {
            opacity: 0.4;
            font-size: 11px;
            font-weight: 300;
          }
          .chat_color {
            display: block;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin: 10px;
            float: left;
          }

          .chat_body {
            background: #fff;
            width: 100%;

            display: inline-block;
            text-align: center;
            overflow-y: auto;
          }
          #chat_body {
            height: 450px;
          }
          .chat_login p,
          .chat_body li,
          p,
          a {
            -webkit-animation: zoomIn 0.5s cubic-bezier(0.42, 0, 0.58, 1);
            animation: zoomIn 0.5s cubic-bezier(0.42, 0, 0.58, 1);
          }
          .chat_body p {
            padding: 20px;
            color: #888;
          }
          .chat_body a {
            width: 10%;
            text-align: center;
            border: none;
            box-shadow: none;
            line-height: 40px;
            font-size: 15px;
          }

          .chat_field {
            position: relative;
            margin: 5px 0 5px 0;
            width: 50%;
            font-family: Roboto, sans-serif;
            font-size: 12px;
            line-height: 30px;
            font-weight: 500;
            color: #4b4b4b;
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
            border: none;
            outline: none;
            display: inline-block;
            border: 1px solid #f8f8f8;
            border-radius: 5px;
          }

          .chat_field.chat_message {
            height: 30px;
            resize: none;
            font-size: 13px;
            font-weight: 400;
          }
          .chat_category {
            text-align: left;
          }

          .chat_category {
            margin: 20px;
            background: rgba(0, 0, 0, 0.03);
            padding: 10px;
          }

          .chat_category ul li {
            width: 80%;
            height: 30px;
            background: #fff;
            padding: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            margin-bottom: 10px;
            border-radius: 3px;
            border: 1px solid #e0e0e0;
            font-size: 13px;
            cursor: pointer;
            line-height: 30px;
            color: #888;
            text-align: center;
          }

          .chat_category li:hover {
            background: #c8be63;
            color: #fff;
          }
          .chat_category li.active {
            background: #c8be63;
            color: #fff;
          }

          .tags {
            margin: 20px;
            bottom: 0px;
            display: block;
            width: 120%;
          }
          .tags li {
            padding: 5px 10px;
            border-radius: 40px;
            border: 1px solid rgb(3, 117, 208);
            margin: 5px;
            display: inline-block;
            color: rgb(3, 117, 208);
            cursor: pointer;
          }
          .fab_field {
            width: 100%;
            display: inline-block;
            text-align: center;
            background: #fff;
            border-top: 1px solid #eee;
            border-bottom-right-radius: 10px;
            border-bottom-left-radius: 10px;
          }
          .fab_field2 {
            bottom: 0px;
            position: absolute;
            border-bottom-right-radius: 0px;
            border-bottom-left-radius: 0px;
            z-index: 999;
          }

          .fab_field a {
            display: inline-block;
            text-align: center;
          }

          #fab_camera {
            float: left;
            background: white;
            cursor: pointer;
            width: 15%;
          }

          #fab_send {
            float: right;
            cursor: pointer;
            width: 15%;
          }

          .fab_field .fab {
            width: 35px;
            height: 35px;
            box-shadow: none;
            margin: 5px;
          }

          .fab_field .fab > i {
            font-size: 1.6em;
            line-height: 35px;
            color: #bbb;
          }
          .fab_field .fab > i:hover {
            color: #c8be63;
          }
          .chat_conversion {
          }

          .chat_converse {
            position: relative;
            background: #fff;
            margin: 0px 0 0px 0;
            height: 300px;
            min-height: 0;
            font-size: 12px;
            line-height: 18px;
            overflow-y: auto;
            width: 100%;
            float: right;
            padding-bottom: 10px;
            padding-top: 10px;
          }
          .chat_converse2 {
            height: 100%;
            max-height: 800px;
          }
          .chat_list {
            opacity: 0;
            visibility: hidden;
            height: 0;
          }

          .chat_list .chat_list_item {
            opacity: 0;
            visibility: hidden;
          }

          .chat .chat_converse .chat_msg_item {
            position: relative;
            margin: 8px 0 15px 0;
            padding: 8px 10px;
            max-width: 60%;
            display: block;
            word-wrap: break-word;
            border-radius: 3px;
            -webkit-animation: zoomIn 0.5s cubic-bezier(0.42, 0, 0.58, 1);
            animation: zoomIn 0.5s cubic-bezier(0.42, 0, 0.58, 1);
            clear: both;
            z-index: 999;
          }
          .status {
            margin: 45px -50px 0 0;
            float: right;
            font-size: 11px;
            opacity: 0.3;
          }
          .status2 {
            margin: -10px 20px 0 0;
            float: right;
            display: block;
            font-size: 11px;
            opacity: 0.3;
          }
          .chat .chat_converse .chat_msg_item .chat_avatar {
            position: absolute;
            top: 0;
          }

          .chat .chat_converse .chat_msg_item.chat_msg_item_admin .chat_avatar {
            left: -52px;
            background: rgba(0, 0, 0, 0.03);
          }

          .chat .chat_converse .chat_msg_item.chat_msg_item_user .chat_avatar {
            right: -52px;
            background: rgba(0, 0, 0, 0.6);
          }

          .chat .chat_converse .chat_msg_item .chat_avatar,
          .chat_avatar img {
            width: 40px;
            height: 40px;
            text-align: center;
            border-radius: 50%;
          }

          .chat .chat_converse .chat_msg_item.chat_msg_item_admin {
            margin-left: 60px;
            float: left;
            background: rgba(0, 0, 0, 0.03);
            color: #666;
            font-size: 15px;
          }

          .chat .chat_converse .chat_msg_item.chat_msg_item_user {
            margin-right: 20px;
            float: right;
            background: #c8be63;
            color: #eceff1;
            font-size: 15px;
          }

          .chat .chat_converse .chat_msg_item.chat_msg_item_admin:before {
            content: "";
            position: absolute;
            top: 15px;
            left: -12px;
            z-index: 998;
            border: 6px solid transparent;
            border-right-color: rgba(255, 255, 255, 0.4);
          }

          .chat_form .get-notified label {
            color: #077ad6;
            font-weight: 600;
            font-size: 11px;
          }

          input {
            position: relative;
            width: 90%;
            font-family: Roboto, sans-serif;
            font-size: 12px;
            line-height: 20px;
            font-weight: 500;
            color: #4b4b4b;
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
            outline: none;
            background: #fff;
            display: inline-block;
            resize: none;
            padding: 5px;
            border-radius: 3px;
          }
          .chat_form .get-notified input {
            margin: 2px 0 0 0;
            border: 1px solid #c8be63;
          }
          .chat_form .get-notified i {
            background: #c8be63;
            width: 30px;
            height: 32px;
            font-size: 18px;
            color: #fff;
            line-height: 30px;
            font-weight: 600;
            text-align: center;
            margin: 2px 0 0 -30px;
            position: absolute;
            border-radius: 3px;
          }
          .chat_form .message_form {
            margin: 10px 0 0 0;
          }
          .chat_form .message_form input {
            margin: 5px 0 5px 0;
            border: 1px solid #e0e0e0;
          }
          .chat_form .message_form textarea {
            margin: 5px 0 5px 0;
            border: 1px solid #e0e0e0;
            position: relative;
            width: 90%;
            font-family: Roboto, sans-serif;
            font-size: 12px;
            line-height: 20px;
            font-weight: 500;
            color: #4b4b4b;
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
            outline: none;
            background: #fff;
            display: inline-block;
            resize: none;
            padding: 5px;
            border-radius: 3px;
          }
          .chat_form .message_form button {
            margin: 5px 0 5px 0;
            border: 1px solid #e0e0e0;
            position: relative;
            width: 95%;
            font-family: Roboto, sans-serif;
            font-size: 12px;
            line-height: 20px;
            font-weight: 500;
            color: #fff;
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
            outline: none;
            background: #fff;
            display: inline-block;
            resize: none;
            padding: 5px;
            border-radius: 3px;
            background: #c8be63;
            cursor: pointer;
          }
          strong.chat_time {
            padding: 0 1px 1px 0;
            font-weight: 500;
            font-size: 8px;
            display: block;
          }

          /*Chatbox scrollbar*/

          ::-webkit-scrollbar {
            width: 6px;
          }

          ::-webkit-scrollbar-track {
            border-radius: 0;
          }

          ::-webkit-scrollbar-thumb {
            margin: 2px;
            border-radius: 10px;
            background: rgba(0, 0, 0, 0.2);
          }
          /*Element state*/

          .is-active {
            -webkit-transform: rotate(180deg);
            transform: rotate(180deg);
            -webkit-transition: all 1s ease-in-out;
            transition: all 1s ease-in-out;
          }

          .is-float {
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.16),
              0 6px 12px rgba(0, 0, 0, 0.32);
          }

          .is-loading {
            display: block;
            -webkit-animation: load 1s cubic-bezier(0, 0.99, 1, 0.6) infinite;
            animation: load 1s cubic-bezier(0, 0.99, 1, 0.6) infinite;
          }
          /*Animation*/

          @-webkit-keyframes zoomIn {
            0% {
              -webkit-transform: scale(0);
              transform: scale(0);
              opacity: 0;
            }
            100% {
              -webkit-transform: scale(1);
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes zoomIn {
            0% {
              -webkit-transform: scale(0);
              transform: scale(0);
              opacity: 0;
            }
            100% {
              -webkit-transform: scale(1);
              transform: scale(1);
              opacity: 1;
            }
          }

          @-webkit-keyframes load {
            0% {
              -webkit-transform: scale(0);
              transform: scale(0);
              opacity: 0;
            }
            50% {
              -webkit-transform: scale(1.5);
              transform: scale(1.5);
              opacity: 1;
            }
            100% {
              -webkit-transform: scale(1);
              transform: scale(1);
              opacity: 0;
            }
          }

          @keyframes load {
            0% {
              -webkit-transform: scale(0);
              transform: scale(0);
              opacity: 0;
            }
            50% {
              -webkit-transform: scale(1.5);
              transform: scale(1.5);
              opacity: 1;
            }
            100% {
              -webkit-transform: scale(1);
              transform: scale(1);
              opacity: 0;
            }
          }
          /* SMARTPHONES PORTRAIT */

          @media only screen and (min-width: 300px) {
            .chat {
              width: 250px;
            }
          }
          /* SMARTPHONES LANDSCAPE */

          @media only screen and (min-width: 480px) {
            .chat {
              width: 300px;
            }
            .chat_field {
              width: 65%;
            }
          }
          /* TABLETS PORTRAIT */

          @media only screen and (min-width: 768px) {
            .chat {
              width: 300px;
            }
            .chat_field {
              width: 65%;
            }
          }
          /* TABLET LANDSCAPE / DESKTOP */

          @media only screen and (min-width: 1024px) {
            .chat {
              width: 300px;
            }
            .chat_field {
              width: 65%;
            }
          }
          /*Color Options*/

          .blue .fab {
            background: #c8be63;
            color: #fff;
          }

          .blue .chat {
            background: #c8be63;
            color: #999;
          }

          /* Ripple */

          .ink {
            display: block;
            position: absolute;
            background: rgba(38, 50, 56, 0.4);
            border-radius: 100%;
            -moz-transform: scale(0);
            -ms-transform: scale(0);
            webkit-transform: scale(0);
            -webkit-transform: scale(0);
            transform: scale(0);
          }
          /*animation effect*/

          .ink.animate {
            -webkit-animation: ripple 0.5s ease-in-out;
            animation: ripple 0.5s ease-in-out;
          }

          @-webkit-keyframes ripple {
            /*scale the element to 250% to safely cover the entire link and fade it out*/

            100% {
              opacity: 0;
              -moz-transform: scale(5);
              -ms-transform: scale(5);
              webkit-transform: scale(5);
              -webkit-transform: scale(5);
              transform: scale(5);
            }
          }

          @keyframes ripple {
            /*scale the element to 250% to safely cover the entire link and fade it out*/

            100% {
              opacity: 0;
              -moz-transform: scale(5);
              -ms-transform: scale(5);
              webkit-transform: scale(5);
              -webkit-transform: scale(5);
              transform: scale(5);
            }
          }
          ::-webkit-input-placeholder {
            /* Chrome */
            color: #bbb;
          }
          :-ms-input-placeholder {
            /* IE 10+ */
            color: #bbb;
          }
          ::-moz-placeholder {
            /* Firefox 19+ */
            color: #bbb;
          }
          :-moz-placeholder {
            /* Firefox 4 - 18 */
            color: #bbb;
          }
        `}</style>
      </>
    );
  }
}
