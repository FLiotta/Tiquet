// Packages
import React, { useState } from 'react';
import cn from 'classnames';
import useOnclickOutside from "react-cool-onclickoutside";

// Project
import './styles.scss';

interface IProps {
  text: string,
  textClassName?: string,
  inputClassName?: string,
  onSuccess(value, callback): void,
  onCancel?(): void,
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p',
};

const EditableText = ({
  text,
  tag,
  textClassName,
  inputClassName,
  onSuccess,
  onCancel,
}: IProps): JSX.Element => {
  const [editing, setEditing] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const value = e.target[`editable_text_${text}`].value;

    onSuccess(value, () => {
      setEditing(false);
    });
  };

  const cancel = () => {
    setEditing(false);
    if (onCancel) {
      onCancel();
    }
  };

  const clickOutsideRef = useOnclickOutside(cancel);

  return (
    <div ref={clickOutsideRef} className="editable-text" onClick={() => setEditing(true)}>
      {!editing
        ? React.createElement(tag, { className: cn("editable-text__title", textClassName) }, (
          <>
            {text} <i className="fas fa-pencil-alt editable-text__icon"></i>
          </>
        ))
        : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className={cn(inputClassName)}
              id={`editable_text_${text}`}
              defaultValue={text}
            />
          </form>
        )
      }
    </div>
  )
}

export default EditableText;