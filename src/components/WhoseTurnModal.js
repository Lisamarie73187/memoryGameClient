import React from 'react'



function WhoseTurnModal({userList, setShowModal}) {

    const name = userList.filter(e => e.turn === true)[0].name;

    return (
        <div className="modalOverlay">
            <div className="modal">
                <div className="topBorder"/>
                <div className="modalText">
                    It's
                    <div className="modalName">
                        {name}
                    </div>
                    Turn
                </div>
                <div className="buttonModal" onClick={setShowModal}>
                    Close
                </div>
            </div>

        </div>
    );
}

export default WhoseTurnModal;
