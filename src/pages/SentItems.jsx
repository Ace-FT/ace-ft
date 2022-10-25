import React, {useContext} from 'react';

const SentItems = () => {
    return (
        <div>
            <table className="w-full border-collapse max-w-full rounded-2xl shadow-xl bg-white text-black table-auto">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="border-r border-gray-200 py-3">Send date</th>
                        <th className="border-r border-gray-200 py-3">To</th>
                        <th className="border-r border-gray-200 py-3">Message</th>
                        <th className="border-r border-gray-200 py-3">Price (in RLC)</th>
                        <th className="px-3">Downloaded</th>
                        <th className="px-3">Download date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="text-center border-b border-gray-200">
                    <td className="border-r border-gray-200 p-3">2022-10-24 16:31</td>
                        <td className="border-r border-gray-200 p-3">0xad55E45c30A902FE99cdBd776014aA53f692e475</td>
                        <td className="border-r border-gray-200 p-3">Hello</td>
                        <td className="border-r border-gray-200 p-3">3</td>
                        <td className=" my-8">No</td>
                        <td className="my-8">-</td>
                    </tr>                    
                    <tr className="text-center border-b border-gray-200">
                    <td className="border-r border-gray-200 p-3">2022-10-24 18:01</td>
                        <td className="border-r border-gray-200 p-3">0xad55E45c30A902FE99cdBd776014aA53f692e475</td>
                        <td className="border-r border-gray-200 p-3">Ceci est un test pour vérifier la taille du tableau</td>
                        <td className="border-r border-gray-200 p-3">11</td>
                        <td className="my-8">Yes</td>
                        <td>2022-10-24 16:31</td>
                    </tr>
                    <tr className="text-center">
                    <td className="border-r border-gray-200 p-3">2022-10-24 19:39</td>
                        <td className="border-r border-gray-200 p-3">0xad55E45c30A902FE99cdBd776014aA53f692e475</td>
                        <td className="border-r border-gray-200 p-3">Test 2</td>
                        <td className="border-r border-gray-200 p-3">6</td>
                        <td className="my-8">Yes</td>
                        <td>2022-10-24 16:31</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default SentItems;