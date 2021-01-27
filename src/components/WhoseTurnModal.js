import React,{useEffect} from 'react'



function WhoseTurnModal({setShowModal, children, color}) {

    useEffect(() => {
        setTimeout(() => {
            setShowModal(false)
        }, 3000)
    }, []);

    return (
        <div className="modalOverlay">
            <div className="modal">
                <div style={
                    {
                        backgroundColor: `${color}`,
                        height: '20px',
                        marginBottom: '10px'
                    }
                }/>
                {children}
            </div>

        </div>
    );
}

export default WhoseTurnModal;
