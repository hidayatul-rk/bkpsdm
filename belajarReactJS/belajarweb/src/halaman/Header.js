import React from 'react';



// const Header = () => {
//     return (
//         <h2>Membuat Function</h2>
//     )
// }

function Header(props) {
    return (
        <div>
            <center><h1>{props.judul}</h1></center>
            <p>{props.ket}</p>
            <h3>{props.j}</h3>
        </div>
    )
}

export default Header;