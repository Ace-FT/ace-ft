import React from "react";
import { toggleModal } from "./ModalController";
/// inspired from https://www.tailwindtoolbox.com/components/modal

const Modal = (props) => {

    return (
        <>
            <div id={props.id} class="modal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">
                <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

                <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">

                    <div class="modal-content py-4 text-left px-6">
                        <div class="flex justify-between items-center pb-3">
                            <p class="text-2xl font-bold modal-title"></p>
                        </div>
                        <p className="modal-text"></p>
                        
                        <div class="flex justify-end pt-2">
                            <div class="mx-4 rounded-lg bg-iexblk"><button class="btn h-8 w-full font-bold" onClick={()=>{toggleModal(props.id, props.onModalClose)}}>OK</button></div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;