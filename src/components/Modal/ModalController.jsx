///
/// inspired from https://www.tailwindtoolbox.com/components/modal
export const setModalContent = (modalId, title, text,show) => {
    let modalElement = document.getElementById(modalId) ; 
    if (modalElement)
    {
        let titleElement = modalElement.querySelector(".modal-title");
        let textElement = modalElement.querySelector(".modal-text");
        
        if (titleElement)
        {
            titleElement.innerHTML=title; 
        }
        if (textElement)
        {
            textElement.innerHTML=text; 
        }
        if( show )
        {
            toggleModal(modalId) ; 
        }
    }
}

export const toggleModal = (modalId, onModalClose)=> {

    const body = document.querySelector('body');
    let modal = modalId ? document.getElementById(modalId) :  document.querySelector('.modal') ; 
    let callBackRequired =  onModalClose && document.body.classList.contains('modal-active') ;  
    modal.classList.toggle('opacity-0');
    modal.classList.toggle('pointer-events-none');
    body.classList.toggle('modal-active');

    if ( callBackRequired )
    {
        onModalClose.call() ; 
    }

}