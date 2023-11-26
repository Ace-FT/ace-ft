import React from "react";
import {Helmet} from 'react-helmet';

const APP_NAME = process.env.REACT_APP_NAME;


function Landing() {
    return (
        <>
            <Helmet>
                <title>{APP_NAME} | Home</title>
            </Helmet>
            <section className="relative flex flex-col mx-m h-max text-center align-center my-32">
                <h1 className="text-8xl font-bold mb-4 w-2/3 mx-auto">Redefining Secure File Transfer</h1>
                <p className="mt-12 text-3xl">Restore Your Right to Privacy and Security.</p>
                <div class="mt-16 flex justify-center items-center w-full mx-auto">
                    <button type="button" class="btn h-12 text-l font-bold">Get started</button>
                </div>
                {/* <p className="text-2xl font-semibold mt-4">Explore Ace, the file transfer solution that puts an end to surveillance and security risks of Web2. Send files with complete privacy, monetize your content, and enjoy a simplified transfer experience powered by iExec's blockchain technology.</p> */}
            </section>
            <section className="flex flex-col mx-m align-center container">
                <h2 className="text-6xl font-bold text-center">Revolutionising File Transfer</h2>
                <div className="flex flex-row mt-16">
                    <ul className="flex flex-col w-1/2 space-y-12">
                        <li className="flex">
                            <p className="px-4">
                                <span className="flex w-[65px] h-[65px] mx-auto items-center justify-center text-2xl font-bold rounded-full bg-blue-50 text-blue-500">1</span>
                            </p>
                            <div className="flex flex-col">
                                <h3 className="text-3xl font-semibold my-6">Unparalleled User Experience</h3>
                                <p className="leading-loose">Ace offers more than just a file transfer. As a sender, encrypt and securely share, set your rules, and monetise your content. As a recipient, receive instant notifications and download without time constraints.</p>
                            </div>
                        </li>
                        <li className="flex">
                            <p className="px-4">
                                <span className="flex w-[65px] h-[65px] mx-auto items-center justify-center text-2xl font-bold rounded-full bg-blue-50 text-blue-500">2</span>
                            </p>
                            <div className="flex flex-col">
                                <h3 className="text-3xl font-semibold my-6">Smart Monetisation</h3>
                                <p className="leading-loose">Ace eliminates the need to compromise your privacy for file sharing. It will always be free. With our monetisation model, as a sender, you can give a payable access to your content, to get rewarded in $RLC, regardless the data you are sending.</p>
                            </div>
                        </li>
                    </ul>
                    petite image sympa
                </div>
            </section>

            <section className="flex flex-col mx-m h-max align-center container">
                <p className="uppercase text-center text-iexyellow">Transforming Standards</p>
                <h2 className="text-6xl font-bold text-center">Send is the same, process is different</h2>
                <div className="flex flex-row mt-16">
                    <div className="flex flex-col w-1/3 pr-8">                
                        <div className="flex items-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="currentColor" class="h-7 w-7 text-iexyellow"><path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z"></path></svg>
                            <h3 className="pl-6 text-4xl">Redefining Security</h3>
                        </div>
                        <p className="leading-loose">Ace leverages the power of the iExec protocol to ensure secure file transfer. From encryption on IPFS to cryptographic authorization, your privacy is our priority.</p>
                    </div>
                    <div className="flex flex-col w-1/3 px-8">
                        <div className="flex items-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="currentColor" class="h-7 w-7 text-iexyellow"><path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z"></path></svg>
                            <h3 className="pl-6 text-4xl">Total Decentralisation</h3>
                        </div>
                        <p className="leading-loose">By eliminating the need for an intermediary, Ace redefines decentralised file transfer. No more time constraints for downloading your files. Ace operates on your schedule.</p>
                    </div>
                    <div className="flex flex-col w-1/3 pl-8">
                        <div className="flex items-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="currentColor" class="h-7 w-7 text-iexyellow"><path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z"></path></svg>
                            <h3 className="pl-6 text-4xl">Empowering Users</h3>
                        </div>
                        <p className="leading-loose">Ace goes beyond security and decentralisation; it empowers users to control their data destiny. With Ace, users set the rules for file sharing, determine the value of their contributions, and play a pivotal role in shaping our community-driven ecosystem.</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Landing;