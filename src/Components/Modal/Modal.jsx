const Modal = ({ children, ref = null, className }) => {
    return (
      <dialog ref={ref} className="modal">
        <div className={`modal-box max-w-full ${className}`}>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          {children}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    );
  };
  
  export default Modal;
  