import React from "react";
import {Helmet} from 'react-helmet';
import styles from "./LandingPage.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import iexec_logo from "./../../assets/iexec_logo.svg"

const APP_NAME = process.env.REACT_APP_NAME;


function LandingPage() {
    return (
        <>
            <Helmet>
                <title>{APP_NAME} | Home</title>
            </Helmet>
            <header>
                <div class={styles.header_title}>
                    <h1 className="text-center text-iexblk">Redefining Secure File Transfer</h1>
                    <div className={styles.subtitle}>
                        <p className="text-gray-500 text-center">Reclaim and safeguard your right to Privacy and Security.</p>
                    </div>
                    <div className={styles.buttons_container}>
                        <button type="button" className="font-sans font-medium bg-indigo-600 text-white hover:bg-indigo-700">Get started</button>
                        <span className="text-iexblk mx-2">or</span>
                        <button type="button" className="font-sans font-medium bg-white text-gray-600 border-gray-300 hover:bg-gray-100" onClick={() => window.open("https://github.com/Ace-FT/ace-ft")}><FontAwesomeIcon icon={faGithub} />  View Github</button>
                    </div>
                </div>
                <div className={styles.header_powered}>
                    <div className="mt-4 w-full">
                        <p className="font-mono uppercase text-center font-medium text-gray-600">These folks get it</p>
                        <div className={styles.brands}>
                            <img src={require("../../assets/iexec_text_logo.png")} alt="iExec" width={140} className="m-12 filter grayscale" />
                            <img src={require("../../assets/ipfs_logo.png")} alt="IPFS" width={140} className="m-12 filter grayscale" />
                            <img src={require("../../assets/ethereum_logo.png")} alt="Ethereum" width={140} className="m-12 filter grayscale" />
                        </div>
                    </div>
                </div>
            </header>
            

            <section class="bg-gradient-to-b from-gray-50 to-white shadow-inner"><div class="max-w-7xl mx-auto"><div class="flex flex-col max-w-4xl mx-auto pt-28"><div class="w-full"><div class="relative shadow-2xl mx-6 lg:mx-0"><svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 639.014" width="100%" height="100%"><path data-name="Path 103" d="M285.467 346.636l-1.153-.26c31.958-141.342 172.446-230.015 313.788-198.057A262.383 262.383 0 01796 345.676l-1.152.262c-27.208-119.463-131.908-202.9-254.612-202.9-121.096.005-228.242 85.628-254.769 203.598z" fill="#e6e6e6"></path><path data-name="Path 104" d="M1080 614H0V0h1080zM2 612h1076V2H2z" fill="#3f3d56"></path><circle data-name="Ellipse 12" cx="74" cy="63" r="9" fill="#3c88ff"></circle><circle data-name="Ellipse 13" cx="101" cy="63" r="9" fill="#f2f2f2"></circle><circle data-name="Ellipse 14" cx="128" cy="63" r="9" fill="#f2f2f2"></circle><path data-name="Path 107" d="M1037 512.215V579h-71.119A86.746 86.746 0 011037 512.215z" fill="#e6e6e6"></path><path data-name="Path 108" d="M911.82 183.1l-.64-.77-239.39 198.53-.77.64 165.87 200h2.6L673.84 381.76l237.08-196.61L1037 337.18v-3.14z" fill="#e6e6e6"></path><circle data-name="Ellipse 15" cx="704.534" cy="222.815" r="61.692" fill="#a0616a"></circle><path data-name="Path 111" d="M807.086 352.978l-34.33 99.534v.01l-16.545 47.99s-1.69 76.304-3.387 76.304c-.352 0-.853 1.1-1.416 2.833H587.012l13.194-140.19-.809-6.532-10.32-83.73a41.962 41.962 0 0127.73-44.72l17.244-6.063a136.524 136.524 0 0170.51-5.376 136.524 136.524 0 0157.61 25.653z" fill="#3c88ff"></path><path data-name="Path 113" d="M758.033 173.112s-19.587-42.438-57.133-32.645-58.761 24.484-60.393 39.174.816 36.726.816 36.726 4.081-30.2 30.2-23.668 66.922 1.632 66.922 1.632l6.529 58.761s7.345-10.61 15.506-4.081 23.669-62.841-2.447-75.899z" fill="#2f2e41"></path><path data-name="Path 114" d="M839.306 507.293s0 38.746-14.24 72.356h-48.933l.431-1.135 13.564-59.355-5.084-20.345-12.288-46.293v-.009a135.33 135.33 0 011.086-73.28l.556-1.872a34.102 34.102 0 0132.688-24.382s22.043 18.656 20.345 54.262z" fill="#3c88ff"></path><path data-name="Path 121" d="M980.387 122.039a33.376 33.376 0 1133.376-33.376 33.376 33.376 0 01-33.376 33.376zm0-65.2a31.824 31.824 0 1031.824 31.824 31.824 31.824 0 00-31.824-31.824z" fill="#ccc"></path><path data-name="Path 123" d="M1037 581.5H43v-549h994zm-992.159-1.788h990.318V34.288H44.84z" fill="#ccc"></path><path data-name="Path 122" d="M994.448 75.97l-.729-.729-13.554 13.555-13.555-13.555-.729.729 13.554 13.554-11.75 11.75.729.729 11.75-11.75 11.75 11.75.729-.729-11.75-11.75z" fill="#3f3d56"></path><path data-name="Path 146" d="M415.826 347.446H76.952A11.969 11.969 0 0065 359.398v130.768a11.969 11.969 0 0011.952 11.957h338.874a11.969 11.969 0 0011.952-11.952V359.398a11.969 11.969 0 00-11.952-11.952zm10.546 142.721a10.559 10.559 0 01-10.546 10.546H76.952a10.559 10.559 0 01-10.546-10.546V359.398a10.559 10.559 0 0110.546-10.546h338.874a10.559 10.559 0 0110.546 10.546z" fill="#3f3d56"></path><path data-name="Path 141" d="M396.003 385.445H218.481c-5.156 0-9.39 3.4-9.591 7.686a2.142 2.142 0 00-.015.314c.007 4.416 4.3 7.994 9.606 8h177.522c5.305 0 9.606-3.582 9.606-8s-4.3-8-9.606-8z" fill="#3c88ff"></path><path data-name="Path 141-2" d="M396.003 417.446H218.481c-5.156 0-9.39 3.4-9.591 7.686a2.142 2.142 0 00-.015.314c.007 4.416 4.3 7.994 9.606 8h177.522c5.305 0 9.606-3.582 9.606-8s-4.301-8-9.606-8z" fill="#3c88ff"></path><path data-name="Path 141-3" d="M396.003 449.446H218.481c-5.156 0-9.39 3.4-9.591 7.686a2.142 2.142 0 00-.015.314c.007 4.416 4.3 7.994 9.606 8h177.522c5.305 0 9.606-3.582 9.606-8s-4.3-8-9.606-8z" fill="#3c88ff"></path><path data-name="Path 140" d="M134.988 467.445a42.353 42.353 0 1142.353-42.353 42.353 42.353 0 01-42.353 42.353zm0-83.245a40.892 40.892 0 1040.892 40.892 40.892 40.892 0 00-40.892-40.892z" fill="#3f3d56"></path><path data-name="Path 118" d="M296 563h-36v-36h36zm-34-2h32v-32h-32z" fill="#ff6584"></path><path data-name="Path 119" d="M217.185 551.525l-12.861-11.788 1.352-1.474 11.139 10.212 25.353-38.03 1.664 1.11z" fill="#3f3d56"></path><path data-name="Path 120" d="M230 536v25h-32v-32h25v-2h-27v36h36v-27z" fill="#e5e5e5"></path><circle data-name="Ellipse 18" cx="119.5" cy="438.5" r="23.5" fill="#3c88ff"></circle><path d="M426.901 619.09a18.724 18.724 0 0122.939-17.267l35.48-56.29 14.269 31.495-35.88 48.626a18.825 18.825 0 01-36.808-6.564z" fill="#a0616a"></path><path data-name="Path 115" d="M612.177 310.868l-1.958.346c-21.997 3.885-40.648 18.905-48.35 39.873q-.347.943-.665 1.897l-13.566 61.044-93.266 178.053 28.831 16.955s79.7-93.265 89.874-125.485l40.967-78.785a25.532 25.532 0 002.86-12.76l-3.07-79.8a1.413 1.413 0 00-1.658-1.338z" fill="#3c88ff"></path></svg><button type="button" class="w-64 lg:w-auto absolute top-full left-1/2 flex items-center transform -translate-y-1/2 -translate-x-1/2 bg-white rounded-full font-medium group p-4 shadow-xl" aria-label="play video"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-current text-gray-400 group-hover:text-blue-600 flex-shrink-0"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 2C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12z"></path><path d="M10 17l6-5-6-5z"></path></svg><span class="ml-3">Watch the video (5 min)</span></button></div></div></div></div></section>
            
            <section id={styles.section3}>
                <div className={styles.section3_div}>
                    <div className="mb-16 text-center">
                        <p className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Grow your revenue</p>
                        <h2 className="mt-2 pb-4 font-black tracking-tight text-iexblk">Revolutionising File Transfer</h2>
                    </div>
                    <div className="flex flex-wrap -mx-8 items-center">
                        <div className="w-full lg:w-1/2 px-8">
                            <ul className="space-y-12">
                                <li className="flex -mx-4">
                                    <div className="px-4"><span class="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold rounded-full bg-blue-50 text-blue-500">1</span></div>
                                    <div class="px-4">
                                        <h3 class="my-4 text-xl font-semibold text-iexblk">Privacy Focus</h3>
                                        <p class="text-gray-500 leading-loose">Ace revolutionizes the file-sharing landscape by prioritizing user privacy. In response to Web2's data exploitation issues, Ace ensures a secure, private experience for sharing files, eliminating the need for intermediaries.</p>
                                    </div>
                                </li>
                                <li class="flex -mx-4">
                                    <div class="px-4"><span class="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold rounded-full bg-blue-50 text-blue-500">2</span></div>
                                    <div class="px-4">
                                        <h3 class="my-4 text-xl font-semibold text-iexblk">Secure Features</h3>
                                        <p class="text-gray-500 leading-loose">Ace offers a secure "WeTransfer-like" experience with cryptographic access control, Telegram integration, and built-in $RLC monetization.</p>
                                    </div>
                                </li>
                                <li class="flex -mx-4">
                                    <div class="px-4"><span class="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold rounded-full bg-blue-50 text-blue-500">3</span></div>
                                    <div class="px-4">
                                        <h3 class="my-4 text-xl font-semibold text-iexblk">Decentralized Trust</h3>
                                        <p class="text-gray-500 leading-loose">Ace aligns with iExec's principles, using CPU and datasets for encrypted transfers. The DataProtector tool simplifies dataset creation, ensuring decentralized trust in file-sharing.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full lg:w-1/2 px-8"><div class="lg:mb-12 lg:mb-0 pb-12 lg:pb-0 mt-16 lg:mt-0 mx-6 lg:mx-0"><svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 769.411 524.375" width="100%" height="100%"><circle cx="174.757" cy="6.813" r="6.813" fill="#e6e6e6"></circle><circle cx="209.246" cy="6.813" r="6.813" fill="#e6e6e6"></circle><circle cx="243.735" cy="6.813" r="6.813" fill="#e6e6e6"></circle><circle cx="278.224" cy="6.813" r="6.813" fill="#e6e6e6"></circle><circle cx="312.713" cy="6.813" r="6.813" fill="#e6e6e6"></circle><circle cx="174.757" cy="41.735" r="6.813" fill="#e6e6e6"></circle><circle cx="209.246" cy="41.735" r="6.813" fill="#e6e6e6"></circle><circle cx="243.735" cy="41.735" r="6.813" fill="#e6e6e6"></circle><circle cx="278.224" cy="41.735" r="6.813" fill="#6a7aff"></circle><circle cx="312.713" cy="41.735" r="6.813" fill="#e6e6e6"></circle><circle cx="381.691" cy="41.735" r="6.813" fill="#e6e6e6"></circle><circle cx="174.757" cy="76.657" r="6.813" fill="#e6e6e6"></circle><circle cx="209.246" cy="76.657" r="6.813" fill="#e6e6e6"></circle><circle cx="243.735" cy="76.657" r="6.813" fill="#e6e6e6"></circle><circle cx="278.224" cy="76.657" r="6.813" fill="#e6e6e6"></circle><circle cx="312.713" cy="76.657" r="6.813" fill="#e6e6e6"></circle><circle cx="174.757" cy="111.579" r="6.813" fill="#e6e6e6"></circle><circle cx="209.246" cy="111.579" r="6.813" fill="#e6e6e6"></circle><circle cx="243.735" cy="111.579" r="6.813" fill="#e6e6e6"></circle><circle cx="278.224" cy="111.579" r="6.813" fill="#e6e6e6"></circle><circle cx="312.713" cy="111.579" r="6.813" fill="#e6e6e6"></circle><circle cx="347.202" cy="111.579" r="6.813" fill="#e6e6e6"></circle><circle cx="381.691" cy="111.579" r="6.813" fill="#e6e6e6"></circle><circle cx="416.18" cy="111.579" r="6.813" fill="#e6e6e6"></circle><circle cx="450.669" cy="111.579" r="6.813" fill="#e6e6e6"></circle><circle cx="485.158" cy="111.579" r="6.813" fill="#e6e6e6"></circle><circle cx="312.713" cy="146.501" r="6.813" fill="#e6e6e6"></circle><circle cx="347.202" cy="146.501" r="6.813" fill="#6a7aff"></circle><circle cx="381.691" cy="146.501" r="6.813" fill="#e6e6e6"></circle><circle cx="416.18" cy="146.501" r="6.813" fill="#e6e6e6"></circle><circle cx="450.669" cy="146.501" r="6.813" fill="#e6e6e6"></circle><circle cx="485.158" cy="146.501" r="6.813" fill="#e6e6e6"></circle><circle cx="312.713" cy="181.423" r="6.813" fill="#e6e6e6"></circle><circle cx="347.202" cy="181.423" r="6.813" fill="#e6e6e6"></circle><circle cx="381.691" cy="181.423" r="6.813" fill="#e6e6e6"></circle><circle cx="416.18" cy="181.423" r="6.813" fill="#e6e6e6"></circle><circle cx="450.669" cy="181.423" r="6.813" fill="#6a7aff"></circle><circle cx="485.158" cy="181.423" r="6.813" fill="#e6e6e6"></circle><circle cx="312.713" cy="216.345" r="6.813" fill="#e6e6e6"></circle><circle cx="347.202" cy="216.345" r="6.813" fill="#e6e6e6"></circle><circle cx="381.691" cy="216.345" r="6.813" fill="#e6e6e6"></circle><circle cx="416.18" cy="216.345" r="6.813" fill="#e6e6e6"></circle><circle cx="450.669" cy="216.345" r="6.813" fill="#e6e6e6"></circle><circle cx="485.158" cy="216.345" r="6.813" fill="#e6e6e6"></circle><circle cx="174.757" cy="251.267" r="6.813" fill="#e6e6e6"></circle><circle cx="209.246" cy="251.267" r="6.813" fill="#e6e6e6"></circle><circle cx="243.735" cy="251.267" r="6.813" fill="#e6e6e6"></circle><circle cx="278.224" cy="251.267" r="6.813" fill="#e6e6e6"></circle><circle cx="312.713" cy="251.267" r="6.813" fill="#e6e6e6"></circle><circle cx="347.202" cy="251.267" r="6.813" fill="#e6e6e6"></circle><circle cx="381.691" cy="251.267" r="6.813" fill="#e6e6e6"></circle><circle cx="416.18" cy="251.267" r="6.813" fill="#e6e6e6"></circle><circle cx="450.669" cy="251.267" r="6.813" fill="#e6e6e6"></circle><circle cx="485.158" cy="251.267" r="6.813" fill="#e6e6e6"></circle><circle cx="174.753" cy="286.188" r="6.813" fill="#e6e6e6"></circle><circle cx="209.246" cy="286.189" r="6.813" fill="#e6e6e6"></circle><circle cx="174.753" cy="321.11" r="6.813" fill="#e6e6e6"></circle><circle cx="209.246" cy="321.111" r="6.813" fill="#e6e6e6"></circle><circle cx="278.224" cy="321.111" r="6.813" fill="#e6e6e6"></circle><path d="M622 80.384H352a5.006 5.006 0 01-5-5V8.408a5.006 5.006 0 015-5h270a5.006 5.006 0 015 5v66.976a5.006 5.006 0 01-5 5zM352 5.408a3.003 3.003 0 00-3 3v66.976a3.003 3.003 0 003 3h270a3.003 3.003 0 003-3V8.408a3.003 3.003 0 00-3-3z" fill="#e6e6e6"></path><circle cx="387" cy="41.896" r="21" fill="#6a7aff"></circle><path d="M435.5 27.896a3.5 3.5 0 100 7h93a3.5 3.5 0 100-7zm0 21a3.5 3.5 0 100 7h165a3.5 3.5 0 100-7zM275 216.384H5a5.006 5.006 0 01-5-5v-66.976a5.006 5.006 0 015-5h270a5.006 5.006 0 015 5v66.976a5.006 5.006 0 01-5 5zM5 141.408a3.003 3.003 0 00-3 3v66.976a3.003 3.003 0 003 3h270a3.003 3.003 0 003-3v-66.976a3.003 3.003 0 00-3-3z" fill="#e6e6e6"></path><circle cx="40" cy="177.896" r="21" fill="#6a7aff"></circle><path d="M88.5 163.896a3.5 3.5 0 000 7h97a3.5 3.5 0 000-7zm0 21a3.5 3.5 0 000 7h165a3.5 3.5 0 000-7z" fill="#e6e6e6"></path><path d="M519 363.384H249a5.006 5.006 0 01-5-5v-66.976a5.006 5.006 0 015-5h270a5.006 5.006 0 015 5v66.976a5.006 5.006 0 01-5 5zm-270-74.976a3.003 3.003 0 00-3 3v66.976a3.003 3.003 0 003 3h270a3.003 3.003 0 003-3v-66.976a3.003 3.003 0 00-3-3z" fill="#3f3d56"></path><circle cx="284" cy="324.896" r="21" fill="#6a7aff"></circle><path d="M332.5 310.896a3.5 3.5 0 000 7h89a3.5 3.5 0 000-7zm0 21a3.5 3.5 0 000 7h165a3.5 3.5 0 000-7zm331.75 14.502c-11.726 35.177-59.695-2.132-59.695-2.132l12.791-133.247c19.188-14.924 39.442-2.132 39.442-2.132z" fill="#e6e6e6"></path><path fill="#ffb8b8" d="M661.731 464.458l16.345.172-4.083 47.115-12.26.001-.002-47.288z"></path><path d="M658.605 507.742h24.144a15.404 15.404 0 0115.387 15.387v.5h-39.53z" fill="#2f2e41"></path><path fill="#ffb8b8" d="M617.421 464.458l-18.094-.001 5.832 47.288 12.26.001.002-47.288z"></path><path d="M581.015 523.629v-.5a15.387 15.387 0 0115.387-15.387l24.144.001v15.888zm79.613-20.045L639.215 378.76l-19.84 123.214-20.1 1.117-5.36-165.086.403-.09c3.324-.745 81.537-17.924 94.359 6.652l.065.124-10.701 159.453z" fill="#2f2e41"></path><circle cx="637.934" cy="170.843" r="24.561" fill="#ffb8b8"></circle><path d="M658.568 356.925c-2.88-.798-4.954-4.104-6.53-10.406-.271-1.086-25.771-109.711-4.206-129.391l4.97-13.808 6.803 4.535c2.407.022 27.02.645 29.124 16.423 2.06 15.443 7.666 118.913 2.03 125.349a1.219 1.219 0 01-.926.469c-5.71 0-7.444-6.336-7.852-8.356-1.357.562-5.402 2.629-12.048 9.275-4.117 4.118-7.345 6.09-10.012 6.09a5.037 5.037 0 01-1.353-.18z" fill="#2f2e41"></path><path d="M605.267 351.015c-6.648-6.648-10.693-8.714-12.049-9.275-.407 2.02-2.14 8.356-7.851 8.356a1.219 1.219 0 01-.927-.47c-5.635-6.435-.029-109.905 2.03-125.348 2.104-15.778 26.718-16.4 29.125-16.423l6.802-4.535 4.971 13.808c21.564 19.678-3.935 128.305-4.207 129.391-1.575 6.302-3.65 9.608-6.529 10.406a5.037 5.037 0 01-1.353.18c-2.667 0-5.895-1.973-10.012-6.09zm52.944-166.143a25.204 25.204 0 00-12.207-45.54c-2.261-.226-4.696-.192-6.571-1.477-1.665-1.14-2.562-3.119-4.093-4.435a8.929 8.929 0 00-6.926-1.746 25.062 25.062 0 00-6.963 2.287c-5.446 2.429-11.235 5.417-13.713 10.84-2.147 4.698-1.2 10.491 1.84 14.668a20.41 20.41 0 0013.016 7.685 32.535 32.535 0 0015.285-1.376c3.241-1.02 6.441-2.41 9.838-2.524a13.37 13.37 0 0110.145 22.564" fill="#2f2e41"></path><path d="M524.341 330.981a10.8 10.8 0 0010.548-11.048l14.323-24.166-11.066-10.146-15.088 23.81a10.801 10.801 0 001.283 21.55zm166.173 26.475a10.8 10.8 0 003.15-14.947l-.549-28.086-14.75-2.798-.29 28.186a10.801 10.801 0 0012.439 17.645z" fill="#ffb8b8"></path><path d="M528.699 292.124l-.167-.266.165-.266c21.484-34.498 66.58-77.593 67.032-78.024l.143-.136 5.57-.057 6.02 15c-1.874 3.606-52.395 74.11-59.066 78.786a4.603 4.603 0 01-3.685.694 9.699 9.699 0 01-3.124-1.33c-6.157-3.814-12.573-13.902-12.888-14.401zm146.859 39.366a4.57 4.57 0 01-2.707-2.484c-3.217-7.505 10.569-102.302 11.157-106.334l.112-.763 4.66 2.954.046.2c.137.606 13.712 60.998 10.033 101.127l-.027.287-.261.12c-.56.26-11.868 5.454-19.404 5.454a10.192 10.192 0 01-3.61-.56z" fill="#2f2e41"></path><path d="M768.411 524.375h-266a1 1 0 010-2h266a1 1 0 010 2z" fill="#3f3d56"></path></svg></div></div>
                    </div>
                </div>
            </section>
            
            <section id={styles.section4}>
                <div className={styles.section4_div}>
                    <div className="container mx-auto px-6 p-6 bg-white">
                        <div className="mb-16 text-center">
                            <p className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Transforming Standards</p>
                            <h2 className="mt-2 font-bold tracking-tight text-iexblk">Same send, different process</h2>
                        </div>
                        <div className="flex flex-wrap w-full">
                            <div className="w-full border-b md:w-1/2 md:border-r lg:w-1/3 p-8">
                                <div className="flex items-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="currentColor" class="h-6 w-6 text-indigo-500"><path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z"></path></svg>
                                    <h4 className="ml-4 text-xl2 text-iexblk">Privacy Priority</h4>
                                </div>
                                <p className="text-base leading-loose text-gray-500">Ace, a Web3 file transfer app on iExec, shifts file-sharing dynamics by focusing on user privacy, eliminating intermediaries for a secure experience.</p>
                            </div>

                            <div className="w-full border-b md:w-1/2 lg:w-1/3 lg:border-r p-8">
                                <div className="flex items-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="currentColor" class="h-6 w-6 text-indigo-500"><path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z"></path></svg>
                                    <h4 className="ml-4 text-xl2 text-iexblk">Secure Innovation</h4>
                                </div>
                                <p className="text-base leading-loose text-gray-500">Ace integrates cryptographic controls, Telegram integration, and $RLC monetization. Leveraging iExec's decentralized power, Ace ensures unlimited downloads and heightened security.</p>
                            </div>

                            <div className="w-full border-b md:w-1/2 md:border-r lg:w-1/3 lg:border-r-0 p-8">
                                <div className="flex items-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="currentColor" class="h-6 w-6 text-indigo-500"><path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z"></path></svg>
                                    <h4 className="ml-4 text-xl2 text-iexblk">Decentralized Trust</h4>
                                </div>
                                <p className="text-base leading-loose text-gray-500">Aligned with iExec's principles, Ace uses CPU and datasets for encrypted transfers. The DataProtector tool streamlines dataset creation, establishing decentralized trust in file-sharing.</p>
                            </div>

                            <div className="w-full border-b md:w-1/2 lg:w-1/3 lg:border-r lg:border-b-0 p-8">
                                <div className="flex items-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="currentColor" class="h-6 w-6 text-indigo-500"><path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z"></path></svg>
                                    <h4 className="ml-4 text-xl2 text-iexblk">User-Centric Roles</h4>
                                </div>
                                <p className="text-base leading-loose text-gray-500">Distinct roles define Ace's decentralized ecosystem—content creators, recipients, and processing power providers. The iExec DataProtector tool simplifies dataset management for a user-centric file transfer approach.</p>
                            </div>

                            <div className="w-full border-b md:w-1/2 md:border-r md:border-b-0 lg:w-1/3 lg:border-b-0 p-8">
                                <div className="flex items-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="currentColor" class="h-6 w-6 text-indigo-500"><path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z"></path></svg>
                                    <h4 className="ml-4 text-xl2 text-iexblk">Transparent Notifications</h4>
                                </div>
                                <p className="text-base leading-loose text-gray-500">Ace's decentralized notification system offers transparency. Users can choose a deployed service or run their instances for utmost confidentiality in file transfer interactions.</p>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/3 p-8">
                                <div className="flex items-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="currentColor" class="h-6 w-6 text-indigo-500"><path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z"></path></svg>
                                    <h4 className="ml-4 text-xl2 text-iexblk">Monetization Dynamics</h4>
                                </div>
                                <p className="text-base leading-loose text-gray-500">Ace's cost structure aligns with iExec, allowing monetization of app, CPU, and dataset usage. With zero blockchain fees on iExec's sidechain, Ace's pricing equation simplifies to worker usage fees and content creation monetization, offering a revolutionary revenue model.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="w-full min-h-screen bg-gray-900 relative">
                    <div className="absolute left-0 top-0 h-screen w-full overflow-hidden">
                        <div id="tsparticles">
                            <canvas style={{ width: '100%', height: '100%', pointerEvents: 'initial' }} class="tsparticles-canvas-el" width="2880" height="1444"></canvas>
                        </div>
                    </div>
                    <div className={styles.section5_div}>
                        <h2 className="text-white font-bold text-center">What will you build?</h2>
                        <p className="text-gray-400 text-center text-xl2 mt-12">Don’t just take our word for it — see what leaders in digital are saying</p>
                        <div className="mx-auto pt-16">
                            <div className="w-full flex flex-wrap justify-around">
                                <div className={styles.card}>
                                    <div className="h-64 z-20"><img src="/images/case-1.webp" alt="Proident pariatur est." className="h-full w-full object-cover overflow-hidden rounded" width="400" height="300" /></div><div className="p-4 shadow-lg w-full mx-auto -mt-8 bg-white rounded-b z-30 relative"><p className={styles.descrTitle}>Case study</p><p className={styles.descrP}>Velit reprehenderit culpa Lorem reprehenderit excepteur ipsum esse.</p></div>
                                </div>
                                <div className={styles.card}>
                                    <div className="h-64 z-20"><img src="/images/case-2.webp" alt="Proident pariatur est." className="h-full w-full object-cover overflow-hidden rounded" width="400" height="300" /></div><div className="p-4 shadow-lg w-full mx-auto -mt-8 bg-white rounded-b z-30 relative"><p className={styles.descrTitle}>Case study</p><p className={styles.descrP}>Velit reprehenderit culpa Lorem reprehenderit ipsum esse.</p></div>
                                </div>
                                <div className={styles.card}>
                                    <div className="h-64 z-20"><img src="/images/case-3.webp" alt="Proident pariatur est." className="h-full w-full object-cover overflow-hidden rounded" width="400" height="300" /></div><div className="p-4 shadow-lg w-full mx-auto -mt-8 bg-white rounded-b z-30 relative"><p className={styles.descrTitle}>Case study</p><p className={styles.descrP}>Velit reprehenderit culpa Lorem reprehenderit excepteur esse.</p></div>
                                </div>
                                <span className="-mt-8 pb-12 lg:mt-4 flex items-center text-xl2 text-indigo-400 cursor-pointer z-30 hover:text-indigo-600">See all case studies<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="h-6 w-6 fill-current ml-2"><path d="M18.719 6.781L17.28 8.22 24.063 15H4v2h20.063l-6.782 6.781 1.438 1.438 8.5-8.5.687-.719-.687-.719z"></path></svg></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id={styles.section6}>
                <div class={styles.section6_div}>    
                    <div className="mx-auto">
                        <figure>
                            <div className="relative bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" class="w-16 md:w-12 left-0 md:-left-2 absolute top-0 pl-4 md:pl-0 text-gray-300"><path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H6c0-2.219 1.781-4 4-4zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-8c0-2.219 1.781-4 4-4zM6 16h6v6H6zm14 0h6v6h-6z"></path></svg>
                                <div className="pt-20 px-6 md:px-0">
                                    <p className={styles.quote}>Commodo Lorem consequat ea consectetur pariatur proident excepteur.
                                        Pariatur eiusmod minim minim ipsum tempor aute excepteur minim eu nisi laboris.
                                        Duis sunt labore eu eu cupidatat labore commodo id aliquip.
                                    </p>
                                    <div class="flex items-center justify-between"><div class="flex items-center pb-12"><div class="h-12 w-12"><img src="/images/social-1.webp" alt="John Doe" class="h-full w-full object-cover overflow-hidden rounded-full" height="48" width="48" /></div><p class="text-gray-600 font-bold ml-3">John Doe<br/><span class="text-gray-600 text-base font-light">Alphabet Inc.</span></p></div><div class="cursor-pointer flex pb-12"><svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#CBD5E0" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><polyline points="15 6 9 12 15 18"></polyline></svg><svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#CBD5E0" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><polyline points="9 6 15 12 9 18"></polyline></svg></div></div>
                                </div>
                            </div>
                        </figure>
                    </div>
                </div>
            </section>

            <section id={styles.section7} className="bg-gradient-to-b from-gray-100 to-white shadow-inner">
                <div className={styles.section7_div}>
                    <div className="overflow-hidden lg:max-w-none lg:flex">
                        <div className="py-8 px-6 md:px-0 lg:flex-shrink-1">
                            <h2 className="font-bold text-gray-800 mb-12">Are you ready?</h2>
                            <p className="mt-6 text-base text-gray-500">Lorem id ullamco pariatur eiusmod labore qui deserunt incididunt deserunt nostrud. Tempor duis in adipisicing exercitation ipsum nostrud esse. Reprehenderit cupidatat sint est deserunt id eiusmod amet aliqua officia.</p>
                            <div class="mt-8">
                                <div class="flex items-center">
                                    <h3 className="flex-shrink-0 pr-4 tracking-wider text-indigo-600">What is included</h3>
                                    <div className="flex-1 border-t-2 border-gray-200"></div>
                                </div>
                                <ul class="mt-8 lg:grid lg:grid-cols-2">
                                    <li className="flex items-center lg:col-span-1"><div class="flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="h-8 w-8 mr-3 mb-1"><path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z"></path></svg></div><p class="text-gray-600">Laboris nulla</p></li>
                                    <li className="flex items-center lg:col-span-1"><div class="flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="h-8 w-8 mr-3 mb-1"><path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z"></path></svg></div><p class="text-gray-600">Lorem pariatur nisi</p></li>
                                    <li className="flex items-center lg:col-span-1"><div class="flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="h-8 w-8 mr-3 mb-1"><path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z"></path></svg></div><p class="text-gray-600">Id aute amet pariatur</p></li>
                                    <li className="flex items-center lg:col-span-1"><div class="flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="h-8 w-8 mr-3 mb-1"><path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z"></path></svg></div><p class="text-gray-600">Do duis sint aliquip</p></li>
                                    <li className="flex items-center lg:col-span-1"><div class="flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="h-8 w-8 mr-3 mb-1"><path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z"></path></svg></div><p class="text-gray-600">Nostrud duis tempor</p></li>
                                    <li className="flex items-center lg:col-span-1"><div class="flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="h-8 w-8 mr-3 mb-1"><path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z"></path></svg></div><p class="text-gray-600">Consequat eiusmod</p></li>
                                    <li className="flex items-center lg:col-span-1"><div class="flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="h-8 w-8 mr-3 mb-1"><path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z"></path></svg></div><p class="text-gray-600">Reprehenderit</p></li>
                                    <li className="flex items-center lg:col-span-1"><div class="flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="h-8 w-8 mr-3 mb-1"><path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z"></path></svg></div><p class="text-gray-600">Adipisicing reprehenderit</p></li>
                                </ul>
                            </div>
                        </div>
                        <div className="py-8 px-6 text-center lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-[48px]">
                            <p class="text-lg font-medium text-gray-800">If you order now...</p>
                            <div className="my-4 flex items-center justify-center text-6xl leading-none font-bold text-gray-800">$99/mo</div>
                            <button type="button" class="font-sans font-medium py-2 px-4 border rounded bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-700 mt-6">Contact sales</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LandingPage;