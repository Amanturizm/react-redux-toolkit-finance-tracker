import React, { PropsWithChildren } from 'react';
import CloseButton from "../CloseButton/CloseButton";

interface Props extends PropsWithChildren {
  closeBtnTo: string;
}

const Modal: React.FC<Props> = ({ closeBtnTo, children }) => {
  return (
    <div className="position-fixed top-0 start-0 end-0 bottom-0 bg-black bg-opacity-25">
      <div className=
             {`
             position-absolute top-50 start-50 translate-middle bg-white
             border border-2 border-black rounded-4
             p-4
             `}
           style={{ width: 600 }}
      >
        {children}
        <CloseButton to={closeBtnTo} />
      </div>
    </div>
  );
};

export default Modal;