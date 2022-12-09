import React from "react";
import NavBar from "./NavBar";
import Notify from "./Notify";
import Modal from "./Modal";
import Mess from "../public/mess.js"

function Layout({ children }) {

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
                {children}
            </div>

        </div>
    );
}

export default Layout;
