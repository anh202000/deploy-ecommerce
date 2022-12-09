import React from "react";
import NavBar from "./NavBar";
import Notify from "./Notify";
import Modal from "./Modal";
import Mess from "../public/mess.js"
import { useEffect } from "react";

function Layout({ children }) {

  useEffect(() => {
    var chatbox = document?.getElementById("fb-customer-chat");
    chatbox.setAttribute("page_id", "105674915691187");
    chatbox.setAttribute("attribution", "biz_inbox");


    window.fbAsyncInit = function () {
      FB.init({
        xfbml: true,
        version: "v15.0",
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  return (
    <div>
      <div className="container">
        <NavBar />
      </div>

      <p class="line-hight"></p>

      <div className="container">
        <Notify />
        <Modal />
        {/* <div class="online-indicator" style={{ position: 'fixed', bottom: '4%', right: '2%' }}>
                    <span class="blink"></span>
                </div> */}
        {/* <!-- Messenger Plugin chat Code --> */}
        <div id="fb-root"></div>

        {/* <!-- Your Plugin chat code --> */}
        <div id="fb-customer-chat" class="fb-customerchat"></div>
        {children}
      </div>

    </div>
  );
}

export default Layout;
