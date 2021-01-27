import React,{useEffect} from 'react'



function WhoseTurnModal({closeModal, children, color}) {

    useEffect(() => {
        setTimeout(() => {
            closeModal(false)
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
